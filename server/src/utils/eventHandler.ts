import { Server } from "http";
import startServer from "../app";
import { eventsToHandle } from "../config/contants";

let server: Server | null = null;

export function setServerInstance(srv: Server): void {
  server = srv;
}

/**
 * Sets up event handlers to manage server shutdown and restart processes based on predefined events.
 * Handles 'SIGTERM', 'SIGINT', 'unhandledRejection', 'uncaughtException', 'SIGUSR2' events.
 * For 'unhandledRejection' and 'uncaughtException', restarts the server.
 * For other events, logs the event name and closes the server gracefully.
 */
export function handleEvents(): void {
  const gracefulShutdown = (event: string) => {
    console.log(event);
    console.log(`"${event}" received. Shutting down gracefully...`);
    if (server) {
      server.close(() => {
        console.log("=> Server closed.");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  const restartServer = (e: any) => {
    console.log("=> Restarting server because", e);
    if (server) {
      server.close(() => {
        console.log("=> Server closed. Restarting...");
        startServer();
      });
    } else {
      startServer();
    }
  };

  eventsToHandle.forEach(event => {
    process.on(event, e => {
      if (event === "unhandledRejection" || event === "uncaughtException") {
        restartServer(e);
      } else {
        gracefulShutdown(event);
      }
    });
  });
}
