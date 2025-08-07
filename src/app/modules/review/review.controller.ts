import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';
import Rental from '../rental/rental.model';
import mongoose, { Types } from 'mongoose';

export const createReview = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user._id;
	const { bikeId, bookingId } = req.params;
	const { rating, text, imageUrl } = req.body;

	// Check that the rental exists, belongs to the user, bike matches, and is returned
	const rental = await Rental.findOne({ _id: bookingId, userId, bikeId, isReturned: true });
	if (!rental) {
		throw new Error('You can only review after returning the bike.');
	}

	const review = await ReviewService.createReview({
		user: new Types.ObjectId(userId),
		bike: new Types.ObjectId(bikeId),
		booking: new Types.ObjectId(bookingId),
		rating,
		text,
		imageUrl,
	});



	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Review added',
		data: review,
	});
});

export const likeReview = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user._id;
	const { reviewId } = req.params;
	const updatedReview = await ReviewService.likeReview(reviewId, userId);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Review liked/unliked',
		data: updatedReview,
	});
});

export const addComment = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user._id;
	const { reviewId } = req.params;
	const { text } = req.body;

	if (!mongoose.Types.ObjectId.isValid(reviewId)) {
		return res.status(400).json({
			success: false,
			message: 'Invalid reviewId',
		});
	}

	const updated = await ReviewService.addComment(reviewId, userId, text);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Comment added',
		data: updated,
	});
});

export const addReply = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user._id;
	const { reviewId, commentId } = req.params;
	const { text } = req.body;

	if (!mongoose.Types.ObjectId.isValid(reviewId) || !mongoose.Types.ObjectId.isValid(commentId)) {
		return res.status(400).json({ success: false, message: 'Invalid reviewId or commentId' });
	}

	const updatedReview = await ReviewService.addReply(reviewId, commentId, userId, text);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Reply added to comment',
		data: updatedReview,
	});
});

export const getMyReviews = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user._id;
	const reviews = await ReviewService.getMyReviews(userId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Fetched your reviews successfully',
		data: reviews,
	});
});