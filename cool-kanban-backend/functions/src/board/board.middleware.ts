import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

import { BaseProfileService } from '../core/services/base-profile.service';
import { BaseBoardService } from '../core/services/base-board.service';
import { Board } from '../core/entities/board.entity';
import { db } from '../core/config/firebase.config';

@Injectable()
export class BoardMiddleware implements NestMiddleware {
  constructor(
    private baseProfileSvc: BaseProfileService,
    private baseBoardSvc: BaseBoardService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const user: UserRecord = req.body.user as UserRecord;
    const boards: string[] = await this.baseProfileSvc.getBoardsByUID(user.uid);

    if (boards && req.params.id) {
      if (boards.includes(req.params.id)) {
        next();
        return;
      }
    }

    const boardSnapshot: DocumentSnapshot = await db
      .collection('boards')
      .doc(req.params.id)
      .get();

    const board: Board = await this.baseBoardSvc.fill(boardSnapshot, {
      complete: false,
    });
    if (board.privacy === 'PUBLIC') {
      next();
      return;
    }

    res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
    return;
  }
}
