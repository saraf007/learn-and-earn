const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: { type: String, required: true},
  answer: { type: [], required: true }
});

module.exports = mongoose.model('Question', questionSchema);
