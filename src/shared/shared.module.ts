import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';

@Module({
  providers: [SharedService],
  exports: [SharedService], // ⭐ 必須 export 才能給其他 module 用
})
export class SharedModule {}
