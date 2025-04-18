import express, { json } from 'express';
import { botRouter } from '@/pl';
import { loggingHandler } from './common';

export const app = express();

app.use(json());
app.use(loggingHandler);

app.use('/bot', botRouter);
