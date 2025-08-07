import { Document } from 'mongoose';

export interface INewsletter extends Document {
	name: string;
	email: string;
	createdAt: Date;
}