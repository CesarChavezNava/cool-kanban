import {
  DocumentReference,
  DocumentSnapshot,
  FieldValue,
  WriteBatch,
} from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';

import { db } from '../config/firebase.config';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class BaseProfileService {
  async getMany(uids: string[]): Promise<Profile[]> {
    const profiles: Profile[] = [] as Profile[];
    for (const uid of uids) {
      const profile: Profile = await this.get(uid);
      profiles.push(profile);
    }

    return profiles;
  }

  async get(uid: string): Promise<Profile> {
    const profileSnapshot: DocumentSnapshot = await db
      .collection('profiles')
      .doc(uid)
      .get();

    const profile: Profile = await this.fill(profileSnapshot);
    return profile;
  }

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

  async fill(profileSnapshot: DocumentSnapshot): Promise<Profile> {
    const profile: Profile = {} as Profile;
    if (profileSnapshot.exists) {
      if (profileSnapshot.data) {
        profile.uid = profileSnapshot.id;
        profile.email = profileSnapshot.get('email');
        profile.username = profileSnapshot.get('username');
        profile.boards = profileSnapshot.get('boards');
      }
    }

    return profile;
  }
}
