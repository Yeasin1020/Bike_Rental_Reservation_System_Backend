import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./allUser.services";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
	// Fetch all users without the password field
	const allUsers = await UserService.getAllUsersFromDb();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users retrieved successfully',
		data: allUsers,
	});
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
	const userId = req.params.id;
	const updatedUserData = req.body;
	const loggedInUser = req.user; // Assuming the user info is populated via middleware

	// Log userId for debugging
	console.log("User ID from request:", userId);

	const updatedUser = await UserService.updateUserInDb(userId, updatedUserData, loggedInUser);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User updated successfully',
		data: updatedUser,
	});
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	// Log ID for debugging
	console.log("User ID to delete:", id);

	const deletedUser = await UserService.deleteUserFromDb(id);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User deleted successfully',
		data: deletedUser,
	});
});

export const UserController = {
	getAllUsers,
	updateUser,
	deleteUser,
};
