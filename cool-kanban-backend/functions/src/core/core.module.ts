import { Module } from '@nestjs/common';

import { BaseBoardService } from './services/base-board.service';
import { BaseCardService } from './services/base-card.service';
import { BaseListService } from './services/base-list.service';
import { BaseProfileService } from './services/base-profile.service';

@Module({
  providers: [
    BaseBoardService,
    BaseCardService,
    BaseListService,
    BaseProfileService,
  ],
  exports: [
    BaseBoardService,
    BaseCardService,
    BaseListService,
    BaseProfileService,
  ],
})
export class CoreModule {}
