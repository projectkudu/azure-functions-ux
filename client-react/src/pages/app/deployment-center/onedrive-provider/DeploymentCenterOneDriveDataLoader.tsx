import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OneDriveUser, OneDriveFolder } from '../../../../models/onedrive';
import { DeploymentCenterFieldProps } from '../DeploymentCenter.types';
import { IDropdownOption } from 'office-ui-fabric-react';
import DeploymentCenterOneDriveProvider from './DeploymentCenterOneDriveProvider';
import DeploymentCenterData from '../DeploymentCenter.data';
import { DeploymentCenterContext } from '../DeploymentCenterContext';
import { SiteStateContext } from '../../../../SiteState';

const DeploymentCenteroneDriveDataLoader: React.FC<DeploymentCenterFieldProps> = props => {
  const { t } = useTranslation();
  const { formProps } = props;

  const [oneDriveUser, setOneDriveUser] = useState<OneDriveUser | undefined>(undefined);
  const [oneDriveAccountStatusMessage, setOneDriveAccountStatusMessage] = useState<string | undefined>(
    t('deploymentCenterOAuthFetchingUserInformation')
  );
  const [loadingFolders, setLoadingFolders] = useState(false);
  const [folderOptions, setFolderOptions] = useState<IDropdownOption[]>([]);
  const deploymentCenterData = new DeploymentCenterData();
  const deploymentCenterContext = useContext(DeploymentCenterContext);
  const siteStateContext = useContext(SiteStateContext);

  const fetchData = async () => {
    const oneDriveUserResponse = await deploymentCenterData.getOneDriveUser(deploymentCenterContext.oneDriveToken);

    setOneDriveAccountStatusMessage(undefined);

    if (
      oneDriveUserResponse.metadata.success &&
      oneDriveUserResponse.data &&
      oneDriveUserResponse.data.createdBy &&
      oneDriveUserResponse.data.createdBy.user &&
      oneDriveUserResponse.data.createdBy.user.displayName
    ) {
      // NOTE(stpelleg): if unsuccessful, assume the user needs to authorize.
      setOneDriveUser(oneDriveUserResponse.data);
      formProps.setFieldValue('oneDriveUser', oneDriveUserResponse.data);
    }
  };

  const fetchFolderOptions = async () => {
    setLoadingFolders(true);
    setFolderOptions([]);
    const folderNames: OneDriveFolder[] = [];

    if (oneDriveUser) {
      const oneDriveFolderResponse = await deploymentCenterData.getOneDriveFolders(deploymentCenterContext.oneDriveToken);

      if (oneDriveFolderResponse) {
        oneDriveFolderResponse.forEach(item => {
          folderNames.push(item);
        });
      }

      if (siteStateContext.site && siteStateContext.site.properties && siteStateContext.site.properties.name) {
        const siteFolder = { name: siteStateContext.site.properties.name };
        const siteFolderExists = folderNames.find(folder => folder.name === siteFolder.name);
        if (!siteFolderExists) {
          folderNames.push(siteFolder);
        }
      }
    }

    setFolderOptions(folderNames.map(folder => ({ key: folder.name, text: folder.name })));
    setLoadingFolders(false);
  };

  const authorizeoneDriveAccount = () => {
    setOneDriveAccountStatusMessage(t('deploymentCenterOAuthAuthorizingUser'));
    throw Error('Not implemented');
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!formProps.values.oneDriveUser) {
      fetchData();
    } else {
      setOneDriveUser(formProps.values.oneDriveUser);
      setOneDriveAccountStatusMessage(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploymentCenterContext.oneDriveToken]);

  useEffect(() => {
    fetchFolderOptions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneDriveUser]);

  return (
    <DeploymentCenterOneDriveProvider
      formProps={formProps}
      accountUser={oneDriveUser}
      accountStatusMessage={oneDriveAccountStatusMessage}
      authorizeAccount={authorizeoneDriveAccount}
      folderOptions={folderOptions}
      loadingFolders={loadingFolders}
    />
  );
};

export default DeploymentCenteroneDriveDataLoader;
