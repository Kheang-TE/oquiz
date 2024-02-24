const sequelize = require('./connexion');
const {DataTypes, Model} = require('sequelize');

class Question extends Model {};

Question.init(
  {
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    anecdote:{
      type: DataTypes.TEXT
    },
    wiki:{
      type: DataTypes.TEXT
    },
  },
  {
    sequelize,
    tableName: 'question'
  }
);

module.exports = Question;