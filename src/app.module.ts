import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { OtherModule } from './other/other.module';


@Module({
  imports: [
    SharedModule,
    OtherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
