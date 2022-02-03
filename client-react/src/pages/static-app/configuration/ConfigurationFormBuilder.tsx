import {
  ConfigurationFormData,
  ConfigurationYupValidationSchemaType,
  EnvironmentVariable,
  PasswordProtectionTypes,
} from './Configuration.types';
import * as Yup from 'yup';
import i18next from 'i18next';
import { ArmObj } from '../../../models/arm-obj';
import { Environment } from '../../../models/static-site/environment';

export class ConfigurationFormBuilder {
  protected _t: i18next.TFunction;

  constructor(t: i18next.TFunction) {
    this._t = t;
  }

  public generateFormData(
    environments?: ArmObj<Environment>[],
    passwordProtection?: PasswordProtectionTypes,
    defaultEnvironment?: ArmObj<Environment>,
    defaultEnvironmentVariables?: EnvironmentVariable[]
  ): ConfigurationFormData {
    return {
      environments: environments || [],
      environmentVariables: defaultEnvironmentVariables || [],
      passwordProtectionEnvironments: '',
      passwordProtection: passwordProtection || PasswordProtectionTypes.Disabled,
      visitorPassword: '',
      visitorPasswordConfirm: '',
      selectedEnvironment: defaultEnvironment || undefined,
      isAppSettingsDirty: false,
      isGeneralSettingsDirty: false,
    };
  }

  public generateYupValidationSchema(): ConfigurationYupValidationSchemaType {
    const passwordMinimumRequirementsRegex = new RegExp(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})$/);

    return Yup.object().shape({
      environmentVariables: Yup.mixed().notRequired(),
      isAppSettingsDirty: Yup.mixed().notRequired(),
      isGeneralSettingsDirty: Yup.mixed().notRequired(),
      selectedEnvironment: Yup.mixed().notRequired(),
      environments: Yup.mixed().notRequired(),
      passwordProtection: Yup.mixed().notRequired(),
      passwordProtectionEnvironments: Yup.mixed().notRequired(),
      visitorPassword: Yup.string().test('publishingPasswordRequirements', this._t('staticSite_visitorPasswordRequired'), function(value) {
        if (this.parent.passwordProtection !== PasswordProtectionTypes.Disabled) {
          return !!value && passwordMinimumRequirementsRegex.test(value);
        }
        return true;
      }),
      visitorPasswordConfirm: Yup.string().test(
        'validatePublishingConfirmPassword',
        this._t('staticSite_confirmVisitorPasswordRequired'),
        function(value) {
          if (this.parent.passwordProtection !== PasswordProtectionTypes.Disabled) {
            return !!value && this.parent.visitorPassword === value;
          }
          return true;
        }
      ),
    });
  }
}
