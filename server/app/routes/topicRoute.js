const express =require('express');
const {     createTopic,    getAllTopics,    getAllTopicSubtopics,    getTopic,    updateTopic,    deleteTopic  } =require('../controllers/topicController');

const topicRouter = express.Router();

// bookings Routes
topicRouter.post('/topics',  createTopic);
topicRouter.get('/topics',  getAllTopics);
topicRouter.get('/topics/:id',  getTopic);
topicRouter.get('/topics/:id/subtopics',  getAllTopicSubtopics);
topicRouter.delete('/topics/:id', deleteTopic);
topicRouter.put('/topics/:id',updateTopic);

module.exports = topicRouter;