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
import { DefaultHeight, DefaultWidth, BarDefaultSize } from '../css/scroller';

const height = props => {
  const height = props.theme.height;
  return height ? `height:${height}px;` : `height:${DefaultHeight}px;`;
};
const width = props => {
  const width = props.theme.width;
  return width ? `width:${width}px;` : `width:${DefaultWidth}px;`;
};
const getContentWidth = props => {
  const width = props.theme.width;
  return width ? width - BarDefaultSize : DefaultWidth - BarDefaultSize;
};

const contentWidth = props => {
  return `width:${getContentWidth(props)}px;`;
};

const scrollerLeft = props => {
  return `left: ${getContentWidth(props)}px;`;
};

const Col = styled.div`
  ${height} ${contentWidth}
  position: absolute;
  display: inline-block;
`;

const ScrollerContainer = styled.div`
  overflow: hidden;
  ${height} ${width}
  position: relative;
`;

const ScrollerCol = Col.extend`
  ${scrollerLeft}
  width: ${BarDefaultSize}px;
  opacity: 0;
  ${ScrollerContainer}:hover & {
    opacity: 1;
  }
  transition: opacity 0.3s;
`;

type ThrottleScrollerState = {
  start: number,
};
export default (Target: React.ComponentType<any>, menuItemHeight: number) => {
  return class ThrottleScroller extends React.Component<any, ThrottleScrollerState> {
    static displayName = Widget.ThrottleScroller;
    static defaultProps = {
      mutliple: false,
      getTheme: () => {
        return {};
      },
    };
    scroller: ?Object;

    constructor(props: any) {
      super(props);
      this.state = {
        start: 0,
      };
    }

    render() {
      const { props } = this;

      const start = this.getStart(props, this.state);

      if (!this.isNeedScroller()) {
        const { length } = this.getTarget();
        //TODO: 待测试
        return <Target {...props} start={0} end={length} canSeeCount={length} />;
      }

      const { type, getTheme, step } = props;
      const viewSize = this.fetchViewSize();
      const totalSize = this.fetchTotalSize();

      const end = this.fetchEnd(start);
      const theme = getTheme();
      const canSeeCount = this.canSeeCount();

      return (
        <ScrollerContainer theme={theme} onWheel={this.onWheel}>
          <Col theme={theme}>
            <Target {...props} canSeeCount={canSeeCount} start={start} end={end} />
          </Col>
          <ScrollerCol theme={theme}>
            <Scroller
              ref={cmp => (this.scroller = cmp)}
              type={type}
              value={menuItemHeight * start}
              viewSize={viewSize}
              totalSize={totalSize}
              onChange={this.onScroller}
              step={step}
            />
          </ScrollerCol>
        </ScrollerContainer>
      );
    }

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
      const viewHeight = this.fetchViewSize();
      if (viewHeight <= 0 || menuItemHeight <= 0) {
        return 0;
      }
      return Math.ceil(viewHeight / menuItemHeight);
    }

    fetchViewSize() {
      const { height = DefaultHeight } = this.props.getTheme();
      return height;
    }

    fetchTotalSize(): number {
      const { length } = this.getTarget();
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
      this.scroller && this.scroller.onWheel && this.scroller.onWheel.call(this.scroller, e);
    };

    onScroller = (value: number) => {
      const { onScroller } = this.props;
      const start = value / menuItemHeight;
      onScroller ? onScroller(start, this.fetchEnd(start)) : this.setState({ start });
    };
  };
};
