import {
  DocumentReference,
  DocumentSnapshot,
  WriteBatch,
} from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { BaseProfileService } from '../core/services/base-profile.service';
import { db } from '../core/config/firestore.config';
import { Profile } from '../core/entities/profile.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private baseProfileService: BaseProfileService) {}

  async get(uid: string): Promise<Profile> {
    const profileSnapshot: DocumentSnapshot = await db
      .collection('profiles')
      .doc(uid)
      .get();

    const profile: Profile = await this.baseProfileService.fill(
      profileSnapshot,
    );
    return profile;
  }

  async update(uid: string, dto: UpdateProfileDto): Promise<Profile> {
    const batch: WriteBatch = db.batch();
    const profileRef: DocumentReference = db.collection('profiles').doc(uid);

    batch.update(profileRef, {
      email: dto.email,
      urlImage: dto.urlImage,
      username: dto.username,
    });
    await batch.commit();

    const profile: Profile = {
      uid: uid,
      email: dto.email,
      urlImage: dto.urlImage,
      username: dto.username,
    } as Profile;

    return profile;
  }
}
