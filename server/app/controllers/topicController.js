const pool = require("../db/db");

//topic ROUTES
//create a todo
const createTopic = async (req, res) => {
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
  };
  
  //get all topics
  const getAllTopics = async (req,res)=>{
    try {
        const allTopics = await pool.query("SELECT * FROM topic ORDER BY topic_id");
        res.json(allTopics.rows);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //get all topic subtopics
  const getAllTopicSubtopics =  async (req,res)=>{
    try {
        const {id} = req.params;
        const allSubtopics = await pool.query("SELECT * FROM subtopic Where  topic_id =  $1",[id]);
        res.json(allSubtopics.rows);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //get a topic
  const getTopic = async(req,res)=>{
    try {
        const {id} = req.params;
        const topics = await pool.query("SELECT * FROM topic WHERE topic_id = $1",
        [id])
        res.json(topics.rows[0]);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //update a topic
  const updateTopic = async(req,res)=>{
    try {
        const {id} = req.params;
        const {topic_name, description} = req.body;
        const updateTopic = await pool.query("UPDATE topic SET topic_name = $1, description = $2 WHERE topic_id = $3",
        [topic_name,description, id]);
  
        res.json("Topic was updated !");
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //delete a topic
  const deleteTopic = async(req,res)=>{
    try {
        const {id} = req.params;
        //deletar todos os topicos e subtopicos relacionados ao tema
        const deleteTopic = await pool.query("DELETE FROM topic  WHERE topic_id = $1",
        [id]);
  
        res.json("Todo was deleted !");
  
    } catch(err){
        console.error(err.message);
  
    }
  };


  module.exports= {
    createTopic,
    getAllTopics,
    getAllTopicSubtopics,
    getTopic,
    updateTopic,
    deleteTopic
  };