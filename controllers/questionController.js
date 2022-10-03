const Question = require("../models/questionModel");
const UserInformation = require("../models/userInfoModel");

module.exports.addQuestion = async (req, res) => {
  const { category, level, question, options, correctAnswer, price, prize } =
    req.body;
  /* Checking whether the following conditions are false
        if false then it will send the corrosponding Errors
    */
  if (!category) {
    res.send({
      error: "Category is Required *",
    });
  } else if (!question) {
    res.send({
      error: "Question is Required*",
    });
  } else if (!level) {
    res.send({
      error: "Level is Required*",
    });
  } else if (!options) {
    res.send({
      error: "options is Required*",
    });
  } else if (!correctAnswer) {
    res.send({
      error: "correctAnswer is Required*",
    });
  } else if (!price) {
    res.send({
      error: "price is Required*",
    });
  } else if (!prize) {
    res.send({
      error: "prize is Required*",
    });
  }

  const doc = new Question({
    category,
    level,
    question,
    options,
    correctAnswer,
    price,
    prize,
  });
  await doc.save();

  res
    .status(200)
    .send(
      "Succesfully Questions has been inserted go to \n '/getQuestions' to get the desired questions "
    );
};

module.exports.getQuestions = async (req, res) => {
  const { limit } = req.query;
  const data = await Question.find().limit(limit);
  const length = data.length;
  res.json({
    length,
    data,
  });
};

module.exports.getSingleQuestion = async (req, res) => {
  const { id } = req.query;
  const data = await Question.find({
    _id: id,
  });

  res.send(data);
};

module.exports.getQuestionsWithParam = async (req, res) => {
  const { category, level, limit, email } = req.query;

  let user = await UserInformation.findOne({ email });
  const questions = await Question.find({
    category,
    level,
    _id: { $nin: user?.questionsID || [] },
  }).limit(limit);
  res.send(questions);

  if (!user) user = new UserInformation({ questionsId: [], email });

  const ids = questions.map((question) => question._id.toString());
  user.questionsID.push(...ids);

  user.save();
};
