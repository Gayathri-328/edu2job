import React, { useState } from "react";
import "./Review.css";

function Review() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const submitReview = () => {
    if (!rating || !comment.trim()) {
      alert("Please give rating and comment");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="review-box">
      <h3>Give Your Feedback</h3>

      {/* ⭐ Rating */}
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={rating >= star ? "active" : ""}
            onClick={() => handleRating(star)}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* 💬 Comment */}
      <textarea
        placeholder="Write your feedback here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Buttons */}
      <div className="review-actions">
        <button onClick={submitReview}>Submit</button>
        <button className="like-btn" onClick={() => setLikes(likes + 1)}>
          👍 Like {likes}
        </button>
      </div>

      {/* ✅ Show Submitted Review */}
      {submitted && (
        <div className="submitted-review">
          <p><b>Rating:</b> {"⭐".repeat(rating)}</p>
          <p><b>Comment:</b> {comment}</p>
          <p><b>Likes:</b> {likes}</p>
        </div>
      )}
    </div>
  );
}

export default Review;
