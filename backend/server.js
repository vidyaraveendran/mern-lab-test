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

// 4. CONNECT DATABASE (AFTER IMPORT)
mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 5. ROUTE
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ ADD HERE ↓↓↓

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
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
