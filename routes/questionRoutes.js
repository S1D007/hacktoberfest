const express = require("express");
const Question = require("../models/questionModel");
const { questionSchema } = require("../validators/questionValidators");
const validate = require("../middlewares/validateMiddleware");
const cors = require("cors")
const {
  addQuestion,
  getQuestions,
  getSingleQuestion,
  getQuestionsWithParam,
  practice,
  setCoinHistory,
  getCoinHistory
} = require("../controllers/questionController");
const route = express.Router();
route.use(cors())
route.post("/add-questions", validate(questionSchema), addQuestion);
route.get("/get-questions", getQuestions);
route.get("/get-single-question", getSingleQuestion);
route.get("/practice",practice)
route.get("/coin-history",setCoinHistory)
route.get("/coin-history-get",getCoinHistory)
const getRandomQuestions = async () => {
  const url = "https://opentdb.com/api.php?amount=100&type=multiple";
  const data = await axios.get(url);
  const res = data.data.results;
  res.map(
    async ({
      category,
      difficulty,
      correct_answer,
      incorrect_answers,
      question,
    }) => {
      const doc = new Question({
        category: category,
        level: difficulty,
        question: question,
        options: incorrect_answers,
        correctAnswer: correct_answer,
        price: Math.round(Math.random() * 10),
        prize: Math.round(Math.random() * 15 + 10),
      });
      await doc.save();
    }
  );
};
setInterval(() => {
  getRandomQuestions();
}, 3600000);

route.get("/get-question-with-params", getQuestionsWithParam);

module.exports = route;
