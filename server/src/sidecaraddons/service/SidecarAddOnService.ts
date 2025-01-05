import { Injectable } from '@nestjs/common';
import { SidecarAddOn } from '../models/SidecarAddOnModel';
import { redisSidecarAddOn } from '../sidecaraddons/redis';

@Injectable()
export class SidecarAddOnService {
  getSidecarAddOns(): SidecarAddOn[] {
    const redisSidecarAddOnCopy = JSON.parse(JSON.stringify(redisSidecarAddOn));

    let sidecarAddOns: SidecarAddOn[] = [redisSidecarAddOnCopy];

    return sidecarAddOns;
  }
}
