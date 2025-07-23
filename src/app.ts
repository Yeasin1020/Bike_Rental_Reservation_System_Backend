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

//parsers
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's URL
  credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
};
app.use(cors(corsOptions));

// application routes
app.use('/api', router);

app.get("/", (req: Request, res: Response) => {
  res.send("deployment successfully done")
})

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
