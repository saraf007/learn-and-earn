const Question = require('../models/question');

// Create questions
exports.createQuestion = (req, res, next) => {
  const question = new Question({
      questionNumber: req.body.questionNumber,
      question: req.body.question,
      answer: req.body.answer
  });
  question.save();
  res.status(201).json({
      message: 'Question added successfully.'
  });
}

// GET all questions
exports.getAllQuestion = (req,res, next) => {
  Question.find().then(documents => {
        res.status(200).json(
            {
                message: 'Questions fetched successfully.',
                questions: documents
            }
        )
    });
}

// GET: fetch previous question and answer from a collection
exports.getPreviousQuestion = (req,res,next) => {
      Question.findOne({questionNumber: {$lt: req.params.questionNumber}})
        .then(document => {
          res.status(200).json({
            message: 'Previous question fetched successfully',
            questions: document
          });
        });
    }

// DELETE: delete questions and answers
exports.deleteQuestion = (req, res, next) => {
  Question.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json(
      {
        message : 'question and answer deleted!'
      }
    )
  })
}
