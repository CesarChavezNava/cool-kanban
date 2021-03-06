import { DocumentReference, WriteBatch } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';

import { BaseProfileService } from '../core/services/base-profile.service';
import { db } from '../core/config/firebase.config';
import { Profile } from '../core/entities/profile.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private baseProfileService: BaseProfileService) {}

  async get(uid: string): Promise<Profile> {
    return await this.baseProfileService.get(uid);
  }

  async update(uid: string, dto: UpdateProfileDto): Promise<Profile> {
    const batch: WriteBatch = db.batch();
    const profileRef: DocumentReference = db.collection('profiles').doc(uid);

    batch.update(profileRef, {
      urlImage: dto.urlImage ?? null,
      username: dto.username,
    });
    await batch.commit();

    const profile: Profile = {
      uid: uid,
      email: dto.email,
      urlImage: dto.urlImage ?? null,
      username: dto.username,
    } as Profile;

    return profile;
  }
}
