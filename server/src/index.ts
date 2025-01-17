import app from "./app";
import startServer from "./server";
import { handleEvents } from "./utils/eventHandler";

(() => {
    startServer(app);
    handleEvents();
})();

