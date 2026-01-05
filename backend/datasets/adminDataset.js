const express = require("express");
const multer = require("multer");
const path = require("path");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "datasets/");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null, `dataset_${timestamp}.csv`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "text/csv") {
      cb(new Error("Only CSV files allowed"));
    }
    cb(null, true);
  }
});

/* ================= UPLOAD DATASET ================= */
router.post(
  "/upload",
  adminAuth,
  upload.single("dataset"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      res.json({
        message: "Dataset uploaded successfully",
        fileName: req.file.filename,
        uploadedBy: req.admin.email
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Dataset upload failed" });
    }
  }
);

module.exports = router;
