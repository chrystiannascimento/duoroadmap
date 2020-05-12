import themeRoute from './app/routes/themeRoute';
import topicRoute from './app/routes/topicRoute';
import subtopicRoute from './app/routes/subtopicRoute';
import taskRoute from './app/routes/taskRoute';
import express from 'express';
import cors from 'cors';

const app=express();


//middleware
app.use(cors());
app.use(express.json());//req.body

//ROUTES
app.use('',themeRoute);
app.use('',topicRoute);
app.use('',subtopicRoute);
app.use('',taskRoute);

// starting server
app.listen(5000, () => {
    console.log("server has started on port 5000");
  });