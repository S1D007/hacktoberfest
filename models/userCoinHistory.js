const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  data:{
    type: mongoose.Schema.Types.Array
  }
});


const UserCoinHistory = new mongoose.model("UserCoinHistory", UserSchema);
module.exports = UserCoinHistory;
