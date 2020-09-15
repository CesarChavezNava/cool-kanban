import { Response } from 'express';
import { Body, Controller, Put, Res, HttpStatus, Get } from '@nestjs/common';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { Profile } from '../core/entities/profile.entity';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async get(
    //@Body('user') user: UserRecord,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const profile: Profile = await this.profileService.get(
        'ezJf8erEzWRcW37Pt6K4N1cq2Zw1',
      );
      res.status(HttpStatus.OK).send(profile);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  @Put()
  async update(
    //@Body('user') user: UserRecord,
    @Body() dto: UpdateProfileDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const profile: Profile = await this.profileService.update(
        'ezJf8erEzWRcW37Pt6K4N1cq2Zw1',
        dto,
      );
      res.status(HttpStatus.OK).send(profile);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
