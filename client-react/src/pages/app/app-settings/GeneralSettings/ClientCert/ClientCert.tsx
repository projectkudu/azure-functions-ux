import React, { useContext, useEffect, useState } from 'react';
import { settingsWrapper } from '../../AppSettingsForm';
import { Field, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { PermissionsContext, SiteContext } from '../../Contexts';
import TextField from '../../../../../components/form-controls/TextField';
import { Stack, PanelType, IChoiceGroupOption, MessageBarType } from '@fluentui/react';
import IconButton from '../../../../../components/IconButton/IconButton';
import EditClientExclusionPaths from './EditClientExclusionPaths';
import { AppSettingsFormValues } from '../../AppSettings.types';
import { ScenarioService } from '../../../../../utils/scenario-checker/scenario.service';
import { ScenarioIds } from '../../../../../utils/scenario-checker/scenario-ids';
import CustomPanel from '../../../../../components/CustomPanel/CustomPanel';
import { ClientCertMode, MinTlsVersion, Site } from '../../../../../models/site/site';
import { ArmObj } from '../../../../../models/arm-obj';
import RadioButton from '../../../../../components/form-controls/RadioButton';
import CustomBanner from '../../../../../components/CustomBanner/CustomBanner';

const ClientCert: React.FC<FormikProps<AppSettingsFormValues>> = props => {
  const { values, setFieldValue, initialValues } = props;
  const site = useContext(SiteContext);
  const { t } = useTranslation();
  const { app_write, editable, saving } = useContext(PermissionsContext);
  const disableAllControls = !app_write || !editable || saving;
  const [showPanel, setShowPanel] = useState(false);
  const [disableOptionalInteractiveUserOption, setDisableOptionalInteractiveUserOption] = useState(false);
  const [clientCertWarningMessage, setClientCertWarningMessage] = useState('');

  const getClientCertInfoBubbleMessage = (siteArm: ArmObj<Site>): string => {
    switch (siteArm.properties.clientCertMode) {
      case ClientCertMode.Required:
        return t('clientCertificateModeRequiredInfoBubbleMessage');
      case ClientCertMode.Optional:
        return t('clientCertificateModeOptionalInfoBubbleMessage');
      case ClientCertMode.OptionalInteractiveUser:
        return t('clientCertificateModeOptionalInteractiveUserInfoBubbleMessage');
      case ClientCertMode.Ignore:
        return t('clientCertificateModeIgnoreInfoBubbleMessage');
      default:
        return '';
    }
  };

  const scenarioChecker = new ScenarioService(t);
  const clientCertEnabled = scenarioChecker.checkScenario(ScenarioIds.incomingClientCertEnabled, { site });

  const openClientExclusionPathPanel = () => {
    setShowPanel(true);
  };
  const onCancel = () => {
    setShowPanel(false);
  };
  const onSave = clientExclusionsPath => {
    setFieldValue('site.properties.clientCertExclusionPaths', clientExclusionsPath);
    setShowPanel(false);
  };

  useEffect(() => {
    const http20EnabledOrMinTLSVersion13 =
      values.config.properties.http20Enabled || values.config.properties.minTlsVersion === MinTlsVersion.tLS13;
    const isClientCertModeOptionalInteractiveUser = values.site.properties.clientCertMode === ClientCertMode.OptionalInteractiveUser;

    setDisableOptionalInteractiveUserOption(http20EnabledOrMinTLSVersion13);
    setClientCertWarningMessage(http20EnabledOrMinTLSVersion13 ? t('clientCertificateWarningMessage') : '');
    if (isClientCertModeOptionalInteractiveUser && http20EnabledOrMinTLSVersion13) {
      setFieldValue('site.properties.clientCertMode', ClientCertMode.Ignore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.config.properties.http20Enabled, values.config.properties.minTlsVersion, values.site.properties.clientCertMode]);

  return scenarioChecker.checkScenario(ScenarioIds.incomingClientCertSupported, { site }).status !== 'disabled' ? (
    <>
      <h3>{t('incomingClientCertificates')}</h3>
      <div className={settingsWrapper}>
        {clientCertWarningMessage && (
          <CustomBanner id="clinet-cert-warning" message={clientCertWarningMessage} type={MessageBarType.warning} undocked={true} />
        )}
        <Field
          name={'site.properties.clientCertMode'}
          component={RadioButton}
          dirty={values.site.properties.clientCertMode !== initialValues.site.properties.clientCertMode}
          label={t('clientCertificateMode')}
          id="incoming-client-certificate-mode"
          ariaLabelledBy={`incoming-client-certificate-mode-label`}
          disabled={disableAllControls || clientCertEnabled.status === 'disabled'}
          upsellMessage={clientCertEnabled.status === 'disabled' ? clientCertEnabled.data : ''}
          infoBubbleMessage={getClientCertInfoBubbleMessage(values.site)}
          options={[
            {
              key: ClientCertMode.Required,
              text: t('clientCertificateModeRequired'),
            },
            {
              key: ClientCertMode.Optional,
              text: t('clientCertificateModeOptional'),
            },
            {
              key: ClientCertMode.OptionalInteractiveUser,
              text: t('clientCertificateModeOptionalInteractiveUser'),
              disabled: disableOptionalInteractiveUserOption,
            },
            {
              key: ClientCertMode.Ignore,
              text: t('clientCertificateModeIgnore'),
            },
          ]}
        />
        <Stack horizontal>
          <Field
            name="site.properties.clientCertExclusionPaths"
            dirty={values.site.properties.clientCertExclusionPaths !== initialValues.site.properties.clientCertExclusionPaths}
            component={TextField}
            disabled
            placeholder={t('noExclusionRulesDefined')}
            label={t('certificateExlusionPaths')}
            id="incoming-client-certificate-exclusion-paths"
          />
          <CustomPanel isOpen={showPanel} type={PanelType.medium} onDismiss={onCancel} headerText={t('certificateExlusionPaths')}>
            <EditClientExclusionPaths
              clientExclusionPaths={values.site.properties.clientCertExclusionPaths}
              save={onSave}
              cancel={onCancel}
            />
          </CustomPanel>
          <IconButton
            iconProps={{ iconName: 'Edit' }}
            id={`edit-client-cert-exclusion-paths`}
            ariaLabel={t('editCertificateExlusionPaths')}
            title={t('editCertificateExlusionPaths')}
            disabled={disableAllControls || values.site.properties.clientCertMode === ClientCertMode.Ignore}
            onClick={openClientExclusionPathPanel}
          />
        </Stack>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ClientCert;
