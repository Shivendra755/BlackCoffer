import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import insightRoutes from "./routes/insightRoutes.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();


const app = express();
const Port = process.env.Port  || 2000
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);


app.use(express.json());
app.use("/api/insights", insightRoutes);
app.get("/a",(req,res)=>{
    res.send("hello sangram")
    console.log("hello sangram")
})

app.listen(2000, () =>
  console.log("Backend running on http://localhost:2000")
);


