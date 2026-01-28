import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  region: String,
  country: String,
  city: String,
  relevance: Number,
  likelihood: Number,
  pestle: String,
  source: String
});

export default mongoose.model("Insight", insightSchema);
