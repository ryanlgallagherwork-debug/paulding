import express from "express";
import cors from "cors";
import { fetchCWOPStations } from "./fetchers/cwop.js";

const app = express();
app.use(cors());

let cache = [];
let lastFetch = 0;

const CACHE_TIME = 60 * 1000; // 1 min

app.get("/stations", async (req, res) => {
  const now = Date.now();

  if (now - lastFetch > CACHE_TIME) {
    console.log("Fetching fresh data...");
    cache = await fetchCWOPStations();
    lastFetch = now;
  }

  res.json(cache);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
