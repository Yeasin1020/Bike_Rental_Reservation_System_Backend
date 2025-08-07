import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TestimonialService } from './testimonial.service';
import Testimonial from './testimonial.model';

const addTestimonial = catchAsync(async (req: Request, res: Response) => {
	const { name, email } = req.body;

	if (!name || !email) {
		return res.status(400).json({ success: false, message: 'All fields required' });
	}
	const existing = await Testimonial.findOne({ email });
	if (existing) {
		return res.status(409).json({
			success: false,
			message: "Email already submitted a testimonial",
		});
	}
	const saved = await TestimonialService.createTestimonial({ name, email });

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Testimonial submitted successfully',
		data: saved,
	});
});

const listTestimonials = catchAsync(async (req: Request, res: Response) => {
	const testimonials = await TestimonialService.getAllTestimonials();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Testimonials fetched successfully',
		data: testimonials,
	});
});

export const TestimonialController = {
	addTestimonial,
	listTestimonials,
};