const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../User");

const router = express.Router();

/* ================= VERIFY TOKEN ================= */
const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token" });

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= SAVE FEEDBACK (USER) ================= */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.feedback = {
      rating,
      comment,
      date: new Date()
    };

    await user.save();
    res.json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

/* ================= GET ALL FEEDBACK (ADMIN) ================= */
router.get("/admin", verifyToken, async (req, res) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  const users = await User.find(
    { feedback: { $exists: true } },
    "name email feedback"
  );

  const feedbacks = users.map(u => ({
    name: u.name,
    email: u.email,
    rating: u.feedback.rating,
    comment: u.feedback.comment,
    date: u.feedback.date
  }));

  res.json(feedbacks);
});

module.exports = router;
