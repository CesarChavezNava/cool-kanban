import { Module } from '@nestjs/common';
import { BaseBoardService } from './services/base-board.service';
import { BaseProfileService } from './services/base-profile.service';
import { BaseListService } from './services/base-list.service';
import { BaseCardService } from './services/base-card.service';

@Module({
  providers: [BaseBoardService, BaseProfileService, BaseListService, BaseCardService],
  exports: [BaseBoardService, BaseProfileService, BaseListService],
})
export class CoreModule {}
