import express from 'express';
import {
  renderHome,
  renderRealTimeProducts,
  renderProductsPage,
  addToCart,
  renderCart,
  renderChat,
  renderRegister,
  renderLogin,
} from '../controllers/views.controller.js';

const router = express.Router();

router.get('/', renderHome);
router.get('/realtimeproducts', renderRealTimeProducts);
router.get('/products', renderProductsPage);
router.post('/products/:productId/add-to-cart', addToCart);
router.get('/cart/:cid', renderCart);
router.get('/chat', renderChat);
router.get('/register', renderRegister);
router.get('/login', renderLogin);

export default router;



