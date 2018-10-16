/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { ProgressProps, ProgressState } from '../css/progress-line';
import {
  Wrap,
  ProgressLine,
  ProgressBackground,
  ProgressText,
  Icons,
  InsideText,
} from '../css/progress-line';

export const getText = (inside?: boolean, props: Object) => {
  const { percent = 0, format, status, size = 'default', type = 'line', hasFormat = false } = props;
  if (hasFormat && typeof format === 'function') {
    return format(percent);
  } else if (status === 'success' || percent >= 100) {
    return (
      <Icons
        size={size}
        type={type}
        iconClass={inside ? 'lugia-icon-reminder_check' : 'lugia-icon-reminder_check_circle'}
      />
    );
  } else if (status === 'error') {
    return (
      <Icons
        size={size}
        type={type}
        iconClass={inside ? 'lugia-icon-reminder_close' : 'lugia-icon-reminder_close_circle'}
      />
    );
  }

  return `${percent}%`;
};

export default class extends React.Component<ProgressProps, ProgressState> {
  render() {
    const {
      type = 'line',
      size = 'default',
      status = 'default',
      showType = 'default',
      percent = 0,
      showInfo = true,
      getTheme,
    } = this.props;
    return (
      <Wrap theme={getTheme()}>
        <ProgressLine showInfo={showInfo} showType={showType}>
          <ProgressBackground
            theme={getTheme()}
            showType={showType}
            percent={percent}
            status={status}
            size={size}
          >
            {showType === 'default' ? null : (
              <InsideText showType={showType}>{this.getText(true)}</InsideText>
            )}
          </ProgressBackground>
        </ProgressLine>
        {showInfo && showType === 'default' ? (
          <ProgressText size={size} type={type} status={status}>
            {this.getText(false)}
          </ProgressText>
        ) : null}
      </Wrap>
    );
  }
  getText = (inside: boolean) => {
    const { percent = 0, format, status, size = 'default', type = 'line' } = this.props;

    return getText(inside, {
      hasFormat: this.hasFormat(),
      percent,
      format,
      status,
      size,
      type,
    });
  };
  hasFormat() {
    return 'format' in this.props;
  }
}
