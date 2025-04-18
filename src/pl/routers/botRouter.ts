import { Router, Request, Response } from 'express';
import {
  receiveTelegramMessageHandler,
  sendMessageHandler,
} from '../botHandler';
import { rawTextMiddleware } from '@/common';

export const router = Router();

router.use('/', rawTextMiddleware);
router.post('/', async (req: Request, res: Response) => {
  const body = await receiveTelegramMessageHandler(req);
  logging.info(body);
  await sendMessageHandler(body.chatId, 'hello world');

  res.status(200).send('Request handled');
});
