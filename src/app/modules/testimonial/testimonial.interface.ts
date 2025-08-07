import { Document } from 'mongoose';

export interface ITestimonial extends Document {
	name: string;
	email: string;
	createdAt: Date;
}