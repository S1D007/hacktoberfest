const express = require("express");
const Question = require("../models/questionModel");
const {
  addQuestion,
  getQuestions,
  getSingleQuestion,
  getQuestionsWithParam,
} = require("../controllers/questionController");

const route = express.Router();

route.post("/add-questions", addQuestion);
route.get("/get-questions", getQuestions);
route.get("/get-single-question", getSingleQuestion);

const getRandomQuestions = async () => {
  const url = "https://opentdb.com/api.php?amount=1000&type=multiple";
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
