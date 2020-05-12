const express =require('express');
const {     createTask,    getAllTasks,     getTask,    updateTask,    deleteTask  } =require('../controllers/taskController');

const taskRouter = express.Router();

// bookings Routes
taskRouter.post('/tasks',  createTask);
taskRouter.get('/tasks',  getAllTasks);
taskRouter.get('/tasks/:id',  getTask);
taskRouter.delete('/tasks/:id', deleteTask);
taskRouter.put('/tasks/:id',updateTask);

module.exports = taskRouter;