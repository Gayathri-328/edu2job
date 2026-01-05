const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../User");

const router = express.Router();

/* ================= JWT VERIFY ================= */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= SAVE PREDICTIONS ================= */
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("🔥 Prediction API HIT");
    console.log("TOKEN:", req.headers.authorization);
    console.log("User ID:", req.userId);
    console.log("Body:", req.body);

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = Array.isArray(req.body) ? req.body : [req.body];

    jobs.forEach(job => {
      if (job.role && job.acc && job.company) {
        user.predictions.push({
          role: job.role,
          acc: job.acc,
          company: job.company,
          date: new Date()
        });
      }
    });

    await user.save();

    console.log("✅ Predictions saved");
    res.json({ message: "Predictions saved successfully" });

  } catch (err) {
    console.error("❌ Prediction save error:", err);
    res.status(500).json({ message: "Failed to save predictions" });
  }
});

/* ================= GET ALL PREDICTIONS ================= */
router.get("/", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.predictions);
});

/* ================= GET LAST 5 ================= */
router.get("/last", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.predictions.slice(-5).reverse());
});

module.exports = router;
