import rateLimit from "../config/upstash.js";
const rateLimiter = (req, res, next) => {
    try{
        
        const { success } = rateLimit.limit(req.ip); 
        if (!success) {
            return res.status(429).json({ error: "Too many requests, please try again later." });
        }

        next();

    }catch(err){
        console.error("Rate limit exceeded:", err);
        res.status(429).json({ error: "Too many requests, please try again later." });
    }
}

export default rateLimiter;