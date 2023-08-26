export default class MessageRepository {
    constructor(dao) {
        this.messageManager = dao;
    }

    async getMessages() {
        try {
            const messages = await this.messageManager.getMessages();
            return messages;
        } catch (error) {
            throw error;
        }
    }

    async addMessage(user, message) {
        try {
            const newMessage = await this.messageManager.addMessage(user, message);
            return newMessage;
        } catch (error) {
            throw error;
        }
    }
}
