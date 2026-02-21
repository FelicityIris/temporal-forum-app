import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import PostCard from "../components/PostCard";

const HomePage = () => {
    const [ isRateLimited, setIsRateLimited ] = useState(false);

    const [ posts, setPosts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5050/api/posts");
                console.log(res.data);
                setPosts(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Error fetching posts:\n", error);
                if (error.response.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load Posts!");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

	return (
        <div className="min-h-screen">
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                { loading && <div className="text-center text-primary py-10">Loading Posts...</div> }

                { posts.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                        { posts.map(post => (
                            <div>
                                <PostCard key={ post._id } post={ post } />
                            </div>
                        )) }
                    </div>
                ) }
            </div>
        </div>
    );
};

export default HomePage;
