// middlewares/rawText.ts
import { Request, Response, NextFunction } from 'express';

export function rawTextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let rawBody = '';

  req.setEncoding('utf8');

  req.on('data', (chunk) => {
    rawBody += chunk;
  });

  req.on('end', () => {
    req.text = async () => rawBody;
    next();
  });

  req.on('error', (err) => {
    next(err);
  });
}
