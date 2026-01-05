const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../User");

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "secretkey"); // same secret as login
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// GET profile
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// POST update profile
router.post("/update", verifyToken, async (req, res) => {
  try {
    const { name, email, degree, specialization, cgpa, certifications } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, email, degree, specialization, cgpa, certifications },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});
// SAVE job prediction
router.post("/prediction", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    user.predictions.unshift(req.body);   // add latest prediction
    await user.save();

    res.json({ message: "Prediction saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save prediction" });
  }
});

// GET prediction history
router.get("/prediction", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.predictions);
  } catch (err) {
    res.status(500).json({ message: "Failed to load predictions" });
  }
});


module.exports = router;
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../User");

// const router = express.Router();

// /* ================= VERIFY TOKEN ================= */
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   // Expect: Bearer <token>
//   const parts = authHeader.split(" ");
//   if (parts.length !== 2) {
//     return res.status(401).json({ message: "Token format invalid" });
//   }

//   const token = parts[1];

//   try {
//     const decoded = jwt.verify(token, "secretkey");
//     req.userId = decoded.id;
//     req.role = decoded.role; // keep for admin consistency
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// /* ================= GET PROFILE ================= */
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch user" });
//   }
// });

// /* ================= UPDATE PROFILE ================= */
// router.post("/update", verifyToken, async (req, res) => {
//   try {
//     const { name, email, degree, specialization, cgpa, certifications } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       { name, email, degree, specialization, cgpa, certifications },
//       { new: true }
//     ).select("-password");

//     res.json({ message: "Profile updated successfully", user: updatedUser });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update profile" });
//   }
// });

// /* ================= SAVE JOB PREDICTION ================= */
// router.post("/prediction", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);

//     user.predictions.unshift(req.body); // save prediction
//     await user.save();

//     res.json({ message: "Prediction saved successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to save prediction" });
//   }
// });

// /* ================= GET PREDICTION HISTORY ================= */
// router.get("/prediction", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);
//     res.json(user.predictions);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to load predictions" });
//   }
// });

// module.exports = router;
