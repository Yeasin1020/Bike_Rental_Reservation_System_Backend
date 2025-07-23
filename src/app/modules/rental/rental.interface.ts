import { Types } from "mongoose";

export type TRental = {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	bikeId: Types.ObjectId;
	startTime: Date;
	returnTime?: Date | null;
	totalCost: number;
	isReturned: boolean;
};
