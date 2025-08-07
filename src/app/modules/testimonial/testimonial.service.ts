import Testimonial from './testimonial.model';
import { ITestimonial } from './testimonial.interface';

const createTestimonial = async (data: {
	name: string;
	email: string;

}): Promise<ITestimonial> => {
	const testimonial = new Testimonial(data);
	return await testimonial.save();
};

const getAllTestimonials = async (): Promise<ITestimonial[]> => {
	return await Testimonial.find().sort({ createdAt: -1 });
};

export const TestimonialService = {
	createTestimonial,
	getAllTestimonials,
};