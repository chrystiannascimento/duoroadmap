const express  = require("express");
const app=express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());//req.body

//ROUTES

//theme ROUTES
//create a todo

app.post("/themes", async (req, res) => {
  try {
    const { theme_name, description } = req.body;
    const newTheme = await pool.query(
      "INSERT INTO theme (theme_name, description) VALUES($1, $2) RETURNING *",
      [theme_name, description]
    );

    res.json(newTheme.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all themes
app.get("/themes", async (req,res)=>{
  try {
      const allThemes = await pool.query("SELECT * FROM theme");
      res.json(allThemes.rows);

  } catch(err){
      console.error(err.message);

  }
});


//get all theme topics
app.get("/themes/:id/topics", async (req,res)=>{
  try {
      const {id} = req.params;
      const allTopics = await pool.query("SELECT * FROM topic WHERE  theme_id =  $1",[id]);
      res.json(allTopics.rows);

  } catch(err){
      console.error(err.message);

  }
});

//get a todo
app.get("/themes/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      const theme = await pool.query("SELECT * FROM theme WHERE theme_id = $1",
      [id])
      res.json(theme.rows[0]);

  } catch(err){
      console.error(err.message);

  }
});

//update a theme
app.put("/themes/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      const {theme_name} = req.body;
      const updateTheme = await pool.query("UPDATE theme SET theme_name = $1 WHERE theme_id = $2",
      [theme_name,id]);

      res.json("Theme was updated !");

  } catch(err){
      console.error(err.message);

  }
});

//delete a theme
app.delete("/themes/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      //deletar todos os topicos e subtopicos relacionados ao tema
      const deleteTheme = await pool.query("DELETE FROM theme  WHERE theme_id = $1",
      [id]);

      res.json("Todo was deleted !");

  } catch(err){
      console.error(err.message);

  }
});


//topic ROUTES
//create a todo

app.post("/topics", async (req, res) => {
  try {
    const { topic_name,theme_id ,  description } = req.body;
    const newTopic = await pool.query(
      "INSERT INTO topic (topic_name,theme_id, description) VALUES($1, $2, $3) RETURNING *",
      [topic_name, theme_id,description]
    );

    res.json(newTopic.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all topics
app.get("/topics", async (req,res)=>{
  try {
      const allTopics = await pool.query("SELECT * FROM topic ORDER BY topic_id");
      res.json(allTopics.rows);

  } catch(err){
      console.error(err.message);

  }
});

//get all topic subtopics
app.get("/topics/:id/subtopics", async (req,res)=>{
  try {
      const {id} = req.params;
      const allSubtopics = await pool.query("SELECT * FROM subtopic Where  topic_id =  $1",[id]);
      res.json(allSubtopics.rows);

  } catch(err){
      console.error(err.message);

  }
});

//get a topic
app.get("/topics/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      const topics = await pool.query("SELECT * FROM topic WHERE topic_id = $1",
      [id])
      res.json(topics.rows[0]);

  } catch(err){
      console.error(err.message);

  }
});

//update a topic
app.put("/topics/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      const {topic_name, description} = req.body;
      const updateTopic = await pool.query("UPDATE topic SET topic_name = $1, description = $2 WHERE topic_id = $3",
      [topic_name,description, id]);

      res.json("Topic was updated !");

  } catch(err){
      console.error(err.message);

  }
});

//delete a topic
app.delete("/topics/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      //deletar todos os topicos e subtopicos relacionados ao tema
      const deleteTopic = await pool.query("DELETE FROM topic  WHERE topic_id = $1",
      [id]);

      res.json("Todo was deleted !");

  } catch(err){
      console.error(err.message);

  }
});


//ROUTES subtopic
//create a subtopic

app.post("/subtopics", async (req, res) => {
  try {
    const { subtopic_name,theme_id ,topic_id,  description } = req.body;
    const newSubtopic = await pool.query(
      "INSERT INTO subtopic (subtopic_name,theme_id,topic_id, description) VALUES($1, $2, $3, $4) RETURNING *",
      [subtopic_name, theme_id,topic_id, description]
    );

    res.json(newSubtopic.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all subtopics
app.get("/subtopics", async (req,res)=>{
  try {
      const allSubtopics = await pool.query("SELECT * FROM subtopic");
      res.json(allSubtopics.rows);

  } catch(err){
      console.error(err.message);

  }
});

//get a subtopic
app.get("/subtopics/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      const subtopic = await pool.query("SELECT * FROM subtopic WHERE subtopic_id = $1",
      [id])
      res.json(subtopic.rows[0]);

  } catch(err){
      console.error(err.message);

  }
});

//update a subtopic
app.put("/subtopics/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      const {subtopic_name, description} = req.body;
      const updateSubtopic = await pool.query("UPDATE subtopic SET subtopic_name = $1, description = $2 WHERE theme_id = $3",
      [subtopic_name,description, id]);

      res.json("Subtopic was updated !");

  } catch(err){
      console.error(err.message);

  }
});

//delete a subtopic
app.delete("/subtopics/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      //deletar todos os topicos e subtopicos relacionados ao tema
      const deleteSubtopic = await pool.query("DELETE FROM subtopic  WHERE subtopic_id = $1",
      [id]);

      res.json("Subtopic was deleted !");

  } catch(err){
      console.error(err.message);

  }
});


//ROUTES tasks
//create a subtopic

app.post("/tasks", async (req, res) => {
  try {
    const { theme_id ,topic_id,  subtopic_id, description } = req.body;
    const newTask= await pool.query(
      "INSERT INTO task (theme_id,topic_id, subtopic_id, description) VALUES($1, $2, $3, $4) RETURNING *",
      [theme_id,topic_id,subtopic_id, description]
    );

    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all tasks
app.get("/tasks", async (req,res)=>{
  try {
      const allTasks = await pool.query("SELECT * FROM task");
      res.json(allTasks.rows);

  } catch(err){
      console.error(err.message);

  }
});

//get a task
app.get("/tasks/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      const task = await pool.query("SELECT * FROM task WHERE task_id = $1",
      [id])
      res.json(task.rows[0]);

  } catch(err){
      console.error(err.message);

  }
});

//update a task
app.put("/task/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      const {description} = req.body;
      const updateTask = await pool.query("UPDATE task SET description = $1 WHERE task_id = $2",
      [description, id]);

      res.json("Task was updated!");

  } catch(err){
      console.error(err.message);

  }
});

//delete a task
app.delete("/task/:id", async(req,res)=>{
  try {
      const {id} = req.params;
      //deletar todos os topicos e subtopicos relacionados ao tema
      const deleteSubtopic = await pool.query("DELETE FROM subtopic  WHERE subtopic_id = $1",
      [id]);

      res.json("Subtopic was deleted !");

  } catch(err){
      console.error(err.message);

  }
});


// starting server
app.listen(5000, () => {
    console.log("server has started on port 5000");
  });