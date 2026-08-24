import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_RANDOM_SONGS_URI;

if (!uri) {
    throw new Error("MONGODB_RANDOM_SONGS_URI is not defined");
}

const client = new MongoClient(uri);

let db: Db;

export async function initRandomSongsDatabase() {
    await client.connect();

    db = client.db("Random");

    console.log("MongoDB Random Songs connected");
}

export function getRandomSongsDatabase(): Db {
    if (!db) {
        throw new Error("Random Songs database is not initialized");
    }

    return db;
}