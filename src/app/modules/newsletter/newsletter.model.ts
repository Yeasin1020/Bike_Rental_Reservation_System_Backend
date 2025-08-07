import { Schema, model } from 'mongoose';
import { INewsletter } from './newsletter.interface';

const NewsletterSchema = new Schema<INewsletter>({
	name: { type: String, required: true },
	email: { type: String, required: true, lowercase: true },

}, { timestamps: { createdAt: true, updatedAt: false } });

const Newsletter = model<INewsletter>('Newsletter', NewsletterSchema);
export default Newsletter;
