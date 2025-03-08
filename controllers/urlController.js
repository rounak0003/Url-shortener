import Url from "../models/Url.js";
import { generate } from "shortid";

export async function shortenUrl(req, res) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const shortCode = generate();
    const newUrl = new Url({ originalUrl, shortCode });

    await newUrl.save();
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function redirectUrl(req, res) {
  const { shorttext } = req.params;

  try {
    const url = await Url.findOne({ shortCode: shorttext });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    url.clicks += 1;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(404).json({ error: "Server error" });
  }
}

export async function getStats(req, res) {
  const { shorttext } = req.params;

  try {
    const url = await Url.findOne({ shortCode: shorttext }); // Fixed findOne issue

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({ originalUrl: url.originalUrl, clicks: url.clicks });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}