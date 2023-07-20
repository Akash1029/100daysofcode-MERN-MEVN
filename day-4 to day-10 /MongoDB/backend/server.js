var express = require('express');
const cors = require("cors");
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const authRoute = require("./Routes/AuthRoute");
require("dotenv").config();
const { PORT } = process.env;

app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

// app.use("*", function(req, res) {
// res.send("Page not found");
// })