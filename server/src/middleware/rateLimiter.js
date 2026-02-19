import ratelimit from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({ message: "Too many requests, try again later" });
        }

        next();
    } catch (error) {
        console.error("Rate limit error:\n", error);
        next(error);
    }
};

export default rateLimiter;