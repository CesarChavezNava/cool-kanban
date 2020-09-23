import { DocumentReference, WriteBatch } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';

import { BaseBoardService } from '../core/services/base-board.service';
import { CreateListDto, UpdateListDto } from './dtos';
import { db } from '../core/config/firebase.config';
import { List } from '../core/entities/list.entity';

@Injectable()
export class ListService {
  constructor(private baseBoardService: BaseBoardService) {}

  async create(dto: CreateListDto): Promise<List> {
    const batch: WriteBatch = db.batch();

    const listRef: DocumentReference = db.collection('lists').doc();
    batch.create(listRef, {
      name: dto.name,
      cards: [],
    });

    await this.baseBoardService.addListToBoard(batch, dto.idBoard, listRef.id);
    await batch.commit();

    const list: List = {
      id: listRef.id,
      name: dto.name,
      cards: [],
    } as List;

    return list;
  }

  async update(id: string, dto: UpdateListDto): Promise<List> {
    const batch: WriteBatch = db.batch();

    const listRef: DocumentReference = db.collection('lists').doc(id);
    batch.update(listRef, {
      name: dto.name,
    });
    await batch.commit();

    const list: List = {
      id: id,
      name: dto.name,
    } as List;

    return list;
  }

  async moveTo(id: string, cards: string[]): Promise<void> {
    const batch: WriteBatch = db.batch();

    const listRef: DocumentReference = db.collection('lists').doc(id.trim());
    batch.update(listRef, {
      cards: [...cards],
    });

    await batch.commit();
  }

  async moveFromTo(
    sourceIdList: string,
    destIdList: string,
    sourceCards: string[],
    destCards: string[],
  ): Promise<void> {
    const batch: WriteBatch = db.batch();

    const sourceListRef: DocumentReference = db
      .collection('lists')
      .doc(sourceIdList.trim());
    batch.update(sourceListRef, {
      cards: [...sourceCards],
    });

    const destListRef: DocumentReference = db
      .collection('lists')
      .doc(destIdList.trim());
    batch.update(destListRef, {
      cards: [...destCards],
    });

    await batch.commit();
  }

  async delete(idBoard: string, id: string): Promise<void> {
    const batch: WriteBatch = db.batch();

    await this.baseBoardService.removeListFromBoard(batch, idBoard, id);

    if (true) {
      // TODO: Crear una variable de entorno para eliminar del tablero la lista
      const listRef: DocumentReference = db.collection('lists').doc(id);
      batch.delete(listRef);
    }

    await batch.commit();
  }
}
