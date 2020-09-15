import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  imports: [CoreModule],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
