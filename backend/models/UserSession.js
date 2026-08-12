const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // From Clerk or Fayda eKYC
  formTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: 'FormTemplate', required: true },
  status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED', 'ABANDONED'], default: 'IN_PROGRESS' },
  language: { type: String, enum: ['am', 'om', 'en'], default: 'am' },
  collectedData: { 
    type: Map, 
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  currentMissingField: { type: String }, // The field we are currently asking the user about
  audioTranscriptLogs: [{
    text: String,
    timestamp: { type: Date, default: Date.now },
    speaker: { type: String, enum: ['USER', 'AGENT'] }
  }],
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
