import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export interface ProcessEnv {
    [key: string]: string | undefined;
}

if (!process.env.MONGODB_URI) {
    console.error('No MONGODB_URI provided');
    process.exit(1);
}


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
    console.log('connecting to mongo');
  if (cached.conn) {
    console.log('using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('creating new connection');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  console.log('awaiting promise');
  cached.conn = await cached.promise;
  return cached.conn;
}


export default connectMongo;