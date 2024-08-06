const axios = require('axios');
const Conversation = require('../models/Conversation');

exports.createConversation = async (req, res) => {
  const { model, query } = req.body;
  try {
    const response = await axios.post('http://python-server:5000/query', { model, question: query });
    const conversation = await Conversation.create({ model, query, response: response.data.answer });
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.findAll({ order: [['createdAt', 'DESC']] });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConversationById = async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.findByPk(id);
    if (conversation) {
      res.json(conversation);
    } else {
      res.status(404).json({ error: 'Conversation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
