import { Schema, model, models } from 'mongoose';
import { TAllUser } from './allUser.interface';

const userSchema = new Schema<TAllUser>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	phone: { type: String, required: true },
	address: { type: String, required: true },
	role: { type: String, required: true },
});

// Use `models.User` if it exists; otherwise, create the model
const AllUser = models.User || model<TAllUser>('User', userSchema, 'users');

export default AllUser;
