import Products from '../dao/factory.js';
import ProductsRepository from './products.repository.js';

const products = Products.getDao();
export const productsRepository = new ProductsRepository(products);
