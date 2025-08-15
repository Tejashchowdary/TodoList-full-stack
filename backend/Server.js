import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import TodoModel from "./Models/Todo.js";

dotenv.config(); // Load env variables from .env

const app = express();

// CORS setup for both local and production
app.use(cors({
  origin: [
    "http://localhost:5173", // for local dev
    "https://todo-list-full-stack-psi.vercel.app" // your Vercel frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Work");
});

app.post("/add", (req, res) => {
  const task = req.body.t;
  TodoModel.create({ task })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
