import React, { useEffect, useState } from 'react';
import LoadingComponent from '../../../../../components/loading/loading-component';
import FunctionsService from '../../../../../ApiHelpers/FunctionsService';
import { BindingConfigMetadata, BindingConfigDirection } from '../../../../../models/functions/bindings-config';
import BindingEditor, { getBindingConfigDirection } from './BindingEditor';
import { BindingInfo } from '../../../../../models/functions/function-binding';
import LogService from '../../../../../utils/LogService';
import { LogCategories } from '../../../../../utils/LogCategories';
import { PanelType, Panel } from 'office-ui-fabric-react';
import { ReactComponent as CloseSvg } from '../../../../../images/Common/close.svg';
import { style } from 'typestyle';
import { FunctionInfo } from '../../../../../models/functions/function-info';
import { ArmObj } from '../../../../../models/arm-obj';

export interface BindingEditorDataLoaderProps {
  functionInfo: ArmObj<FunctionInfo>;
  bindingInfo: BindingInfo;
  onPanelClose: () => void;
  onSubmit: (newBindingInfo: BindingInfo, currentBindingInfo?: BindingInfo) => void;
}

const panelHeaderStyle = style({
  width: '100%',

  $nest: {
    h3: {
      display: 'inline-block',
      marginLeft: '15px',
      marginTop: '12px',
      fontSize: '20px',
    },

    svg: {
      height: '12px',
      width: '12px',
      float: 'right',
      marginTop: '18px',
      marginRight: '3px',
      cursor: 'pointer',
    },
  },
});

const panelStyle = {
  content: [
    {
      padding: '0px',
      selectors: {
        '@media screen and (min-width: 1366px)': {
          padding: '0px',
        },
        '@media screen and (min-width: 640px)': {
          padding: '0px',
        },
      },
    },
  ],
};

const BindingEditorDataLoader: React.SFC<BindingEditorDataLoaderProps> = props => {
  const { functionInfo, bindingInfo } = props;
  const [bindingsMetadata, setBindingsMetadata] = useState<BindingConfigMetadata[] | null>(null);
  const [isPanelOpened, setIsPanelOpened] = useState<boolean>(true);

  useEffect(() => {
    FunctionsService.getBindingConfigMetadata().then(r => {
      if (!r.metadata.success) {
        LogService.trackEvent(
          LogCategories.changeAppPlan,
          'getBindingConfigMetadata',
          `Failed to get bindingConfigMetadata: ${r.metadata.error}`
        );
        return;
      }

      setBindingsMetadata(r.data.bindings);
    });
  }, []);

  const onPanelClosed = () => {
    setIsPanelOpened(false);
    props.onPanelClose();
  };

  if (!bindingsMetadata) {
    return <LoadingComponent />;
  }

  return (
    <Panel
      isOpen={isPanelOpened}
      type={PanelType.smallFixedFar}
      onRenderNavigationContent={() => onRenderNavigationContent(bindingInfo, onPanelClosed)}
      styles={panelStyle}>
      {getEditorOrLoader(functionInfo, bindingInfo, bindingsMetadata, props.onSubmit)}
    </Panel>
  );
};

const getEditorOrLoader = (
  functionInfo: ArmObj<FunctionInfo>,
  bindingInfo: BindingInfo,
  bindingsMetadata: BindingConfigMetadata[],
  onSubmit: (bindingInfo: BindingInfo) => void
) => {
  if (bindingsMetadata) {
    return (
      <div style={{ marginTop: '10px' }}>
        <BindingEditor
          functionInfo={functionInfo}
          allBindingsConfigMetadata={bindingsMetadata}
          currentBindingInfo={bindingInfo}
          onSubmit={onSubmit}
        />
      </div>
    );
  }

  return <LoadingComponent />;
};

const getPanelHeader = (bindingInfo: BindingInfo) => {
  const direction = getBindingConfigDirection(bindingInfo);
  if (direction === BindingConfigDirection.in) {
    return 'Edit input';
  } else if (direction === BindingConfigDirection.out) {
    return 'Edit output';
  }

  return 'Edit trigger';
};

const onRenderNavigationContent = (bindingInfo: BindingInfo, onClosePanel: () => void): JSX.Element => {
  return (
    <>
      <div className={panelHeaderStyle}>
        <h3>{getPanelHeader(bindingInfo)}</h3>
        <CloseSvg onClick={onClosePanel} tabIndex={0} role="button" aria-label={'Close'} />
      </div>
    </>
  );
};

export default BindingEditorDataLoader;
