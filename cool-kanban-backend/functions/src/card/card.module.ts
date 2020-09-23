import { Module } from '@nestjs/common';

import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
