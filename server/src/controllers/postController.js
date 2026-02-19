import Post from "../models/Post.js";

export const fetchAllPosts = async (_, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // -1 = newest first (1 for oldest first)
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error in fetchAllPosts controller:\n", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const getPostById = async (req, res) => {
    try {
        const queriedPost = await Post.findById(req.params.id)
        if (!queriedPost) return res.status(404).json({ message: "Post not found!" });
        res.json(queriedPost);
    } catch (error) {
        console.error("Error in getPostById controller:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = new Post({ title:title, content:content });

        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error in createPost controller:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            { title, content },
            { returnDocument: after, }
        );

        if (!updatePost) return res.status(404).json({ message: "Post not found!" });

        res.status(200).json({ message: "Post updated successfully!" });
    } catch (error) {
        console.error("Error in updatePost controller:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        console.error("Error in deletePost controller:\n", error);
        res.status(500).json({ message: "Internal server error" });
    }
}