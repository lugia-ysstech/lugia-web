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
import { mouseWheel, } from '../common/mouseWheel';
import $ from 'jquery';
import * as Widget from '../consts/Widget';

const defaultHeight = 250;
const width = props => {
  const width = props.theme.width;
  return width ? `${width}px;` : '200px;';
};
const Col = styled.div`
  width:${width}
  display: inline-block;
`;
const ScrollerContainer = styled.div`
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
        return <ScrollerContainer innerRef={cmp => this.container = cmp}>
          <Col theme={this.props.getTheme()}>{menus}</Col>
          <Col>
            <Scroller ref={cmp => this.scroller = cmp}
                      viewSize={viewSize}
                      totalSize={totalSize}
                      onChange={this.onScroller}/>
          </Col>
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
        mouseWheel($);
        $(this.container).mousewheel(this.scroller ? this.scroller.onWheel : () => {});
        this.bindContainerEvent = true;
      }
    }

    //TODO:释放事件

    fetchViewHeigh () {
      const { height = defaultHeight, } = this.props.getTheme();
      return height;
    }

  };

};
