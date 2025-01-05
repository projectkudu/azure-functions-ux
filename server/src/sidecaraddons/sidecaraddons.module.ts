import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { SidecarAddOnsController } from './sidecaraddons.controller';
import { SidecarAddOnService } from './service/SidecarAddOnService';

@Module({
  imports: [SharedModule],
  controllers: [SidecarAddOnsController],
  providers: [SidecarAddOnService],
})
export class SidecarAddOnsModule {}
