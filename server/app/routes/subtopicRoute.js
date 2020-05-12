const express =require('express');
const {     createSubtopic,    getAllSubtopics,    getAllSubtopicTasks,    getSubtopic,    updateSubtopic,    deleteSubtopic  } =require('../controllers/subtopicController');

const subtopicRouter = express.Router();

// bookings Routes
subtopicRouter.post('/subtopics',  createSubtopic);
subtopicRouter.get('/subtopics',  getAllSubtopics);
subtopicRouter.get('/subtopics/:id',  getSubtopic);
subtopicRouter.get('/subtopics/:id/tasks',  getAllSubtopicTasks);
subtopicRouter.delete('/subtopics/:id', deleteSubtopic);
subtopicRouter.put('/subtopics/:id',updateSubtopic);

module.exports = subtopicRouter;