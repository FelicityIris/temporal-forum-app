import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

const PostDetailPage = () => {
    const [ post, setPost ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ saving, setSaving ] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    // console.log({ id });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                setPost(res.data);
            } catch (error) {
                console.error("Error in fetching post:\n", error);
                toast.error("Failed to fetch the Post");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await api.delete(`/posts/${id}`);
            toast.success("Post deleted successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error deleting the post:\n", error);
            toast.error("Failed to delete the post.");
        }
    };

    const handleSave = async () => {
        if (!post.title.trim() || !post.content.trim()) {
            toast.error("All fields are required to be filled.");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/posts/${id}`, post);
            toast.success("Post updated successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error:");
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);
            console.log("Full error:\n", error);
            toast.error("Failed to save the post.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

	return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Posts
                        </Link>

                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" />
                            Delete Post
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>

                                <input 
                                    type="text"
                                    placeholder="Post title"
                                    className="input input-bordered"
                                    value={post.title}
                                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>

                                <textarea
                                    placeholder="Write here..."
                                    className="textarea textarea-bordered h-32"
                                    value={post.content}
                                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving? "Saving..." : "Save Changes"};
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailPage;