import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { app } from '../config/firestore.config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
      return;
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      const decodedIdToken = await app.auth().verifyIdToken(idToken);
      req.body.user = decodedIdToken;
      next();
      return;
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send(`Unauthorized ${error.message}`);
      return;
    }
  }
}
