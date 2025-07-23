/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Parsers
app.use(express.json());

// ✅ Correct CORS setup
const corsOptions = {
  origin: ['http://localhost:5173', 'https://bike-rental-reservation-delta.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));

// Application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Deployment successfully done');
});

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
