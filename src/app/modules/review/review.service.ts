import mongoose, { Types } from "mongoose";
import Bike from "../bike/bike.model";
import { IReview, IReviewInput } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (reviewData: IReviewInput): Promise<IReview> => {
	const review = await Review.create(reviewData);

	const allReviews = await Review.find({ bike: review.bike });
	const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

	await Bike.findByIdAndUpdate(review.bike, {
		averageRating: parseFloat(avgRating.toFixed(1)), // convert string to number here
		totalRatings: allReviews.length,
	});

	return review;
};

const likeReview = async (reviewId: string, userId: string) => {
	const review = await Review.findById(reviewId);
	if (!review) throw new Error('Review not found');

	const userObjectId = new Types.ObjectId(userId);

	if (review.likes?.some(id => id.equals(userObjectId))) {
		review.likes = review.likes.filter(id => !id.equals(userObjectId));
	} else {
		review.likes?.push(userObjectId);
	}

	return await review.save();
};

const addComment = async (reviewId: string, userId: string, text: string) => {
	const review = await Review.findById(reviewId);
	if (!review) throw new Error('Review not found');

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	review.comments?.push({ user: userId as any, text });
	return await review.save();
};

const addReply = async (
	reviewId: string,
	commentId: string,
	userId: string,
	text: string
) => {
	const review = await Review.findById(reviewId);
	if (!review) throw new Error('Review not found');

	const comment = review.comments?.id(commentId);
	if (!comment) throw new Error('Comment not found');

	comment.replies?.push({ user: new mongoose.Types.ObjectId(userId), text });

	return await review.save();
};

const getMyReviews = async (userId: string) => {
	const reviews = await Review.find({ user: userId })
		.populate('bike')
		.populate('comments.user')
		.populate('comments.replies.user');

	return reviews;
};

export const ReviewService = {
	createReview,
	likeReview,
	addComment,
	addReply,
	getMyReviews,
};