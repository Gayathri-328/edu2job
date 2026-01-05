const jwt = require("jsonwebtoken");
const User = require("../User");

const JWT_SECRET = "secretkey";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Role check
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    // Pass admin user forward
    req.admin = user;
    next();

  } catch (err) {
    console.error("Admin Auth Error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = adminAuth;
