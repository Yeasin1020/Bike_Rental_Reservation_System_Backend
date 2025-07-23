import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { Types } from 'mongoose';
import { RentalService } from './rental.service';

const createRental = catchAsync(async (req: Request, res: Response) => {
	const { bikeId, startTime } = req.body;
	const userId = req.user._id;

	const rental = await RentalService.createRental(new Types.ObjectId(userId), new Types.ObjectId(bikeId), new Date(startTime));

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Rental created successfully',
		data: rental,
	});
});


const returnBike = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const rental = await RentalService.returnBike(new Types.ObjectId(id));

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Bike returned successfully',
		data: rental,
	});
});

const getAllRentalsForUser = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user._id; // Assuming req.user is set by the authentication middleware

	const rentals = await RentalService.getAllRentalsForUser(userId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Rentals retrieved successfully',
		data: rentals,
	});
});

const getAllRentals = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user._id; // Get userId from authenticated user
	const isAdmin = req.user.role === 'admin'; // Assuming role is set in user object

	// If the user is an admin, they can fetch all rentals; otherwise, fetch rentals only for the authenticated user
	const rentals = await RentalService.getAllRentals(isAdmin ? undefined : new Types.ObjectId(userId));

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Rentals retrieved successfully',
		data: rentals,
	});
});

export const RentalController = {
	createRental,
	returnBike,
	getAllRentalsForUser,
	getAllRentals
};
