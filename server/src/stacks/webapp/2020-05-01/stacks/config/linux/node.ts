import { WebAppConfigStack } from '../../../stack.model';

export const nodeLinuxConfigStack: WebAppConfigStack = {
  id: null,
  name: 'node',
  type: 'Microsoft.Web/availableStacks?osTypeSelected=Linux',
  properties: {
    name: 'node',
    display: 'Node',
    dependency: null,
    majorVersions: [
      {
        displayVersion: 'LTS',
        runtimeVersion: 'NODE|lts',
        isDefault: true,
        minorVersions: [
          {
            displayVersion: 'LTS',
            runtimeVersion: 'NODE|lts',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '12 LTS',
        runtimeVersion: 'NODE|12-lts',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '12 LTS',
            runtimeVersion: 'NODE|12-lts',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '10 LTS',
        runtimeVersion: 'NODE|10-lts',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '10 LTS',
            runtimeVersion: 'NODE|10-lts',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '8 LTS',
        runtimeVersion: 'NODE|8-lts',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '8',
            runtimeVersion: 'NODE|8-lts',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '6 LTS',
        runtimeVersion: 'NODE|6-lts',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '6',
            runtimeVersion: 'NODE|6-lts',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '4.4',
        runtimeVersion: 'NODE|4.4',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '4.4',
            runtimeVersion: 'NODE|4.4',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '4.5',
        runtimeVersion: 'NODE|4.5',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '4.5',
            runtimeVersion: 'NODE|4.5',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '4.8',
        runtimeVersion: 'NODE|4.8',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '4.8',
            runtimeVersion: 'NODE|4.8.7',
            isDefault: false,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '6.2',
        runtimeVersion: 'NODE|6.2',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '6.2',
            runtimeVersion: 'NODE|6.2',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '6.6',
        runtimeVersion: 'NODE|6.6',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '6.6',
            runtimeVersion: 'NODE|6.6',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '6.9',
        runtimeVersion: 'NODE|6.9',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '6.9',
            runtimeVersion: 'NODE|6.9',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '6.10',
        runtimeVersion: 'NODE|6.10',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '6.10',
            runtimeVersion: 'NODE|6.10',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '6.11',
        runtimeVersion: 'NODE|6.11',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '6.11',
            runtimeVersion: 'NODE|6.11',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '8.0',
        runtimeVersion: 'NODE|8.0',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '8.0',
            runtimeVersion: 'NODE|8.0',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '8.1',
        runtimeVersion: 'NODE|8.1',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '8.1',
            runtimeVersion: 'NODE|8.1',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '8.2',
        runtimeVersion: 'NODE|8.2',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '8.2',
            runtimeVersion: 'NODE|8.2',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '8.8',
        runtimeVersion: 'NODE|8.8',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '8.8',
            runtimeVersion: 'NODE|8.8',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '8.9',
        runtimeVersion: 'NODE|8.9',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '8.9',
            runtimeVersion: 'NODE|8.9',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '8.11',
        runtimeVersion: 'NODE|8.11',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '8.11',
            runtimeVersion: 'NODE|8.11',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '8.12',
        runtimeVersion: 'NODE|8.12',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '8.12',
            runtimeVersion: 'NODE|8.12',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '9.4',
        runtimeVersion: 'NODE|9.4',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '9.4',
            runtimeVersion: 'NODE|9.4',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '10.1',
        runtimeVersion: 'NODE|10.1',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '10.1',
            runtimeVersion: 'NODE|10.1',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '10.10',
        runtimeVersion: 'NODE|10.10',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '10.10',
            runtimeVersion: 'NODE|10.10',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '10.12',
        runtimeVersion: 'NODE|10.12',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '10.12',
            runtimeVersion: 'NODE|10.12',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '10.14',
        runtimeVersion: 'NODE|10.14',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '10.14',
            runtimeVersion: 'NODE|10.14',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '10.16',
        runtimeVersion: 'NODE|10.16',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '10.16',
            runtimeVersion: 'NODE|10.16',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
      {
        displayVersion: '12.9',
        runtimeVersion: 'NODE|12.9',
        isDefault: false,
        minorVersions: [
          {
            displayVersion: '12.9',
            runtimeVersion: 'NODE|12.9',
            isDefault: true,
            isRemoteDebuggingEnabled: true,
          },
        ],
        applicationInsights: true,
        isPreview: false,
        isDeprecated: false,
        isHidden: false,
      },
    ],
    frameworks: [],
    isDeprecated: null,
  },
};
