const pool = require("../db/db");


//theme ROUTES
//create a todo
const createTheme= async (req, res) => {
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
  };
  
  //get all themes
  const getAllThemes =  async (req,res)=>{
    try {
        const allThemes = await pool.query("SELECT * FROM theme  ORDER BY theme_id");
        res.json(allThemes.rows);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  
  //get all theme topics
  const getAllThemeTopics = async (req,res)=>{
    try {
        const {id} = req.params;
        const allTopics = await pool.query("SELECT * FROM topic WHERE  theme_id =  $1 ORDER BY topic_id",[id]);
        res.json(allTopics.rows);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //get a todo
  const getTheme =  async(req,res)=>{
    try {
        const {id} = req.params;
        const theme = await pool.query("SELECT * FROM theme WHERE theme_id = $1",
        [id])
        res.json(theme.rows[0]);
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //update a theme
  const updateTheme = async(req,res)=>{
    try {
        const {id} = req.params;
        const {theme_name} = req.body;
        const updateTheme = await pool.query("UPDATE theme SET theme_name = $1 WHERE theme_id = $2",
        [theme_name,id]);
  
        res.json("Theme was updated !");
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  //delete a theme
  const deleteTheme =  async(req,res)=>{
    try {
        const {id} = req.params;
        //deletar todos os topicos e subtopicos relacionados ao tema
        const deleteTheme = await pool.query("DELETE FROM theme  WHERE theme_id = $1",
        [id]);
  
        res.json("Todo was deleted !");
  
    } catch(err){
        console.error(err.message);
  
    }
  };
  
  module.exports= {
    createTheme,
    getAllThemes,
    getAllThemeTopics,
    getTheme,
    updateTheme,
    deleteTheme
  };