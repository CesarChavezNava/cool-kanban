import { DocumentSnapshot, Timestamp } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';

import { Card } from '../entities/card.entity';
import { db } from '../config/firebase.config';

@Injectable()
export class BaseCardService {
  async getMany(ids: string[]): Promise<Card[]> {
    console.log('cards', ids);
    const cards: Card[] = [] as Card[];
    for (const id of ids) {
      const card: Card = await this.get(id);
      cards.push(card);
    }

    return cards;
  }

  async get(id: string): Promise<Card> {
    const cardSnapshot: DocumentSnapshot = await db
      .collection('cards')
      .doc(id)
      .get();

    const card: Card = await this.fill(cardSnapshot);
    return card;
  }

  private async fill(cardSnapshot: DocumentSnapshot): Promise<Card> {
    const card: Card = {} as Card;
    if (cardSnapshot.exists) {
      if (cardSnapshot.data) {
        card.id = cardSnapshot.id;
        card.creationDate = (<Timestamp>(
          cardSnapshot.get('creationDate')
        )).toDate();
        card.description = cardSnapshot.get('description');
        card.dueDate = (<Timestamp>cardSnapshot.get('dueDate')).toDate();
        card.priority = cardSnapshot.get('priority');
        card.title = cardSnapshot.get('title');
      }
    }

    return card;
  }
}
