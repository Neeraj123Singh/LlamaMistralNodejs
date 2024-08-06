const { DataTypes , Sequelize} = require('sequelize');
const sequelize = new Sequelize('conversation', 'postgres', 'postgres', {
  host: 'database',
  dialect: 'postgres'
});
const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  query: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Conversation;
