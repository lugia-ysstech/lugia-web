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
import { getText } from './line';
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
    return (
      <div>
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

          <SvgText percent={percent} status={status}>
            {this.getText()}
          </SvgText>
        </SvgInner>
      </div>
    );
  }
  getCircleInfo = () => {
    const { size = 'default' } = this.props;
    return {
      viewWidth: size === 'default' ? 120 : 80,
      viewHeight: size === 'default' ? 120 : 80,
      cx: size === 'default' ? 60 : 40,
      cy: size === 'default' ? 60 : 40,
      radius: size === 'default' ? 56 : 37,
      strokeWidth: size === 'default' ? 8 : 6,
      circleLength: size === 'default' ? 352 : 233,
      transform: size === 'default' ? 'matrix(0,-1,1,0,0,120)' : 'matrix(0,-1,1,0,0,80)',
    };
  };
  getText = () => {
    const { percent = 0, format, status, size = 'default', type = 'circle' } = this.props;

    return getText(true, {
      hasFormat: this.hasFormat(),
      percent,
      format,
      status,
      size,
      type,
    });
  };
  getColor = () => {
    const { percent = 0, getTheme, status } = this.props;
    const per = handlePercent(percent);
    const theme = getTheme();
    let color = theme.color || themeColor;

    if (percent === 0) {
      color = '#f2f2f2';
    } else {
      if (status === 'success' || per === 100) {
        color = successColor;
      } else if (status === 'error') {
        color = dangerColor;
      }
    }

    return color;
  };
  hasFormat() {
    return 'format' in this.props;
  }
}
