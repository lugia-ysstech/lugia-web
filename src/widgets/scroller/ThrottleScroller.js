/**
 * 节流滚动HOC
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Scroller from './index';
import '../css/sv.css';
import Widget from '../consts/index';
import { FontSizeNumber } from '../css';
import { BarDefaultSize, DefaultHeight, DefaultWidth } from '../css/scroller';
import { px2emcss } from '../css/units';
import { getCanSeeCount } from './support';
import { getMenuItemHeight } from '../css/menu';

const em = px2emcss(FontSizeNumber);

const getItemHeight = (props: Object) => {
  const { size } = props;
  return getMenuItemHeight(size);
};

const height = props => {
  const { theme, length } = props;
  const { autoHeight = false, height: themeHeight } = theme;
  if (!autoHeight) {
    return themeHeight ? `height:${em(themeHeight)};` : `height:${em(DefaultHeight)};`;
  }
  const menuItemHeight = getItemHeight(props);
  const allItemHeight = menuItemHeight * length;

  if (!themeHeight || themeHeight > allItemHeight) {
    return `height: ${em(allItemHeight)}`;
  }
  return `height: ${em(themeHeight)}`;
};

const getActiveWidth = props => {
  const { level, theme } = props;
  const { width, submenuWidth } = theme;
  if (!level || level === 0) {
    return width;
  }

  return submenuWidth ? submenuWidth : width;
};

const width = props => {
  const width = getActiveWidth(props);
  return width ? `width:${em(width)};` : `width:${em(DefaultWidth)};`;
};
const getContentWidth = props => {
  const width = getActiveWidth(props);
  return width ? em(width - BarDefaultSize) : em(DefaultWidth - BarDefaultSize);
};

const contentWidth = props => {
  return `width:${getContentWidth(props)};`;
};

const scrollerLeft = props => {
  return `left: ${getContentWidth(props)};`;
};

const Col = styled.div`
  ${contentWidth};
  position: absolute;
  display: inline-block;
`;

const ScrollerContainer = styled.div`
  overflow: hidden;
  ${height};
  ${width};
  position: relative;
`;

const getOpacity = (props: Object) => {
  const { isDrag } = props;
  if (isDrag) {
    return 'opacity: 1;';
  }
  return '';
};
const ScrollerCol = Col.extend`
  ${scrollerLeft};
  width: ${em(BarDefaultSize)};
  opacity: 0;
  ${ScrollerContainer}:hover & {
    opacity: 1;
  }
  ${getOpacity} transition: opacity 0.3s;
`;

type ThrottleScrollerState = {
  start: number,
};
export default (Target: React.ComponentType<any>, MenuItemHeight: number) => {
  return class ThrottleScroller extends React.Component<any, ThrottleScrollerState> {
    static displayName = Widget.ThrottleScroller;
    static defaultProps = {
      mutliple: false,
      getTheme: () => {
        return {};
      },
    };
    scroller: ?Object;
    scrollerTarget: ?Object;

    constructor(props: any) {
      super(props);
      this.state = {
        start: 0,
      };
    }

    isDrag: boolean;

    render() {
      const { props } = this;
      const start = this.getStart(props, this.state);
      const { getTheme } = props;
      const theme = getTheme();
      const { data, size, level } = props;
      const length = data.length;
      const pack = (element: Object | Array<Object>) => {
        return (
          <ScrollerContainer
            size={size}
            level={level}
            length={length}
            theme={theme}
            onWheel={this.onWheel}
          >
            {element}
          </ScrollerContainer>
        );
      };

      if (!this.isNeedScroller()) {
        const { length } = this.getTarget();
        //TODO: 待测试
        return pack(
          <Target
            {...props}
            start={0}
            end={length}
            canSeeCount={length}
            ref={cmp => (this.scrollerTarget = cmp)}
          />
        );
      }

      const { type, step } = props;
      const viewSize = this.fetchViewSize();
      const totalSize = this.fetchTotalSize();

      const end = this.fetchEnd(start);
      const canSeeCount = this.canSeeCount();
      const menuItemHeight = getItemHeight(props);
      return pack([
        <Col theme={theme} level={level}>
          <Target
            {...props}
            canSeeCount={canSeeCount}
            start={start}
            end={end}
            ref={cmp => (this.scrollerTarget = cmp)}
          />
        </Col>,
        <ScrollerCol level={level} theme={theme} isDrag={this.isDrag}>
          <Scroller
            ref={cmp => (this.scroller = cmp)}
            type={type}
            onDrag={this.onDrag}
            value={menuItemHeight * start}
            viewSize={viewSize}
            totalSize={totalSize}
            onChange={this.onScroller}
            step={step}
          />
        </ScrollerCol>,
      ]);
    }

    onDrag = (drag: boolean) => {
      this.isDrag = drag;
    };

    getStart(props: Object, state: Object): number {
      const { length } = this.getTarget();

      const limitStart = (start: number) => {
        const maxStart = Math.max(0, length - this.canSeeCount() + 1);
        return Math.min(start, maxStart);
      };

      if ('start' in props) {
        const { start = 0 } = props;
        return limitStart(start);
      }

      const { start = 0 } = state;
      return limitStart(start);
    }

    isNeedScroller() {
      const { length } = this.getTarget();
      return this.canSeeCount() < length;
    }

    canSeeCount(): number {
      const menuItemHeight = getItemHeight(this.props);
      return getCanSeeCount(this.fetchViewSize(), menuItemHeight);
    }

    fetchViewSize = () => {
      const { height: themeHeight, autoHeight = false } = this.props.getTheme();
      if (!autoHeight) {
        return themeHeight || themeHeight === 0 ? themeHeight : DefaultHeight;
      }
      const { data } = this.props;
      const menuItemHeight = getItemHeight(this.props);
      const allItemHeight = menuItemHeight * data.length;
      if (!themeHeight || themeHeight > allItemHeight) {
        return allItemHeight;
      }
      return themeHeight;
    };

    fetchTotalSize(): number {
      const { length } = this.getTarget();
      const menuItemHeight = getItemHeight(this.props);
      return length * menuItemHeight;
    }

    getTarget(): Array<any> {
      const { data, children } = this.props;
      if (!data && !children) {
        return [];
      }
      return data ? data : children;
    }

    fetchEnd(start: number): number {
      const { length: maxLen } = this.getTarget();
      if (maxLen === 0) {
        return 0;
      }
      const seeCount = this.canSeeCount();

      return Math.min(seeCount + Math.max(start, 0), maxLen);
    }

    onWheel = (e: Object) => {
      e.stopPropagation();
      e.preventDefault();
      this.scroller && this.scroller.onWheel && this.scroller.onWheel.call(this.scroller, e);
    };

    onScroller = (value: number) => {
      const { onScroller } = this.props;
      const menuItemHeight = getItemHeight(this.props);
      const start = value / menuItemHeight;
      onScroller ? onScroller(start, this.fetchEnd(start)) : this.setState({ start });
    };
  };
};
