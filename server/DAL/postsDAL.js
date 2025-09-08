import { connectToMongodb } from "../db/mongodb.js";

const createPostDB = async (data) => {
    const db = await connectToMongodb();
    return db.collection("posts").insertOne(data);
}

const readPostsDB = async () => {
    const db = await connectToMongodb();
    return db.collection('posts').find().toArray();
}

const updatePostDB = async (id, data) => {
    const db = await connectToMongodb();
    return db.collection('posts').updateOne(
        { id: id },
        { $set: data }
    )
}

const deletePostDB = async (id, data) => {
    const db = await connectToMongodb();
    return db.collection('posts').deleteOne(
        { id: id },
        { $set: data }
    )
}

export {
    createPostDB,
    readPostsDB,
    updatePostDB,
    deletePostDB
}