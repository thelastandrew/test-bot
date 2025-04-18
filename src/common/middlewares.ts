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

export const loggingHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logging.log(
    `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
  );

  res.on('finish', () => {
    logging.log(
      `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`,
    );
  });

  next();
};
