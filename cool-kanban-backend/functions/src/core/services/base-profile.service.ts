import {
  DocumentReference,
  DocumentSnapshot,
  FieldValue,
  WriteBatch,
} from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { db } from '../config/firestore.config';

@Injectable()
export class BaseProfileService {
  async getBoardsByUID(uid: string): Promise<string[]> {
    let boards: string[];
    const profileSnapshot: DocumentSnapshot = await db
      .collection('profiles')
      .doc(uid)
      .get();

    if (profileSnapshot.exists) {
      if (profileSnapshot.data) {
        boards = profileSnapshot.get('boards');
      }
    }
    return boards;
  }

  async addBoardToProfile(
    batch: WriteBatch,
    uid: string,
    idBoard: string,
  ): Promise<void> {
    const profileRef: DocumentReference = db.collection('profiles').doc(uid);

    batch.update(profileRef, {
      boards: FieldValue.arrayUnion(idBoard),
    });
  }

  async removeBoardFromProfile(
    batch: WriteBatch,
    uid: string,
    idBoard: string,
  ): Promise<void> {
    const profileRef: DocumentReference = db.collection('profiles').doc(uid);

    batch.update(profileRef, {
      boards: FieldValue.arrayRemove(idBoard),
    });
  }
}
