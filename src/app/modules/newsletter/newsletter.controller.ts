import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { NewsletterService } from './newsletter.service';
import Newsletter from './newsletter.model';

const addNewsletter = catchAsync(async (req: Request, res: Response) => {
	const { name, email } = req.body;

	if (!name || !email) {
		return res.status(400).json({ success: false, message: 'All fields required' });
	}
	const existing = await Newsletter.findOne({ email });
	if (existing) {
		return res.status(409).json({
			success: false,
			message: "Email already submitted a Newsletter",
		});
	}
	const saved = await NewsletterService.createNewsletter({ name, email });

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Newsletter submitted successfully',
		data: saved,
	});
});

const listNewsletters = catchAsync(async (req: Request, res: Response) => {
	const Newsletters = await NewsletterService.getAllNewsletters();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Newsletters fetched successfully',
		data: Newsletters,
	});
});

export const NewsletterController = {
	addNewsletter,
	listNewsletters,
};