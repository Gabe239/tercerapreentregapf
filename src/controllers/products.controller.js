import { productsRepository } from '../repositories/index.js';
import { io } from '../app.js';

const productManager = productsRepository

export const getProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort;
        const category = req.query.category; 
        const availability = req.query.availability; 
    
        let query = {};
    
        if (req.query.query) {
          query = { type: req.query.query };
        }
    
        const totalProducts = await productManager.getProductsCount(query);
        const totalPages = Math.ceil(totalProducts / limit);
        const startIndex = (page - 1) * limit;
    
        const products = await productManager.getProducts(
          query,
          sort,
          limit,
          startIndex,
          category,
          availability
        );
    
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevPage = hasPrevPage ? page - 1 : null;
        const prevLink = hasPrevPage
          ? `/api/products?page=${prevPage}&limit=${limit}&sort=${sort}&query=${req.query.query}&category=${category}&availability=${availability}`
          : null;
        const nextLink = hasNextPage
          ? `/api/products?page=${nextPage}&limit=${limit}&sort=${sort}&query=${req.query.query}&category=${category}&availability=${availability}`
          : null;
    
        const result = {
          status: 'success',
          payload: products,
          totalPages: totalPages,
          prevPage: prevPage,
          nextPage: nextPage,
          page: page,
          hasPrevPage: hasPrevPage,
          hasNextPage: hasNextPage,
          prevLink: prevLink,
          nextLink: nextLink,
        };
    
        return res.status(200).json(result);
      } catch (err) {
        return res.status(500).json({ error: 'Error al enviar los productos' });
      }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
    
        if (product) {
          return res.status(200).json(product);
        } else {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
      } catch (err) {
        return res.status(500).json({ error: 'Error al enviar los productos' });
      }
};

const validateProductData = (productData) => {
  const { title, description, price, thumbnail, code, stock, category, availability } = productData;

  if (!title || !description || !price || !thumbnail || !code || !stock || !category || !availability) {
    throw new Error('Faltan datos para completar la adición del producto');
  }

  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof thumbnail !== 'string' ||
    typeof price !== 'number' ||
    typeof code !== 'string' ||
    typeof stock !== 'number' ||
    typeof category !== 'string' ||
    typeof availability !== 'string'
  ) {
    throw new Error('Los datos proporcionados no son válidos para la adición del producto');
  }
};

export const addProduct = async (req, res) => {
  const newProduct = req.body;

  try {
    validateProductData(newProduct);

    await productManager.addProduct(newProduct);
    io.emit('product-added', newProduct);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: 'Error al agregar el producto' });
  }
};
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedProduct = req.body;
        const product = await productManager.getProductById(productId);
    
        if (product) {
          const { title, description, price, thumbnail, code, stock, category, availability} = updatedProduct;
          await productManager.updateProduct(
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            availability,
            productId
          );
          io.emit("product-updated", product);
          return res.status(200).json({ ...product, ...updatedProduct });
        } else {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el producto' });
      }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
    
        if (product) {
          await productManager.deleteProduct(productId);
          io.emit("product-deleted", product);
          return res.status(200).json(product);
        } else {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el producto' });
      }
};