import messageModel from '../models/messageModel.js';

class messageManager {
  constructor() {
  }
  async getMessages() {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (error) {
      console.error('Error retrieving messages:', error);
      throw error;
    }
  }

  async addMessage(user, message) {
    try {
      const newMessage = new messageModel({
        user,
        message,
      });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }
};

export default messageManager;





