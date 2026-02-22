import { SquarePenIcon } from "lucide-react";
import { Link } from "react-router";

const PostsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
        <div className="bg-primary/10 rounded-full p-8">
            <SquarePenIcon className="size-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">No Posts yet...</h3>
        <p className="text-base-content/70">
            Nothing here yet. Create a post to discuss your thoughts.
        </p>
        <Link to="/create" className="btn btn-primary">
            Create a Post
        </Link>
    </div>
  );
};

export default PostsNotFound;