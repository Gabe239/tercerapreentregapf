import Cart from '../models/cartModel.js';

class CartManager {
  constructor() {
  }


  async getCarts() {
    try {
      const carts = await Cart.find().populate('products.product').exec();
      return carts;
    } catch (err) {
      throw new Error('Error al obtener los carritos');
    }
  }

  async saveCarts(carts) {
    try {

      await Cart.deleteMany({});
      await Cart.insertMany(carts);
    } catch (err) {
      throw new Error('Error al guardar los carritos');
    }
  }

  async createCart() {
    try {
      const newCart = {
        email: '',
        products: []
      };
      const cart = new Cart(newCart);

      await cart.save();

      return cart;
    } catch (err) {
      console.error('Error creating cart:', err);
      throw new Error('Error creating cart');
    }
  }

  async createCartEmail(email) {
    try {
      const newCart = {
        email: email,
        products: []
      };
      const cart = new Cart(newCart);

      await cart.save();

      return cart;
    } catch (err) {
      console.error('Error creating cart:', err);
      throw new Error('Error creating cart');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await Cart.findOne({ _id: cartId }).populate('products.product').lean().exec();
      return cart;
    } catch (err) {
      throw new Error('Error retrieving cart');
    }
  }
  async addProductToCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }

      // Find the index of the product in the cart's products array
      const productIndex = cart.products.findIndex(productData => productData.product.toString() === productId);

      if (productIndex !== -1) {
        // If the product already exists, update its quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        cart.products.push({ product: productId, quantity: 1 });
      }
      await cart.save();

      return cart.products;
    } catch (err) {
      throw new Error('Error adding product to cart');
    }
  }

  async addProductToCartAndEmail(cartId, productId, email) {
    try {
      const cart = await Cart.findById(cartId);
      console.log(cart);
      if (!cart) {
        throw new Error('Cart not found');
      }
      cart= ({email: email});
      // Find the index of the product in the cart's products array
      const productIndex = cart.products.findIndex(productData => productData.product.toString() === productId);

      if (productIndex !== -1) {
        // If the product already exists, update its quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        cart.products.push({ product: productId, quantity: 1 });
      }

      console.log(cart);
      await cart.save();

      return cart.products;
    } catch (err) {
      throw new Error('Error adding product to cart');
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: productId } } },
        { new: true }
      ).populate('products.product');
      return cart;
    } catch (err) {
      throw new Error('Error al eliminar el producto del carrito');
    }
  }

  async updateCartProducts(cartId, products) {
    try {
      const cart = await Cart.findOneAndUpdate(
        { _id: cartId },
        { products: products },
        { new: true }
      ).populate('products.product');
      return cart;
    } catch (err) {
      throw new Error('Error al actualizar el carrito');
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findOneAndUpdate(
        { _id: cartId, 'products.product': productId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      ).populate('products.product');
      return cart;
    } catch (err) {
      throw new Error('Error al actualizar la cantidad del producto');
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await Cart.findOneAndUpdate(
        { _id: cartId },
        { products: [] },
        { new: true }
      ).populate('products.product');
      return cart;
    } catch (err) {
      throw new Error('Error al vaciar el carrito');
    }
  }

  async findCartByEmail(email) {
    try {
      const cart = await Cart.findOne({ email: email }).populate('products.product');
      return cart;
    } catch (err) {
      throw new Error('Error al encontrar el carrito');
    }
  }

  async updateCartEmail(cartId, email) {
    try {
      console.log('Updating cart email:', cartId, email);
      const cart = await Cart.findOneAndUpdate(
        { _id: cartId },
        { email: email },
        { new: true }
      );
      console.log('Updated cart:', cart); // Add this log
      return cart;
    } catch (err) {
      throw new Error('Error updating cart email');
    }
  }
}


export default CartManager;