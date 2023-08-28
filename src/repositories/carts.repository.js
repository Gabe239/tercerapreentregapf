export default class CartsRepository {
  constructor(cartsdao) {
    this.cartsDao = cartsdao;
  }

  async getCarts() {
    try {
      const carts = await this.cartsDao.getCarts();
      return carts;
    } catch (err) {
      throw new Error('Error al obtener los carritos');
    }
  }

  async saveCarts(carts) {
    try {
      await this.cartsDao.saveCarts(carts);  
    } catch (err) {
      throw new Error('Error al guardar los carritos');
    }
  }

  async createCart() {
    try {
      const newCart = {
        products: []
      };
      const cart = await this.cartsDao.createCart(newCart);

      return cart;
    } catch (err) {
      console.error('Error creating cart:', err);
      throw new Error('Error creating cart');
    }
  }

  async createCartEmail(email) {
    try {
      const cart = await this.cartsDao.createCartEmail(email);

      return cart;
    } catch (err) {
      console.error('Error creating cart:', err);
      throw new Error('Error creating cart');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await this.cartsDao.getCartById(cartId);
      return cart;
    } catch (err) {
      throw new Error('Error retrieving cart');
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const products = await this.cartsDao.addProductToCart(cartId, productId);


      return products;
    } catch (err) {
      throw new Error('Error adding product to cart');
    }
  }

  async addProductToCartAndEmail(cartId, productId, email) {
    try {
      const products = await this.cartsDao.addProductToCart(cartId, productId, email);


      return products;
    } catch (err) {
      throw new Error('Error adding product to cart');
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await this.cartsDao.clearCart(cartId);
      return cart;
    } catch (err) {
      throw new Error('Error al vaciar el carrito');
    }
  }
  async findCartByEmail(email) {
    try {
      const cart = await this.cartsDao.findCartByEmail(email);
      return cart;
    } catch (err) {
      throw new Error('Error al encontrar el carrito');
    }
  }

  async updateCartEmail(cartId, email) {
    try {
      const cart = await this.cartsDao.updateCartEmail(cartId, email);
      return cart;
    }
    catch (err) {
      throw new Error('Error al actualizar el carrito');
    }
  }

  async updateCartProducts(cartId, products) {
    try {
      const cart = await this.cartsDao.updateCartProducts(cartId, products);
      return cart;
    }
    catch (err) {
      throw new Error('Error al actualizar el carrito');
    }
  }

}