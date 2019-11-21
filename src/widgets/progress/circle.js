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
    const { percent = 0, type = 'circle', size = 'default', status = 'default' } = this.props;
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
    const textTarget = type === 'circle' ? 'ProgressCircleText' : 'DashboardText';
    const textTheme = this.getTargetTheme(textTarget);
    textTheme.propsConfig = { status: getStatus({ status, percent }) };
    const backgroundTarget = this.getBackgroundTarget(type);
    const backgroundTheme = this.getTargetTheme(backgroundTarget);
    const backgroundLineColor = this.getLineColor(backgroundTheme, '#f2f2f2');
    const lineTarget = type === 'circle' ? 'ProgressCircleLine' : 'DashboardLine';
    const lineTheme = this.getTargetTheme(lineTarget);
    const lineColor = this.getLineColor(lineTheme);
    return (
      <SvgInner size={size}>
        {type === 'circle' ? (
          <svg width={viewWidth} height={viewHeight}>
            <circle {...config} stroke={backgroundLineColor} />
            <circle
              {...config}
              stroke={this.getColor(backgroundLineColor, lineColor)}
              transform={transform}
              strokeLinecap="round"
              strokeDasharray={`${(handlePercent(percent) / 100) * circleLength} ${circleLength}`}
              style={{ transition: 'all .3s' }}
            />
          </svg>
        ) : (
          <svg width={viewWidth} height={viewHeight}>
            {getPolyLine(56, 8, 100, backgroundLineColor)}
            {getPolyLine(
              56,
              8,
              handlePercent(percent),
              this.getColor(backgroundLineColor, lineColor)
            )}
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
  getColor = (backgroundLineColor: string, lineColor?: string) => {
    let { percent = 0 } = this.props;
    percent = handlePercent(percent);

    if (percent === 0) {
      return backgroundLineColor;
    }

    if (lineColor) return lineColor;

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

  getTargetTheme = (target: string) => {
    const { getPartOfThemeProps } = this.props;
    return getPartOfThemeProps(target);
  };

  getBackgroundTarget = (type: string) => {
    return type === 'circle' ? 'ProgressCircleBackground' : 'DashboardBackground';
  };

  getLineColor(theme: Object = {}, defaultValue: string): string {
    const { themeConfig = {} } = theme;
    const { normal = {} } = themeConfig;
    const { color = defaultValue } = normal;
    return color;
  }

  hasFormat() {
    return 'format' in this.props;
  }
}
