import express from "express";
import Review from "../models/Review.js";

const reviewRouter = express.Router();

// Submit a review
reviewRouter.post("/:bookId/review", async (req, res) => {
  const { userId, rating, comment } = req.body;
  const { bookId } = req.params;

  try {
    const newReview = new Review({ user: userId, book: bookId, rating, comment });
    await newReview.save();
    res.json({ message: "Review added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add review" });
  }
});

// Get all reviews for a book
reviewRouter.get("/:bookId/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate("user", "username");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default reviewRouter;
