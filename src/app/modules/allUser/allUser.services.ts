import { Types } from "mongoose";
import AllUser from "./allUser.model";
import { TAllUser } from "./allUser.interface";

// Function to retrieve all users without passwords
const getAllUsersFromDb = async () => {
	const users = await AllUser.find().select("-password"); // Fetch users without password
	return users;
};

// Function to update user data with role-based access check
const updateUserInDb = async (id: string, updateData: Partial<TAllUser>, loggedInUser: TAllUser) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error('Invalid user ID');
	}

	// Check if the logged-in user is an admin or if they are updating their own profile
	if (loggedInUser.role !== "admin" && loggedInUser._id.toString() !== id) {
		throw new Error('You are not authorized to update this user');
	}

	// Proceed to update the user if authorized
	const updatedUser = await AllUser.findByIdAndUpdate(id, updateData, { new: true }).lean().exec();
	if (!updatedUser) {
		throw new Error('User not found');
	}
	return updatedUser;
};

// Function to delete a user
const deleteUserFromDb = async (id: string) => {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error('Invalid user ID');
	}

	// Deleting the user by their ID
	const user = await AllUser.findByIdAndDelete(id);
	if (!user) {
		throw new Error('User not found');
	}
	return user;
};

export const UserService = {
	getAllUsersFromDb,
	updateUserInDb,
	deleteUserFromDb,
};
