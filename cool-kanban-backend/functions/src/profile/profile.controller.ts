import { Response } from 'express';
import { Body, Controller, Get, HttpStatus, Put, Res } from '@nestjs/common';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

import { Profile } from '../core/entities/profile.entity';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async get(
    @Body('user') user: UserRecord,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const profile: Profile = await this.profileService.get(user.uid);
      res.status(HttpStatus.OK).send(profile);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put()
  async update(
    @Body('user') user: UserRecord,
    @Body() dto: UpdateProfileDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      console.log('dto', dto);
      const profile: Profile = await this.profileService.update(user.uid, dto);
      res.status(HttpStatus.OK).send(profile);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
