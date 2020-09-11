/***
 * @flow
 * create by szfeng
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import FlexLine from './Line';
import Icon from '../icon';
import EnlargeContainer from './EnlargeContainer';

const DEFAULTMARGIN = 4;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
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
  box-sizing: border-box;
  overflow: hidden;
  &:hover > div {
    opacity: 1;
  }
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

export const EnlargeIconWrap = styled.div`
  width: 20px;
  height: 20px;
  background: #fff;
  position: absolute;
  top: 5px;
  right: 5px;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  z-index: 1000;
  opacity: 0;
  border-radius: 2px;
  transition: all 0.3s;
`;

export const CommonSpacingBox = styled.div`
  background: #000;
  width: 100%;
  height: 100%;
`;

export const SpacingRowBox = styled(CommonSpacingBox)`
  height: ${props => `${props.height}px`};
`;

export const SpacingColBox = styled(CommonSpacingBox)`
  width: ${props => `${props.width}px`};
`;

class PageLayout extends Component {
  constructor(props) {
    super(props);
    const { data, contentInfo = {}, hiddenInfo = {} } = this.props;
    const showData = this.fetchShowData(data, hiddenInfo);
    this.state = {
      showData,
      contentInfo,
      hiddenInfo,
    };
    this.canDrop = false;
    this.dragItem = {};
    this.cloneNode = null;

    this.updataAllItemInfo(showData);

    this.enlargeContainer = React.createRef();
    this.wrapId = this.getWrapId();
    this.originalData = data;
  }

  updataAllItemInfo = (data: Object) => {
    const { allShowItemInfo, allDropInfo } = this.fetchAllItemInfo(data);
    this.allShowItemInfo = allShowItemInfo;
    this.allDropInfo = allDropInfo;
  };

  getWrapId = () => {
    const date = new Date();
    return `__page_layout_wrap__${date.getTime()}`;
  };

  fetchShowData = (data: Object, hiddenInfo: Object = {}) => {
    if (Object.keys(hiddenInfo).length === 0) {
      return data;
    }
    const showData = [];
    this.filterShowData(showData, data, hiddenInfo);
    return showData;
  };

  filterShowData = (showData: Object, data: Object, hiddenInfo: Object) => {
    data.forEach(item => {
      const { id, children = [] } = item;
      const newItem = JSON.parse(JSON.stringify(item));
      if (!hiddenInfo[id]) {
        if (children.length !== 0) {
          const newChildren = [];
          this.filterShowData(newChildren, children, hiddenInfo);
          newItem.children = newChildren;
        }
        showData.push(newItem);
      }
    });
  };

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

  getPreItem = (data: Object, preIndex: Number) => {
    for (let i = preIndex; i >= 0; i--) {
      const preItem = data[i];
      const { spacing = false } = preItem;
      if (!spacing) {
        return preItem;
      }
    }
    return null;
  };

  getNextItem = (data: Object, nextIndex: Number) => {
    for (let i = nextIndex; i < data.length; i++) {
      const nextItem = data[i];
      const { spacing = false } = nextItem;
      if (!spacing) {
        return nextItem;
      }
    }
    return null;
  };

  fetchAllItemInfo = (data: Object) => {
    const allShowItemInfo = {};
    const allDropInfo = {};
    this.filterAllItem(allShowItemInfo, data);
    this.filterDropItem(allDropInfo, data);
    return { allShowItemInfo, allDropInfo };
  };

  filterDropItem = (allDropInfo: Object, data: Object) => {
    data.forEach((item: Object, index: Number) => {
      const { id, spacing = false, children = [] } = item;
      if (id) {
        const isFirst = index === 0;
        const isLast = index === data.length - 1;
        const preIndex = index - 1;
        const nextIndex = index + 1;

        let topLine;
        let bottomLine;
        let lineCount = 0;
        let preItem = null;
        let nextItem = null;

        if (spacing) {
          if (isFirst || isLast) {
            topLine = false;
            bottomLine = false;
          } else {
            const { spacing: preSpacing = false } = data[preIndex];
            const { spacing: nextSpacing = false } = data[nextIndex];

            preItem = this.getPreItem(data, preIndex);
            nextItem = this.getNextItem(data, nextIndex);

            if (preSpacing) {
              topLine = false;
            } else {
              topLine = !!nextItem;
            }

            if (nextSpacing) {
              bottomLine = false;
            } else {
              bottomLine = !!preItem;
            }

            lineCount = Number(topLine) + Number(bottomLine);
          }
        } else {
          bottomLine = false;
          nextItem = item;
          if (isFirst) {
            topLine = false;
            preItem = null;
            lineCount = 0;
          } else {
            const preAdjoiningItem = data[preIndex];
            const { spacing: preSpacing = false } = preAdjoiningItem;
            topLine = !preSpacing;
            if (topLine) {
              preItem = preAdjoiningItem;
            }
            lineCount = Number(topLine);
          }
        }
        allDropInfo[id] = {
          topLine,
          bottomLine,
          lineCount,
          preItem,
          nextItem,
        };
        if (children.length > 0) {
          this.filterDropItem(allDropInfo, children);
        }
      }
    });
  };

  filterAllItem = (allShowItemInfo: Object, data: Object) => {
    data.forEach(item => {
      const { id = '', children = [] } = item;
      allShowItemInfo[id] = item;
      if (children.length > 0) {
        this.filterAllItem(allShowItemInfo, children);
      }
    });
  };

  getFlexWrap = (type: 'row' | 'col') => {
    return type === 'row' ? RowFlexWrap : ColFlexWrap;
  };

  getElementTarget = (id: string) => {
    return document.getElementById(id);
  };

  getSpacingItemInfo = (type: 'row' | 'col', data: Object) => {
    let totalCount = 0;
    let totalSpacing = 0;
    data.forEach((item: Object) => {
      const { id, spacing = false, numWidth = 0, numHeight = 0 } = item;
      const { lineCount = 0 } = this.allDropInfo[id];
      totalCount = totalCount + lineCount;
      if (spacing) {
        const spacingSize = type === 'row' ? Number(numHeight) : Number(numWidth);
        totalSpacing = totalSpacing + spacingSize;
      }
    });
    return { totalCount, totalSpacing };
  };

  fetchFatherSize = (type: 'row' | 'col', element: Object, data: Object) => {
    const fatherWidth = element.offsetWidth;
    const fatherHeight = element.offsetHeight;
    const { totalCount, totalSpacing } = this.getSpacingItemInfo(type, data);
    const allMarginValue = DEFAULTMARGIN * totalCount;
    const allSize = type === 'row' ? fatherHeight : fatherWidth;
    return allSize - allMarginValue - totalSpacing;
  };

  fetchFlexToValue = (flexValue: number, fatherSize: number, letter: number = 100) => {
    return (fatherSize * flexValue) / letter;
  };

  fetchAllBrotherItemsFlex = (type: 'row' | 'col', brotherItems: Object[]) => {
    let allFlex = 0;
    brotherItems.forEach((item: Object) => {
      const { size, spacing = false } = item;
      if (!spacing) {
        const { width = '0%', height = '0%' } = size;

        const itemFlexStr = type === 'row' ? height : width;
        const itemFlex = this.fetchFlexValue(itemFlexStr);
        allFlex = allFlex + itemFlex;
      }
    });
    return allFlex;
  };

  fetchCloselyTargetInfo = (
    type: 'row' | 'col',
    preItem: Object,
    nextItem: Object,
    fatherSize: number,
    brotherItems: Object[]
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
    const allFlex = this.fetchAllBrotherItemsFlex(type, brotherItems);
    const preSize = this.fetchFlexToValue(preFlex, fatherSize, allFlex);
    const nextSize = this.fetchFlexToValue(nextFlex, fatherSize, allFlex);
    return {
      preFlex,
      nextFlex,
      totalFlex: preFlex + nextFlex,
      allFlex,
      preSize,
      nextSize,
      totalSize: preSize + nextSize,
      fatherSize,
    };
  };

  onLineMouseDown = (type: 'row' | 'col', index: number, data: Object, targetItem: Object) => (
    event: any
  ) => {
    const { preItem, nextItem } = targetItem;
    if (!preItem || !nextItem) {
      return;
    }
    this.lineType = type;

    const { fatherId } = data[index];
    let targetFatherId;
    let brotherItems;

    if (fatherId) {
      targetFatherId = fatherId;
      brotherItems = this.allShowItemInfo[fatherId].children;
    } else {
      const { showData = [] } = this.state;
      targetFatherId = this.wrapId;
      brotherItems = showData;
    }

    this.fatherSize = this.fetchFatherSize(type, this.getElementTarget(targetFatherId), data);

    const { id: preId } = preItem;
    const { id: nextId } = nextItem;
    this.preElement = this.getElementTarget(preId);
    this.nextElement = this.getElementTarget(nextId);

    if (!this.preElement || !this.nextElement) {
      return;
    }
    this.preItem = preItem;
    this.nextItem = nextItem;

    this.closelyTargetInfo = this.fetchCloselyTargetInfo(
      type,
      preItem,
      nextItem,
      this.fatherSize,
      brotherItems
    );
    console.log('targetItem allDropInfo', targetItem);
    console.log('closelyTargetInfo allDropInfo', this.closelyTargetInfo);

    this.initMouseOffsetX = event.clientX;
    this.initMouseOffsetY = event.clientY;

    this.canDrop = true;
  };

  fetchSize2Flex = (size: number, fatherSize: number, letter: number = 100) => {
    return (size / fatherSize) * letter;
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
    const { preSize, totalFlex, totalSize, fatherSize, allFlex } = this.closelyTargetInfo;
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
    const newPreFlex = this.fetchSize2Flex(newPreItemSize, fatherSize, allFlex);
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

    const { showData = [] } = this.state;
    const changeItems = {
      [preId]: newPreItem,
      [nextId]: newNextItem,
    };
    const nextShowData = this.fetchNextData(changeItems, showData);
    const nextOriginalData = this.fetchNextData(changeItems, this.originalData);
    this.originalData = nextOriginalData;

    this.updataAllItemInfo(nextShowData);

    this.setState({
      showData: nextShowData,
    });
    this.exposeData(nextOriginalData);
  };

  fetchNextData = (target: Object, data: Object) => {
    const nextData = JSON.parse(JSON.stringify(data));
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

  getTopLine = (
    id: string,
    type: 'row' | 'col',
    index: number,
    data: Object
  ): null | React.Node => {
    const dropItem = this.allDropInfo[id];
    const { topLine = false } = dropItem;
    return topLine ? (
      <FlexLine type={type} onMouseDown={this.onLineMouseDown(type, index, data, dropItem)} />
    ) : null;
  };

  getSpacingTopLine = (
    id: string,
    type: 'row' | 'col',
    index: number,
    data: Object
  ): null | React.Node => {
    const dropItem = this.allDropInfo[id];
    const { topLine = false } = dropItem;

    return topLine ? (
      <FlexLine type={type} onMouseDown={this.onLineMouseDown(type, index, data, dropItem)} />
    ) : null;
  };

  getSpacingBottomLine = (
    id: string,
    type: 'row' | 'col',
    index: number,
    data: Object
  ): null | React.Node => {
    const dropItem = this.allDropInfo[id];
    const { bottomLine = false } = dropItem;

    return bottomLine ? (
      <FlexLine type={type} onMouseDown={this.onLineMouseDown(type, index, data, dropItem)} />
    ) : null;
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

  onEnlargePage = (id: string, target) => () => {
    this.enlargeContainer.current.setVisible(true, target, id);
  };

  getPageItemWrap = (id: string) => {
    const { contentInfo = {} } = this.state;
    const target = contentInfo[id];
    if (!target) {
      return null;
    }
    return (
      <React.Fragment>
        {target}
        <EnlargeIconWrap onClick={this.onEnlargePage(id, target)}>
          <Icon iconClass={'lugia-icon-logo_codepen'} />
        </EnlargeIconWrap>
      </React.Fragment>
    );
  };

  changeTargetCSS = (event: Object) => {
    event.target.style.opacity = '0.7';
    event.target.style.border = '1px solid #4d63ff';
  };

  clearTargetCSS = (event: Object) => {
    event.target.style.opacity = '1';
    event.target.style.border = 'none';
  };

  removeCloneNode = () => {
    if (this.cloneNode) {
      document.body.removeChild(this.cloneNode);
      this.cloneNode = null;
    }
  };

  onDragStart = (item: Object) => event => {
    event.stopPropagation();
    const { id = '' } = item;
    const { contentInfo = {} } = this.state;
    if (!contentInfo[id]) {
      return;
    }

    const targetWidth = event.target.offsetWidth;
    const targetHeight = event.target.offsetHeight;
    let cloneNodeHeight = (150 / targetWidth) * targetHeight;
    if (cloneNodeHeight < 50) {
      cloneNodeHeight = 50;
    }
    const node = document.getElementById(id).cloneNode(true);
    node.style.width = '150px';
    node.style.height = `${cloneNodeHeight}px`;
    node.style.position = 'absolute';
    node.style.left = '-99999px';
    node.style.top = '-99999px';

    this.cloneNode = node;
    document.body.appendChild(node);

    event.dataTransfer.setDragImage(node, 0, 0);
    this.dragItem = item;
    this.changeTargetCSS(event);
  };

  onDragEnd = (event: Object) => {
    event.stopPropagation();
    this.dragItem = {};
    this.removeCloneNode();
    this.clearTargetCSS(event);
  };

  onDragOver = (event: Object) => {
    event.stopPropagation();
    event.preventDefault();
  };

  onDragEnter = (item: Object) => (event: Object) => {
    event.stopPropagation();
    event.preventDefault();
    const { id: dragId } = this.dragItem;
    const { id: targetId = '' } = item;

    if (!dragId || dragId === targetId) {
      return;
    }

    this.changeTargetCSS(event);
  };

  onDragLeave = (item: Object) => (event: Object) => {
    event.stopPropagation();
    event.preventDefault();
    const { id: dragId = '' } = this.dragItem;
    const { id: targetId = '' } = item;

    if (dragId === targetId) {
      return;
    }
    this.clearTargetCSS(event);
  };

  onDrop = (item: Object) => (event: Object) => {
    event.stopPropagation();
    event.preventDefault();
    const { id: dragId } = this.dragItem;
    const { id: targetId = '' } = item;

    if (!dragId || dragId === targetId) {
      return;
    }

    this.clearTargetCSS(event);

    const { contentInfo = {} } = this.state;
    const nextContentInfo = { ...contentInfo };
    const dragItemElement = nextContentInfo[dragId];
    const dropItemElement = nextContentInfo[targetId];
    nextContentInfo[targetId] = dragItemElement;
    nextContentInfo[dragId] = dropItemElement;

    this.setState({
      contentInfo: nextContentInfo,
    });
    this.removeCloneNode();
    this.dragItem = {};
  };

  onHiddenInfoChange = (hiddenInfo: Object) => {
    const data = this.originalData;
    let showData;
    if (Object.keys(hiddenInfo).length === 0) {
      showData = [...data];
    } else {
      showData = this.fetchShowData(data, hiddenInfo);
    }

    this.updataAllItemInfo(showData);

    this.setState({
      showData,
      hiddenInfo,
    });
  };

  getPageLayoutComponent = (data: Object = []) => {
    if (data.length === 0) {
      return null;
    }
    const { contentInfo = {} } = this.state;
    return data.map((item: Object, index: number) => {
      const { id = '', type = 'row', size = {}, spacing = false, children = [] } = item;
      if (!id) {
        return null;
      }
      if (spacing) {
        const { numWidth = 50, numHeight = 50 } = item;
        const SpacingBox = type === 'row' ? SpacingRowBox : SpacingColBox;
        return (
          <React.Fragment>
            {this.getSpacingTopLine(id, type, index, data)}
            <SpacingBox width={numWidth} height={numHeight} />
            {this.getSpacingBottomLine(id, type, index, data)}
          </React.Fragment>
        );
      }
      const { width = '100%', height = '100%' } = size;
      const { widthFlex, heightFlex } = this.fetchPercentToFlexValue(size);
      const FlexWrap = this.getFlexWrap(type);
      const flexValue = type === 'row' ? heightFlex : widthFlex;
      const noChild = children.length === 0;

      const dragEvent = noChild
        ? {
            onDragStart: this.onDragStart(item),
            onDragEnd: this.onDragEnd,
            onDragEnter: this.onDragEnter(item),
            onDragLeave: this.onDragLeave(item),
            onDragOver: this.onDragOver,
            onDrop: this.onDrop(item),
            draggable: !!contentInfo[id],
          }
        : {};
      return (
        <React.Fragment key={`${id}-Fragment-${type}`}>
          {this.getTopLine(id, type, index, data)}
          <FlexWrap
            key={`${id}-flexWrap`}
            id={id}
            width={width}
            height={height}
            flexValue={flexValue}
            {...dragEvent}
          >
            {noChild ? this.getPageItemWrap(id) : this.getPageLayoutComponent(children)}
          </FlexWrap>
        </React.Fragment>
      );
    });
  };

  render() {
    const { showData = [], contentInfo = {}, hiddenInfo = {} } = this.state;
    const { titleInfo = {} } = this.props;
    console.log('allDropInfo', this.allDropInfo);
    return (
      <React.Fragment>
        <Wrap id={this.wrapId}>{this.getPageLayoutComponent(showData)}</Wrap>
        <EnlargeContainer
          ref={this.enlargeContainer}
          contentInfo={contentInfo}
          hiddenInfo={hiddenInfo}
          titleInfo={titleInfo}
          onHiddenInfoChange={this.onHiddenInfoChange}
        />
      </React.Fragment>
    );
  }
}

export default PageLayout;
