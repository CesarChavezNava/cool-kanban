import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [CoreModule],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
