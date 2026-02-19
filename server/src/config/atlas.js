import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI || "");
        console.log("Successfully connected to MongoDB Atlas Deployment!");
    } catch(error) {
        console.error("Error connecting to MongoDB Atlas Deployment:\n", error);
        process.exit(1);
    }
}