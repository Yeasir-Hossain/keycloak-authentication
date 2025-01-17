import { config } from "dotenv";
config();

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import actuator from "express-actuator";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Internal imports
import routerV1 from "./routes/v1";
import { setServerInstance } from "./utils/eventHandler";
import connectToMongo from "./db/connectToMongo";
import logger from "./utils/logger";
import * as morgan from "./utils/morgan";
import errorHandler from "./middleware/errorHandler";

// Express application configuration
const PORT = process.env.PORT || 5000;
const app: express.Application = express();

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",")
      .map(origin => origin)
      .filter(Boolean),
    credentials: true,
    methods: "GET,PUT,PATCH,POST,DELETE"
  })
);

app.use(
  actuator({
    basePath: "/health",
    infoGitMode: "full",
    infoBuildOptions: {
      author: {
        name: "Yeasir Hossain",
        email: "yeasir06@gmail.com",
        url: "http://github.com/yeasir-hossain"
      },
      note: "Made with ❤️ By Yeasir Hossain"
    }
  })
);

app.use(compression());
app.use(helmet());
app.disable("x-powered-by");
app.use(
  rateLimit({
    windowMs: 15 * 60 * 100,
    limit: 200,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "You Have Bombered The API!"
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(cookieParser());
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// Default routes
app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send("Wassup!!");
});

// Routes setup
app.use(routerV1);

// error middleware
app.use(errorHandler);

// Handle undefined reoutes
app.use("*", (_req: Request, res: Response) => {
  res.status(404).send({
    message: "Page not found",
  });
});

/**
 * Starts the server by establishing a connection to the database, initializing email and message queues,
 * and listening on the specified port.
 * @returns {Promise<void>} Resolves if the server starts successfully.
 * @throws {Error} If any error occurs during server startup, logs the error and exits the process with a non-zero status code.
 */
async function startServer(): Promise<void> {
  try {
    // const dbStatus = await connectToMongo();
    // console.log(dbStatus);
    const mongoDb = await connectToMongo();
    logger.info(mongoDb);

    // Start server and set server instance
    const httpServer = app.listen(PORT, () => {
      logger.info(`=> Server is running on port ${PORT}`);
    });
    setServerInstance(httpServer);
  } catch (error) {
    logger.error("=> Failed to start server:", error);
    process.exit(1);
  }
}

export default startServer;
