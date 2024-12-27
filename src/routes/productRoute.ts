import { Router } from "express";

import {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
} from "../controllers/ProductController";

import authMiddleware from "../middlewares/authMiddleware";
import authRoleMiddleware from "../middlewares/authRoleMiddleware";

import { UserRoleEnum } from "../enums/UserRoleEnum";

// Create a new router
const router: Router = Router();

// Add a new product route
router.post("/", authRoleMiddleware(UserRoleEnum.ADMIN), function (req, res) {
  createProductController(req, res);
});

// Get all products route
router.get("/", authMiddleware, function (req, res) {
  getAllProductsController(req, res);
});

// Update a product route
router.put("/:id", authRoleMiddleware(UserRoleEnum.ADMIN), function (req, res) {
  updateProductController(req, res);
});

// Delete a product route
router.delete("/:id", authRoleMiddleware(UserRoleEnum.ADMIN), function (req, res) {
  deleteProductController(req, res);
});

export default router;
