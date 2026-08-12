import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_RILUME_URI;

if (!uri) {
    throw new Error("MONGODB_RILUME_URI is not defined");
}

const client = new MongoClient(uri);

let db: Db;

export async function initStatusDatabase() {
    await client.connect();

    db = client.db("test");
    console.log("MongoDB Rilume connected");
}

export function getStatusDatabase(): Db {
    if (!db) {
        throw new Error("Status database is not initialized");
    }

    return db;
}