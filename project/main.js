//#region global imports
const DButils = require("./routes/utils/DButils");
const axios = require("axios");
const bcrypt = require("bcryptjs");
// require("dotenv").config();
require("dotenv").config({path: 'project/.env'})
//#endregion
//#region express configures
var express = require("express");
var path = require("path");
const session = require("client-sessions");
var logger = require("morgan");
var cors = require("cors");


const https = require('https');
const fs = require('fs');

const options = {
	key: fs.readFileSync('irony_cs_bgu_ac_il.key'), //('server.key'),
	cert: fs.readFileSync('irony_cs_bgu_ac_il.pem') //('server.cert')
};

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec     24 * 60 * 60 * 1000 // 120 * 60 * 1000
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false,
    },
    //the session will be extended by activeDuration milliseconds
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

// middleware to serve all the needed static files under the dist directory - loaded from the index.html file
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// const port = process.env.PORT || "3000";
const port = "443";
const host = "132.72.116.78";

const auth = require("./routes/auth");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const expressions = require("./routes/expressions")


//#endregion

//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});
//#endregion

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// ----> For cheking that our server is alive
app.get("/alive", (req, res) => res.send("I'm alive"));

// Routings

app.use("/posts", posts);
app.use("/comments", comments);
app.use("/expressions", expressions)

app.use(auth);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// const server = app.listen(port, () => {
//   console.log(`Server listen on port ${port}`);
// });


const server = https.createServer(options, app);
server.listen(port, host, () => {
  console.log("Server is running on https://%s:%s", host, port);
});
