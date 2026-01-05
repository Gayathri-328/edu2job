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
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./User");

const router = express.Router();

/* ===== VERIFY TOKEN ===== */
const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token" });

  // ✅ Handle Bearer token
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

/* ===== VERIFY ADMIN ===== */
const verifyAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

/* ===== GET ALL USERS PREDICTIONS ===== */
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
          userName: user.name,
          email: user.email,
          role: pred.role,
          accuracy: pred.acc,     // 👈 matches frontend
          company: pred.company,
          date: pred.date
        });
      });
    });

    res.json(allPredictions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch predictions" });
  }
});

module.exports = router;
