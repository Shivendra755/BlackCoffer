import Insight from "../models/Insight.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON data
const dataPath = path.join(__dirname, "../data/jsondata.json");
let jsonData = [];

try {
  const rawData = fs.readFileSync(dataPath, "utf-8");
  jsonData = JSON.parse(rawData);
  console.log(`Loaded ${jsonData.length} records from jsondata.json`);
} catch (error) {
  console.error("Error loading JSON data:", error.message);
  jsonData = [];
}

export const getInsights = async (req, res) => {
  try {
    let data = jsonData.length > 0 ? [...jsonData] : [];

    // General search - searches in country, city, and topic
    if (req.query.search && req.query.search.trim()) {
      const searchTerm = req.query.search.toLowerCase();
      console.log(`Searching for: "${req.query.search}" (${data.length} records before filter)`);
      data = data.filter(
        (item) =>
          (item.country && item.country.toLowerCase().includes(searchTerm)) ||
          (item.city && item.city.toLowerCase().includes(searchTerm)) ||
          (item.topic && item.topic.toLowerCase().includes(searchTerm))
      );
      console.log(`Found ${data.length} records for "${req.query.search}"`);
    }

    // Apply filters only if they have values
    if (req.query.topic && req.query.topic.trim()) {
      data = data.filter(
        (item) =>
          item.topic &&
          item.topic.toLowerCase().includes(req.query.topic.toLowerCase())
      );
    }
    if (req.query.region && req.query.region.trim()) {
      data = data.filter(
        (item) =>
          item.region &&
          item.region.toLowerCase().includes(req.query.region.toLowerCase())
      );
    }
    if (req.query.year && req.query.year.trim()) {
      const yearVal = parseInt(req.query.year);
      data = data.filter((item) => item.end_year === yearVal);
    }
    if (req.query.sector && req.query.sector.trim()) {
      data = data.filter(
        (item) =>
          item.sector &&
          item.sector.toLowerCase().includes(req.query.sector.toLowerCase())
      );
    }
    if (req.query.country && req.query.country.trim()) {
      data = data.filter(
        (item) =>
          item.country &&
          item.country.toLowerCase().includes(req.query.country.toLowerCase())
      );
    }
    if (req.query.city && req.query.city.trim()) {
      data = data.filter(
        (item) =>
          item.city &&
          item.city.toLowerCase().includes(req.query.city.toLowerCase())
      );
    }
    if (req.query.pestle && req.query.pestle.trim()) {
      data = data.filter(
        (item) =>
          item.pestle &&
          item.pestle.toLowerCase().includes(req.query.pestle.toLowerCase())
      );
    }
    if (req.query.source && req.query.source.trim()) {
      data = data.filter(
        (item) =>
          item.source &&
          item.source.toLowerCase().includes(req.query.source.toLowerCase())
      );
    }
    if (req.query.swot && req.query.swot.trim()) {
      data = data.filter(
        (item) =>
          item.swot &&
          item.swot.toLowerCase().includes(req.query.swot.toLowerCase())
      );
    }

    // Return filtered data
    return res.json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.error("Error in getInsights:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

