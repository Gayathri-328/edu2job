// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// const statusFile = path.join(__dirname, "modelStatus.json");

// /* ================= RETRAIN MODEL ================= */
// router.post("/retrain", (req, res) => {
//   try {
//     const status = {
//       status: "training",
//       lastTrained: new Date().toISOString(),
//       datasetUsed: "latest_uploaded_dataset"
//     };

//     fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));

//     // Simulate training delay
//     setTimeout(() => {
//       status.status = "completed";
//       fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));
//     }, 3000);

//     res.json({
//       message: "Model retraining started",
//       status
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Retraining failed" });
//   }
// });

// /* ================= CHECK STATUS ================= */
// router.get("/status", (req, res) => {
//   const status = JSON.parse(fs.readFileSync(statusFile));
//   res.json(status);
// });

// module.exports = router;
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const router = express.Router();

/* ================= PATHS ================= */
const statusFile = path.join(__dirname, "../modelStatus.json");
const uploadDir = path.join(__dirname, "../uploads");

/* ================= ENSURE FILES EXIST ================= */
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

if (!fs.existsSync(statusFile)) {
  fs.writeFileSync(
    statusFile,
    JSON.stringify(
      {
        status: "idle",
        progress: 0,
        lastAccuracy: null,
        lastTrained: null,
        datasetUsed: null
      },
      null,
      2
    )
  );
}

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ================= UPLOAD DATASET ================= */
router.post("/upload", upload.single("dataset"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const status = JSON.parse(fs.readFileSync(statusFile));
  status.datasetUsed = req.file.filename;

  fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));

  res.json({
    message: "Dataset uploaded successfully",
    file: req.file.filename
  });
});

/* ================= RETRAIN MODEL ================= */
router.post("/retrain", (req, res) => {
  try {
    let status = {
      status: "training",
      progress: 0,
      lastAccuracy: null,
      lastTrained: new Date().toISOString(),
      datasetUsed: JSON.parse(fs.readFileSync(statusFile)).datasetUsed
    };

    fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));

    let progress = 0;

    const interval = setInterval(() => {
      progress += 20;
      status.progress = progress;

      if (progress >= 100) {
        clearInterval(interval);
        status.status = "completed";
        status.progress = 100;
        status.lastAccuracy = Math.floor(Math.random() * 10) + 90;
      }

      fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));
    }, 1000);

    res.json({
      message: "Model retraining started"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Retraining failed" });
  }
});

/* ================= CHECK STATUS ================= */
router.get("/status", (req, res) => {
  try {
    const status = JSON.parse(fs.readFileSync(statusFile));
    res.json(status);
  } catch (err) {
    res.status(500).json({ message: "Unable to read status" });
  }
});

module.exports = router;

