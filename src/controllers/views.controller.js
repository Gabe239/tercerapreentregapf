import ProductManager from '../dao/managers/ProductManagerDb.js';
import CartManager from '../dao/managers/CartManagerDb.js';
import UserDTO from '../dto/user.dto.js';

const productManager = new ProductManager();
const cartManager = new CartManager();

export const renderHome = async (req, res) => {
  try {
      const products = await productManager.getProducts();
      const user = req.session.user;

      if (!user) {
          return res.render('home', {
              user: null,
              products: products,
          });
      }

      res.render('home', {
          user: new UserDTO(user),
          products: products,
      });
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Error fetching products');
  }
};

export const renderRealTimeProducts = async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {
      title: 'Real Time Products',
      products: products,
    });
  } catch (error) {
    console.error('Error fetching real-time products:', error);
    res.status(500).send('Error fetching real-time products');
  }
};

export const renderProductsPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const { products, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await productManager.getProductsPage(
      limit,
      page
    );

    res.render('products', {
      products,
      currentPage: page,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage
    });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send('Error retrieving products');
  }
};

export const addToCart = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await productManager.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cart = await cartManager.createCart();
    await cartManager.addProductToCart(cart._id, productId);

    console.log(cart);

    return res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ error: 'Error adding product to cart' });
  }
};

export const renderCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);

    if (cart) {
      return res.render('carts', { cartId: cartId, products: cart.products });
    } else {
      return res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return res.status(500).json({ error: 'Error retrieving cart' });
  }
};

export const renderChat = (req, res) => {
  res.render('chat');
};

export const renderRegister = (req, res) => {
  res.render('register');
};

export const renderLogin = (req, res) => {
  res.render('login');
};