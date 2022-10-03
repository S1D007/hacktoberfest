const express = require("express");
const path = require("path");
const cors = require("cors");

const connectToDatabase = require("./config/db");
const Router = require("./Router/routes.js");

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Router);
const port = 1111 || process.env.PORT;

/**
 * @route   GET /
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, (error) => {
  if (error)
    return console.log(`An occured due to the following Reasons \n
         ${error}
     `);

  console.log(`App is running on Port ${port} Link: http://localhost:${port}/`);
});
