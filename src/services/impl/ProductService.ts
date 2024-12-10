import mongoose from "mongoose";
import Product, { IProduct } from "../../models/productModel";
import { IProductService } from "../IProductService";

class ProductService implements IProductService {
  // Create a new product
  async createProduct(
    name: string,
    description: string | null,
    price: number
  ): Promise<IProduct> {
    try {
      // Check if a product with the same name already exists
      const existingProduct = await Product.findOne({ name });
      if (existingProduct) {
        throw new Error(`Product with name "${name}" already exists.`);
      }

      // Create product
      const product = new Product({ name, description, price });

      // Save product
      return await product.save();
    } catch (error: any) {
      // Throw error
      throw new Error(
        error.message || "Error creating product. Please try again."
      );
    }
  }

  // Get all products with filtering by name and price, pagination, and sorting
  async getAllProducts(
    filters: { name?: string; price?: number },
    pagination: { page: number; size: number },
    sort: { field: keyof IProduct; direction: "asc" | "desc" }
  ): Promise<{ data: IProduct[]; total: number; pagination: any; sort: any }> {
    try {
      // Destructure request query
      const { name, price } = filters;
      const { page, size } = pagination;
      const { field, direction } = sort;

      // Construct filters
      const query: any = {};

      // Apply filters
      if (name) {
        query.name = { $regex: name, $options: "i" }; // Case-insensitive match
      }

      // Apply filters for price (treated like a "string")
      if (price !== undefined) {
        query.$expr = {
          $regexMatch: {
            input: { $toString: "$price" }, // Convert price field to string
            regex: `^${price}`, // Regex for price search
          },
        };
      }

      // Count total matching documents
      const total = await Product.countDocuments(query);

      // Sort direction
      const sortDirection =
        direction === "asc" ? 1 : direction === "desc" ? -1 : (0 as any);

      // Fetch paginated, sorted results
      const data = await Product.find(query)
        .sort({ [field]: sortDirection }) // Sort direction
        .skip((page - 1) * size) // Pagination offset
        .limit(size); // Pagination limit

      // Return data
      return { data, total, pagination, sort };
    } catch (error: any) {
      // Throw error
      throw new Error(
        error.message || "Error fetching products. Please try again."
      );
    }
  }

  // Update a product by ID
  async updateProduct(
    productId: string,
    updates: Partial<Pick<IProduct, "name" | "description" | "price">>
  ): Promise<IProduct | null> {
    try {
      //  Validate if productId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Product not found.");
      }

      // Find the product
      const product = await Product.findById(productId);

      // Check if product exists
      if (!product) {
        throw new Error("Product not found.");
      }

      // Check if a product with the same name (other than the current product) already exists
      if (updates.name) {
        const existingProduct = await Product.findOne({
          name: updates.name,
          _id: { $ne: productId }, // Ensure we're not matching the product being updated
        });
        if (existingProduct) {
          throw new Error(
            `Product with name "${updates.name}" already exists.`
          );
        }
      }

      // Update product and check if it exists
      return await Product.findByIdAndUpdate(productId, updates, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      });
    } catch (error: any) {
      // Throw error
      throw new Error(
        error.message || "Error updating product. Please try again."
      );
    }
  }

  // Delete a product by ID
  async deleteProduct(productId: string): Promise<void> {
    try {
      //  Validate if productId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error("Product not found.");
      }

      // Find the product
      const product = await Product.findById(productId);

      // Check if product exists
      if (!product) {
        throw new Error("Product not found.");
      }

      // Delete product
      const result = await Product.findByIdAndDelete(productId);
      if (!result) {
        throw new Error("Product not found.");
      }
    } catch (error: any) {
      // Throw error
      throw new Error(
        error.message || "Error deleting product. Please try again."
      );
    }
  }
}

export default new ProductService();
