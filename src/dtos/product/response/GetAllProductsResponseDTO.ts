import { ProductResponseDTO } from "./ProductResponseDTO";

// Define GetAllProductsResponseDTO interface
export interface GetAllProductsResponseDTO {
  data: ProductResponseDTO[];
  total: number;
  pagination: { page: number; size: number };
  sort: { field: string; direction: string };
}