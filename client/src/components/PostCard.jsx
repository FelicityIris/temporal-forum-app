import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const PostCard = ({ post, setPosts }) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await api.delete(`/posts/${id}`);
            setPosts((prev) => prev.filter(post => post._id !== id))
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error("Error in handleDelete:\n", error);
        }
    };

    return (
        <Link to={ `/post/${post._id}` } className="card bg-base-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-4 border-primary">
            <div className="card-body">
                <h3 className="card-title text-base-content">{ post.title }</h3>
                <p className="text-base-content/70 line-clamp-3">{ post.content }</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        { formatDate(new Date(post.createdAt)) }
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={ (e) => handleDelete(e, post._id) }>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;