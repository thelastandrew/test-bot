import { config } from 'dotenv';

config();

export const settings = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  BOT_TOKEN: process.env.BOT_TOKEN || '',
};
