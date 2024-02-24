const sequelize = require('./connexion');
const {DataTypes, Model} = require('sequelize');

class Quiz extends Model {};

Quiz.init(
  {
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    tableName: 'quiz'
  }
);

module.exports = Quiz;