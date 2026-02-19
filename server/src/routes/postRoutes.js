import express from "express";
import { fetchAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/", fetchAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;