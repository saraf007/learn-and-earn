const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  questionNumber: {type: Number, required: true},
  question: { type: String, required: true},
  answer: { type: [], required: true }
});

module.exports = mongoose.model('Question', questionSchema);
