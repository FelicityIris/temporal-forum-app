import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./config/atlas.js";
import postRoutes from "./routes/postRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;



// middleware
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());
app.use(rateLimiter);
app.use((req, res, next) => {
    console.log(`Server received a new req: ${req.method} & url: ${req.url}`);
    next();
});
app.use("/api/posts", postRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    })
});
