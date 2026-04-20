// 1. IMPORT FIRST
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// 👇 ADD THIS LINE HERE
const User = require("./models/User");

// 2. CREATE APP
const app = express();

// 3. MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. CONNECT DATABASE (AFTER IMPORT)
mongoose.connect("mongodb://127.0.0.1:27017/mydbNEW")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 5. ROUTE
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ ADD HERE ↓↓↓

app.post("/users", async (req, res) => {
  console.log("BODY:", req.body);   // 👈 ADD THIS LINE

  const { name, age, email } = req.body;
  if (!name || !age || !email) {
    return res.status(400).json({
      error: "name, age and email are required",
      received: req.body
    });
  }

  try {
    const user = new User({ name, age, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const user = await User.findById(req.params.id);
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});


// 👇 keep this at bottom(START SERVER)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
