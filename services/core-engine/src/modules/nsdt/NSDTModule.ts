import { Module } from '@nestjs/common';
import { NSDTController } from './NSDTController';
import { NSDTService } from './application/NSDTService';

@Module({
  controllers: [NSDTController],
  providers: [NSDTService],
  exports: [NSDTService],
})
export class NSDTModule {}
