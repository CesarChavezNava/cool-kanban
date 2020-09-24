import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import bodyParser from 'body-parser';
import cors from 'cors';

import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { BoardMiddleware } from './board/board.middleware';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [BoardModule, CardModule, CoreModule, ProfileModule, ListModule],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer): Promise<void> {
    const corsHandler = cors({ origen: false });

    consumer
      .apply(corsHandler)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(bodyParser.json())
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(bodyParser.urlencoded({ extended: false }))
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(BoardMiddleware)
      .forRoutes({ path: 'boards/:id', method: RequestMethod.GET });
  }
}
