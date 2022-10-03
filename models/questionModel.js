const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: mongoose.Schema.Types.Array,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  prize: {
    type: Number,
    required: true,
  },
});

const Questions = new mongoose.model("Question", QuestionSchema);
module.exports = Questions;
