import { IProduct } from "../models/ProductModel";

// Define the ProductService interface
export interface IProductService {
  // Create a new product
  createProduct(
    name: string,
    description: string | null,
    price: number
  ): Promise<IProduct>;

  // Get all products
  getAllProducts(
    filters: { name?: string; minPrice?: number; maxPrice?: number },
    pagination: { page: number; size: number },
    sort: { field: keyof IProduct; direction: "asc" | "desc" }
  ): Promise<{ data: IProduct[]; total: number }>;

  // Update a product
  updateProduct(
    productId: string,
    updates: Partial<Pick<IProduct, "name" | "description" | "price">>
  ): Promise<IProduct | null>;

  // Delete a product
  deleteProduct(productId: string): Promise<void>;
}
