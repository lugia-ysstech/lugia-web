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
  handlePercent,
} from '../css/progress-line';

export const getText = (inside?: boolean, props: Object) => {
  const { percent = 0, format, hasFormat = false, getPartOfThemeProps } = props;

  if (hasFormat && typeof format === 'function') {
    return format(percent);
  }

  const { status = 'default', size = 'default', type = 'line' } = props;
  const config = { size, type };
  const SuccessIconTheme = getPartOfThemeProps(
    type === 'line'
      ? 'ProgressLineSuccessIcon'
      : type === 'circle'
      ? 'ProgressCircleSuccessIcon'
      : 'ProgressDashboardSuccessIcon'
  );
  const ErrorIconTheme = getPartOfThemeProps('ProgressLineErrorIcon');
  SuccessIconTheme.propsConfig = { size, status, type };
  ErrorIconTheme.propsConfig = { size, status, type };

  if (status === 'error') {
    return (
      <Icons
        {...config}
        themeProps={ErrorIconTheme}
        iconClass={inside ? 'lugia-icon-reminder_close' : 'lugia-icon-reminder_close_circle'}
      />
    );
  }

  if (status === 'success' || percent >= 100) {
    return (
      <Icons
        {...config}
        themeProps={SuccessIconTheme}
        iconClass={inside ? 'lugia-icon-reminder_check' : 'lugia-icon-reminder_check_circle'}
      />
    );
  }

  return `${percent}%`;
};

export const getStatus = (props: Object) => {
  const { status = 'default', percent = 0 } = props;
  if (handlePercent(percent) === 100) {
    if (status === 'error') {
      return status;
    }
    return 'success';
  }
  return status;
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
      active,
      getPartOfThemeProps,
    } = this.props;
    const ProgressWrapTheme = getPartOfThemeProps('ProgressWrap');
    const ProgressLineTheme = getPartOfThemeProps('ProgressOutLine');
    const InnerLineDefaultTheme = getPartOfThemeProps('ProgressInnerLine_Default');
    const InnerLineSuccessTheme = getPartOfThemeProps('ProgressInnerLine_Success');
    const InnerLineErrorTheme = getPartOfThemeProps('ProgressInnerLine_Error');
    const InsideTextTheme = getPartOfThemeProps('ProgressLineInsideText');
    const InfoTextTheme = getPartOfThemeProps('ProgressLineInfoText');
    const progressStatus = getStatus({ status, percent });
    const ProgressInnerLineTheme =
      progressStatus === 'success'
        ? InnerLineSuccessTheme
        : progressStatus === 'error'
        ? InnerLineErrorTheme
        : InnerLineDefaultTheme;
    ProgressInnerLineTheme.propsConfig = {
      status: progressStatus,
      percent,
      size,
      showType,
      active,
    };
    InfoTextTheme.propsConfig = {
      status: progressStatus,
      size,
    };
    console.log(ProgressInnerLineTheme);
    return (
      <Wrap themeProps={ProgressWrapTheme} size={size} type={type}>
        <ProgressLine
          themeProps={ProgressLineTheme}
          showInfo={showInfo}
          showType={showType}
          size={size}
        >
          <ProgressBackground
            themeProps={ProgressInnerLineTheme}
            showType={showType}
            percent={percent}
            status={status}
            size={size}
          >
            {showType === 'default' ? null : (
              <InsideText showType={showType} size={size} themeProps={InsideTextTheme}>
                {this.getPercentText(true)}
              </InsideText>
            )}
          </ProgressBackground>
        </ProgressLine>
        {showInfo && showType === 'default' ? (
          <ProgressText
            themeProps={InfoTextTheme}
            size={size}
            percent={percent}
            type={type}
            status={status}
          >
            {this.getPercentText(false)}
          </ProgressText>
        ) : null}
      </Wrap>
    );
  }

  getPercentText = (inside: boolean) => {
    const {
      percent = 0,
      format,
      status,
      size = 'default',
      type = 'line',
      getPartOfThemeProps,
    } = this.props;

    return getText(inside, {
      hasFormat: this.hasFormat(),
      percent,
      format,
      status,
      size,
      type,
      getPartOfThemeProps,
    });
  };

  hasFormat() {
    return 'format' in this.props;
  }
}
