import { Controller, Query, Post, Get } from '@nestjs/common';
import { SidecarAddOnService } from './service/SidecarAddOnService';

@Controller('sidecaraddons')
export class SidecarAddOnsController {
  constructor(private _sidecarAddOnService: SidecarAddOnService) {}

  @Get('')
  sideCarAddOns(@Query('api-version') apiVersion: string) {
    return this._sidecarAddOnService.getSidecarAddOns();
  }
}
