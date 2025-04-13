import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB_NAME || "universityDB";
const collection_uni = process.env.MONGODB_COLLECTION || "universities";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);

        if (req.method === 'GET') {
            const { country, search, page = "1", limit = "10", type } = req.query;

            if (type === "favorites") {
                const favorites = await db.collection(collection_uni).find({ is_favorite: true }).toArray();
                return res.status(200).json(favorites);
            }

            const collection = db.collection(collection_uni);

            const query: any = {};
            if (country) {
                query.country = country.toString();
            }
            if (search) {
                query.name = { $regex: search.toString(), $options: 'i' }; // Case-insensitive search
            }

            const pageNumber = parseInt(page as string, 10);
            const pageSize = parseInt(limit as string, 10);
            const skip = (pageNumber - 1) * pageSize;

            const universities = await collection
                .find(query)
                .skip(skip)
                .limit(pageSize)
                .toArray();

            const total = await collection.countDocuments(query);

            res.status(200).json({ universities, total });
        } else if (req.method === "POST") {
            const { uni_id } = req.body;

            if (!uni_id) {
                return res.status(400).json({ error: "Missing university ID." });
            }

            const university = await db
                .collection(collection_uni)
                .findOne({ _id: new ObjectId(uni_id) });

            if (!university) {
                return res.status(404).json({ error: "University not found." });
            }

            const updatedUniversity = await db.collection(collection_uni).updateOne(
                { _id: new ObjectId(uni_id) },
                { $set: { is_favorite: !university.is_favorite } }
            );

            return res.status(200).json({ message: "Favorite status updated." });
        } else if (req.method === "DELETE") {
            const { uni_id } = req.body;

            if (!uni_id) {
                return res.status(400).json({ error: "Missing university ID." });
            }

            try {
                const result = await db.collection(collection_uni).updateOne(
                    { _id: new ObjectId(uni_id) },
                    { $set: { is_favorite: false } }
                );

                if (result.modifiedCount === 0) {
                    return res.status(404).json({ error: "University not found or already not a favorite." });
                }

                return res.status(200).json({ message: "Removed from favorites." });
            } catch (error) {
                console.error("Error removing favorite:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await client.close();
    }
}