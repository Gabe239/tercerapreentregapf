import ProductsMongo from './managers/ProductManagerDb.js';
import ProductsMemory from './managers/ProductManagerFs.js';
import config from '../config/env-config.js';

const persistense = config.persistense;
export default class ProductsDaoFactory {
    constructor() {}

    static getDao() {
        const dao = persistense || 'mongo';
        switch (dao) {
            case 'mongo':
                return new ProductsMongo();
            case 'memory':
                return new ProductsMemory();
            default:
                return new ProductsMongo();
        }
    }
}