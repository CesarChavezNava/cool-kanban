import { DocumentSnapshot } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { List } from '../entities/list.entity';
import { db } from '../config/firestore.config';
import { BaseCardService } from './base-card.service';

@Injectable()
export class BaseListService {
  constructor(private baseCardService: BaseCardService) {}

  async getMany(ids: string[]): Promise<List[]> {
    const lists: List[] = [] as List[];
    for (const id of ids) {
      const list: List = await this.get(id);
      lists.push(list);
    }

    return lists;
  }

  async get(id: string): Promise<List> {
    const listSnapshot: DocumentSnapshot = await db
      .collection('lists')
      .doc(id)
      .get();

    const list: List = await this.fill(listSnapshot);
    return list;
  }

  private async fill(listSnapshot: DocumentSnapshot): Promise<List> {
    const list: List = {} as List;
    if (listSnapshot.exists) {
      if (listSnapshot.data) {
        list.id = listSnapshot.id;
        list.name = listSnapshot.get('name');

        const cards: string[] = listSnapshot.get('cards');
        list.cards = await this.baseCardService.getMany(cards);
      }
    }

    return list;
  }
}
