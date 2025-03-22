import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
