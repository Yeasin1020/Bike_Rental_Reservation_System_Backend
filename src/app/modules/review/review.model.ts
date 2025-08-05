import { Schema, model } from 'mongoose';
import { IComment, IReview } from './review.interface';

const replySchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	text: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const commentSchema = new Schema<IComment>(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		text: { type: String, required: true },
		replies: { type: [replySchema], default: [] },
	},
	{ timestamps: true }
);

const reviewSchema = new Schema<IReview>({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	bike: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
	booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
	rating: { type: Number, min: 1, max: 5, required: true },
	text: { type: String, default: '' },
	imageUrl: { type: String, default: '' },
	likes: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
	comments: { type: [commentSchema], default: [] },

}, { timestamps: true });


reviewSchema.index({ user: 1, bike: 1 }, { unique: true });

export const Review = model<IReview>('Review', reviewSchema);
