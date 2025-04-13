const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const uri = "mongodb://mongo:27017";
const dbName = "universityDB";
const collectionName = "universities";

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log("Database already initialized. Skipping data import.");
      return;
    }

    const filePath = path.join(
      __dirname,
      "./world_universities_and_domains.json"
    );
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const result = await collection.insertMany(data);
    console.log(
      `${result.insertedCount} documents inserted into the database.`
    );
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    console.log("Closing database connection.");
    await client.close();
  }
}

seed();
