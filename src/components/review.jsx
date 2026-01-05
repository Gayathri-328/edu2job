// import React, { useState } from "react";
// import "./review.css";

// function Review() {
//   const [rating, setRating] = useState(0);
//   const [label, setLabel] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const ratings = [
//     { stars: 5, text: "Excellent" },
//     { stars: 4, text: "Good" },
//     { stars: 2, text: "Bad" },
//     { stars: 1, text: "Very Bad" },
//   ];

//   const handleRating = (stars, text) => {
//     setRating(stars);
//     setLabel(text);
//     setSubmitted(false);
//   };

//   const submitReview = () => {
//     if (rating === 0) {
//       alert("Please select a rating");
//       return;
//     }

//     // 🔥 Later you can POST this to backend
//     console.log("User Review:", { rating, label });

//     setSubmitted(true);
//   };

//   return (
//     <div className="review-box">
//       <h3>Rate Your Experience</h3>

//       <div className="star-row">
//         {ratings.map((r, i) => (
//           <div
//             key={i}
//             className={`rating-option ${
//               rating === r.stars ? "active" : ""
//             }`}
//             onClick={() => handleRating(r.stars, r.text)}
//           >
//             {"⭐".repeat(r.stars)}
//             <p>{r.text}</p>
//           </div>
//         ))}
//       </div>

//       <button className="review-btn" onClick={submitReview}>
//         Submit Review
//       </button>

//       {submitted && (
//         <p className="success-text">
//           ✅ Thanks for rating us <b>{label}</b>!
//         </p>
//       )}
//     </div>
//   );
// }

// export default Review;
import React, { useState } from "react";
import "./Review.css";

function Review() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setMessage("✅ Thank you for your feedback!");
  };

  const labels = {
    5: "Excellent",
    4: "Good",
    2: "Bad",
    1: "Very Bad",
  };

  return (
    <div className="review-box">
      <h3>Rate Your Experience</h3>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star active" : "star"}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      {rating > 0 && (
        <p className="rating-text">
          {labels[rating] || "Average"}
        </p>
      )}

      <button onClick={handleSubmit}>Submit Review</button>

      {message && <p className="success-msg">{message}</p>}
    </div>
  );
}

export default Review;
