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


const returnBike = async (rentalId: Types.ObjectId): Promise<Partial<TRental> & {
	duration: {
		hours: number;
		minutes: number;
		seconds: number;
		totalSeconds: number;
	};
	calculatedCost: number;
}> => {
	const rental = await Rental.findById(rentalId).populate('bikeId');
	if (!rental) {
		throw new Error('Rental not found');
	}

	const startTime = new Date(rental.startTime);
	const returnTime = new Date();

	// Duration calculation
	const durationMs = returnTime.getTime() - startTime.getTime();
	const totalSeconds = Math.floor(durationMs / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	// Get bike details & hourly rate
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const bike = await Bike.findById((rental.bikeId as any)._id || rental.bikeId);
	if (!bike) {
		throw new Error('Bike not found');
	}

	const pricePerHour = bike.pricePerHour;
	const pricePerSecond = pricePerHour / 3600;

	const calculatedCost = Math.ceil(totalSeconds * pricePerSecond); // Real-time accurate billing

	// Update rental
	rental.returnTime = returnTime;
	rental.totalCost = calculatedCost;
	rental.isReturned = true;
	await rental.save();

	// Update bike availability
	bike.isAvailable = true;
	await bike.save();

	return {
		_id: rental._id,
		userId: rental.userId,
		bikeId: bike._id,
		startTime: rental.startTime,
		returnTime: rental.returnTime,
		totalCost: rental.totalCost,
		isReturned: rental.isReturned,
		duration: {
			hours,
			minutes,
			seconds,
			totalSeconds
		},
		calculatedCost,
	};
};


const getAllRentals = async (userId?: Types.ObjectId): Promise<TRental[]> => {
	if (userId) {
		return Rental.find({ userId });
	} else {
		// If no userId is provided, return all rentals (for admin view)
		return Rental.find().populate('userId bikeId');
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllRentalsForUser = async (userId: Types.ObjectId): Promise<any[]> => {
	const rentals = await Rental.find({ userId }).populate("bikeId");

	const enhancedRentals = rentals.map((rental) => {
		const start = new Date(rental.startTime).getTime();
		const end = rental.returnTime ? new Date(rental.returnTime).getTime() : Date.now();
		const durationMs = end - start;
		const durationHours = durationMs / (1000 * 60 * 60);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const bike = rental.bikeId as any; // populated bike object
		const hourlyRate = bike?.pricePerHour || 0;

		const cost = Math.ceil(durationHours) * hourlyRate;

		return {
			...rental.toObject(),
			durationHours: durationHours.toFixed(2),
			calculatedCost: cost,
			bikeDetails: {
				name: bike?.name,
				model: bike?.model,
				brand: bike?.brand,
				image: bike?.imageUrls?.[0] || null,
				pricePerHour: hourlyRate,
			}
		};
	});

	return enhancedRentals;
};

export const RentalService = {
	createRental,
	returnBike,
	getAllRentalsForUser,
	getAllRentals
};
