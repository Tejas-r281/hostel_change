 const express = require("express");

 const app = express();

//  const db= require("./db/database");

 const cookieParser = require("cookie-parser");
 const bodyParser = require("body-parser");
 const path = require("path");


const errorMiddleware = require("./middleware/error");


 if (process.env.NODE_ENV !== "PRODUCTION") {
   require("dotenv").config({ path: "backend/config/config.env" });
 }
 app.use(express.json());
 app.use(cookieParser());
 app.use(bodyParser.urlencoded({ extended: true }));


 const user = require("./routes/userRoute");
const suggestion= require("./routes/suggestionRoute");

 app.use("/api/v1", user);
 app.use("/api/v1",suggestion);

 app.use(express.static(path.join(__dirname, "../frontend/build")));
 app.get("*", (req, res, next) =>
   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
 );



 app.use(errorMiddleware);

 module.exports = app;