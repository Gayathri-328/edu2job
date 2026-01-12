// // ================= IMPORTS =================
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const session = require("express-session");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("./User");

// // ================= APP INIT (MUST BE HERE) =================
// const app = express();

// // ================= CONFIG =================
// const JWT_SECRET = "secretkey";

// const GOOGLE_CLIENT_ID =
//   "88423294586-pfcicpqnuu22hhvt189g5jl41mpon9ka.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET =
//   "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";

// // ================= MIDDLEWARE =================
// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// // ================= ROUTES (AFTER app INIT) =================
// app.use("/api/auth", require("./routes/auth"));
// // app.use("/api/auth", require("./routes/auth"));

// app.use("/api/predictions", require("./routes/prediction"));
// app.use("/api/charts", require("./routes/charts"));
// app.use("/dashboard", require("./routes/dashboard"));
// app.use("/api/predictions", require("./routes/prediction"));
// app.use("/api/admin/dataset", require("./datasets/adminDataset"));
// app.use("/api/admin/model", require("./datasets/adminModel"));



// // ================= SESSION (Google Auth) =================
// app.use(
//   session({
//     secret: "edu2job_session_secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // ================= PASSPORT =================
// app.use(passport.initialize());
// app.use(passport.session());

// // ================= TEST ROUTE =================
// app.get("/test", (req, res) => {
//   res.send("✅ Servers.js is running correctly");
// });

// // ================= GOOGLE STRATEGY =================
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value || "";
//         const name = profile.displayName || "Google User";

//         let user = await User.findOne({ email });

//         if (!user) {
//           user = new User({
//             name,
//             email,
//             password: "",
//             degree: "",
//             specialization: "",
//             cgpa: "",
//             certifications: "",
//           });
//           await user.save();
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// // ================= MONGODB =================
// mongoose
//   .connect("mongodb://127.0.0.1:27017/edu2job")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error(err));

// // ================= REGISTER =================
// app.post("/register", async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       degree,
//       specialization,
//       cgpa,
//       certifications,
//     } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       degree,
//       specialization,
//       cgpa,
//       certifications,
//     });

//     await user.save();
//     res.json({ message: "Account created successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Account creation failed" });
//   }
// });

// // ================= LOGIN =================
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password || "");
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ token, user: { name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed" });
//   }
// });

// // ================= TOKEN MIDDLEWARE =================
// function verifyToken(req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token)
//     return res.status(401).json({ message: "No token provided" });

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err)
//       return res.status(401).json({ message: "Invalid token" });
//     req.userId = decoded.id;
//     next();
//   });
// }

// // ================= DASHBOARD =================
// app.get("/dashboard", verifyToken, async (req, res) => {
//   const user = await User.findById(req.userId).select("-password");
//   res.json(user);
// });

// // ================= UPDATE PROFILE =================
// app.post("/update", verifyToken, async (req, res) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.userId,
//     req.body,
//     { new: true }
//   ).select("-password");

//   res.json({ message: "Profile updated", user: updatedUser });
// });

// // ================= START SERVER =================
// app.listen(5000, () =>
//   console.log("✅ Server running on http://localhost:5000")
// );
// ================= IMPORTS =================
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const session = require("express-session");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("./User");

// // ================= APP INIT =================
// const app = express();

// // ================= CONFIG =================
// const JWT_SECRET = "secretkey";

// const GOOGLE_CLIENT_ID =
//   "88423294586-pfcicpqnuu22hhvt189g5jl41mpon9ka.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET =
//   "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";

// // ================= MIDDLEWARE =================
// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// // ================= ROUTES =================
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/predictions", require("./routes/prediction"));
// app.use("/api/charts", require("./routes/charts"));
// app.use("/dashboard", require("./routes/dashboard"));
// app.use("/api/admin/dataset", require("./datasets/adminDataset"));
// app.use("/api/admin/model", require("./datasets/adminModel"));

// // ================= SESSION =================
// app.use(
//   session({
//     secret: "edu2job_session_secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // ================= PASSPORT =================
// app.use(passport.initialize());
// app.use(passport.session());

// // ================= TEST =================
// app.get("/test", (req, res) => {
//   res.send("✅ Servers.js running");
// });

// // ================= GOOGLE STRATEGY =================
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value || "";
//         const name = profile.displayName || "Google User";

//         let user = await User.findOne({ email });

//         if (!user) {
//           user = new User({
//             name,
//             email,
//             password: "",
//             role: "user", // ✅ default
//           });
//           await user.save();
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => done(null, user._id));

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });

// // ================= MONGODB =================
// mongoose
//   .connect("mongodb://127.0.0.1:27017/edu2job")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(console.error);

// // ================= REGISTER =================
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: "user", // ✅ default user
//     });

//     await user.save();
//     res.json({ message: "Account created" });
//   } catch {
//     res.status(500).json({ message: "Register failed" });
//   }
// });

// // ================= LOGIN (IMPORTANT PART) =================
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "User not found" });
//     console.log("LOGIN USER ROLE:", user.role);


//     const isMatch = await bcrypt.compare(password, user.password || "");
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role }, // ✅ role inside token
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({
//       token,
//       user: {
//         name: user.name,
//         email: user.email,
//         role: user.role, // ✅ THIS IS THE KEY LINE
//       },
      
//     });
//   } catch {
//     res.status(500).json({ message: "Login failed" });
//   }
// });

// // ================= VERIFY TOKEN =================
// function verifyToken(req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token)
//     return res.status(401).json({ message: "No token" });

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err)
//       return res.status(401).json({ message: "Invalid token" });

//     req.userId = decoded.id;
//     req.role = decoded.role; // ✅ role available everywhere
//     next();
//   });
// }

// // ================= DASHBOARD =================
// app.get("/dashboard", verifyToken, async (req, res) => {
//   const user = await User.findById(req.userId).select("-password");
//   res.json(user);
// });

// // ================= UPDATE =================
// app.post("/update", verifyToken, async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.userId, req.body, {
//     new: true,
//   }).select("-password");

//   res.json({ message: "Updated", user });
// });

// // ================= START =================
// app.listen(5000, () =>
//   console.log("✅ Server running on http://localhost:5000")
// );
// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./User");
const adminModel = require("./routes/adminModel");


// ================= APP INIT =================
const app = express();

// ================= CONFIG =================
const JWT_SECRET = "secretkey";

const GOOGLE_CLIENT_ID =
  "88423294586-pfcicpqnuu22hhvt189g5jl41mpon9ka.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET =
  "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";

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ================= ROUTES =================
// ❌ IMPORTANT: DO NOT USE routes/auth.js
// app.use("/api/auth", require("./routes/auth"));

app.use("/api/predictions", require("./routes/prediction"));
app.use("/api/charts", require("./routes/charts"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/api/admin/dataset", require("./datasets/adminDataset"));
app.use("/api/admin/model", require("./routes/adminModel"));
// app.use("/api/admin/predictions", require("./adminPredictions"));
// app.use("/api/admin/predictions", require("./routes/adminPredictions"));
app.use("/api/admin/predictions", require("./adminPredictions"));
app.use("/api/feedback", require("./routes/feedback"));





// ================= SESSION =================
app.use(
  session({
    secret: "edu2job_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());

// ================= GOOGLE LOGIN =================
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;

        let user = await User.findOne({ email });

        if (!user) {
          user = new User({
            name,
            email,
            password: "",
            role: "user",
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// ================= MONGODB =================
mongoose
  .connect("mongodb://127.0.0.1:27017/edu2job")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("REGISTER:", email);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = email === "admin@gmail.com" ? "admin" : "user";

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.json({ message: "Account created successfully!" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Account creation failed" });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Password login not allowed for Google account",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("LOGIN USER ROLE:", user.role);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

// ================= TOKEN MIDDLEWARE =================
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
}

// ================= ADMIN CHECK =================
function verifyAdmin(req, res, next) {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
}

// ================= DASHBOARD =================
app.get("/dashboard", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// ================= UPDATE PROFILE =================
app.post("/update", verifyToken, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    req.body,
    { new: true }
  ).select("-password");

  res.json({ message: "Profile updated", user: updatedUser });
});

// ================= ADMIN TEST =================
app.get("/api/admin/test", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "✅ Admin access confirmed" });
});

// ================= START SERVER =================
app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);

