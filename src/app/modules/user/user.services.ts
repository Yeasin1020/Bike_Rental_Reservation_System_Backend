import { TUser } from "./user.interface";
import { User } from "./user.model";

// Function to get all users from the database
const getAllUsersFromDb = async () => {
	const users = await User.find().select("-password"); // Exclude password from the result
	return users;
};

// Function to update user profile
const updateProfile = async (userId: string, updateData: Partial<TUser>) => {
	const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
	if (!updatedUser) {
		throw new Error("User not found");
	}
	return updatedUser;
};

// Function to promote a user to admin
const updateRoleToAdmin = async (userId: string) => {
	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ role: "admin" }, // Update role to admin
		{ new: true }
	).select("-password");

	if (!updatedUser) {
		throw new Error("User not found");
	}
	return updatedUser;
};

// Function to delete a user
const deleteUser = async (userId: string) => {
	const deletedUser = await User.findByIdAndDelete(userId);
	if (!deletedUser) {
		throw new Error("User not found");
	}
	return deletedUser;
};

// Function to update user address (added to profile update)
const updateUserAddress = async (userId: string, address: string) => {
	const updatedUser = await User.findByIdAndUpdate(userId, { address }, { new: true }).select("-password");
	if (!updatedUser) {
		throw new Error("User not found");
	}
	return updatedUser;
};

export const UserServices = {
	updateProfile,
	getAllUsersFromDb,
	updateRoleToAdmin,
	deleteUser,
	updateUserAddress, // Exported new function for address update
};
