import startServer from "./app";
import { handleEvents } from "./utils/eventHandler";

(async () => {
    startServer();
    handleEvents();
})();

