import { Module } from '@nestjs/common';
import { EchartsController } from './echarts.controller';
import { EchartsService } from './echarts.service';

@Module({
  controllers: [EchartsController],
  providers: [EchartsService]
})
export class EchartsModule {}
