import express from "express";
import { shortenUrl, redirectUrl, getStats } from "../controllers/urlController.js";
import limiter from "../middleware/rateLimiter.js";

const router = express.Router();
router.get("/test" , (req, res) => {
  res.send("API is working");
});
router.post("/shorten", limiter, shortenUrl);
router.get("/:shorttext" , redirectUrl);
router.get("/stats/:shorttext", getStats);

export default router;