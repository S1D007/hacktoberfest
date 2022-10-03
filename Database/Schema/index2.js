const mongoose = require("mongoose")
const UserInformation = require("../Models/index2")

/* Creating Schema for the Parameter's */

const UserSchema = mongoose.Schema({
    // Here type = Datatype, required = boolean true and false[true = this feild must be present in the req.body() otherwise it will give error, false = it is not necessary to add the corrosponding feild]
    questionsID:{
        type:mongoose.Schema.Types.Array
    },
    email:{
        type:"String",
        required:true
    }
})

UserSchema.methods.user = async function(next){
    const email = this.email
    const id = this.id
    const getUserInfo = await UserInformation.findOne({
        email
    })
    if(getUserInfo.email === email){
        const allID = [getUserInfo.questionsID,id]
        await UserInformation.updateOne({email},{
            $set:{
                questionsID:allID
            }
        })
        const getInfoAfterSaving = await UserInformation.findOne({email})
        const currID = getInfoAfterSaving.questionsID.flat()
        return currID
    }
}
module.exports = UserSchema