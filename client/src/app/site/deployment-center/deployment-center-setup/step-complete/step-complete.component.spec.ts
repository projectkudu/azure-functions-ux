import { StepCompleteComponent } from './step-complete.component';
import { ComponentFixture, fakeAsync, TestBed, async, tick } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DeploymentCenterStateManager } from '../wizard-logic/deployment-center-state-manager';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/concatMap';
import 'rxjs/observable/interval';
import { Injectable, Directive, HostListener } from '@angular/core';
import { BroadcastService } from '../../../../shared/services/broadcast.service';
import { LogService } from '../../../../shared/services/log.service';
import { MockLogService } from '../../../../shared/test-mocks/log.service.mock';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { By } from '@angular/platform-browser';
import { BroadcastEvent } from '../../../../shared/models/broadcast-event';

describe('StepCompleteComponent', () => {
    let buildStepTest: StepCompleteComponent;
    let testFixture: ComponentFixture<StepCompleteComponent>;
    let wizardService: MockDeploymentCenterStateManager;
    let broadcastService: BroadcastService;
    let logService: MockLogService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StepCompleteComponent, MockPreviousStepDirective],
            providers: [
                { provide: DeploymentCenterStateManager, useClass: MockDeploymentCenterStateManager },
                { provide: LogService, useClass: MockLogService },
                { provide: BroadcastService, useValue: new BroadcastService(null) }
            ],
            imports: [TranslateModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        testFixture = TestBed.createComponent(StepCompleteComponent);
        buildStepTest = testFixture.componentInstance;
        testFixture.detectChanges();

        wizardService = TestBed.get(DeploymentCenterStateManager);
        broadcastService = TestBed.get(BroadcastService);
        logService = TestBed.get(LogService);
    });

    describe('init', () => {
        it('should create', fakeAsync(() => {
            expect(buildStepTest).toBeTruthy();
        }));

        it('should get current resource id from wizard', fakeAsync(() => {
            wizardService.resourceIdStream$.next('test');
            expect(buildStepTest.resourceId).toBe('test');
        }));

        it('back button should trigger wizard to go back', fakeAsync(() => {
            const backButton = testFixture.debugElement.query(By.directive(MockPreviousStepDirective));
            const directiveInstance = backButton.injector.get(MockPreviousStepDirective);
            expect(directiveInstance.clicked).toBeFalsy();
            backButton.nativeElement.click();
            expect(directiveInstance.clicked).toBeTruthy();
        }));
    });

    describe('Automated Solution', () => {
        it('finish button should trigger save', fakeAsync((done) => {
            const button = testFixture.debugElement.query(By.css('#step-complete-finish-button')).nativeElement;
            expect(wizardService.deployTriggered).toBeFalsy();
            const spy = spyOn(broadcastService, 'broadcastEvent');
            button.click();
            tick();
            expect(wizardService.deployTriggered).toBeTruthy();
            expect(spy).toHaveBeenCalledWith(BroadcastEvent.ReloadDeploymentCenter);
        }));

        it('save failures should clear busy state and log', fakeAsync(() => {
            const button = testFixture.debugElement.query(By.css('#step-complete-finish-button')).nativeElement;
            const clearBusySpy = spyOn(buildStepTest, 'clearBusy');
            const errorLogSpy = spyOn(logService, 'error');
            wizardService.fail = true;
            button.click();
            tick();
            expect(clearBusySpy).toHaveBeenCalled();
            expect(errorLogSpy).toHaveBeenCalled();
        }));
    });
    describe('Manual Solution', () => {
        it('ftp should show "Show Dashboard" button', fakeAsync(() => {
            wizardService.wizardValues.sourceProvider = 'ftp';
            tick();
            expect(buildStepTest.showDashboard).toBeTruthy();
        }));

        it('web deploy should show "Show Dashboard" button', fakeAsync(() => {
            wizardService.wizardValues.sourceProvider = 'webdeploy';
            tick();
            expect(buildStepTest.showDashboard).toBeTruthy();
        }));

        it('ftp should not show "Save" button', fakeAsync(() => {
            wizardService.wizardValues.sourceProvider = 'ftp';
            tick();
            expect(buildStepTest.showSave).toBeFalsy();
        }));

        it('web deploy should not show "Save" button', fakeAsync(() => {
            wizardService.wizardValues.sourceProvider = 'webdeploy';
            tick();
            expect(buildStepTest.showSave).toBeFalsy();
        }));

        it('click "show dashboard" should send message to show dashboard', fakeAsync(() => {
            wizardService.wizardValues.sourceProvider = 'webdeploy';
            testFixture.detectChanges();
            tick();
            const button = testFixture.debugElement.query(By.css('#step-complete-show-dashboard-button')).nativeElement;
            const spy = spyOn(broadcastService, 'broadcastEvent');
            button.click();
            expect(spy).toHaveBeenCalledWith(BroadcastEvent.ReloadDeploymentCenter, 'webdeploy');
        }));
    });
});

@Injectable()
class MockDeploymentCenterStateManager {
    public wizardValues = {
        buildProvider: 'kudu',
        sourceProvider: 'test'
    };

    public resourceIdStream$ = new ReplaySubject<string>(1);
    public deployTriggered = false;
    public fail = false;
    public deploy() {
        this.deployTriggered = true;
        if (this.fail) {
            return Observable.of(null).map(x => {
                throw new Error('err');
            });
        }
        return Observable.of(null);
    }
}

@Directive({
    selector: '[previousStep]'
})
export class MockPreviousStepDirective {
    public clicked = false;
    @HostListener('click', ['$event']) onClick(): void {
        this.clicked = true;
    }
}