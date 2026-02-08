const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminroutes");
const app = express();
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);



// Middlewares
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// Serve frontend files (login.html, messages.html, dashboard.html sab yahin se milenge)
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Optional: Root pe kuch message ya redirect
// app.get("/", (req, res) => {
//   res.send("Server is running 🚀 <br> Admin login: <a href='/admin/login.html'>Click here</a>");
// });

// ← Yeh purana catch-all route comment kar do ya hata do
// app.get("*", ... );

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // console.log(`Admin login: http://localhost:${PORT}/admin/login.html`);
});
