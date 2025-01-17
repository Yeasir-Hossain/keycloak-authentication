import { connect, set } from "mongoose";

set("allowDiskUse", true);
set("strictPopulate", false);
set("strictQuery", true);

/**
 * Establishes a connection to MongoDB using the provided URI from environment variables.
 * @returns {Promise<string>} A promise that resolves with a success message upon successful connection.
 * @throws {Error} If connection to MongoDB fails, rejects with the encountered error.
 */
export default function connectToMongo(): Promise<string> {
  return new Promise((resolve, reject) => {
    connect(process.env.MONGODB_URI!)
      .then(() => resolve("=> Connected to MongoDB"))
      .catch(err => reject(err));
  });
}
