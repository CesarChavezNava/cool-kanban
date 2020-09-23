import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [CoreModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
