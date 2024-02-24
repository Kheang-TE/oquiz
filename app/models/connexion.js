require('dotenv').config();

const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.PG_URL,{
  logging: false, // cache les logs dans la console
  define:{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

sequelize

module.exports = sequelize;