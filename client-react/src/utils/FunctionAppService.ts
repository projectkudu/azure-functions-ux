import { ArmObj } from '../models/arm-obj';
import { CommonConstants, WorkerRuntimeLanguages } from './CommonConstants';
import { KeyValue } from '../models/portal-models';
import { Site } from '../models/site/site';
import { getSubscriptionFromResourceId, isLinuxDynamic, isLinuxElastic } from './arm-utils';
import { FlightingUtil } from './flighting-util';

export default class FunctionAppService {
  public static getRFPSetting(appSettings: ArmObj<KeyValue<string>>): string {
    return (
      appSettings.properties[CommonConstants.AppSettingNames.websiteUseZip] ||
      appSettings.properties[CommonConstants.AppSettingNames.websiteRunFromZip] ||
      appSettings.properties[CommonConstants.AppSettingNames.websiteRunFromPackage] ||
      appSettings.properties[CommonConstants.AppSettingNames.enableOryxBuild] ||
      '0'
    );
  }

  public static getWorkerRuntimeSetting(appSettings?: ArmObj<KeyValue<string>>): string {
    return (!!appSettings && appSettings.properties[CommonConstants.AppSettingNames.functionsWorkerRuntime]) || '';
  }

  public static usingRunFromPackage(appSettings: ArmObj<KeyValue<string>>): boolean {
    return FunctionAppService.getRFPSetting(appSettings) !== '0';
  }

  public static usingLocalCache(appSettings: ArmObj<KeyValue<string>>): boolean {
    return (
      !!appSettings.properties[CommonConstants.AppSettingNames.localCacheOptionSettingName] &&
      appSettings.properties[CommonConstants.AppSettingNames.localCacheOptionSettingName] === CommonConstants.localCacheOptionSettingValue
    );
  }

  public static usingPythonWorkerRuntime(appSettings: ArmObj<KeyValue<string>>): boolean {
    const workerRuntime = FunctionAppService.getWorkerRuntimeSetting(appSettings);
    return !!workerRuntime && workerRuntime === WorkerRuntimeLanguages.python;
  }

  public static usingJavaWorkerRuntime(appSettings: ArmObj<KeyValue<string>>): boolean {
    const workerRuntime = FunctionAppService.getWorkerRuntimeSetting(appSettings);
    return !!workerRuntime && workerRuntime === WorkerRuntimeLanguages.java;
  }

  public static usingNodeWorkerRuntime(appSettings: ArmObj<KeyValue<string>>): boolean {
    const workerRuntime = FunctionAppService.getWorkerRuntimeSetting(appSettings);
    return !!workerRuntime && workerRuntime === WorkerRuntimeLanguages.nodejs;
  }

  public static usingCustomWorkerRuntime(appSettings: ArmObj<KeyValue<string>>): boolean {
    const workerRuntime = FunctionAppService.getWorkerRuntimeSetting(appSettings);
    return !!workerRuntime && workerRuntime === WorkerRuntimeLanguages.custom;
  }

  public static usingDotnet5WorkerRuntime(appSettings: ArmObj<KeyValue<string>>): boolean {
    const workerRuntime = FunctionAppService.getWorkerRuntimeSetting(appSettings);
    return !!workerRuntime && workerRuntime === WorkerRuntimeLanguages.dotnet5;
  }

  public static usingPowershellWorkerRuntime(appSettings: ArmObj<KeyValue<string>>): boolean {
    const workerRuntime = FunctionAppService.getWorkerRuntimeSetting(appSettings);
    return !!workerRuntime && workerRuntime === WorkerRuntimeLanguages.powershell;
  }

  public static getAzureFilesSetting(appSettings: ArmObj<KeyValue<string>>): string {
    return appSettings.properties[CommonConstants.AppSettingNames.azureFilesSettingName] || '';
  }

  public static enableEditingForLinux(site: ArmObj<Site>, workerRuntime?: string) {
    // NOTE (krmitta): Editing is only enabled for Linux Consumption or Linux Elastic Premium and Node/Python stack only.
    // For Powershell, we still need to use the feature-flag.
    return (
      !!site &&
      !!workerRuntime &&
      FlightingUtil.checkSubscriptionInFlight(
        getSubscriptionFromResourceId(site.id),
        FlightingUtil.features.EnableEditingForLinuxNodePython
      ) &&
      (isLinuxDynamic(site) || isLinuxElastic(site)) &&
      (workerRuntime === WorkerRuntimeLanguages.nodejs ||
        workerRuntime === WorkerRuntimeLanguages.python ||
        workerRuntime === WorkerRuntimeLanguages.powershell)
    );
  }
}
