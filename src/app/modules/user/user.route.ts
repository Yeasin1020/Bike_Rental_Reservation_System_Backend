import express from "express";
import authenticate from "../../middlewares/authenticate";
import { UserControllers } from "./user.controller";

const router = express.Router();

// Route to get the current logged-in user's profile
router.get("/me", authenticate, UserControllers.getProfile);

// Route to update the current logged-in user's profile
router.put("/me", authenticate, UserControllers.updateUserProfile);

// Route to get all users (admin-only route)
router.get("/", authenticate, UserControllers.getAllUsers);

// Route to promote a user to admin
router.patch("/:userId/admin", authenticate, UserControllers.updateUserRoleToAdmin);

// Route to update a user by userId (admin-only route)
router.put("/:userId", authenticate, UserControllers.updateUserProfile);

// Route to delete a user by userId (admin-only route)
router.delete("/:userId", authenticate, UserControllers.deleteUser);

export const UserRoutes = router;
