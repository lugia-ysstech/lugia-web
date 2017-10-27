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

    constructor (props: any) {
      super(props);
      this.state = {
        start: 0,
      };
    }

    container: Object;
    scroller: ?Object;

    render () {
      const { data, children, } = this.props;
      const viewSize = this.fetchViewHeigh();
      let start = 0, end = 0, totalSize = 0, needScroller = false;
      const target = data ? data : children;
      if (target && target.length > 0) {
        ({ totalSize, needScroller, start, end, } = this.computeItems(target,
          this.props.start != undefined ? this.props.start : this.state.start));
      }
      const menus = <Target {...this.props} start={start} end={end}/>;

      if (needScroller) {
        return <ScrollerContainer theme={this.props.getTheme()} innerRef={cmp => this.container = cmp}
                                  onWheel={this.onWheel}>
          <Col theme={this.props.getTheme()}>{menus}</Col>
          <ScrollerCol theme={this.props.getTheme()}>
            <Scroller ref={cmp => this.scroller = cmp}
                      viewSize={viewSize}
                      totalSize={totalSize}
                      onChange={this.onScroller}/>
          </ScrollerCol>
        </ScrollerContainer>;
      }
      return menus;
    }

    computeItems (data: Array<Object>, start: number): { totalSize: number, needScroller: boolean, start: number, end: number } {
      const seeCount = this.computeCanSeeMenuItemCount();
      const totalSize = menuItemHeight * data.length;
      const needScroller = seeCount < data.length;
      let end = seeCount + start;
      end = end < data.length ? end : data.length;

      return { totalSize, needScroller, start, end, };
    }

    onWheel = (e: Object) => {
      this.scroller && this.scroller.onWheel && this.scroller.onWheel.call(this.scroller, e);
    };
    onScroller = (value: number) => {
      const { onScroller, } = this.props;
      const start = Math.floor(value / menuItemHeight);
      onScroller ? onScroller(start) : this.setState({ start, });
    };

    computeCanSeeMenuItemCount (): number {
      return Math.ceil(this.fetchViewHeigh() / menuItemHeight);
    }

    bindContainerEvent: boolean;

    componentDidMount () {
      if (this.container && this.bindContainerEvent !== true) {
        this.bindContainerEvent = true;
      }
    }

    componentDidUpdate () {
      if (this.container && this.bindContainerEvent !== true) {
        this.bindContainerEvent = true;
      }
    }

    componentWillUnmount () {
      if (this.container && this.bindContainerEvent === true) {
        this.bindContainerEvent = false;
      }
    }

    fetchViewHeigh () {
      const { height = defaultHeight, } = this.props.getTheme();
      return height;
    }

  };

};
