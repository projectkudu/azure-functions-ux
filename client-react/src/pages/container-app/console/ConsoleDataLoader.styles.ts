import { IDialogContentStyleProps, IDialogContentStyles, IDialogFooterStyleProps, IDialogFooterStyles } from '@fluentui/react/lib/Dialog';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { CSSProperties } from 'react';

export const consoleStyles = mergeStyleSets({
  customTextField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dialogFooterAlignLeft: {
    textAlign: 'left',
  },
});

export const liveRegionStyle: CSSProperties = {
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
};

export const dialogFooterStyles = (): IStyleFunctionOrObject<IDialogFooterStyleProps, IDialogFooterStyles> => {
  return { actions: { marginTop: '34px' }, actionsRight: { textAlign: 'left' } };
};

export const dialogTitleStyles = (): IStyleFunctionOrObject<IDialogContentStyleProps, IDialogContentStyles> => {
  return { title: { fontWeight: 600 } };
};
