import { Router } from "express";

import {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController";

import authMiddleware from "../middlewares/authMiddleware";
import authRoleMiddleware from "../middlewares/authRoleMiddleware";

import { Role } from "../enums/role.enum";

// Create a new router
const router: Router = Router();

// Add a new product route
router.post("/", authRoleMiddleware(Role.ADMIN), function (req, res) {
  createProductController(req, res);
});

// Get all products route
router.get("/", authMiddleware, function (req, res) {
  getAllProductsController(req, res);
});

// Update a product route
router.put("/:id", authRoleMiddleware(Role.ADMIN), function (req, res) {
  updateProductController(req, res);
});

// Delete a product route
router.delete("/:id", authRoleMiddleware(Role.ADMIN), function (req, res) {
  deleteProductController(req, res);
});

export default router;
