import Rental from './rental.model';
import Bike from '../bike/bike.model';
import { Types } from 'mongoose';
import { TRental } from './rental.interface';

const createRental = async (userId: Types.ObjectId, bikeId: Types.ObjectId, startTime: Date): Promise<TRental> => {
	// Find the bike and check if it is available
	const bike = await Bike.findById(bikeId);
	if (!bike || !bike.isAvailable) {
		throw new Error('Bike is not available for rental');
	}

	// Create the rental
	const rental = new Rental({
		userId,
		bikeId,
		startTime,
		totalCost: 0,
		isReturned: false,
	});

	// Save the rental
	await rental.save();

	// Update the bike's availability
	bike.isAvailable = false;
	await bike.save();

	return rental;
};


const returnBike = async (rentalId: Types.ObjectId): Promise<TRental> => {
	// Find the rental
	const rental = await Rental.findById(rentalId).populate('bikeId');
	if (!rental) {
		throw new Error('Rental not found');
	}

	// Calculate the total cost based on the duration
	const returnTime = new Date();
	const durationHours = Math.ceil((returnTime.getTime() - new Date(rental.startTime).getTime()) / (1000 * 60 * 60));
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const totalCost = durationHours * (rental.bikeId as any).pricePerHour;

	// Update the rental record
	rental.returnTime = returnTime;
	rental.totalCost = totalCost;
	rental.isReturned = true;
	await rental.save();

	// Update the bike's availability
	const bike = await Bike.findById(rental.bikeId);
	if (bike) {
		bike.isAvailable = true;
		await bike.save();
	}

	return rental;
};

export const RentalService = {
	createRental,
	returnBike
};
