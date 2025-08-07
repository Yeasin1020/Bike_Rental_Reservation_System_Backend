import Newsletter from './newsletter.model';
import { INewsletter } from './newsletter.interface';

const createNewsletter = async (data: {
	name: string;
	email: string;

}): Promise<INewsletter> => {
	const newsletter = new Newsletter(data);
	return await newsletter.save();
};

const getAllNewsletters = async (): Promise<INewsletter[]> => {
	return await Newsletter.find().sort({ createdAt: -1 });
};

export const NewsletterService = {
	createNewsletter,
	getAllNewsletters,
};