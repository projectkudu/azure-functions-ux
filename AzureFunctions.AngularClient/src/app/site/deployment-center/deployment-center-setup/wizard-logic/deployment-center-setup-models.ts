export class WizardForm {
    public sourceProvider: sourceControlProvider;
    public buildProvider: sourceControlProvider;
    public sourceSettings: SourceSettings;
    public buildSettings: VstsBuildSettings;
}

export class VstsTestEnvironment {
    public enabled: boolean;
    public AppServicePlanId: string;
    public AppName: string;
}
export class VstsBuildSettings {
    public createNewVsoAccount: boolean;
    public vstsAccount: string;
    public vstsProject: string;
    public location: string;
    public applicationFramework: string;
    public testEnvironment: VstsTestEnvironment;
    public deploymentSlot: string;
    public workerDirecory: string;
    public nodejsTaskRunner: string;
    public pythonSettings: any;
}

export class PythonSettings {
    public framework: string;
    public version: string;
    public flaskProjectName: string;
    public djangoSettingsModule: string;
}
export class SourceSettings {
    public repoUrl: string;
    public branch: string;
    public isManualIntegration: boolean;
    public deploymentRollbackEnabled: boolean;
    public isMercurial: boolean;
}
export class DeploymentCenterSetupModel {
    public sourceProvider: sourceControlProvider;
    public buildProvider: sourceControlProvider;
    public sourceSettings: SourceSettings;
    public vstsBuildSettings: VstsBuildSettings;

}

export type sourceControlProvider = 'dropbox' | 'onedrive' | 'github' | 'vsts' | 'external' | 'bitbucket' | 'localgit' | 'ftp' | 'webdeploy' | 'kudu';
