import ProductModel, { IProduct } from "../models/ProductModel";

class ProductRepository {
  // Find a product by name
  async findByName(name: string): Promise<IProduct | null> {
    return await ProductModel.findOne({ name });
  }

  // Count the number of products matching a query for pagination
  async countDocuments(query: any): Promise<number> { 
    return await ProductModel.countDocuments(query);
  }

  // Find products by query with pagination
  async findByQuery(
    query: any,
    page: number,
    size: number,
    field: keyof IProduct,
    direction: "asc" | "desc"
  ): Promise<IProduct[]> {
    // Sort products
    const sortDirection = direction === "asc" ? 1 : -1;

    // Apply pagination
    return await ProductModel.find(query)
      .sort({ [field]: sortDirection })
      .skip((page - 1) * size)
      .limit(size);
  }

  // Find a product by ID
  async findById(productId: string): Promise<IProduct | null> {
    return await ProductModel.findById(productId);
  }

  // Create a new product
  async createProduct(productData: IProduct): Promise<IProduct> {
    const product = new ProductModel(productData);
    return await product.save();
  }

  // Update a product by ID
  async updateProduct(
    productId: string,
    updates: Partial<Pick<IProduct, "name" | "description" | "price">>
  ): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });
  }

  // Delete a product by ID
  async deleteProduct(productId: string): Promise<IProduct | null> {
    return await ProductModel.findByIdAndDelete(productId);
  }
}

export default new ProductRepository();
