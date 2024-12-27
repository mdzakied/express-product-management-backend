// Define ProductQueryParamsDTO interface
export interface ProductQueryParamsDTO {
  name?: string;
  price?: number;
  page: number;
  size: number;
  sort: string;
  direction: string;
}
