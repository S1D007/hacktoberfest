const express = require("express");
const path = require("path");
const cors = require("cors");

const connectToDatabase = require("./config/db");
const questionRoutes = require("./routes/questionRoutes.js");

connectToDatabase();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:8100'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  return next();
});
// app.use(cors({
//   origin: 'http://localhost:8100'
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(questionRoutes);

/**
 * @route   GET /
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

const port = 1111 || process.env.PORT;

app.listen(port, (error) => {
  if (error)
    return console.log(`An occured due to the following Reasons \n
         ${error}
     `);

  console.log(`App is running on Port ${port} Link: http://localhost:${port}/`);
});
