import { auth } from 'firebase-admin';
import { DocumentReference, WriteBatch } from '@google-cloud/firestore';
import { EventContext } from 'firebase-functions';
import { db } from '../core/config/firestore.config';

export class ProfileTrigger {
  async createProfile(user: auth.UserRecord, context: EventContext) {
    try {
      const batch: WriteBatch = db.batch();
      const profileRef: DocumentReference = db
        .collection('profiles')
        .doc(user.uid);

      batch.create(profileRef, {
        email: user.email,
        username: user.displayName ?? user.email,
      });
      await batch.commit();
    } catch (err) {
      console.error(err.message);
    }
  }
}

export const profileTrigger: ProfileTrigger = new ProfileTrigger();
