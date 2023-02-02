import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@cluster0.kroh7rd.mongodb.net/nextEventsDB?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(url);

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getFilteredComments = async (client, collection, query, sort) => {
  const db = client.db();

  return await db.collection(collection).find(query).sort(sort).toArray();
};
