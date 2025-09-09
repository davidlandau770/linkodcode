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

const readPostDB = async (postId) => {
    const db = await connectToMongodb();
    return db.collection('posts').findOne({ id: postId });
}

const getMaxIdDB = async () => {
  const db = await connectToMongodb();
  return await db.collection("posts").find({}).sort({ id: -1 }).limit(1).toArray();
};

export {
    createPostDB,
    readPostsDB,
    updatePostDB,
    deletePostDB,
    readPostDB,
    getMaxIdDB
}