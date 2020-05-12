const pool = require("../db/db");

//ROUTES subtopic
//create a subtopic
const createSubtopic = async (req, res) => {
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
  };
  
  //get all subtopics
  const getAllSubtopics = async (req,res)=>{
    try {
        const allSubtopics = await pool.query("SELECT * FROM subtopic");
        res.json(allSubtopics.rows);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //get a subtopic
  const getSubtopic = async(req,res)=>{
    try {
        const {id} = req.params;
        const subtopic = await pool.query("SELECT * FROM subtopic WHERE subtopic_id = $1",
        [id])
        res.json(subtopic.rows[0]);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //update a subtopic
  const updateSubtopic = async(req,res)=>{
    try {
        const {id} = req.params;
        const {subtopic_name, description} = req.body;
        const updateSubtopic = await pool.query("UPDATE subtopic SET subtopic_name = $1, description = $2 WHERE subtopic_id = $3",
        [subtopic_name,description, id]);
  
        res.json("Subtopic was updated !");
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //delete a subtopic
  const deleteSubtopic = async(req,res)=>{
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

  const getAllSubtopicTasks =  async (req,res)=>{
    try {
        const {id} = req.params;
        const allTasks = await pool.query("SELECT * FROM task Where  subtopic_id =  $1",[id]);
        res.json(allTasks.rows);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  module.exports= {
    createSubtopic,
    getAllSubtopics,
    getAllSubtopicTasks,
    getSubtopic,
    updateSubtopic,
    deleteSubtopic
  };