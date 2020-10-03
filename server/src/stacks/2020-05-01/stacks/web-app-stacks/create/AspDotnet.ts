import { WebAppCreateStack } from '../../../models/WebAppStackModel';

export const aspDotnetCreateStack: WebAppCreateStack = {
  displayText: 'ASP.NET',
  value: 'ASP.NET',
  sortOrder: 0,
  versions: [
    {
      displayText: 'ASP.NET V4.8',
      value: 'V4.8',
      sortOrder: 0,
      supportedPlatforms: [
        {
          os: 'windows',
          isPreview: false,
          isDeprecated: false,
          isHidden: false,
          applicationInsightsEnabled: true,
          remoteDebuggingEnabled: false,
          runtimeVersion: 'v4.0',
          sortOrder: 0,
          githubActionSettings: {
            supported: true,
            recommendedVersion: '3.1',
          },
        },
      ],
    },
    {
      displayText: 'ASP.NET V3.5',
      value: 'V3.5',
      sortOrder: 1,
      supportedPlatforms: [
        {
          os: 'windows',
          isPreview: false,
          isDeprecated: false,
          isHidden: false,
          applicationInsightsEnabled: true,
          remoteDebuggingEnabled: false,
          runtimeVersion: 'v2.0',
          sortOrder: 0,
          githubActionSettings: {
            supported: true,
            recommendedVersion: '2.1',
          },
        },
      ],
    },
  ],
};
