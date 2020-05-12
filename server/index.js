
const express  = require("express");
const app=express();
const cors = require("cors");
const pool = require("./db");

const themeRouter = require("./app/routes/themeRoute");
const subtopicRouter = require("./app/routes/subtopicRoute");
const topicRouter = require("./app/routes/topicRoute");
const taskRouter = require("./app/routes/taskRoute");


//middleware
app.use(cors());
app.use(express.json());//req.body

//ROUTES
app.use('', themeRouter);
app.use('', subtopicRouter);
app.use('', topicRouter);
app.use('', taskRouter);

// starting server
app.listen(5000, () => {
    console.log("server has started on port 5000");
  });