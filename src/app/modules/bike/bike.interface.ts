import { Types } from 'mongoose';

export interface TBike {
	name: string;
	description: string;
	pricePerHour: number;
	isAvailable?: boolean;

	brand: string;
	model: string;
	year: number;
	cc: number;

	color?: string;
	fuelType?: 'Petrol' | 'Diesel' | 'Electric';
	mileage?: number;
	transmission?: 'Manual' | 'Automatic';
	topSpeed?: number;

	imageUrls?: string[];

	location: {
		city: string;
		area?: string;
		coordinates?: {
			lat: number;
			lng: number;
		};
	};

	averageRating?: number;
	totalRatings?: number;

	owner: Types.ObjectId;

	features?: string[];

	createdAt?: Date;
	updatedAt?: Date;
}
