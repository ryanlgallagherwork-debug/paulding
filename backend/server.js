import express from "express";
import cors from "cors";
import { fetchCWOPStations } from "./fetchers/cwop.js";

const app = express();

// allow GitHub Pages to access your API
app.use(cors());

let cache = [];
let lastFetch = 0;

const CACHE_TIME = 60 * 1000; // 1 min

app.get("/stations", async (req, res) => {
  try {
    const now = Date.now();

    if (now - lastFetch > CACHE_TIME || cache.length === 0) {
      console.log("Fetching fresh data...");
      cache = await fetchCWOPStations();
      lastFetch = now;
    }

    res.json(cache);
  } catch (err) {
    console.error("Error in /stations:", err);
    res.status(500).json({ error: "Failed to load stations" });
  }
});

// IMPORTANT for Render / hosting
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
