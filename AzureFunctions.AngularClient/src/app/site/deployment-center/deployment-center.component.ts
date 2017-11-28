import { SiteConfig } from '../../shared/models/arm/site-config';
import { ArmObj } from '../../shared/models/arm/arm-obj';
import { CacheService } from '../../shared/services/cache.service';
import { SiteData, TreeViewInfo } from '../../tree-view/models/tree-view-info';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription as RxSubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import { BusyStateScopeManager } from './../../busy-state/busy-state-scope-manager';
import { AuthzService } from '../../shared/services/authz.service';
import { AiService } from '../../shared/services/ai.service';
import { Component, Input, OnInit } from '@angular/core';
import { BroadcastService } from 'app/shared/services/broadcast.service';
import { BroadcastEvent } from 'app/shared/models/broadcast-event';

@Component({
    selector: 'app-deployment-center',
    templateUrl: './deployment-center.component.html',
    styleUrls: ['./deployment-center.component.scss']
})
export class DeploymentCenterComponent implements OnInit {
    public viewInfoStream: Subject<TreeViewInfo<SiteData>>;
    private _viewInfoSubscription: RxSubscription;
    @Input()
    set viewInfoInput(viewInfo: TreeViewInfo<SiteData>) {
        this.viewInfoStream.next(viewInfo);
    }

    private _writePermission = true;
    private _readOnlyLock = false;
    public hasWritePermissions = true;

    private _siteConfigObject: ArmObj<SiteConfig>;
    private _busyManager: BusyStateScopeManager;

    public resourceId: string;

    public showFTPDashboard = false;
    public showWebDeployDashboard = false;

    constructor(
        private _aiService: AiService,
        private _authZService: AuthzService,
        private _cacheService: CacheService,
        broadcastService: BroadcastService
    ) {
        this._busyManager = new BusyStateScopeManager(broadcastService, 'site-tabs');

        this.viewInfoStream = new Subject<TreeViewInfo<SiteData>>();
        this._viewInfoSubscription = this.viewInfoStream
            .switchMap(viewInfo => {
                this._busyManager.setBusy();
                this.resourceId = viewInfo.resourceId;
                this._siteConfigObject = null;
                return Observable.zip(
                    this._cacheService.getArm(`${viewInfo.resourceId}/config/web`),
                    this._authZService.hasPermission(viewInfo.resourceId, [AuthzService.writeScope]),
                    this._authZService.hasReadOnlyLock(viewInfo.resourceId),
                    (sc, wp, rl) => ({
                        siteConfig: sc.json(),
                        writePermission: wp,
                        readOnlyLock: rl
                    })
                );
            })
            .do(null, error => {
                this._siteConfigObject = null;
                this._aiService.trackEvent('/errors/deployment-center', error);
               this._busyManager.clearBusy();
            })
            .retry()
            .subscribe(r => {
                this._siteConfigObject = r.siteConfig;
                this._writePermission = r.writePermission;
                this._readOnlyLock = r.readOnlyLock;
                this.hasWritePermissions = r.writePermission && !r.readOnlyLock;
                this._busyManager.clearBusy();
            });
            broadcastService.getEvents<TreeViewInfo<any>>(BroadcastEvent.ReloadDeploymentCenter).subscribe(r=> {
                this._cacheService.clearArmIdCachePrefix(`${this.viewInfoInput.resourceId}/config/web`);
                this.refreshedSCMType();
            }); 
        }

    refreshedSCMType() {
        this.viewInfoStream.next(this.viewInfoInput);
    }

    get DeploymentSetUpComplete() {
        return this._siteConfigObject && this._siteConfigObject.properties.scmType !== 'None';
    }

    get ScmType() {
        return this._siteConfigObject && this._siteConfigObject.properties.scmType;
    }

    ngOnInit() {}
}
