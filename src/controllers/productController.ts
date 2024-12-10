import { Request, Response } from "express";

import { IProduct } from "../models/productModel";

import ProductService from "../services/impl/ProductService";


// Create a new product
export const createProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Destructure request body
    const { name, description, price } = req.body;

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

    // Create product
    const product = await ProductService.createProduct(
      name,
      description,
      price
    );

    // Send response
    return res.status(201).json({
      status: 201,
      message: "Product created successfully.",
      data: product,
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
    // Destructure request query
    const { name, price } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const field = (req.query.sort as string) || "createdAt";
    const direction = (req.query.direction as string) || "desc";

    // Construct filters
    const filters = {
      name: name as string,
      price: price ? Number(price) : undefined,
    };

    // Construct pagination and sorting
    const pagination = { page, size };
    const sort = { field, direction };

    // Get products
    const result = await ProductService.getAllProducts(
      filters,
      pagination,
      sort as { field: keyof IProduct; direction: "asc" | "desc" }
    );

    // Send response
    return res.status(200).json({
      status: 200,
      message: "Products retrieved successfully.",
      data: result.data,
      total: result.total,
      pagination: result.pagination,
      sort: result.sort,
    });
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
    const updates = req.body;

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

    // Update product
    const updatedProduct = await ProductService.updateProduct(id, updates);

    // Send response
    return res.status(200).json({
      status: 200,
      message: "Product updated successfully.",
      data: updatedProduct,
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
