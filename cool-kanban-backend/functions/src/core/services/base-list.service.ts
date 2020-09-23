import {
  DocumentReference,
  DocumentSnapshot,
  FieldValue,
  WriteBatch,
} from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';

import { BaseCardService } from './base-card.service';
import { db } from '../config/firebase.config';
import { List } from '../entities/list.entity';

@Injectable()
export class BaseListService {
  constructor(private baseCardService: BaseCardService) {}

  async getMany(ids: string[]): Promise<List[]> {
    const lists: List[] = [] as List[];
    console.log('list', ids);
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

  async addCardToList(
    batch: WriteBatch,
    id: string,
    idCard: string,
  ): Promise<void> {
    const listRef: DocumentReference = db.collection('lists').doc(id);

    batch.update(listRef, {
      cards: FieldValue.arrayUnion(idCard),
    });
  }

  async removeCardFromList(batch: WriteBatch, id: string, idCard: string) {
    const listRef: DocumentReference = db.collection('lists').doc(id);

    batch.update(listRef, {
      cards: FieldValue.arrayRemove(idCard),
    });
  }

  private async fill(listSnapshot: DocumentSnapshot): Promise<List> {
    const list: List = {} as List;
    if (listSnapshot.exists) {
      if (listSnapshot.data) {
        list.id = listSnapshot.id;
        list.name = listSnapshot.get('name');

        const cards: string[] = listSnapshot.get('cards');

        if (cards) {
          list.cards = await this.baseCardService.getMany(cards);
        } else {
          list.cards = [];
        }
      }
    }

    return list;
  }
}
