const sequelize = require('./connexion');
const {DataTypes, Model} = require('sequelize');

class Tag extends Model {};

Tag.init(
  {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'tag'
  }
);

module.exports = Tag;