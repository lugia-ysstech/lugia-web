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
import * as Widget from '../consts/Widget';

const scrollerWidth = 12;
const defaultWidth = 250;
const defaultHeight = 250;
const height = props => {
  const height = props.theme.height;
  return height ? `height:${height}px;` : `height:${defaultHeight}px;`;
};
const width = props => {
  const width = props.theme.width;
  return width ? `width:${width}px;` : `width:${defaultWidth}px;`;
};
const getContentWidth = props => {
  const width = props.theme.width;
  return width ? width - scrollerWidth : defaultWidth - scrollerWidth;
};

const contentWidth = props => {
  return `width:${getContentWidth(props)}px;`;
};

const scrollerLeft = props => {
  return `left: ${getContentWidth(props)}px;`;
};


const Col = styled.div`
  ${height}
  ${contentWidth}
  position: absolute;
  display: inline-block;
`;

const ScrollerCol = Col.extend`
  ${scrollerLeft}
  width: ${scrollerWidth}px;
`;

const ScrollerContainer = styled.div`
  overflow: hidden;
  ${height}
  ${width}
  position: relative;
`;

type ThrottleScrollerState = {
  start: number,
}
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

    constructor (props: any) {
      super(props);
      this.state = {
        start: 0,
      };
    }

    render () {
      const { props, } = this;


      if (!this.isNeedScrolelr()) {
        const { length, } = this.getTarget();
        return <Target {...props} start={0} end={length}/>;
      }

      const { type, getTheme, } = props;
      const viewSize = this.fetchViewSize();
      const totalSize = this.fetchTotalSize();

      const start = this.getStart(props, this.state);
      const end = this.fetchEnd(start);
      const theme = getTheme();

      return <ScrollerContainer theme={theme}
                                onWheel={this.onWheel}>
        <Col theme={theme}>
          <Target {...props}
                  start={start}
                  end={end}/>
        </Col>
        <ScrollerCol theme={theme}>
          <Scroller ref={cmp => this.scroller = cmp}
                    type={type}
                    viewSize={viewSize}
                    totalSize={totalSize}
                    onChange={this.onScroller}/>
        </ScrollerCol>
      </ScrollerContainer>;

    }

    getStart (props: Object, state: Object): number {

      if ('start' in props) {
        const { start = 0, } = props;
        return start;
      }

      const { start = 0, } = state;
      return start;
    }

    isNeedScrolelr () {
      const { length, } = this.getTarget();
      return this.canSeeCount() < length;
    }

    canSeeCount (): number {

      const viewHeigh = this.fetchViewSize();

      if (viewHeigh <= 0 || menuItemHeight <= 0) {
        return 0;
      }

      return Math.ceil(viewHeigh / menuItemHeight);
    }

    fetchViewSize () {
      const { height = defaultHeight, } = this.props.getTheme();
      return height;
    }

    fetchTotalSize (): number {
      const { length, } = this.getTarget();
      return length * menuItemHeight;
    }

    getTarget (): Array<any> {
      const { data, children, } = this.props;
      if (!data && !children) {
        return [];
      }
      return data ? data : children;
    }

    fetchEnd (start: number): number {
      const { length: maxLen, } = this.getTarget();
      if (maxLen === 0) {
        return 0;
      }
      const seeCount = this.canSeeCount();
      return Math.min(seeCount + Math.max(start, 0), maxLen - 1);
    }

    onWheel = (e: Object) => {
      this.scroller && this.scroller.onWheel && this.scroller.onWheel.call(this.scroller, e);
    };

    onScroller = (value: number) => {
      const { onScroller, } = this.props;
      const start = Math.floor(value / menuItemHeight);
      onScroller ? onScroller(start) : this.setState({ start, });
    };

  };

};
