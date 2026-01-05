const express = require("express");
const User = require("../User");

const router = express.Router();

/* =================================================
   CHART 1: BRANCH → JOB ROLE (BAR CHART DATA)
   Example: CSE → Software Engineer : 5
================================================== */
router.get("/branch-vs-role", async (req, res) => {
  try {
    const users = await User.find();

    const result = [];

    users.forEach((user) => {
      if (!user.branch || !user.predictions) return;

      user.predictions.forEach((pred) => {
        result.push({
          branch: user.branch,
          role: pred.role
        });
      });
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load branch vs role data" });
  }
});

/* =================================================
   CHART 2: JOB DOMAIN DISTRIBUTION (PIE CHART DATA)
================================================== */
router.get("/domain-distribution", async (req, res) => {
  try {
    const users = await User.find();

    const domainCount = {};

    users.forEach((user) => {
      if (!user.predictions) return;

      user.predictions.forEach((pred) => {
        domainCount[pred.role] = (domainCount[pred.role] || 0) + 1;
      });
    });

    res.json(domainCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load domain data" });
  }
});

module.exports = router;
