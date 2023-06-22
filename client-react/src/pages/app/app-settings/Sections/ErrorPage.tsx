import React from 'react';
import { FormikProps } from 'formik';
import { AppSettingsFormValues } from '../AppSettings.types';
import { useTranslation } from 'react-i18next';
import ErrorPageGrid from '../ErrorPages/ErrorPageGrid';
import { isEqual } from 'lodash-es';
import { Links } from '../../../../utils/FwLinks';
import { Link } from '@fluentui/react';
import { learnMoreLinkStyle } from '../../../../components/form-controls/formControl.override.styles';

const ErrorPagePivot: React.FC<FormikProps<AppSettingsFormValues>> = props => {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t('customErrorPage')}</h3>
      <p>
        <span id="custom-error-page-info-message">{t('errorPagesInfoMessage')}</span>
        <Link
          id="custom-error-page-info-learnMore"
          href={Links.customErrorPageInfo}
          target="_blank"
          className={learnMoreLinkStyle}
          aria-labelledby="custom-error-page-info-message custom-error-page-info-learnMore">
          {` ${t('learnMore')}`}
        </Link>
      </p>
      <ErrorPageGrid {...props} />
    </>
  );
};

export default ErrorPagePivot;

export const errorPagesDirty = (values: AppSettingsFormValues, initialValues: AppSettingsFormValues) => {
  return !isEqual(values.errorPages, initialValues.errorPages);
};
