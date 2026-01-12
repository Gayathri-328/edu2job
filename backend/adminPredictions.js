// // const express = require("express");
// const express = require("express");
// const jwt = require("jsonwebtoken");
// // const User = require("../User");
// const User = require("./User");

// const router = express.Router();

// /* ===== VERIFY TOKEN ===== */
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ message: "No token" });

//   try {
//     const decoded = jwt.verify(token, "secretkey");
//     req.userId = decoded.id;
//     req.role = decoded.role;
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// /* ===== VERIFY ADMIN ===== */
// const verifyAdmin = (req, res, next) => {
//   if (req.role !== "admin")
//     return res.status(403).json({ message: "Admin only" });
//   next();
// };

// /* ===== GET ALL USERS PREDICTIONS ===== */
// router.get("/", verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const users = await User.find(
//       { "predictions.0": { $exists: true } },
//       "name email predictions"
//     );

//     // Flatten predictions for table
//     const allPredictions = [];

//     users.forEach(user => {
//       user.predictions.forEach(pred => {
//         allPredictions.push({
//           userName: user.name,
//           email: user.email,
//           role: pred.role,
//           accuracy: pred.acc,
//           company: pred.company,
//           date: pred.date
//         });
//       });
//     });

//     res.json(allPredictions);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch predictions" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("./User");

// const router = express.Router();

// /* ===== VERIFY TOKEN ===== */
// const verifyToken = (req, res, next) => {
//   let token = req.headers.authorization;
//   if (!token) return res.status(401).json({ message: "No token" });

//   // ✅ Handle Bearer token
//   if (token.startsWith("Bearer ")) {
//     token = token.split(" ")[1];
//   }

//   try {
//     const decoded = jwt.verify(token, "secretkey");
//     req.userId = decoded.id;
//     req.role = decoded.role;
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// /* ===== VERIFY ADMIN ===== */
// const verifyAdmin = (req, res, next) => {
//   if (req.role !== "admin") {
//     return res.status(403).json({ message: "Admin only" });
//   }
//   next();
// };

// /* ===== GET ALL USERS PREDICTIONS ===== */
// router.get("/", verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const users = await User.find(
//       { predictions: { $exists: true, $ne: [] } },
//       "name email predictions"
//     );

//     const allPredictions = [];

//     users.forEach(user => {
//       user.predictions.forEach(pred => {
//         allPredictions.push({
//           userName: user.name,
//           email: user.email,
//           role: pred.role,
//           accuracy: pred.acc,     // 👈 matches frontend
//           company: pred.company,
//           date: pred.date
//         });
//       });
//     });

//     res.json(allPredictions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch predictions" });
//   }
// });

// module.exports = router;
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./User");

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

/* ================= VERIFY ADMIN ================= */
const verifyAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

/* ================= GET ALL PREDICTIONS ================= */
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find(
      { predictions: { $exists: true, $ne: [] } },
      "name email predictions"
    );

    const allPredictions = [];

    users.forEach(user => {
      user.predictions.forEach(pred => {
        allPredictions.push({
          userId: user._id,
          predictionId: pred._id,
          userName: user.name,
          email: user.email,
          role: pred.role,
          accuracy: pred.acc,
          company: pred.company,
          date: pred.date,
          flagged: pred.flagged || false
        });
      });
    });

    res.json(allPredictions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch predictions" });
  }
});

/* ================= GET FLAGGED ONLY ================= */
router.get("/flagged", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find(
      { "predictions.flagged": true },
      "name email predictions"
    );

    const flagged = [];

    users.forEach(user => {
      user.predictions.forEach(pred => {
        if (pred.flagged) {
          flagged.push({
            userId: user._id,
            predictionId: pred._id,
            userName: user.name,
            email: user.email,
            role: pred.role,
            accuracy: pred.acc,
            company: pred.company,
            date: pred.date,
            flagged: true
          });
        }
      });
    });

    res.json(flagged);
  } catch {
    res.status(500).json({ message: "Failed to fetch flagged" });
  }
});

/* ================= FLAG ================= */
router.put("/flag", verifyToken, verifyAdmin, async (req, res) => {
  const { userId, predictionId } = req.body;

  const user = await User.findById(userId);
  const pred = user.predictions.id(predictionId);

  pred.flagged = true;
  await user.save();

  res.json({ message: "Flagged" });
});

/* ================= UNFLAG ================= */
router.put("/unflag", verifyToken, verifyAdmin, async (req, res) => {
  const { userId, predictionId } = req.body;

  const user = await User.findById(userId);
  const pred = user.predictions.id(predictionId);

  pred.flagged = false;
  await user.save();

  res.json({ message: "Unflagged" });
});

/* ================= DELETE ================= */
// router.delete("/delete", verifyToken, verifyAdmin, async (req, res) => {
//   const { userId, predictionId } = req.body;

//   const user = await User.findById(userId);
//   user.predictions = user.predictions.filter(
//     p => p._id.toString() !== predictionId
//   );

//   await user.save();
//   res.json({ message: "Deleted" });
// });
/* ================= DELETE PREDICTION ================= */
router.delete("/delete/:userId/:predictionId", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { userId, predictionId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.predictions = user.predictions.filter(
      p => p._id.toString() !== predictionId
    );

    await user.save();

    res.json({ message: "Prediction deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete prediction" });
  }
});


module.exports = router;

