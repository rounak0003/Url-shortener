import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Rate limit exceeded. Try again later.",
});

export default limiter;