const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const statusFile = path.join(__dirname, "modelStatus.json");

/* ================= RETRAIN MODEL ================= */
router.post("/retrain", (req, res) => {
  try {
    const status = {
      status: "training",
      lastTrained: new Date().toISOString(),
      datasetUsed: "latest_uploaded_dataset"
    };

    fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));

    // Simulate training delay
    setTimeout(() => {
      status.status = "completed";
      fs.writeFileSync(statusFile, JSON.stringify(status, null, 2));
    }, 3000);

    res.json({
      message: "Model retraining started",
      status
    });

  } catch (err) {
    res.status(500).json({ message: "Retraining failed" });
  }
});

/* ================= CHECK STATUS ================= */
router.get("/status", (req, res) => {
  const status = JSON.parse(fs.readFileSync(statusFile));
  res.json(status);
});

module.exports = router;
