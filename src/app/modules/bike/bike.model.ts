import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema<TBike>({
	name: { type: String, required: true, trim: true },
	description: { type: String, required: true, trim: true },
	pricePerHour: { type: Number, required: true },
	isAvailable: { type: Boolean, default: true },

	brand: { type: String, required: true, trim: true },
	model: { type: String, required: true, trim: true },
	year: { type: Number, required: true },
	cc: { type: Number, required: true },

	// Additional fields
	color: { type: String },
	fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric'], default: 'Petrol' },
	mileage: { type: Number }, // in km per litre or km per charge
	transmission: { type: String, enum: ['Manual', 'Automatic'], default: 'Manual' },
	topSpeed: { type: Number }, // optional

	// Image(s)
	imageUrls: [{ type: String }], // Array of image URLs

	// Location info (for showing where the bike is available)
	location: {
		city: { type: String, required: true },
		area: { type: String },
		coordinates: {
			lat: { type: Number },
			lng: { type: Number },
		},
	},

	// Rating system
	averageRating: { type: Number, default: 0 },
	totalRatings: { type: Number, default: 0 },

	// Owner/User reference
	owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },

	// Optional features
	features: [{ type: String }], // ex: ['ABS', 'Bluetooth', 'Helmet included']

}, { timestamps: true });

// ✅ Compound index to prevent duplicate bikes per owner
bikeSchema.index(
	{ name: 1, brand: 1, model: 1, year: 1, owner: 1 },
	{ unique: true, partialFilterExpression: { owner: { $exists: true } } }
);

const Bike = model<TBike>('Bike', bikeSchema);

export default Bike;
