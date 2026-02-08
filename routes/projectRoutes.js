const express = require('express');
const router = express.Router();
const Project = require('../models/projects');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Add new project
router.post('/', async (req, res) => {
  try {
    const { title, tech, link } = req.body;
    const project = new Project({ title, tech, link });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;