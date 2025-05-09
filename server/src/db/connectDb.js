import mongoose from "mongoose";

export default async function connectDb() {
    const db_url = process.env.DB_URL;

    if (!db_url) {
        throw new Error("DB_URL not found, please load it in .env file");
    }

    try {
        const connection = await mongoose.connect(db_url);
        console.log(
            `MongoDB database connection succeed! [${connection.connection.host}]`,
        );
    } catch (error) {
        console.log("MongoDB database connection failed!", error);
    }
}
