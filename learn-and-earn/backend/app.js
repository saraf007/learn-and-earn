const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
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

app.use(cors(), (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use("/api/user", userRoutes);

/** GET: fetch first question and answer from a collection*/
app.use("/api/question", (req,res, next) => {
  Question.findOne().then(document => {
        res.status(200).json(
            {
                message: 'First question fetched successfully',
                questions: document
            }
        )
    });
  });

module.exports = app;
