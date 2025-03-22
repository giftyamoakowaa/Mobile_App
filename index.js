import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/authRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import storyRouter from "./routes/storyRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", router);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Story App API!");
});

app.use("/api/books", bookRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/stories", storyRouter);


app.listen(4100, () =>
  console.log('Server is running') 
);
