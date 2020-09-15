import { DocumentSnapshot } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { Board } from 'core/entities/board.entity';
import { BaseListService } from './base-list.service';

@Injectable()
export class BaseBoardService {
  constructor(private baseListService: BaseListService) {}

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
          //const admin: string = boardSnapshot.get('admin');
          //board.admin = await this.profileService.get(admin);
          //const users: string[] = boardSnapshot.get('users');
          //board.users = await this.profileService.getMany(users);
          const lists: string[] = boardSnapshot.get('lists');
          board.lists = await this.baseListService.getMany(lists);
        }
      }
    }

    return board;
  }
}
