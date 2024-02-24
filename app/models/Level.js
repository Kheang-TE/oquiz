const sequelize = require('./connexion');
const {DataTypes, Model} = require('sequelize');

class Level extends Model {};

Level.init(
  {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: true,
        notNull: true,
      }
    }
  },
  {
    sequelize,
    tableName: 'level'
  }
);

module.exports = Level;