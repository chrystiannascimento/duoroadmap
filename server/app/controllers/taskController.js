const pool = require("../db/db");

//ROUTES tasks
//create a subtopic
const createTask = async (req, res) => {
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
  };
  
  //get all tasks
  const getAllTasks = async (req,res)=>{
    try {
        const allTasks = await pool.query("SELECT * FROM task");
        res.json(allTasks.rows);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  

  //get a task
  const getTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const task = await pool.query("SELECT * FROM task WHERE task_id = $1",
        [id])
        res.json(task.rows[0]);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //update a task
  const updateTask = async(req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTask = await pool.query("UPDATE task SET description = $1 WHERE task_id = $2",
        [description, id]);
  
        res.json("Task was updated!");
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //delete a task
  const deleteTask = async(req,res)=>{
    try {
        const {id} = req.params;
        //deletar todos os topicos e subtopicos relacionados ao tema
        const deleteSubtopic = await pool.query("DELETE FROM subtopic  WHERE subtopic_id = $1",
        [id]);
  
        res.json("Subtopic was deleted !");
  
    } catch(err){
        console.error(err.message);
  
    }
};

module.exports= {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
  };