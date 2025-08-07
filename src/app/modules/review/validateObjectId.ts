// validateObjectId.ts
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateObjectId = (paramName: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const value = req.params[paramName];
		if (!mongoose.Types.ObjectId.isValid(value)) {
			return res.status(400).json({
				success: false,
				message: `Invalid ${paramName}`,
			});
		}
		next();
	};
};
