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
  Icons,
  InsideText,
  ProgressBackground,
  ProgressLine,
  ProgressText,
  Wrap,
} from '../css/progress-line';

export const getText = (inside?: boolean, props: Object) => {
  const { percent = 0, format, hasFormat = false } = props;

  if (hasFormat && typeof format === 'function') {
    return format(percent);
  }

  const { status, size = 'default', type = 'line' } = props;
  const config = { size, type };
  const Icon = Icons;

  if (status === 'error') {
    return (
      <Icon
        {...config}
        iconClass={inside ? 'lugia-icon-reminder_close' : 'lugia-icon-reminder_close_circle'}
      />
    );
  }

  if (status === 'success' || percent >= 100) {
    return (
      <Icon
        {...config}
        iconClass={inside ? 'lugia-icon-reminder_check' : 'lugia-icon-reminder_check_circle'}
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
      <Wrap theme={getTheme()} size={size} type={type}>
        <ProgressLine showInfo={showInfo} showType={showType} size={size}>
          <ProgressBackground
            theme={getTheme()}
            showType={showType}
            percent={percent}
            status={status}
            size={size}
          >
            {showType === 'default' ? null : (
              <InsideText showType={showType} size={size}>
                {this.getPercentText(true)}
              </InsideText>
            )}
          </ProgressBackground>
        </ProgressLine>
        {showInfo && showType === 'default' ? (
          <ProgressText size={size} percent={percent} type={type} status={status}>
            {this.getPercentText(false)}
          </ProgressText>
        ) : null}
      </Wrap>
    );
  }

  getPercentText = (inside: boolean) => {
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
