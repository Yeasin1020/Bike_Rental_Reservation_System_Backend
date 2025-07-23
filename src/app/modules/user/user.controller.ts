import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

// Get user profile (current logged in user)
const getProfile = catchAsync(async (req, res) => {
	const user = req.user;

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User profile retrieved successfully",
		data: user,
	});
});

// Update user profile
const updateUserProfile = catchAsync(async (req, res) => {
	const userId = req.user.id;
	const { address, role, ...otherData } = req.body; // Extract address and role from the request

	// If address is updated, update it
	if (address) {
		await UserServices.updateUserAddress(userId, address);
	}

	// Update other profile data (excluding address and role)
	const updatedUser = await UserServices.updateProfile(userId, otherData);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Profile updated successfully",
		data: updatedUser,
	});
});

// Get all users
const getAllUsers = catchAsync(async (req, res) => {
	const users = await UserServices.getAllUsersFromDb();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "All users retrieved successfully",
		data: users,
	});
});

// Update user role to admin (only by admin)
const updateUserRoleToAdmin = catchAsync(async (req, res) => {
	const { userId } = req.params;

	if (req.user.role !== "admin") {
		return res.status(httpStatus.FORBIDDEN).json({
			success: false,
			message: "Only admins can update roles",
		});
	}

	const updatedUser = await UserServices.updateRoleToAdmin(userId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User role updated to admin successfully",
		data: updatedUser,
	});
});

// Delete a user (only by admin)
const deleteUser = catchAsync(async (req, res) => {
	const { userId } = req.params;

	if (req.user.role !== "admin") {
		return res.status(httpStatus.FORBIDDEN).json({
			success: false,
			message: "Only admins can delete users",
		});
	}

	const deletedUser = await UserServices.deleteUser(userId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User deleted successfully",
		data: deletedUser,
	});
});

export const UserControllers = {
	getProfile,
	updateUserProfile,
	getAllUsers,
	updateUserRoleToAdmin,
	deleteUser,
};
