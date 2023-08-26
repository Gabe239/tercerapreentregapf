import DaoFactory from '../dao/factory.js';
import ProductsRepository from './products.repository.js';
import CartsRepository from './carts.repository.js';
import MessagesRepository from './messages.repository.js';

const productsDao = DaoFactory.getProductsDao();
const cartsDao = DaoFactory.getCartsDao();
const messagesDao = DaoFactory.getMessagesDao();

const productsRepository = new ProductsRepository(productsDao);
const cartsRepository = new CartsRepository(cartsDao);
const messagesRepository = new MessagesRepository(messagesDao);

export default {
  productsRepository,
  cartsRepository,
  messagesRepository,
};