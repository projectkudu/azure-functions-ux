import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  pivotItemWrapper,
  httpAddDataStyle,
  httpAddDataTextStyle,
  functionTestGroupStyle,
  bodyEditorStyle,
  keyValuePairTextStyle,
  keyValuePairButtonStyle,
  keyValuePairStyle,
  keyValuePairLabelStyle,
  keyValuePairLabelDivStyle,
  testFormLabelStyle,
} from './FunctionTest.styles';
import { Label, IDropdownOption, ITextFieldProps, TextField } from 'office-ui-fabric-react';
import MonacoEditor from '../../../../../components/monaco-editor/monaco-editor';
import { ThemeContext } from '../../../../../ThemeContext';
import { InputFormValues, EmptyNameValuePair, NameValuePair, HttpMethods } from '../FunctionEditor.types';
import { FormikProps, Field, FieldArray, FieldProps } from 'formik';
import IconButton from '../../../../../components/IconButton/IconButton';
import Dropdown from '../../../../../components/form-controls/DropDown';
import get from 'lodash-es/get';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FunctionInfo } from '../../../../../models/functions/function-info';
import { ArmObj } from '../../../../../models/arm-obj';
import { BindingType } from '../../../../../models/functions/function-binding';

export interface FunctionTestInputProps {
  functionInfo: ArmObj<FunctionInfo>;
  body: string;
  onBodyChange: (newValue, event) => void;
}

interface KeyValueComponent {
  items: NameValuePair[];
  itemName: string;
  addItemText: string;
}

const KeyValueFieldComponent: React.FC<FieldProps & ITextFieldProps> = props => {
  const { field, form, ...rest } = props;
  const errorMessage = get(form.errors, field.name, '') as string;
  const inputDebouncer = new Subject<{ e: any; value: string }>();
  const DEBOUNCE_TIME = 300;
  inputDebouncer.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(({ e, value }) => {
    form.setFieldValue(field.name, value);
    field.onChange(e);
  });

  const onChange = (e: any, value: string) => {
    inputDebouncer.next({ e, value });
  };

  return <TextField value={field.value} onBlur={field.onBlur} errorMessage={errorMessage} onChange={onChange} {...rest} />;
};

const KeyValueFieldArrayComponent: React.FC<KeyValueComponent> = props => {
  const { items, itemName, addItemText } = props;
  const theme = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <FieldArray
      name={itemName}
      render={arrayHelpers => (
        <div className={httpAddDataStyle}>
          {items.length > 0 && (
            <div className={keyValuePairLabelDivStyle}>
              <Label className={keyValuePairLabelStyle}>{`${t('nameRes')}*`}</Label>
              <Label className={keyValuePairLabelStyle}>{`${t('value')}*`}</Label>
            </div>
          )}
          {items.map((item, index) => (
            <div className={keyValuePairStyle} key={index}>
              <Field
                className={keyValuePairTextStyle}
                component={KeyValueFieldComponent}
                placeholder={t('enterName')}
                id={`${index}-${itemName}-name`}
                name={`${itemName}[${index}].name`}
              />
              <Field
                className={keyValuePairTextStyle}
                component={KeyValueFieldComponent}
                placeholder={t('enterValue')}
                id={`${index}-${itemName}-value`}
                name={`${itemName}[${index}].value`}
              />
              <IconButton
                className={keyValuePairButtonStyle(theme)}
                id={`${index}-cancel-${itemName}-button`}
                iconProps={{ iconName: 'Delete' }}
                onClick={() => arrayHelpers.remove(index)}
              />
            </div>
          ))}
          <span onClick={() => arrayHelpers.push(EmptyNameValuePair)} className={httpAddDataTextStyle(theme)}>{`+ ${addItemText}`}</span>
        </div>
      )}
    />
  );
};

// TODO (krmitta): Complete Content for Input-Tab [WI: 5536379]
const FunctionTestInput: React.SFC<FormikProps<InputFormValues> & FunctionTestInputProps> = props => {
  const { t } = useTranslation();

  const { values, functionInfo, body, onBodyChange } = props;

  const getDropdownOptions = (): IDropdownOption[] => {
    const httpTrigger = functionInfo.properties.config.bindings.find(b => {
      return b.type === BindingType.httpTrigger.toString();
    });
    const dropdownOptions: IDropdownOption[] = [];
    if (httpTrigger && httpTrigger.methods) {
      httpTrigger.methods.forEach((m: string) => {
        dropdownOptions.push({ key: m, text: m.toUpperCase() });
      });
    } else {
      for (const method in HttpMethods) {
        if (method) {
          dropdownOptions.push({ key: method, text: method.toUpperCase() });
        }
      }
    }
    return dropdownOptions;
  };

  return (
    <div className={pivotItemWrapper}>
      {t('functionTestInputDescription')}
      <div className={functionTestGroupStyle}>
        <Label className={testFormLabelStyle}>{t('httpRun_httpMethod')}</Label>
        <Field id="method" name="method" component={Dropdown} options={getDropdownOptions()} />
      </div>
      <div className={functionTestGroupStyle}>
        <Label className={testFormLabelStyle}>{t('httpRun_query')}</Label>
        <KeyValueFieldArrayComponent itemName="queries" items={values.queries} addItemText={t('httpRun_addParameter')} />
      </div>
      <div className={functionTestGroupStyle}>
        <Label className={testFormLabelStyle}>{t('httpRun_headers')}</Label>
        <KeyValueFieldArrayComponent itemName="headers" items={values.headers} addItemText={t('httpRun_addHeader')} />
      </div>
      <div className={functionTestGroupStyle}>
        <Label className={testFormLabelStyle}>{t('rrOverride_boby')}</Label>
        <div className={bodyEditorStyle}>
          <MonacoEditor
            language="json"
            value={body}
            onChange={onBodyChange}
            height="300px"
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              cursorBlinking: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionTestInput;
