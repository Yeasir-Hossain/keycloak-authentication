import { Express } from 'express';
import connectToMongo from './db/connectToMongo';
import logger from './utils/logger';
import { setServerInstance } from './utils/eventHandler';
const PORT = process.env.PORT || 5000;

/**
 * Starts the server by establishing a connection to the database, initializing email and message queues,
 * and listening on the specified port.
 * @returns {Promise<void>} Resolves if the server starts successfully.
 * @throws {Error} If any error occurs during server startup, logs the error and exits the process with a non-zero status code.
 */
async function startServer(app: Express): Promise<void> {
	try {
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