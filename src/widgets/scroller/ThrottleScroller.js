/**
 * 节流滚动HOC
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Scroller from './index';
import Widget from '../consts/index';
import { toNumber } from '../common/NumberUtils';
import { DefaultHeight, ScrollerContainer, Col, ScrollerCol } from '../css/scroller';
import { getCanSeeCount } from './support';

type ThrottleScrollerState = {
  start: number,
};
export default (
  Target: React.ComponentType<any>,
  MenuItemHeight: number,
  TargetWrapName: string,
  TargetItemNames: string[]
) => {
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

    itemHeight: number;

    isDrag: boolean;

    constructor(props: any) {
      super(props);
      this.state = {
        start: 0,
      };
      this.itemHeight = this.getActiveItemHeight(props);
      this.scrollerTarget = React.createRef();
    }

    getActiveItemHeight = (props: Object) => {
      const { getPartOfThemeConfig } = props;
      const ItemName = TargetItemNames[0];
      const ItemWrapName = TargetItemNames[1];
      const themeConfig = getPartOfThemeConfig(ItemName);
      const ItemWrapThemeConfig = themeConfig[ItemWrapName] ? themeConfig[ItemWrapName] : {};
      const { normal = {} } = ItemWrapThemeConfig;
      const { height = MenuItemHeight } = normal;
      return height;
    };

    render() {
      const { props } = this;

      const start = this.getStart(props, this.state);
      const { level, autoHeight = false, getPartOfThemeProps } = props;
      const totalSize = this.fetchTotalSize();
      const themeProps = getPartOfThemeProps(TargetWrapName, {
        props: {
          isDrag: this.isDrag,
          autoHeight,
          totalSize,
        },
      });

      const pack = (element: Object | Array<Object>) => {
        return (
          <ScrollerContainer themeProps={themeProps} onWheel={this.onWheel}>
            {element}
          </ScrollerContainer>
        );
      };

      if (!this.isNeedScroller() || autoHeight) {
        const { length } = this.getTarget();
        //TODO: 待测试
        return pack(
          <Target
            {...props}
            start={0}
            end={length}
            canSeeCount={length}
            menuItemHeight={this.itemHeight}
            ref={this.scrollerTarget}
          />
        );
      }

      const { type, step } = props;
      const viewSize = this.fetchViewSize();

      const end = this.fetchEnd(start);
      const canSeeCount = this.canSeeCount();
      const menuItemHeight = this.itemHeight;

      return pack([
        <Col themeProps={themeProps} level={level}>
          <Target
            {...props}
            canSeeCount={canSeeCount}
            start={start}
            end={end}
            menuItemHeight={this.itemHeight}
            ref={this.scrollerTarget}
          />
        </Col>,
        <ScrollerCol level={level} themeProps={themeProps} isDrag={this.isDrag}>
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
      return getCanSeeCount(this.fetchViewSize(), this.itemHeight);
    }

    fetchViewSize = () => {
      const { autoHeight = false, getPartOfThemeConfig } = this.props;
      const { normal = {} } = getPartOfThemeConfig(TargetWrapName);
      let { height } = normal;
      height = !height && height !== 0 ? DefaultHeight : height;
      const { data = [] } = this.props;
      const allItemHeight = this.itemHeight * data.length;
      return autoHeight ? allItemHeight : height;
    };

    fetchTotalSize(): number {
      const { length } = this.getTarget();
      const { normal = {} } = this.props.getPartOfThemeConfig(TargetWrapName);
      const { padding = {} } = normal;
      const { top } = padding;
      return length * this.itemHeight;
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
      // if (this.isNeedScroller()) {
      console.log('ccc', e.preventDefault);
      e.stopPropagation && e.stopPropagation();
      e.preventDefault && e.preventDefault();
      // }
      this.scroller && this.scroller.onWheel && this.scroller.onWheel.call(this.scroller, e);
    };

    onScroller = (value: number) => {
      const { onScroller } = this.props;

      const start = value / this.itemHeight;
      onScroller ? onScroller(start, this.fetchEnd(start)) : this.setState({ start });
    };
  };
};
