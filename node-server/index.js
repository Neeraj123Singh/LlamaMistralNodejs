const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize('conversation', 'postgres', 'postgres', {
  host: 'database',
  dialect: 'postgres'
});

app.use('/conversations', conversationRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Node.js server is running on port 3000');
  });
});

module.exports = { sequelize };
