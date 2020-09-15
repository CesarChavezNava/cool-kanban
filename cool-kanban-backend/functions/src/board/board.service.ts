import {
  DocumentReference,
  DocumentSnapshot,
  WriteBatch,
} from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { db } from '../core/config/firestore.config';
import { Board } from '../core/entities/board.entity';
import { BaseBoardService } from '../core/services/base-board.service';
import { BaseProfileService } from '../core/services/base-profile.service';
import { CreateBoardDto, UpdateBoardDto } from './dtos';

@Injectable()
export class BoardService {
  constructor(
    private baseBoardService: BaseBoardService,
    private baseProfileService: BaseProfileService,
  ) {}

  async getAll(uid: string): Promise<Board[]> {
    const boards: Board[] = [] as Board[];
    const ids: string[] = await this.baseProfileService.getBoardsByUID(uid);
    for (const id of ids) {
      const boardSnapshot: DocumentSnapshot = await db
        .collection('boards')
        .doc(id)
        .get();
      const board: Board = await this.baseBoardService.fill(boardSnapshot, {
        complete: false,
      });
      boards.push(board);
    }

    return boards;
  }

  async get(id: string): Promise<Board> {
    const boardSnapshot: DocumentSnapshot = await db
      .collection('boards')
      .doc(id)
      .get();

    const board: Board = await this.baseBoardService.fill(boardSnapshot);
    return board;
  }

  async create(uid: string, dto: CreateBoardDto): Promise<Board> {
    const batch: WriteBatch = db.batch();

    const boardRef: DocumentReference = db.collection('boards').doc();
    batch.create(boardRef, {
      admin: uid,
      name: dto.name,
      privacy: dto.privacy,
      users: [uid],
    });

    await this.baseProfileService.addBoardToProfile(batch, uid, boardRef.id);
    await batch.commit();

    const board: Board = {
      id: boardRef.id,
      name: dto.name,
      privacy: dto.privacy,
    } as Board;

    return board;
  }

  async update(id: string, dto: UpdateBoardDto): Promise<Board> {
    const batch: WriteBatch = db.batch();

    const boardRef: DocumentReference = db.collection('boards').doc(id);
    batch.update(boardRef, {
      name: dto.name,
      privacy: dto.privacy,
    });
    await batch.commit();

    const board: Board = {
      id: boardRef.id,
      name: dto.name,
      privacy: dto.privacy,
    } as Board;

    return board;
  }

  async delete(id: string): Promise<void> {
    const batch: WriteBatch = db.batch();
    const boardRef: DocumentReference = db.collection('boards').doc(id);

    const boardSnapshot: DocumentSnapshot = await boardRef.get();
    let uids: string[];
    if (boardSnapshot.exists) {
      if (boardSnapshot.data) {
        uids = boardSnapshot.get('users');
      }
    }

    for (const uid of uids) {
      await this.baseProfileService.removeBoardFromProfile(batch, uid, id);
    }

    batch.delete(boardRef);
    await batch.commit();
  }

  async join(id: string, uid: string): Promise<void> {
    const batch: WriteBatch = db.batch();

    await this.baseBoardService.addUserToBoard(batch, id, uid);
    await this.baseProfileService.addBoardToProfile(batch, uid, id);
    await batch.commit();
  }

  async kick(id: string, uid: string): Promise<void> {
    const batch: WriteBatch = db.batch();

    await this.baseBoardService.removeUserFromBoard(batch, id, uid);
    await this.baseProfileService.removeBoardFromProfile(batch, uid, id);
    await batch.commit();
  }
}
