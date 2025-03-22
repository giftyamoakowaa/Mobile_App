import React, { useState } from "react";

const RatingAndComments = ({ storyId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { rating, text: comment };

    // Update state
    setCommentsList([...commentsList, newComment]);

    // Reset form
    setRating(0);
    setComment("");

    // Send to backend
    fetch(`http://localhost:4100/api/stories/${storyId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }).catch((err) => console.error(err));
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold">Rate & Comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-1 ml-2"
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border w-full p-2 mt-2"
            rows="3"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
          Submit
        </button>
      </form>

      <h4 className="mt-4">Comments</h4>
      {commentsList.map((c, index) => (
        <div key={index} className="border-t p-2">
          <p><strong>Rating:</strong> {c.rating} / 5</p>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingAndComments;
