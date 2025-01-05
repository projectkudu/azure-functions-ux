export interface AddOnConfig {
  addOnAttributes: AddOnAttribute[];
  sidecarImages: SidecarImage[];
}

export interface AddOnAttribute {
  displayText: string;
  id: string;
  type: string;
  isRequired: boolean;
}

export interface SidecarImage {
  releaseChannel: string;
  displayText: string;
  value: string;
  isEarlyAccess: boolean;
  deprecated: boolean;
  supportedLinuxFxVersions: string[];
  sitecontainerMetadata: SitecontainerMetadata;
}

export interface SitecontainerMetadata {
  appSettingMappings: AppSettingMapping[];
  volumeMappings: VolumeMapping[];
  port: any;
  startUpCommand: any;
}

export interface AppSettingMapping {
  appSettingName: string;
  environmentVariableName: any;
}

export interface VolumeMapping {
  volumeSubPath: any;
  containerMountPath: any;
  readOnly: boolean;
}

export interface SidecarAddOn {
  id: string;
  displayText: string;
  organization: string;
  legalInformation: string;
  value: string;
  supportedOs: string;
  supportedFeatures: string[];
  additionalInformation: string;
  addOnConfig: AddOnConfig;
}
