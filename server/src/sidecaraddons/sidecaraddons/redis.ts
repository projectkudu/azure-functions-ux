import { SidecarAddOn } from '../models/SidecarAddOnModel';

const getRedisSidecarAddOn: () => SidecarAddOn = () => {
  return {
    id: 'redis',
    displayText: '<ADD_ON_NAME_DISPLAY_TEXT_DESCRIPTION>',
    organization: 'redis',
    legalInformation: '<ADD_ON_LEGAL_INFORMATION>',
    value: 'redis',
    supportedOs: 'Linux',
    supportedFeatures: ['LOGS', 'TRACES'],
    additionalInformation: '<Any Extra information for Addon>',
    addOnConfig: {
      addOnAttributes: [
        {
          displayText: '<ADD_ON_ATTRIBUTE_DISPLAY_TEXT>',
          id: '<ADD_ON_ATTRIBUTE_ID>',
          type: '<WELL-DEFINED-TYPE>',
          isRequired: true,
        },
      ],
      sidecarImages: [
        {
          releaseChannel: 'Latest',
          displayText: '<VENDOR_IMAGE_1>',
          value: '<IMAGE_PATH>',
          isEarlyAccess: true,
          deprecated: false,
          supportedLinuxFxVersions: ['DOTNETCORE|*', 'PYTHON|*'],
          sitecontainerMetadata: {
            appSettingMappings: [
              {
                appSettingName: '<ADD_ON_ATTRIBUTE_ID>',
                environmentVariableName: null,
              },
            ],
            volumeMappings: [
              {
                volumeSubPath: null,
                containerMountPath: null,
                readOnly: false,
              },
            ],
            port: null,
            startUpCommand: null,
          },
        },
      ],
    },
  };
};

export const redisSidecarAddOn: SidecarAddOn = getRedisSidecarAddOn();
