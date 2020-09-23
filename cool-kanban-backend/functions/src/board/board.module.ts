import { Module } from '@nestjs/common';

import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
