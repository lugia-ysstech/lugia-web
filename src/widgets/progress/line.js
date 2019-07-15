/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { ProgressProps, ProgressState } from '../css/progress-line';
import { deepMerge } from '@lugia/object-utils';
import {
  InsideText,
  ProgressBackground,
  ProgressLine,
  ProgressText,
  Wrap,
  handlePercent,
} from '../css/progress-line';
import Icon from '../icon';
import colorsFunc from '../css/stateColor';

type LineProps = {
  getIconTheme: Function,
} & ProgressProps;
const { successColor, dangerColor, mediumGreyColor } = colorsFunc();

export const getText = (inside?: boolean, props: Object) => {
  const { percent = 0, format, hasFormat = false, getIconTheme } = props;

  if (hasFormat && typeof format === 'function') {
    return format(percent);
  }

  const { status = 'default', size = 'default', type = 'line' } = props;
  let iconFont;
  if (type === 'circle' || type === 'dashboard') {
    iconFont = size === 'small' ? 26 : 40;
  } else {
    iconFont = size === 'small' ? 12 : 14;
  }

  const iconColor =
    status === 'error' ? dangerColor : status === 'success' ? successColor : mediumGreyColor;
  const iconDefaultTheme = {
    normal: {
      cursor: 'default',
      fontSize: iconFont,
      color: iconColor,
      getCSS() {
        return `
          vertical-align: middle !important;
        `;
      },
    },
  };

  if (status === 'error') {
    const { viewClass, theme } = getIconTheme('error');
    const iconTheme = deepMerge(
      {
        [viewClass]: iconDefaultTheme,
      },
      theme
    );

    return (
      <Icon
        viewClass={viewClass}
        theme={iconTheme}
        iconClass={inside ? 'lugia-icon-reminder_close' : 'lugia-icon-reminder_close_circle'}
        singleTheme
      />
    );
  }

  if (status === 'success' || percent >= 100) {
    const { viewClass, theme } = getIconTheme('success');
    const iconTheme = deepMerge(
      {
        [viewClass]: iconDefaultTheme,
      },
      theme
    );
    return (
      <Icon
        viewClass={viewClass}
        theme={iconTheme}
        singleTheme
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

export default class extends React.Component<LineProps, ProgressState> {
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
    const progressWrapTheme = getPartOfThemeProps('ProgressWrap');
    const progressLineTheme = getPartOfThemeProps('ProgressOutLine');
    const innerLineDefaultTheme = getPartOfThemeProps('ProgressInnerLine_Default');
    const innerLineSuccessTheme = getPartOfThemeProps('ProgressInnerLine_Success');
    const innerLineErrorTheme = getPartOfThemeProps('ProgressInnerLine_Error');
    const insideTextTheme = getPartOfThemeProps('ProgressLineInsideText');
    const infoTextTheme = getPartOfThemeProps('ProgressLineInfoText');
    const progressStatus = getStatus({ status, percent });
    const progressInnerLineTheme =
      progressStatus === 'success'
        ? innerLineSuccessTheme
        : progressStatus === 'error'
        ? innerLineErrorTheme
        : innerLineDefaultTheme;
    progressInnerLineTheme.propsConfig = {
      status: progressStatus,
      percent,
      size,
      showType,
      active,
    };
    infoTextTheme.propsConfig = {
      status: progressStatus,
      size,
    };

    return (
      <Wrap themeProps={progressWrapTheme} size={size} type={type}>
        <ProgressLine
          themeProps={progressLineTheme}
          showInfo={showInfo}
          showType={showType}
          size={size}
        >
          <ProgressBackground
            themeProps={progressInnerLineTheme}
            showType={showType}
            percent={percent}
            status={status}
            size={size}
          >
            {showType === 'default' ? null : (
              <InsideText showType={showType} size={size} themeProps={insideTextTheme}>
                {this.getPercentText(true)}
              </InsideText>
            )}
          </ProgressBackground>
        </ProgressLine>
        {showInfo && showType === 'default' ? (
          <ProgressText
            themeProps={infoTextTheme}
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
      status = 'default',
      size = 'default',
      type = 'line',
      getIconTheme,
    } = this.props;

    return getText(inside, {
      hasFormat: this.hasFormat(),
      percent,
      format,
      status,
      size,
      type,
      getIconTheme,
    });
  };

  hasFormat() {
    return 'format' in this.props;
  }
}
