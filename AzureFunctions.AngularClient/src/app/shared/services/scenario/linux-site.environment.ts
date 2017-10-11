import { PortalResources } from './../../models/portal-resources';
import { TranslateService } from '@ngx-translate/core';
import { ScenarioCheckInput, ScenarioResult } from './scenario.models';
import { ScenarioIds } from './../../models/constants';
import { Environment } from './scenario.models';

export class LinuxSiteEnvironment extends Environment {
    name = 'LinuxSite';

    constructor(translateService: TranslateService) {
        super();

        const disabledResult: ScenarioResult = {
            status: 'disabled',
            data: translateService.instant(PortalResources.featureNotSupportedForLinuxApps)
        };

        this.scenarioChecks[ScenarioIds.enableAuth] = {
            id: ScenarioIds.enableAuth,
            runCheck: () => disabledResult
        };

        this.scenarioChecks[ScenarioIds.enableMsi] = {
            id: ScenarioIds.enableMsi,
            runCheck: () => disabledResult
        };

        this.scenarioChecks[ScenarioIds.enableNetworking] = {
            id: ScenarioIds.enableNetworking,
            runCheck: () => disabledResult
        };

        this.scenarioChecks[ScenarioIds.enablePushNotifications] = {
            id: ScenarioIds.enablePushNotifications,
            runCheck: () => disabledResult
        };

        this.scenarioChecks[ScenarioIds.enableConsole] = {
            id: ScenarioIds.enableConsole,
            runCheck: () => disabledResult
        };

        this.scenarioChecks[ScenarioIds.enableAppServiceEditor] = {
            id: ScenarioIds.enableAppServiceEditor,
            runCheck: () => disabledResult
        };

        this.scenarioChecks[ScenarioIds.enableExtensions] = {
            id: ScenarioIds.enableExtensions,
            runCheck: () => disabledResult
        };

        this.scenarioChecks[ScenarioIds.enableLogStream] = {
            id: ScenarioIds.enableLogStream,
            runCheck: () => disabledResult
        };

        this.scenarioChecks[ScenarioIds.enableProcessExplorer] = {
            id: ScenarioIds.enableProcessExplorer,
            runCheck: () => disabledResult
        };
    }

    public isCurrentEnvironment(input?: ScenarioCheckInput): boolean {
        if (input && input.site) {
            return input.site.kind && input.site.kind.toLowerCase().indexOf('linux') > -1;
        }

        return false;
    }
}
