import mongoose from "mongoose";
import process from "node:process";
import "dotenv/config";

const MONGODB_URL = process.env.MONGODB_URL;

// cache the database connection
let cacheDBConnection = global.mongoose;

if (!cacheDBConnection) {
  cacheDBConnection = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cacheDBConnection.conn) {
    return cacheDBConnection.conn;
  }

  if (!MONGODB_URL) {
    throw new Error(
      "Please define the MONGODB_URL environment variable inside .env"
    );
  }

  if (!cacheDBConnection.promise) {
    const opts = {
      dbName: "local-library",
      bufferCommands: false,
    };
    mongoose.set("strictQuery", false);
    cacheDBConnection.promise = mongoose.connect(MONGODB_URL, opts);
  }
  cacheDBConnection.conn = await cacheDBConnection.promise;
  return cacheDBConnection.conn;
};

export const disconnectFromDatabase = async () => {
  if (cacheDBConnection.conn) {
    await cacheDBConnection.conn.disconnect();
    cacheDBConnection.conn = null;
  }
};
