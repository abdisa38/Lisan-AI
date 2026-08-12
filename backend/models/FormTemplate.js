const mongoose = require('mongoose');

const FormTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Kebele Residence ID Renewal"
  category: { type: String, enum: ['Civic', 'Business', 'Tax', 'Education'] },
  languageSupported: { type: [String], default: ['am', 'om', 'en'] },
  fields: [{
    fieldKey: { type: String, required: true }, // e.g., "fullName"
    labelAmharic: { type: String, required: true }, // e.g., "ሙሉ ስም"
    labelOromoo: { type: String, required: true },  // e.g., "Maqaa Guutuu"
    voiceQuestionAmharic: { type: String },        // e.g., "እባክዎን ሙሉ ስምዎን ይናገሩ?"
    voiceQuestionOromoo: { type: String },         // e.g., "Moocharoo maqaa keessan guutuu dubbadhaa?"
    fieldType: { type: String, enum: ['text', 'number', 'date', 'select'], default: 'text' },
    isRequired: { type: Boolean, default: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FormTemplate', FormTemplateSchema);
