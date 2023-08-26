import messagesRepository from '../repositories/index.js';
const messageManager = messagesRepository.messagesRepository;

export const retrieveMessages = async (req, res) => {
  try {
    const messages = await messageManager.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

export const saveMessage = async (req, res) => {
  const { user, message } = req.body;
  try {
    const newMessage = await messageManager.addMessage(user, message);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
};