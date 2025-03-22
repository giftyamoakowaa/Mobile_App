import express from "express";
import Book from "../models/Book.js";

const bookRouter = express.Router();

// Get all books
bookRouter.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Get newly added books (last 5)
bookRouter.get("/new", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(5);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Get recently viewed books (Mocked Example)
bookRouter.get("/recent", async (req, res) => {
  try {
    const books = await Book.find().limit(3);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default bookRouter;
