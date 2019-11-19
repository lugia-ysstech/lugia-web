/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { handlePercent } from '../css/progress-line';
import { SvgInner, SvgText } from '../css/progress-circle';
import { getText, getStatus } from './line';
import colorsFunc from '../css/stateColor';
import { getPoints } from '../common/circleUtils';

function getPolyLine(radius: number, strokeWidth: number, cnt: number, stroke: string) {
  return (
    <polyline
      stroke-dasharray="5,5"
      points={getPoints(radius, strokeWidth, cnt)}
      style={{ fill: 'none', stroke, strokeWidth, transition: 'all .3s' }}
    />
  );
}

const { themeColor, successColor, dangerColor } = colorsFunc();

export default class extends React.Component<any, any> {
  render() {
    const {
      percent = 0,
      type = 'circle',
      size = 'default',
      status = 'default',
      getPartOfThemeProps,
    } = this.props;
    const {
      viewWidth,
      viewHeight,
      cx,
      cy,
      radius,
      strokeWidth,
      circleLength,
      transform,
    } = this.getCircleInfo();
    const config = {
      cx,
      cy,
      r: radius,
      strokeWidth,
      fill: 'none',
    };
    const circleTextTheme = getPartOfThemeProps('ProgressCircleText');
    const dashboardTextTheme = getPartOfThemeProps('DashboardText');
    const textTheme = type === 'circle' ? circleTextTheme : dashboardTextTheme;
    textTheme.propsConfig = { status: getStatus({ status, percent }) };
    return (
      <SvgInner size={size}>
        {type === 'circle' ? (
          <svg width={viewWidth} height={viewHeight}>
            <circle {...config} stroke="#f2f2f2" />
            <circle
              {...config}
              stroke={this.getColor()}
              transform={transform}
              strokeLinecap="round"
              strokeDasharray={`${(handlePercent(percent) / 100) * circleLength} ${circleLength}`}
              style={{ transition: 'all .3s' }}
            />
          </svg>
        ) : (
          <svg width={viewWidth} height={viewHeight}>
            {getPolyLine(56, 8, 100, '#f2f2f2')}
            {getPolyLine(56, 8, handlePercent(percent), this.getColor())}
          </svg>
        )}

        <SvgText themeProps={textTheme} percent={percent} status={status} size={size}>
          {this.getPercentText()}
        </SvgText>
      </SvgInner>
    );
  }

  getCircleInfo = () => {
    const { size = 'default' } = this.props;
    const isDefault = size === 'default';
    const cxOrCy = isDefault ? 60 : 40;
    const widthOrHeight = isDefault ? 120 : 80;
    return {
      viewWidth: widthOrHeight,
      viewHeight: widthOrHeight,
      cx: cxOrCy,
      cy: cxOrCy,
      radius: isDefault ? 56 : 37,
      strokeWidth: isDefault ? 8 : 6,
      circleLength: isDefault ? 352 : 233,
      transform: isDefault ? 'matrix(0,-1,1,0,0,120)' : 'matrix(0,-1,1,0,0,80)',
    };
  };
  getPercentText = () => {
    const {
      percent = 0,
      format,
      status,
      size = 'default',
      type = 'circle',
      getIconTheme,
      iconClass,
    } = this.props;

    return getText(true, {
      hasFormat: this.hasFormat(),
      percent,
      format,
      status: getStatus({ status, percent }),
      size,
      type,
      getIconTheme,
      iconClass,
    });
  };
  getColor = () => {
    let { percent = 0 } = this.props;
    percent = handlePercent(percent);

    if (percent === 0) {
      return '#f2f2f2';
    }

    const { status } = this.props;
    if (status === 'error') {
      return dangerColor;
    }

    if (status === 'success' || percent === 100) {
      return successColor;
    }

    const { getTheme } = this.props;
    const theme = getTheme();
    return theme.color || themeColor;
  };

  hasFormat() {
    return 'format' in this.props;
  }
}
