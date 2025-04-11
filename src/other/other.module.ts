import { Module } from '@nestjs/common';
import { OtherService } from './other.service';
import { SharedService } from 'src/shared/shared.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule], // ⭐ 必須 imports 才能注入
  providers: [OtherService],
  exports: [OtherService],
})
export class OtherModule {}
