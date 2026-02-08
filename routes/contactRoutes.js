const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// 1. Saare messages laane ke liye (GET)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({ createdAt: -1 }) // sabse naye pehle
      .select("name email message createdAt isRead");
    
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 2. Message ko read mark karne ke liye (PATCH)
router.patch("/:id/read", async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: { isRead: true } },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch('/read-all', async (req, res) => {
  try {
    await Contact.updateMany(
      { isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ message: "All messages marked as read" });
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

// 3. Naya contact message save karne ke liye (POST)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      msg: "Message saved successfully",
      data: newContact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Failed to save message",
    });
  }
});

module.exports = router;