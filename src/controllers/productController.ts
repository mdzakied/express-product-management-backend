import { Request, Response } from "express";
import { IProduct } from "../models/ProductModel";
import ProductService from "../services/impl/ProductService";

import { CreateProductRequestDTO } from "../dtos/product/request/CreateProductRequestDTO";
import { UpdateProductRequestDTO } from "../dtos/product/request/UpdateProductRequestDTO";
import { ProductQueryParamsDTO } from "../dtos/product/request/ProductQueryParamsDTO";

import { ProductResponseDTO } from "../dtos/product/response/ProductResponseDTO";
import { GetAllProductsResponseDTO } from "../dtos/product/response/GetAllProductsResponseDTO";

// Create a new product
export const createProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Destructure request body
    const { name, description, price }: CreateProductRequestDTO = req.body;

    // Validate name and price
    if (!name || price === undefined) {
      return res.status(400).json({
        status: 400,
        message: "Name and price are required fields.",
      });
    }

    // Validate price
    if (price <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Price must be a greater than zero.",
      });
    }

    // Construct CreateProductRequestDTO
    const createProductDTO: CreateProductRequestDTO = {
      name,
      description,
      price,
    };

    // Create product
    const product = await ProductService.createProduct(
      createProductDTO.name,
      createProductDTO.description as string,
      createProductDTO.price
    );

    // Construct the response
    const productResponse: ProductResponseDTO = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };

    // Return the response
    return res.status(201).json({
      status: 201,
      message: "Product created successfully.",
      data: productResponse,
    });
  } catch (error: any) {
    // Check if the error is an instance of Error and cast it accordingly
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

// Get all products with filters, pagination, and sorting
export const getAllProductsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Destructure request query with default values and type assertion
    const {
      name,
      price,
      page = "1",
      size = "10",
      sort = "createdAt",
      direction = "desc",
    } = req.query;

    // Parse query parameters with fallback values
    const pageNumber = parseInt(page as string, 10) || 1;
    const sizeNumber = parseInt(size as string, 10) || 10;
    const field = sort as string;
    const order = direction as string;

    // Construct query params object with conditional price handling
    const queryParams: ProductQueryParamsDTO = {
      name: name as string,
      price: price ? Number(price) : undefined,
      page: pageNumber,
      size: sizeNumber,
      sort: field,
      direction: order,
    };

    // Construct filters (can be extended if needed)
    const filters = {
      name: queryParams.name,
      price: queryParams.price,
    };

    // Construct pagination and sorting parameters
    const pagination = { page: queryParams.page, size: queryParams.size };
    const sort_ = { field: queryParams.sort, direction: queryParams.direction };

    // Get products with filters, pagination, and sorting from service
    const result = await ProductService.getAllProducts(
      filters,
      pagination,
      sort_ as { field: keyof IProduct; direction: "asc" | "desc" }
    );

    // Construct the response
    const productsResponse: ProductResponseDTO[] = result.data.map(
      (product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
      })
    );

    // Construct the response pagination
    const response: GetAllProductsResponseDTO = {
      data: productsResponse,
      total: result.total,
      pagination: result.pagination,
      sort: result.sort,
    };

    // Return the response
    return res.status(200).json(response);
  } catch (error) {
    // Check if the error is an instance of Error and cast it accordingly
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

// Update a product
export const updateProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Destructure request body and params
    const { id } = req.params;
    const updates: UpdateProductRequestDTO = req.body;

    // Validate name and price
    if (!updates.name || updates.price === undefined) {
      return res.status(400).json({
        status: 400,
        message: "Name and price are required fields.",
      });
    }

    // Validate price
    if (updates.price <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Price must be a greater than zero.",
      });
    }

    // Construct updateProductDTO
    const updateProductDTO: UpdateProductRequestDTO = {
      name: updates.name,
      description: updates.description,
      price: updates.price,
    };

    // Update product
    const updatedProduct = await ProductService.updateProduct(
      id,
      updateProductDTO
    );

    // Construct the response
    const updatedProductResponse: ProductResponseDTO = {
      id: updatedProduct?.id,
      name: updatedProduct?.name as string,
      description: updatedProduct?.description,
      price: updatedProduct?.price as number,
    };

    // Return the response
    return res.status(200).json({
      status: 200,
      message: "Product updated successfully.",
      data: updatedProductResponse,
    });
  } catch (error) {
    // Check if the error is an instance of Error and cast it accordingly
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};

// Delete a product
export const deleteProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Destructure request params
    const { id } = req.params;

    // Delete product
    await ProductService.deleteProduct(id);

    // Send response
    return res.status(200).json({
      status: 200,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    // Check if the error is an instance of Error and cast it accordingly
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({ status: 500, message: errorMessage });
  }
};
