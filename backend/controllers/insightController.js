import Insight from "../models/Insight.js";

export const getInsights = async (req, res) => {
  const query = {};

  if (req.query.year) query.end_year = req.query.year;
  if (req.query.topic) query.topic = req.query.topic;
  if (req.query.sector) query.sector = req.query.sector;
  if (req.query.region) query.region = req.query.region;
  if (req.query.pestle) query.pestle = req.query.pestle;
  if (req.query.country) query.country = req.query.country;

  const data = await Insight.find(query);
  res.json(data);
};
