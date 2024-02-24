const authController = require('./authController');
const errorController = require('./errorController');
const levelController = require('./levelController');
const quizController = require('./quizController');
const tagController = require('./tagController');
const userController = require('./userController');
const validator = require('../utils/validator');

module.exports = {
  authController,
  errorController,
  levelController,
  quizController,
  tagController,
  userController,
  validator,
}