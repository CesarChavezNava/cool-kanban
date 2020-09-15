import {
  DocumentReference,
  FieldValue,
  WriteBatch,
  Timestamp,
} from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { BaseListService } from '../core/services/base-list.service';
import { fs, db } from '../core/config/firestore.config';
import { Card } from '../core/entities/card.entity';
import { CreateCardDto, UpdateCardDto } from './dtos';

@Injectable()
export class CardService {
  constructor(private baseListService: BaseListService) {}

  async create(dto: CreateCardDto): Promise<Card> {
    const batch: WriteBatch = db.batch();

    const today: FieldValue = FieldValue.serverTimestamp();
    const dueDate = fs.Timestamp.fromDate(dto.dueDate);
    const cardRef: DocumentReference = db.collection('cards').doc();
    batch.create(cardRef, {
      createDate: today,
      description: dto.description,
      dueDate: dueDate,
      priority: dto.priority,
      title: dto.title,
    });

    await this.baseListService.addCardToList(batch, dto.idList, cardRef.id);
    await batch.commit();

    const card: Card = {
      id: cardRef.id,
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      creationDate: (<Timestamp>today).toDate(),
      dueDate: dto.dueDate,
    };

    return card;
  }

  async update(id: string, dto: UpdateCardDto): Promise<Card> {
    const batch: WriteBatch = db.batch();
    const dueDate = fs.Timestamp.fromDate(dto.dueDate);
    const cardRef: DocumentReference = db.collection('cards').doc(id);

    batch.update(cardRef, {
      description: dto.description,
      dueDate: dueDate,
      priority: dto.priority,
      title: dto.title,
    });
    await batch.commit();

    const card: Card = {
      id: cardRef.id,
      description: dto.description,
      dueDate: dto.dueDate,
      priority: dto.priority,
      title: dto.title,
    } as Card;

    return card;
  }

  async delete(idList: string, id: string): Promise<void> {
    const batch: WriteBatch = db.batch();

    await this.baseListService.removeCardFromList(batch, idList, id);

    if (true) {
      // TODO: Crear una variable de entorno para eliminar de la lista de cards
      const cardRef: DocumentReference = db.collection('cards').doc(id);
      batch.delete(cardRef);
    }
    await batch.commit();
  }
}
