import express from 'express';
import authRouter from './auth/router';

const app = express();


app.use(express.json());
app.use(authRouter);

export default app;
