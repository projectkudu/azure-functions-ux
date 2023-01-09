import { KeyValue } from './portal-models';

export interface StorageAccount {
  primaryEndpoints: KeyValue<string>;
  primaryLocation: string;
  provisioningState: string;
  secondaryLocation: string;
  statusOfPrimary: string;
  statusOfSecondary: string;
  networkAcls: StorageAccountNetworkAcls;
  publicNetworkAccess?: PublicNetworkAccess;
}

export interface StorageAccountNetworkAcls {
  defaultAction: StorageAccountNetworkDefaultAction;
  virtualNetworkRules: StorageAccountVirtualNetworkRule[];
}

export const enum StorageAccountNetworkDefaultAction {
  Allow = 'Allow',
  Deny = 'Deny',
}

export const enum PublicNetworkAccess {
  Enabled = 'Enabled',
  Disabled = 'Disabled',
}

export interface StorageAccountVirtualNetworkRule {
  action: string;
  id: string;
  state: string;
}

export interface BlobContainer {
  defaultEncryptionScope: string;
  deleted: boolean;
  denyEncryptionScopeOverride: boolean;
  hasImmutabilityPolicy: boolean;
  hasLegalHold: boolean;
  immutableStorageWithVersioning: ImmutableStorageWithVersioning;
  enabled: boolean;
  lastModifiedTime: string;
  leaseState: string;
  leaseStatus: string;
  publicAccess: string;
  remainingRetentionDays: number;
}

export interface FileShareContainer {
  lastModifiedTime: string;
  shareQuota: number;
  version: string;
  deleted: true;
  deletedTime: string;
  remainingRetentionDays: number;
  enabledProtocols: FileShareEnabledProtocols;
}

export enum FileShareEnabledProtocols {
  NFS = 'NFS',
  SMB = 'SMB',
}

export interface ImmutableStorageWithVersioning {
  enabled: boolean;
  migrationState?: string;
  timeStamp: string;
}

export interface StorageAccountKeys {
  keys: StorageAccountKey[];
}

export interface StorageAccountKey {
  keyName: string;
  value: string;
  permissions: StorageAccountKeyPermission;
}

export enum StorageAccountKeyPermission {
  Full = 'FULL',
  ReadOnly = 'READ',
}
