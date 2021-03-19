const express = require('express');

const QuestionController = require("../controllers/question");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

/** POST: add questions and answers */
router.post("/api/questions", checkAuth, QuestionController.createQuestion);

/** GET: fetch all questions and answers */
router.get('/api/questions', QuestionController.getAllQuestion);

/**GET: fetch previous question and answer from a collection*/
router.get('/api/previousquestion/:questionNumber', QuestionController.getPreviousQuestion);

/** DELETE: delete questions and answers */
router.delete('/api/questions/:id', checkAuth, QuestionController.deleteQuestion);

module.exports = router;
