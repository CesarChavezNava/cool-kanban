import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { app, getConfigValue } from '../config/firebase.config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    if (getConfigValue().env.type === 'prod') {
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
        res
          .status(HttpStatus.UNAUTHORIZED)
          .send(`Unauthorized ${error.message}`);
        return;
      }
    } else {
      req.body.user = {
        uid: getConfigValue().dev.uid,
      } as UserRecord;

      console.log(req.body.user);
      next();
      return;
    }
  }
}
