const express = require('express');
const router = express.Router();
const FormTemplate = require('../models/FormTemplate');
const UserSession = require('../models/UserSession');

// Get all available form templates (for the dashboard)
router.get('/templates', async (req, res) => {
  try {
    const templates = await FormTemplate.find({}, 'title category languageSupported');
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific form template by ID
router.get('/templates/:id', async (req, res) => {
  try {
    const template = await FormTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new form session for a user
router.post('/sessions', async (req, res) => {
  try {
    const { userId, formTemplateId, language } = req.body;
    
    // Find the template to determine the first missing field
    const template = await FormTemplate.findById(formTemplateId);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    
    const firstField = template.fields.length > 0 ? template.fields[0].fieldKey : null;

    const newSession = new UserSession({
      userId,
      formTemplateId,
      language,
      currentMissingField: firstField
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific user session
router.get('/sessions/:id', async (req, res) => {
  try {
    const session = await UserSession.findById(req.params.id).populate('formTemplateId');
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
