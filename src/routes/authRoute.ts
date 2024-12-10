import { Router } from "express";
import {
  registerAdminController,
  registerViewerController,
  loginController,
  logoutController,
} from "../controllers/authController";

import authMiddleware from "../middlewares/authMiddleware";
import authRoleMiddleware from "../middlewares/authRoleMiddleware";

import { Role } from "../enums/role.enum";

// Create a new router
const router: Router = Router();

// Register Admin route
router.post(
  "/register-admin",
  authRoleMiddleware(Role.ADMIN),
  function (req, res) {
    registerAdminController(req, res);
  }
);
// Register Viewer route
router.post(
  "/register-viewer",
  authRoleMiddleware(Role.VIEWER),
  function (req, res) {
    registerViewerController(req, res);
  }
);

// User login route
router.post("/login", function (req, res) {
  loginController(req, res);
});

// User logout route
router.post("/logout", authMiddleware, function (req, res) {
  logoutController(req, res);
});

export default router;
