import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';
import { ListModule } from './list/list.module';
import { CardModule } from './card/card.module';
import { AuthMiddleware } from './core/middlewares/auth.middleware';

import cors from 'cors';
import bodyParser from 'body-parser';

@Module({
  imports: [BoardModule, CoreModule, ProfileModule, ListModule, CardModule],
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
  }
}
