// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../User");

// const router = express.Router();

// /* ================= JWT VERIFY ================= */
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, "secretkey");
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// /* ================= SAVE PREDICTIONS ================= */
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     console.log("🔥 Prediction API HIT");
//     console.log("TOKEN:", req.headers.authorization);
//     console.log("User ID:", req.userId);
//     console.log("Body:", req.body);

//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const jobs = Array.isArray(req.body) ? req.body : [req.body];

//     jobs.forEach(job => {
//       if (job.role && job.acc && job.company) {
//         user.predictions.push({
//           role: job.role,
//           acc: job.acc,
//           company: job.company,
//           date: new Date()
//         });
//       }
//     });

//     await user.save();

//     console.log("✅ Predictions saved");
//     res.json({ message: "Predictions saved successfully" });

//   } catch (err) {
//     console.error("❌ Prediction save error:", err);
//     res.status(500).json({ message: "Failed to save predictions" });
//   }
// });

// /* ================= GET ALL PREDICTIONS ================= */
// router.get("/", verifyToken, async (req, res) => {
//   const user = await User.findById(req.userId);
//   res.json(user.predictions);
// });

// /* ================= GET LAST 5 ================= */
// router.get("/last", verifyToken, async (req, res) => {
//   const user = await User.findById(req.userId);
//   res.json(user.predictions.slice(-5).reverse());
// });

// module.exports = router;
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../User");

const router = express.Router();

/* ================= JWT VERIFY ================= */
const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Handle Bearer token
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= ADMIN VERIFY ================= */
const verifyAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

/* ================= SAVE PREDICTIONS ================= */
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("🔥 Prediction API HIT");

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

    res.json({ message: "Predictions saved successfully" });
  } catch (err) {
    console.error("❌ Prediction save error:", err);
    res.status(500).json({ message: "Failed to save predictions" });
  }
});

/* ================= GET ALL USER PREDICTIONS ================= */
router.get("/", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.predictions);
});

/* ================= GET LAST 5 PREDICTIONS ================= */
router.get("/last", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.predictions.slice(-5).reverse());
});

/* ================= ADMIN: GET ALL USERS PREDICTIONS ================= */
router.get("/admin/all", verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.find(
    { "predictions.0": { $exists: true } },
    "name email predictions"
  );

  const allPredictions = [];

  users.forEach(user => {
    user.predictions.forEach(pred => {
      allPredictions.push({
        _id: pred._id,
        userId: user._id,
        userName: user.name,
        email: user.email,
        role: pred.role,
        accuracy: pred.acc,
        company: pred.company,
        date: pred.date
      });
    });
  });

  res.json(allPredictions);
});

/* ================= ADMIN: DELETE PREDICTION ================= */
router.delete(
  "/admin/delete/:userId/:predictionId",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { userId, predictionId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.predictions = user.predictions.filter(
        p => p._id.toString() !== predictionId
      );

      await user.save();

      res.json({ message: "Prediction deleted successfully" });
    } catch (err) {
      console.error("❌ Delete error:", err);
      res.status(500).json({ message: "Failed to delete prediction" });
    }
  }
);

module.exports = router;
