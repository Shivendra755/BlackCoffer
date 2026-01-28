import mongoose from "mongoose";
import fs from "fs";
import Insight from "./models/Insight.js";
import connectDB from "./config/db.js";

connectDB();

const data = JSON.parse(
  fs.readFileSync("./data/jsondata.json", "utf-8")
);

const importData = async () => {
  try {
    await Insight.deleteMany();
    await Insight.insertMany(data);
    console.log("✅ Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
