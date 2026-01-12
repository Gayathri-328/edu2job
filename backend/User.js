// const mongoose = require("mongoose");

// const predictionSchema = new mongoose.Schema({
//   role: String,
//   acc: Number,
//   company: String,
//   date: { type: Date, default: Date.now }
// });

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, default: "" },

//   branch: String,
//   cgpa: String,
//   university: String,
//   graduationYear: String,
//   projects: String,
//   courses: String,
//   internships: String,
//   codingLevel: String,

//   predictions: [predictionSchema]  
//    // ✅ embedded predictions
// });

// module.exports = mongoose.model("User", userSchema);
// const mongoose = require("mongoose");

// const predictionSchema = new mongoose.Schema({
//   role: String,
//   acc: Number,
//   company: String,
//   date: { type: Date, default: Date.now }
// });

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, default: "" },

//   branch: String,
//   cgpa: String,
//   university: String,
//   graduationYear: String,
//   projects: String,
//   courses: String,
//   internships: String,
//   codingLevel: String,
  

//   predictions: [predictionSchema],   // existing

//   // ✅ STEP 1: ADMIN ROLE
//   role: {
//     type: String,
//     default: "user" // user | admin
    
//   }
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

/* ================= PREDICTION SCHEMA ================= */
const predictionSchema = new mongoose.Schema({
  role: String,
  acc: Number,
  company: String,
  date: {
    type: Date,
    default: Date.now
  },
  flagged: {
    type: Boolean,
    default: false
  }
});

/* ================= USER SCHEMA ================= */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: "" },

  branch: String,
  cgpa: String,
  university: String,
  graduationYear: String,
  projects: String,
  courses: String,
  internships: String,
  codingLevel: String,

  // 🔮 PREDICTIONS
  predictions: [predictionSchema],

  // ⭐ USER FEEDBACK (ADDED – FIXED POSITION)
  feedback: {
    rating: Number,
    comment: String,
    date: Date
  },

  // 👑 ROLE
  role: {
    type: String,
    default: "user" // user | admin
  }
});

module.exports = mongoose.model("User", userSchema);
