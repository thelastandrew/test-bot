import express, { json } from 'express';
import { botRouter } from '@/pl';

export const app = express();

app.use(json());

app.use('/bot', botRouter);
