const express = require("express")
const Question = require("../Database/Models/index")
const UserInformation = require("../Database/Models/index2")
const route = express.Router()
const axios = require("axios")
route.use(express.json());
// Routes 

/* Add Question Route */
route.post("/add-questions", async (req, res) => {
    const { category, level, question, options, correctAnswer, price, prize } = req.body
    /* Checking whether the following conditions are false
        if false then it will send the corrosponding Errors
    */
    if (!category) {
        res.send({
            "error": "Category is Required *"
        })
    } else if (!question) {
        res.send({
            "error": "Question is Required*"
        })
    }
    else if (!level) {
        res.send({
            "error": "Level is Required*"
        })
    } else if (!options) {
        res.send({
            "error": "options is Required*"
        })
    } else if (!correctAnswer) {
        res.send({
            "error": "correctAnswer is Required*"
        })
    } else if (!price) {
        res.send({
            "error": "price is Required*"
        })
    } else if (!prize) {
        res.send({
            "error": "prize is Required*"
        })
    }

    const doc = new Question({
        category, level, question, options, correctAnswer, price, prize
    })
    await doc.save()

    res.status(200).send("Succesfully Questions has been inserted go to \n '/getQuestions' to get the desired questions ")

})

route.get('/get-questions', async (req, res) => {
    const { limit } = req.query
    const data = await Question.find().limit(limit)
    const length = data.length
    res.json({
        length,
        data
    })
})

route.get('/get-single-question', async (req, res) => {
    const { id } = req.query
    const data = await Question.find({
        _id: id
    })

    res.send(data)
})

const getRandomQuestions = async () => {
    const url = "https://opentdb.com/api.php?amount=1000&type=multiple"
    const data = await axios.get(url)
    const res = data.data.results
    res.map(async ({ category, difficulty, correct_answer, incorrect_answers, question }) => {
        const doc = new Question({
            category: category, level: difficulty, question: question, options: incorrect_answers, correctAnswer: correct_answer, price: Math.round(Math.random() * 10), prize: Math.round(Math.random() * 15 + 10)
        })
        await doc.save()
    })
}
setInterval(() => {
    getRandomQuestions()
}, 3600000)

// const delque = async() =>{
//     await Question.deleteMany({
//         __v:0
//     })
// }
// setInterval(()=>{
//     delque()
// },100)

route.get("/get-question-with-params", async (req, res) => {
    const { category, level, limit, email } = req.query
    const doc = await Question.find({
        category,
        level
    }).limit(limit)
    const id = []
    doc.map(({ _id }) => id.push(_id.toString()))
    const userInfo = await UserInformation.findOne({
        email
    })
    if (userInfo?.email === email) {
        const docFind = await UserInformation.findOne({
            email
        })
        const prevID = docFind.questionsID.flat()
        const allID = [...prevID,...id] 
        // const currID = [...allID]
        await UserInformation.updateOne({ email }, {
            $set: {
                questionsID: allID
            }
        })
        const docFindAfter = await UserInformation.findOne({
            email
        })
        const newID = docFindAfter.questionsID.flat()
        const docs = await Question.find({ _id: { $nin: newID } , category, level}).limit(limit)
        res.send(docs)
    } else {
        const docAdd = new UserInformation({
            questionsID: id,
            email
        })
        await docAdd.save()
        res.send(doc)
    }
    // res.send(docs)
})

route.get("/getGeoUQestions",async(req,res)=>{
    const doc = await Question.find({
        category:"Geography",
        level:"easy"
    })
    console.log(doc.length)
    res.send(doc)
})
module.exports = route

