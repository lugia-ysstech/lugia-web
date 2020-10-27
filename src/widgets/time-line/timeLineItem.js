/**
 *
 * create by liangguodong on 2018/11/19
 *
 * @flow
 */
import type { TimeLineMode, TimeLineStatus, TimeLineItemType } from '../css/time-line';
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
import CSSComponent, { css, keyframes, StaticComponent } from '@lugia/theme-css-hoc';

import { units } from '@lugia/css';
import { getBorderRadius, getBorder } from '@lugia/theme-utils';

const { px2remcss } = units;

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';

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
  },
  css: css`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
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
    selectNames: [['font'], ['fontSize'], ['color'], ['margin'], ['lineHeight']],
    defaultTheme: {
      color: darkGreyColor,
      margin: {
        top: 4,
      },
    },
  },
});

const Time = CSSComponent({
  extend: BaseText,
  className: 'TimeLineItemBaseText',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color'], ['margin'], ['lineHeight']],
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
    display: flex;
    justify-content: center;
  `,
});

const Line = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemLine',
  normal: {
    selectNames: [['height'], ['border', 'left'], ['margin']],
    defaultTheme: {
      border: getBorder({ color: borderColor, width: 1, style: 'solid' }, { directions: ['l'] }),
      height: '100%',
      margin: {
        left: 10,
      },
    },
    getCSS(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { isLast } = propsConfig;
      const display = isLast ? 'none' : '';
      return `display:${display};`;
    },
  },
  css: css`
    position: relative;
  `,
});
const LineContainer = StaticComponent({
  tag: 'div',
  className: 'TimeLineItemLineContainer',
  css: css`
    flex: 1;
  `,
});

const Dot = CSSComponent({
  tag: 'div',
  className: 'TimeLineItemDot',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['borderRadius'],
      ['border'],
      ['boxShadow'],
    ],
    defaultTheme: {
      width: 10,
      height: 10,
      borderRadius: getBorderRadius('50%'),
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
const DotItemContainer = CSSComponent({
  tag: 'div',
  className: 'DotItemContainer',
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['padding']],
    getThemeMeta(themeMeta, themeProps) {
      const { height } = themeMeta;
      const { propsConfig } = themeProps;
      const { timeLineType } = propsConfig;
      const theHeight =
        height || (timeLineType === 'explain' ? 6 : timeLineType === 'icon' ? 12 : 10);
      return { height: theHeight };
    },
  },
  css: css`
    display: flex;
  `,
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
  timeLineType: TimeLineItemType,
  pendingDot: React.Node,
  pending: boolean,
  mode: TimeLineMode,
  getChildDirectionAndWidth: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
  themeProps: Object,
  _leftMaxWidth: string,
};

class TimeLineItem extends Component<TimeLineProps, TimeLineState> {
  static defaultProps = {
    status: 'normal',
  };
  desc: any;
  time: any;
  descHeight: any;
  descWidth: any;
  timeWidth: any;

  constructor(props: TimeLineProps) {
    super(props);
    this.desc = React.createRef();
    this.time = React.createRef();
  }

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
  componentDidMount() {
    if (this.desc.current) {
      this.descHeight = this.desc.current.offsetHeight;
      this.descWidth = this.desc.current.offsetWidth;
    }
    if (this.time.current) {
      this.timeWidth = this.time.current.offsetWidth;
    }
    const theWidth =
      this.desc.current && this.descWidth >= this.timeWidth ? this.descWidth : this.timeWidth;
    this.handleWidth(theWidth);
  }

  handleWidth(width: number) {
    const { getChildDirectionAndWidth, direction } = this.props;
    getChildDirectionAndWidth &&
      getChildDirectionAndWidth({
        width,
        direction,
      });
  }

  render() {
    const { description, time, isLast, direction, timeLineType, mode, _leftMaxWidth } = this.props;

    const theTime = timeLineType !== 'explain' ? time : '';
    const itemThemeProps = deepMerge(
      { themeConfig: { normal: this.getHeightByType(timeLineType, this.props.description) } },
      this.props.getPartOfThemeProps('TimeLineItemContainer', {
        props: {
          maxWidth: _leftMaxWidth || 0,
          mode,
        },
      })
    );
    const lineThemeProps = this.props.getPartOfThemeProps('TimeLineItemLine', {
      props: {
        isLast,
        description,
        timeLineType,
      },
    });
    const themeProps = this.props.getPartOfThemeProps('TimeLineDot', {
      props: {
        timeLineType,
      },
    });
    return (
      <ItemContainer
        themeProps={itemThemeProps}
        description={description}
        timeLineType={timeLineType}
      >
        <DotItemContainer themeProps={themeProps}>
          <DotContainer themeProps={themeProps}>{this.getDot()}</DotContainer>
          <Content
            themeProps={this.props.getPartOfThemeProps('TimeLineItemContentContainer', {
              props: { direction },
            })}
          >
            <Time ref={this.time} themeProps={this.props.getPartOfThemeProps('TimeLineItemTitle')}>
              {theTime}
            </Time>
            {this.getDescription()}
          </Content>
        </DotItemContainer>
        <LineContainer>
          <Line themeProps={lineThemeProps} />
        </LineContainer>
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
              },
            },
            ChildrenContainer: {
              normal: {
                getCSS() {
                  return 'display:block;';
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
            color: darkGreyColor,
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
        <Description
          ref={this.desc}
          themeProps={this.props.getPartOfThemeProps('TimeLineItemDescription')}
        >
          {description}
        </Description>
      );
    }
    return null;
  }
}

const TargetTimeLineItem = ThemeProvider(TimeLineItem, Widget.TimeLineItem);
export default TargetTimeLineItem;
