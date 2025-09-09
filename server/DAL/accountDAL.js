import { connectToMongodb } from "../db/mongodb.js";

const getUsersDB = async () => {
    const db = await connectToMongodb();
    return db.collection('users').find().toArray();
}

const addUserDB = async (data) => {
    const db = await connectToMongodb();
    return db.collection("users").insertOne(data);
}

const updateUserDB = async (id, data) => {
    const db = await connectToMongodb();
    return db.collection('users').updateOne(
        { id: id },
        { $set: data }
    )
}

const getMaxIdDB = async () => {
  const db = await connectToMongodb();
  return await db.collection("users").find({}).sort({ id: -1 }).limit(1).toArray();
};

export {
    getUsersDB,
    addUserDB,
    updateUserDB,
    getMaxIdDB
}