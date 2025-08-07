import { Schema, model } from 'mongoose';
import { ITestimonial } from './testimonial.interface';

const testimonialSchema = new Schema<ITestimonial>({
	name: { type: String, required: true },
	email: { type: String, required: true, lowercase: true },

}, { timestamps: { createdAt: true, updatedAt: false } });

const Testimonial = model<ITestimonial>('Testimonial', testimonialSchema);
export default Testimonial;
