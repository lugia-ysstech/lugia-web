/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { handlePercent } from '../css/progress-line';
import { SvgInner, SvgText, CircleWrap } from '../css/progress-circle';
import { getText, getStatus } from './line';
import get from '../css/theme-common-dict';
import { getPoints } from '../common/circleUtils';
import { deepMerge } from '@lugia/object-utils';

function getPolyLine(radius: number, strokeWidth: number, cnt: number, stroke: string) {
  return (
    <polyline
      stroke-dasharray="5,5"
      points={getPoints(radius, strokeWidth, cnt)}
      style={{ fill: 'none', stroke, strokeWidth, transition: 'all .3s' }}
    />
  );
}

export default class extends React.Component<any, any> {
  circleProgress: Object;
  shouldSecondRender: boolean;

  constructor(props) {
    super(props);
    this.circleProgress = React.createRef();
    this.shouldSecondRender = false;
    this.state = {
      secondRender: 0,
    };
  }

  componentDidMount() {
    if (this.shouldSecondRender) {
      this.shouldSecondRender = false;
      this.setState({ secondRender: Math.random() });
    }
  }

  render() {
    const {
      percent = 0,
      type = 'circle',
      size = 'default',
      status = 'default',
      getPartOfThemeProps,
    } = this.props;
    const svgInnerTheme = getPartOfThemeProps('Container');
    const { themeConfig = {} } = svgInnerTheme;
    const { normal: { width } = {} } = themeConfig;
    const handledSvgInnerTheme = { width, height: width };
    svgInnerTheme.themeConfig.normal = deepMerge(themeConfig.normal, handledSvgInnerTheme);

    const { cx, cy, radius, strokeWidth, circleLength, transform } = this.getCircleInfo(
      svgInnerTheme
    );
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
    const backgroundLineColor = this.getLineColor(backgroundTheme, get('superLightColor'));
    const lineTarget = type === 'circle' ? 'ProgressCircleLine' : 'DashboardLine';
    const lineTheme = this.getTargetTheme(lineTarget);
    const lineColor = this.getLineColor(lineTheme);

    return (
      <SvgInner size={size} themeProps={svgInnerTheme} ref={this.circleProgress}>
        {type === 'circle' ? (
          <CircleWrap>
            <circle {...config} stroke={backgroundLineColor} />
            <circle
              {...config}
              stroke={this.getColor(backgroundLineColor, lineColor)}
              transform={transform}
              strokeLinecap="round"
              strokeDasharray={`${(handlePercent(percent) / 100) * circleLength} ${circleLength}`}
              style={{ transition: 'all .3s' }}
            />
          </CircleWrap>
        ) : (
          <CircleWrap>
            {getPolyLine(radius, strokeWidth, 100, backgroundLineColor)}
            {getPolyLine(
              radius,
              strokeWidth,
              handlePercent(percent),
              this.getColor(backgroundLineColor, lineColor)
            )}
          </CircleWrap>
        )}

        <SvgText themeProps={textTheme} percent={percent} status={status} size={size}>
          {this.getPercentText()}
        </SvgText>
      </SvgInner>
    );
  }

  getCircleInfo = (svgInnerTheme: Object = {}) => {
    const {
      themeConfig: {
        normal: {
          width,
          strokeWidth: circleWidth,
          border: {
            top: { width: topWidth } = {},
            right: { width: rightWidth } = {},
            bottom: { width: bottomWidth } = {},
            left: { width: leftWidth } = {},
          } = {},
        } = {},
      } = {},
    } = svgInnerTheme;
    const { size = 'default' } = this.props;
    const isDefault = size === 'default';
    const finalWidth = this.getFinalWidth(width);
    const halfWidth = finalWidth / 2;
    const cxOrCy = width ? halfWidth : isDefault ? 60 : 40;
    const borderWidth = topWidth || rightWidth || bottomWidth || leftWidth;
    const strokeWidth = borderWidth || circleWidth || (isDefault ? 8 : 6);
    const halfStrokeWidth = strokeWidth / 2;
    const radius = width
      ? halfWidth - halfStrokeWidth
      : isDefault
      ? 60 - halfStrokeWidth
      : 40 - halfStrokeWidth;
    const circleLength = 2 * radius * Math.PI;
    return {
      cx: cxOrCy,
      cy: cxOrCy,
      radius,
      strokeWidth,
      circleLength,
      transform: width
        ? `matrix(0,-1,1,0,0,${finalWidth})`
        : isDefault
        ? 'matrix(0,-1,1,0,0,120)'
        : 'matrix(0,-1,1,0,0,80)',
    };
  };

  getFinalWidth = (value: string | number): number => {
    return this.whetherWidthIsPercent(value) ? this.getParentNodeWidth() : value;
  };
  whetherWidthIsPercent = (value: string | number) => {
    if (!value && value !== 0) return;
    const reg = /^\d+%$/;
    return reg.test(value);
  };
  getParentNodeWidth = () => {
    if (this.circleProgress.current && this.circleProgress.current.parentNode) {
      const { offsetWidth = 0 } = this.circleProgress.current.parentNode;
      return offsetWidth;
    }
    this.shouldSecondRender = true;

    return 0;
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
      errorIconClass,
      successIconClass,
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
      errorIconClass,
      successIconClass,
    });
  };
  getColor = (backgroundLineColor: string, lineColor?: string) => {
    let { percent = 0 } = this.props;
    percent = handlePercent(percent);

    if (percent === 0) {
      return backgroundLineColor;
    }

    if (lineColor) return lineColor;

    const { status, getPartOfThemeProps } = this.props;
    if (status === 'error') {
      const errorColor = this.getCircleColor(getPartOfThemeProps('ProgressCircleLine_Error'));
      return errorColor || get('dangerColor');
    }

    if (status === 'success' || percent === 100) {
      const successColor = this.getCircleColor(getPartOfThemeProps('ProgressCircleLine_Success'));
      return successColor || get('successColor');
    }

    const { getTheme } = this.props;
    const theme = getTheme();
    return theme.color || get('themeColor');
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

  getCircleColor(theme: Object = {}): string {
    const { themeConfig: { normal: { background: { color } = {} } = {} } = {} } = theme;
    return color;
  }

  hasFormat() {
    return 'format' in this.props;
  }
}
