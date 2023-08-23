import express from 'express';
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js';
import { adminAuthorize, userAuthorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', adminAuthorize, addProduct);
router.put('/:pid', adminAuthorize, updateProduct);
router.delete('/:pid', adminAuthorize, deleteProduct);

export default router;