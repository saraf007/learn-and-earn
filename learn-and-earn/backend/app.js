const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Question = require('./models/question');

const app = express();

mongoose.connect("mongodb+srv://vikas:LiIbT8TMflJyyuj7@cluster0.tpmfq.mongodb.net/learn-and-earn?retryWrites=true&w=majority")
            .then(() => {
                console.log("Connected to database!");
            })
            .catch(() => {
                console.log("Connection failed!");
            });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

/** POST: add questions */
app.post("/api/questions", (req, res, next) => {
    const question = new Question({
        question: req.body.question,
        answer: req.body.answer
    });
    question.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

/** GET: fetch questions and answers */
app.get('/api/questions',(req,res, next) => {
  Question.find().then(documents => {
        console.log(documents);
        res.status(200).json(
            {
                message: 'Questions fetched successfully',
                questions: documents
            }
        );
    });
});

/** DELETE: delete questions and answers */
app.delete('/api/questions/:id',(req, res, next) => {
  Question.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json(
      {
        message : 'question and answer deleted!'
      }
    )
  })
});

module.exports = app;
