/* 
            This is the Entry poin File of Express And Node Server
*/
// Imports 
const express = require("express")
const Router = require(__dirname+"/Router/routes.js") 
const Database = require("./Database/Database")
const app = express()
const fs = require('fs')
const path = require("path")
const cors = require("cors")
// Using Middlewares
const https = require("https")
app.use(cors())
app.use(Router)
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const Port = 1111

// at "localhost:port'/' "
app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//const options = {
  //  key: fs.readFileSync("server.key"),
    //cert: fs.readFileSync("server.cert"),
  //};
 //Init of app
app.listen(Port,(e)=>{
    console.log(`App is running on Port ${Port} Link: http://localhost:${Port}/`)

     if (e) console.log(`An occured due to the following Reasons \n
         ${e}
     `)
 })
//https.createServer(options, app)
//.listen(Port, function (req, res) {
//  console.log("Server started at port 3000");
//});
