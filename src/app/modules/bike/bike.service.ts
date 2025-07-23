// services/bike.service.ts

import { Types } from "mongoose";
import { TBike } from "./bike.interface";
import Bike from "./bike.model";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";


const createBikeIntoDb = async (bikeData: Partial<TBike>) => {
	try {
		const newBike = new Bike(bikeData);
		await newBike.save();
		return newBike;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.code === 11000) {
			// Duplicate key error from MongoDB
			throw new ApiError(httpStatus.CONFLICT, 'A similar bike already exists for this owner.');
		}
		throw error;
	}
};

const getAllBikesFromDb = async () => {
	return await Bike.find(); // Retrieve all bikes from the database
};

const updateBikeIntoDb = async (id: string, updateData: Partial<TBike>) => {
	const updatedBike = await Bike.findByIdAndUpdate(id, updateData, { new: true }).lean().exec();
	if (!updatedBike) {
		throw new Error('Bike not found');
	}
	return updatedBike;
};

const deleteBikeFromDb = async (id: string) => {

	if (!Types.ObjectId.isValid(id)) {
		throw new Error('Invalid bike ID');
	}

	const bike = await Bike.findByIdAndDelete(id);

	if (!bike) {
		throw new Error('Bike not found');
	}
	return bike;
};
export const BikeService = {
	createBikeIntoDb,
	getAllBikesFromDb,
	updateBikeIntoDb,
	deleteBikeFromDb
};
