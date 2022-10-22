const mongoose = require("mongoose");
const password = "ak1234567890"
const mongodbUri =
  `mongodb+srv://amrendra-quiz-timer:${password}@cluster0.s7fmjwi.mongodb.net/Questions?retryWrites=true&w=majority`;

const connectToDatabase = () => {
  mongoose
    .connect(mongodbUri)
    .then(() => {
      console.log("Connection Succesfull");
    })
    .catch((e) => {
      console.log(`Error Occured Because > \n 
    ${e.message}
    `);
    });
};

module.exports = connectToDatabase;
