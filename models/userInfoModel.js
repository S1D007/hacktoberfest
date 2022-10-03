const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  questionsID: {
    type: mongoose.Schema.Types.Array,
  },
  email: {
    type: String,
    required: true,
  },
});

UserSchema.methods.user = async function (next) {
  const email = this.email;
  const id = this.id;
  const getUserInfo = await UserInformation.findOne({
    email,
  });
  if (getUserInfo.email === email) {
    const allID = [getUserInfo.questionsID, id];
    await UserInformation.updateOne(
      { email },
      {
        $set: {
          questionsID: allID,
        },
      }
    );
    const getInfoAfterSaving = await UserInformation.findOne({ email });
    return getInfoAfterSaving.questionsID.flat();
  }
};

const UserInformation = new mongoose.model("UserInfo", UserSchema);
module.exports = UserInformation;
