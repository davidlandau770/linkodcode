import { config } from "dotenv";
import { MongoClient, Db } from "mongodb";
config();

const client = new MongoClient(process.env.DB_CONECTION);

/**
 * @type { Db | null}
 */
let db = null;

/**
 * @returns {Promise<Db>}
 */

const connectToMongodb = async () => {
    if (!db) {
        await client.connect();
        db = client.db("linkodcode");
        console.log("Connected to MongoDB");
    }
    return db
}
connectToMongodb()

export {
    connectToMongodb
}