const express =require('express');
const {     createTheme,    getAllThemes,    getAllThemeTopics,    getTheme,    updateTheme,    deleteTheme  } =require('../controllers/themeController');

const themeRouter = express.Router();

// bookings Routes
themeRouter.post('/themes',  createTheme);
themeRouter.get('/themes',  getAllThemes);
themeRouter.get('/themes/:id',  getTheme);
themeRouter.get('/themes/:id/topics',  getAllThemeTopics);
themeRouter.delete('/themes/:id', deleteTheme);
themeRouter.put('/themes/:id',updateTheme);

module.exports = themeRouter;