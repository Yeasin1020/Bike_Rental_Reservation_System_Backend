import { Document } from 'mongoose';

export type TAllUser = {
	name: string;
	email: string;
	password: string;
	phone: string;
	address: string;
	role: 'user' | 'admin';
} & Document;
