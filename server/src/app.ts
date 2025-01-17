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
import * as morgan from "./utils/morgan";
import errorHandler from "./middleware/errorHandler";
import session from "express-session";
import { keycloak, memoryStore } from "./controllers/keyCloak";

// Express application configuration
const app = express();
app.set('trust proxy', true);

// Middleware setup
app.use(
  session({
    secret: 'nissan-gtr35-nismo',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

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

app.use(
  rateLimit({
    windowMs: 15 * 60 * 100,
    limit: 200,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "You Have Bombered The API!"
  })
);

app.use(keycloak.middleware());
app.use(compression());
app.use(helmet());
app.disable("x-powered-by");

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

export default app;
