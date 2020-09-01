/***
 * @flow
 * create by szfeng
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import FlexLine from './Line';

const DEFAULTMARGIN = 6;

const Wrap = styled.div`
  width: 80%;
  height: 900px;
  margin: 10px auto;
  background: #d9d9d9;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CommonFlexWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const RowFlexWrap = styled(CommonFlexWrap)`
  height: ${props => props.height};
  flex: ${props => props.flexValue};
`;

const ColFlexWrap = styled(CommonFlexWrap)`
  width: ${props => props.width};
  flex-direction: column;
  flex: ${props => props.flexValue};
`;

class PageLayout extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      data,
    };
    this.canDrop = false;
    this.changeData = JSON.parse(JSON.stringify(data));
    this.allItemInfo = this.fetchAllItemInfo(data);
  }

  componentDidMount() {
    document.body.addEventListener('mousemove', this.onMouseMove);
    document.body.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousemove', this.onMouseMove);
    document.body.removeEventListener('mouseup', this.onMouseUp);
  }

  exposeData = (data: Object) => {
    const { onChange } = this.props;
    onChange && onChange(data);
  };

  fetchAllItemInfo = (data: Object) => {
    const allItemInfo = {};
    this.filterAllItem(allItemInfo, data);
    return allItemInfo;
  };

  filterAllItem = (allItemInfo: Object, data: Object) => {
    data.forEach(item => {
      const { id = '', children = [] } = item;
      allItemInfo[id] = item;
      if (children.length > 0) {
        this.filterAllItem(allItemInfo, children);
      }
    });
  };

  getFlexWrap = (type: 'row' | 'col') => {
    return type === 'row' ? RowFlexWrap : ColFlexWrap;
  };

  getElementTarget = (id: string) => {
    return document.getElementById(id);
  };

  fetchFatherSize = (type: 'row' | 'col', element: Object, count: number) => {
    const fatherWidth = element.offsetWidth;
    const fatherHeight = element.offsetHeight;
    const allMarginValue = DEFAULTMARGIN * count;
    const allSize = type === 'row' ? fatherHeight : fatherWidth;
    return allSize - allMarginValue;
  };

  fetchFlexToValue = (flexValue: number, fatherSize: number) => {
    return (fatherSize * flexValue) / 100;
  };

  fetchCloselyTargetInfo = (
    type: 'row' | 'col',
    preItem: Object,
    nextItem: Object,
    fatherSize: number
  ) => {
    const {
      size: { width: preWidthPercent = '100%', height: preHeightPercent = '100%' } = {},
    } = preItem;
    const {
      size: { width: nextWidthPercent = '100%', height: nextHeightPercent = '100%' } = {},
    } = nextItem;
    let preFlex;
    let nextFlex;

    if (type === 'row') {
      preFlex = this.fetchFlexValue(preHeightPercent);
      nextFlex = this.fetchFlexValue(nextHeightPercent);
    } else {
      preFlex = this.fetchFlexValue(preWidthPercent);
      nextFlex = this.fetchFlexValue(nextWidthPercent);
    }
    const preSize = this.fetchFlexToValue(preFlex, fatherSize);
    const nextSize = this.fetchFlexToValue(nextFlex, fatherSize);
    return {
      preFlex,
      nextFlex,
      totalFlex: preFlex + nextFlex,
      preSize,
      nextSize,
      totalSize: preSize + nextSize,
      fatherSize,
    };
  };

  onLineMouseDown = (type: 'row' | 'col', index: number, data: Object) => (event: any) => {
    this.lineType = type;
    const { fatherId } = data[index];
    const targetFatherId = fatherId ? fatherId : '__page_layout_wrap__';

    this.fatherSize = this.fetchFatherSize(
      type,
      this.getElementTarget(targetFatherId),
      data.length - 1
    );

    this.preItemIndex = index - 1;
    this.nextItemIndex = index;
    this.preItem = data[this.preItemIndex];
    this.nextItem = data[this.nextItemIndex];
    this.preElement = this.getElementTarget(this.preItem.id);
    this.nextElement = this.getElementTarget(this.nextItem.id);

    this.closelyTargetInfo = this.fetchCloselyTargetInfo(
      type,
      this.preItem,
      this.nextItem,
      this.fatherSize
    );

    this.initMouseOffsetX = event.clientX;
    this.initMouseOffsetY = event.clientY;

    this.canDrop = true;
  };

  fetchSize2Flex = (size: number, fatherSize: number) => {
    return (size / fatherSize) * 100;
  };

  getNewPreItemSize = (size: number, distance: number, maxSize: number) => {
    const targetValue = size + distance;
    return targetValue <= 0 ? 0 : targetValue >= maxSize ? maxSize : targetValue;
  };

  onMouseMove = (event: any) => {
    if (!this.canDrop) {
      return;
    }
    let newPreItemSize;
    const { preSize, totalFlex, totalSize, fatherSize } = this.closelyTargetInfo;
    if (this.lineType === 'row') {
      newPreItemSize = this.getNewPreItemSize(
        preSize,
        event.clientY - this.initMouseOffsetY,
        totalSize
      );
    } else {
      newPreItemSize = this.getNewPreItemSize(
        preSize,
        event.clientX - this.initMouseOffsetX,
        totalSize
      );
    }
    const newPreFlex = this.fetchSize2Flex(newPreItemSize, fatherSize);
    const newNextFlex = totalFlex - newPreFlex;
    this.newPreFlex = newPreFlex;
    this.preElement.style.flex = newPreFlex;
    this.nextElement.style.flex = newNextFlex;
  };

  onMouseUp = () => {
    if (!this.canDrop) {
      return;
    }
    this.canDrop = false;
    const { totalFlex } = this.closelyTargetInfo;
    const { id: preId, size: preSize } = this.preItem;
    const { id: nextId, size: nextSize } = this.nextItem;
    const newPreItem = JSON.parse(JSON.stringify(this.preItem));
    const newNextItem = JSON.parse(JSON.stringify(this.nextItem));
    const newPreFlex = this.getNewItemFlex();
    const newPrePercent = newPreFlex + '%';
    const newNextPercent = totalFlex - newPreFlex + '%';
    if (this.lineType === 'row') {
      newPreItem.size = { ...preSize, height: newPrePercent };
      newNextItem.size = { ...nextSize, height: newNextPercent };
    } else {
      newPreItem.size = { ...preSize, width: newPrePercent };
      newNextItem.size = { ...nextSize, width: newNextPercent };
    }

    const nextData = this.fetchNextData({ [preId]: newPreItem, [nextId]: newNextItem });

    this.changeData = nextData;
    this.allItemInfo = this.fetchAllItemInfo(nextData);
    this.setState({
      data: nextData,
    });
    this.exposeData(nextData);
  };

  fetchNextData = (target: Object) => {
    const nextData = JSON.parse(JSON.stringify(this.changeData));
    this.changeNextData(nextData, target);
    return nextData;
  };

  changeNextData = (nextData: Object, target: Object) => {
    nextData.forEach((item, index) => {
      const { id, children = [] } = item;
      if (target[id]) {
        nextData.splice(index, 1, target[id]);
      } else {
        if (children.length > 0) {
          this.changeNextData(children, target);
        }
      }
    });
  };

  getNewItemFlex = () => {
    return Number(this.newPreFlex.toFixed(3));
  };

  getTopLine = (type: 'row' | 'col', index: number, data: Object): null | React.Node => {
    const isFirst = index === 0;
    if (isFirst) {
      return null;
    }
    return <FlexLine type={type} onMouseDown={this.onLineMouseDown(type, index, data)} />;
  };

  fetchFlexValue = value => {
    const numberStr = value.split('%')[0];
    return Number(numberStr);
  };

  fetchPercentToFlexValue = (size: Object = {}) => {
    const { width = '100%', height = '100%' } = size;
    return {
      widthFlex: this.fetchFlexValue(width),
      heightFlex: this.fetchFlexValue(height),
    };
  };

  getPageItemWrap = () => {
    return <div>1</div>;
  };

  getPageLayoutComponent = (data: Object = []) => {
    if (data.length === 0) {
      return null;
    }
    return data.map((item: Object, index: number) => {
      const { id = '', type = 'row', size = {}, children = [] } = item;
      const { width = '100%', height = '100%' } = size;
      const { widthFlex, heightFlex } = this.fetchPercentToFlexValue(size);
      const FlexWrap = this.getFlexWrap(type);
      const flexValue = type === 'row' ? heightFlex : widthFlex;

      return (
        <React.Fragment key={`${id}-Fragment-${type}`}>
          {this.getTopLine(type, index, data, id)}
          <FlexWrap
            key={`${id}-flexWrap-${type}`}
            id={id}
            width={width}
            height={height}
            flexValue={flexValue}
          >
            {children.length === 0 ? this.getPageItemWrap() : this.getPageLayoutComponent(children)}
          </FlexWrap>
        </React.Fragment>
      );
    });
  };

  render() {
    const { data = [] } = this.state;
    // wrap 需要一个固定id
    return <Wrap id={'__page_layout_wrap__'}>{this.getPageLayoutComponent(data)}</Wrap>;
  }
}

export default PageLayout;
