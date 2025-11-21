import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import linkRoutes from "./routes/LinkRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/healthz", (req, res) => res.status(200).json({ ok: true, version: "1.0" }));
app.use("/", linkRoutes);

app.listen(8000, () => console.log("Server running on 8000"));
