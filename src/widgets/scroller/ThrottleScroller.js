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

const defaultHeight = 250;

const Col = styled.div`
  display: inline-block;
`;
const ScrollerContainer = styled.div`
  position: relative;
`;
type ThrottleScrollerProps = {|
  getTheme: Function,
  data: Array<Object>,
  children: Array<React.Element<any>>,
|} ;
type ThrottleScrollerState = {
  start: number,
}
export default (Target: React.ComponentType<any>, menuItemHeight: number) => {
  return class ThrottleScroller extends React.Component<ThrottleScrollerProps, ThrottleScrollerState> {
    static defaultProps = {
      mutliple: false,
      getTheme: () => {
        return {};
      },
    };

    constructor (props: ThrottleScrollerProps) {
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
        ({ totalSize, needScroller, start, end, } = this.computeItems(target));
      }

      const menus = <Target {...this.props} start={start} end={end}/>;

      if (needScroller) {
        return <ScrollerContainer innerRef={cmp => this.container = cmp}>
          <Col>{menus}</Col>
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

    computeItems (data: Array<Object>): { totalSize: number, needScroller: boolean, start: number, end: number } {
      const { start, } = this.state;
      const seeCount = this.computeCanSeeMenuItemCount();
      const totalSize = menuItemHeight * data.length;
      const needScroller = seeCount < data.length;
      let end = seeCount + start;
      end = end < data.length ? end : data.length;

      return { totalSize, needScroller, start, end, };
    }


    onScroller = (value: number) => {
      this.setState({ start: Math.floor(value / menuItemHeight), });
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
