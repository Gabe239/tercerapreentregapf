export default class ProductsRepository {
  constructor(dao) {
    this.productManager = dao;
  }

  async addProduct(title, description, price, thumbnail, code, stock, category, availability) {
    try {
      await this.productManager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        availability
      );

      console.log('Product has been added successfully.');
    } catch (err) {
      throw err;
    }
  }

  async getProducts(query, sort, limit, startIndex, category, availability) {
    try {
      const products = await this.productManager.getProducts(
        query,
        sort,
        limit,
        startIndex,
        category,
        availability
      );

      return products;
    } catch (err) {
      throw err;
    }
  }

  async getProductsCount(query) {
    try {
      const count = await this.productManager.getProductsCount(query);
      return count;
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id) {
    try {
      const product = await this.productManager.getProductById(id);
      return product;
    } catch (err) {
      throw err;
    }
  }

  async updateProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    availability,
    id
  ) {
    try {
      await this.productManager.updateProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        availability,
        id
      );

      console.log('Product has been updated successfully.');
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id) {
    try {
      await this.productManager.deleteProduct(id);
      console.log('Product has been deleted successfully.');
    } catch (err) {
      throw err;
    }
  }

  async getProductsPage(limit, page) {
    try {
      const result = await this.productManager.getProductsPage(limit, page);
      return result;
    } catch (err) {
      throw err;
    }
  }
}