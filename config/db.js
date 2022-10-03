const mongoose = require("mongoose");

const mongodbUri =
  "mongodb+srv://amrendra-quiz-timer:mnbvcxz@quiz-timer-database.cfotuau.mongodb.net/Questions?retryWrites=true&w=majority";

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
