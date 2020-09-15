import {
  DocumentReference,
  DocumentSnapshot,
  FieldValue,
  WriteBatch,
} from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { db } from '../config/firestore.config';
import { Board } from '../entities/board.entity';
import { BaseListService } from './base-list.service';
import { BaseProfileService } from './base-profile.service';

@Injectable()
export class BaseBoardService {
  constructor(
    private baseProfileService: BaseProfileService,
    private baseListService: BaseListService,
  ) {}

  async addListToBoard(
    batch: WriteBatch,
    id: string,
    idList: string,
  ): Promise<void> {
    const boardRef: DocumentReference = db.collection('boards').doc(id);

    batch.update(boardRef, {
      lists: FieldValue.arrayUnion(idList),
    });
  }

  async removeListFromBoard(
    batch: WriteBatch,
    id: string,
    idList: string,
  ): Promise<void> {
    const boardRef: DocumentReference = db.collection('boards').doc(id);

    batch.update(boardRef, {
      lists: FieldValue.arrayRemove(idList),
    });
  }

  async addUserToBoard(
    batch: WriteBatch,
    id: string,
    uid: string,
  ): Promise<void> {
    const boardRef: DocumentReference = db.collection('boards').doc(id);

    batch.update(boardRef, {
      users: FieldValue.arrayUnion(uid),
    });
  }

  async removeUserFromBoard(
    batch: WriteBatch,
    id: string,
    uid: string,
  ): Promise<void> {
    const boardRef: DocumentReference = db.collection('boards').doc(id);

    batch.update(boardRef, {
      users: FieldValue.arrayRemove(uid),
    });
  }

  async fill(
    boardSnapshot: DocumentSnapshot,
    options?: { complete: boolean },
  ): Promise<Board> {
    const board: Board = {} as Board;
    let complete = true;

    if (options) {
      complete = options.complete;
    }

    if (boardSnapshot.exists) {
      if (boardSnapshot.data) {
        board.id = boardSnapshot.id;
        board.name = boardSnapshot.get('name');
        board.privacy = boardSnapshot.get('privacy');

        if (complete) {
          const admin: string = boardSnapshot.get('admin');
          board.admin = await this.baseProfileService.get(admin);
          const users: string[] = boardSnapshot.get('users');
          board.users = await this.baseProfileService.getMany(users);
          const lists: string[] = boardSnapshot.get('lists');
          board.lists = await this.baseListService.getMany(lists);
        }
      }
    }

    return board;
  }
}
