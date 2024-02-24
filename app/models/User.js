const sequelize = require('./connexion');
const {DataTypes, Model} = require('sequelize');

class User extends Model{};

User.init(
  {
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail:{
          msg: 'Email invalide'
        },
        notNull: true,
        notEmpty: true
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [3,255]
      }
    },
    firstname:{
      type: DataTypes.STRING
    },
    lastname:{
      type: DataTypes.STRING
    },
    role:{
      type: DataTypes.STRING,
      defaultValue: 'member'
    }
  },
  {
    sequelize,
    tableName: 'user'
  }
);

module.exports = User;