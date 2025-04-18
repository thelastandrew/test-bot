import { Request } from 'express';
import { settings } from '@/common';

const TELEGRAM_API_URL = `https://api.telegram.org/bot${settings.BOT_TOKEN}`;
const url = `${TELEGRAM_API_URL}/sendMessage`;

type KEYBOARD_MARKUP = {
  keyboard: string[][];
  one_time_keyboard: boolean;
  resize_keyboard: boolean;
};

export type MessageBody = {
  chatId: number;
  userId?: number;
  username?: string;
  text: string;
};

export const receiveTelegramMessageHandler = async (
  request: Request,
): Promise<MessageBody> => {
  try {
    const txt = await request.text();
    const ctx = JSON.parse(txt);
    const {
      message: {
        text,
        chat: { id: chatId },
      },
    } = ctx;
    const userId = ctx.message.from?.id;
    const username = ctx.message.from?.username;

    return {
      chatId: Number(chatId),
      userId: userId ? Number(userId) : undefined,
      username: username ? String(username) : undefined,
      text: String(text),
    };
  } catch (error) {
    throw new Error(`Webhook error: ${(error as Error).message}`);
  }
};

export const sendMessageHandler = async (
  chat_id: number,
  text: string,
  reply_markup?: KEYBOARD_MARKUP,
  isMarkDown?: boolean,
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      chat_id,
      text,
      reply_markup,
      parse_mode: isMarkDown ? 'MarkdownV2' : undefined,
    }),
  });

  if (!response.ok) {
    console.log(
      'Failed to send message to telegram user',
      await response.json(),
    );
  }
};

export const keyboardConstructor = (
  one_time_keyboard: boolean,
  ...buttons: string[]
): KEYBOARD_MARKUP => {
  const keyboard = buttons.map((btn) => [btn]);

  return {
    keyboard,
    one_time_keyboard,
    resize_keyboard: true,
  };
};
