/**
 *
 * create by liangguodong on 2018/11/19
 *
 * @flow
 */
import type { TimeLineStatus, TimeLineType } from '../css/time-line';
import '../common/shirm';
import * as React from 'react';
import { Component } from 'react';
import Widget from '../consts/index';
import { getString } from '../common/StringUtils';
import { ObjectUtils } from '@lugia/type-utils';
import ThemeProvider from '../theme-provider';
import Icon from '../icon';
import Tooltip from '../tooltip';
import { deepMerge } from '@lugia/object-utils';
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';

import { units } from '@lugia/css';
const {
  themeColor,
  lightGreyColor,
  darkGreyColor,
  blackColor,
  successColor,
  dangerColor,
  superLightColor,
} = colorsFunc();

const { px2remcss } = units;

const ItemContainer = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemContainer',
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['padding']],
    getCSS: (theme: Object, themeProps: Object) => {
      const { propsConfig } = themeProps;
      const { maxWidth, mode } = propsConfig;
      if (mode !== 'right') {
        return `transform: translateX(${maxWidth}px);`;
      }
    },
    defaultTheme: {
      width: 'min-content',
    },
  },
  css: css`
    position: relative;
  `,
});
const BaseText = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemBaseText',
  normal: {
    selectNames: [['width'], ['height'], ['font'], ['fontSize'], ['color']],
  },
  css: css`
    text-align: inherit;
    overflow: hidden;
    white-space: nowrap;
  `,
});

const Description = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemBaseText',
  normal: {
    selectNames: [['width'], ['height'], ['font'], ['fontSize'], ['color']],
    defaultTheme: {
      color: darkGreyColor,
    },
  },
  css: css`
    line-height: 1.5;
  `,
});

const Time = CSSComponent({
  extend: BaseText,
  className: 'TimeLineItemBaseText',
  normal: {
    selectNames: [['width'], ['height'], ['font'], ['fontSize'], ['color']],
    defaultTheme: {
      color: blackColor,
    },
  },
});
const Content = CSSComponent({
  extend: BaseText,
  className: 'TimeLineItemContent',
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['padding']],
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { direction } = propsConfig;
      const theDirection = direction === 'left' ? 'right' : 'left';
      const length = direction === 'left' ? '100%' : px2remcss(20);
      return `text-align: ${theDirection};${theDirection}:${length}; `;
    },
  },
  css: css`
    position: absolute;
    top: 0;
  `,
});

const DotContainer = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemDotContainer',
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['padding']],
    defaultTheme: {
      width: 20,
    },
  },
  css: css`
    position: relative;
    text-align: center;
  `,
});

const Line = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemLine',
  normal: {
    selectNames: [['width'], ['height'], ['background']],
    getCSS(themeMeta, themeProps) {
      const { background } = themeMeta;
      const { propsConfig } = themeProps;
      const { isLast } = propsConfig;
      const display = isLast ? 'none' : '';
      const borderColor = background && background.color ? background.color : superLightColor;
      return `display:${display};
         border-left: ${px2remcss(1)} solid ${borderColor};
      `;
    },
  },
  css: css`
    position: relative;
    left: ${px2remcss(10)};
    z-index: 2;
  `,
});

const Dot = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemDot',
  normal: {
    selectNames: [['width'], ['height'], ['background']],
    defaultTheme: {
      width: 10,
      height: 10,
    },
    getThemeMeta(themeMeta, themeProps) {
      const { background } = themeMeta;
      const { propsConfig } = themeProps;
      const { status } = propsConfig;

      const backgroundColor =
        background && background.color
          ? background.color
          : status === 'success'
          ? successColor
          : status === 'failed'
          ? dangerColor
          : themeColor;
      return {
        background: { color: backgroundColor },
      };
    },
  },
  css: css`
    position: absolute;
    left: ${px2remcss(5.5)};
    z-index: 3;
    border-radius: 50%;
    transition: all 0.3s linear 0.1s;
  `,
});
const ExplainDot = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemExplainDot',
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['padding'], ['background']],
    defaultTheme: {
      width: 6,
      height: 6,
      background: { color: lightGreyColor },
    },
  },
  hover: {
    selectNames: [['background']],
    defaultTheme: {
      background: {
        color: themeColor,
      },
    },
  },
  css: css`
    position: absolute;
    left: ${px2remcss(7.5)};
    z-index: 3;
    border-radius: 50%;
    transition: all 0.3s linear 0.1s;
  `,
  option: {
    hover: true,
  },
});

type TimeLineState = {};

type TimeLineProps = {
  time: string,
  icon: string,
  description: string,
  direction: string,
  getTheme: Function,
  isLast: boolean,
  status: TimeLineStatus,
  timeLineType: TimeLineType,
  pendingDot: React.Node,
  pending: boolean,
  getChildDescWidth: Function,
};

class TimeLineItem extends Component<TimeLineProps, TimeLineState> {
  static defaultProps = {
    status: 'normal',
  };
  state = { _renderHeight: false };

  constructor(props: TimeLineProps) {
    super(props);
    this.desc = React.createRef();
  }

  static getDerivedStateFromProps(props: TimeLineProps, state: TimeLineState) {}

  getHeightByType(type: string, description: React.Node) {
    const theHeight =
      this.descHeight && this.descHeight > 54
        ? this.descHeight + 20
        : type === 'explain'
        ? 24
        : description
        ? 54
        : 42;
    return {
      height: theHeight,
    };
  }
  getLineHeightByType(type: string, description: React.Node) {
    const theHeight = description ? 'inherit' : '100%';
    return { height: theHeight };
  }
  componentDidMount() {
    if (this.desc.current) {
      this.descHeight = this.desc.current.offsetHeight;
      this.descWidth = this.desc.current.offsetWidth;
      const { getChildDirectionAndWidth, direction } = this.props;
      getChildDirectionAndWidth &&
        getChildDirectionAndWidth({
          direction,
          width: this.descWidth,
        });
      this.setState({ _renderHeight: true });
    }
  }

  render() {
    const { description, time, isLast, direction, timeLineType, mode, _leftMaxWidth } = this.props;

    const theTime = timeLineType !== 'explain' ? time : '';
    const itemThemeProps = deepMerge(
      { themeConfig: { normal: this.getHeightByType(timeLineType, this.props.description) } },
      this.props.getPartOfThemeProps('TimeLineItemContainer', {
        props: {
          maxWidth: _leftMaxWidth,
          mode,
        },
      })
    );
    const lineThemeProps = deepMerge(
      { themeConfig: { normal: this.getLineHeightByType(timeLineType, this.props.description) } },
      this.props.getPartOfThemeProps('TimeLineItemLine', {
        props: {
          isLast,
          description,
          timeLineType,
        },
      })
    );
    return (
      <ItemContainer
        themeProps={itemThemeProps}
        description={description}
        timeLineType={timeLineType}
      >
        <DotContainer themeProps={this.props.themeProps}>{this.getDot()}</DotContainer>
        <Line themeProps={lineThemeProps} />
        <Content
          themeProps={this.props.getPartOfThemeProps('TimeLineItemContentContainer', {
            props: { direction },
          })}
        >
          <Time themeProps={this.props.themeProps}>{theTime} </Time>
          {this.getDescription()}
        </Content>
      </ItemContainer>
    );
  }

  getDot() {
    const { icon, timeLineType, pending, pendingDot, isLast, time, description } = this.props;
    if (timeLineType === 'explain') {
      const {
        theme: theTheme,
        viewClass: TimeLineItemTipViewClass,
      } = this.props.getPartOfThemeHocProps('TimeLineItemTip');

      const tooltipTheme = deepMerge(
        {
          [TimeLineItemTipViewClass]: {
            TooltipContent: {
              normal: {
                fontSize: 12,
                background: { color: superLightColor },
                padding: {
                  top: 6,
                  bottom: 6,
                  left: 8,
                  right: 8,
                },
              },
            },
          },
        },
        theTheme
      );
      return (
        <Tooltip
          theme={tooltipTheme}
          viewClass={TimeLineItemTipViewClass}
          placement="right"
          popArrowType={'round'}
          title={getString(time)}
          description={getString(description)}
          action={'hover'}
        >
          {this.getExplainDot()}
        </Tooltip>
      );
    }
    const { theme: TimeLineIconThemeProps, viewClass } = this.props.getPartOfThemeHocProps(
      'TimeLineIcon'
    );
    const theIconTheme = deepMerge(
      {
        [viewClass]: {
          normal: {
            getCSS(themeMeta, themeProps) {
              const { propsConfig } = themeProps;
              const { pending } = propsConfig;
              const index = pending === true ? 1 : 3;
              const loading = keyframes`
                      from {
                        transform: rotate(0deg);
                      }
                      
                      to {
                        transform: rotate(359deg);
                      }
                  `;
              const commonCSS = `
                position: absolute;
                user-select: none;
                text-align: center;
                font-size: 1.4rem;
                left: ${px2remcss(3.5)};
                z-index: ${index};`;
              return pending
                ? css`
                    ${commonCSS};
                    animation: ${loading} 1s linear infinite;
                  `
                : `${commonCSS}`;
            },
          },
        },
      },
      TimeLineIconThemeProps
    );
    if (pending === true && isLast && pendingDot) {
      if (ObjectUtils.isString(pendingDot)) {
        return (
          <Icon
            singleTheme
            viewClass={viewClass}
            theme={theIconTheme}
            propsConfig={{ pending }}
            iconClass={pendingDot}
          />
        );
      }
      return pendingDot;
    }
    if (timeLineType === 'icon' && getString(icon)) {
      return <Icon singleTheme viewClass={viewClass} theme={theIconTheme} iconClass={icon} />;
    }
    const { status } = this.props;
    return (
      <Dot
        themeProps={this.props.getPartOfThemeProps('TimeLineDot', {
          props: {
            status,
          },
        })}
      />
    );
  }

  getExplainDot() {
    const { timeLineType } = this.props;
    if (timeLineType === 'explain') {
      return <ExplainDot themeProps={this.props.getPartOfThemeProps('TimeLineExplainDot')} />;
    }
  }

  getDescription() {
    const { timeLineType, description } = this.props;
    if (timeLineType !== 'explain' && getString(description)) {
      return (
        <Description ref={this.desc} themeProps={this.props.themeProps}>
          {description}
        </Description>
      );
    }
    return null;
  }
}

const TargetTimeLineItem = ThemeProvider(TimeLineItem, Widget.TimeLineItem);
export default TargetTimeLineItem;
