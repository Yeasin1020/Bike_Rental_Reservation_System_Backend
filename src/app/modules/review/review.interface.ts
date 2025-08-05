// interfaces/review.interface.ts
import { Types, Document } from 'mongoose';

export interface IReply {
	user: Types.ObjectId;
	text: string;
	createdAt?: Date;
}

// Extend mongoose Document for IComment
export interface IComment extends Document {
	user: Types.ObjectId;
	text: string;
	replies?: IReply[];
	createdAt?: Date;
}
export interface IReviewInput {
	user: Types.ObjectId;
	bike: Types.ObjectId;
	booking: Types.ObjectId;
	rating: number;
	text?: string;
	imageUrl?: string;
}


export interface IReview extends Document {
	user: Types.ObjectId;
	bike: Types.ObjectId;
	booking: Types.ObjectId;
	rating: number;
	text?: string;
	imageUrl?: string;
	likes?: Types.ObjectId[];
	comments?: Types.DocumentArray<IComment>; // ✅ Make it a DocumentArray
	createdAt?: Date;
	updatedAt?: Date;
}
