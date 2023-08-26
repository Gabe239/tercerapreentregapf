import ProductsMongo from './managers/ProductManagerDb.js';
import ProductsMemory from './managers/ProductManagerFs.js';
import CartsMongo from './managers/CartManagerDb.js';
import CartsMemory from './managers/CartManagerFs.js';
import MessagesMongo from './managers/MessageManagerDb.js';

import config from '../config/env-config.js';

const persistence = config.persistence;
export default class DaoFactory {
  static getProductsDao() {
    const dao = persistence || 'mongo';
    switch (dao) {
      case 'mongo':
        return new ProductsMongo();
      case 'memory':
        return new ProductsMemory();
      default:
        return new ProductsMongo();
    }
  }

  static getCartsDao() {
    const dao = persistence || 'mongo';
    switch (dao) {
      case 'mongo':
        return new CartsMongo();
      case 'memory':
        return new CartsMemory();
      default:
        return new CartsMongo();
    }
  }

  static getMessagesDao() {
    const dao = persistence || 'mongo';
    switch (dao) {
      case 'mongo':
        return new MessagesMongo();
      default:
        return new MessagesMongo();
    }
  }
}
