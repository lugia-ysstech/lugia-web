/***
 * @flow
 * create by szfeng
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import FlexLine from './Line';
import Icon from '../icon';
import EnlargeContainer from './EnlargeContainer';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { defaultMargin, typeType } from './utils';
import { PageLayoutContext } from './PageLayoutWrap';

export const PageLayoutWrap = CSSComponent({
  tag: 'div',
  className: 'PageLayoutWrap',
  normal: {
    selectNames: [['width'], ['height']],
  },
  hover: {
    selectNames: [],
  },
  css: css`
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  `,
  option: { hover: false },
});
PageLayoutWrap.displayName = 'PageLayoutWrap';

const CommonFlexWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: ${props => props.background};
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
  width: 100%;
  height: 100%;
`;

export const SpacingRowBox = styled(CommonSpacingBox)`
  height: ${props => `${props.height}px`};
`;

export const SpacingColBox = styled(CommonSpacingBox)`
  width: ${props => `${props.width}px`};
`;

function fetchShowData(data: Object, hiddenInfo: Object = {}) {
  if (Object.keys(hiddenInfo).length === 0) {
    return data;
  }
  const showData = [];
  filterShowData(showData, data, hiddenInfo);
  return showData;
}

function filterShowData(showData: Object, data: Object, hiddenInfo: Object) {
  data.forEach(item => {
    const { id, children = [] } = item;
    const newItem = JSON.parse(JSON.stringify(item));
    if (!hiddenInfo[id]) {
      if (children.length !== 0) {
        const newChildren = [];
        filterShowData(newChildren, children, hiddenInfo);
        newItem.children = newChildren;
      }
      showData.push(newItem);
    }
  });
}

type PageLayoutProps = {
  theme: Object,
  data: Object[],
  drag?: boolean,
  enlarge?: boolean,
  title: string,
  contentInfo: Object,
  hiddenInfo: Object,
  onChange?: Function,
  onContentInfoChange?: Function,
  onHiddenInfoChange?: Function,
};
type PageLayoutState = {
  data: Object[],
  contentInfo: Object,
  hiddenInfo: Object,
  showData: Object[],
};

class PageLayout extends Component<PageLayoutProps, PageLayoutState> {
  static contextType = PageLayoutContext;

  constructor(props) {
    super(props);
    const { data = [], hiddenInfo = {}, contentInfo = {} } = this.props;
    const showData = fetchShowData(data, hiddenInfo);
    this.state = {
      data,
      showData,
      contentInfo,
      hiddenInfo,
    };

    this.canDropLine = false;
    this.canDropItem = true;
    this.isMoveLine = false;
    this.dragItem = {};
    this.cloneNode = null;
    this.flexBackground = this.getContainerBackground();
    this.enlargeContainer = React.createRef();
    this.wrapId = this.getWrapId();
  }

  static getDerivedStateFromProps(props: any, state: any) {
    const {
      data: propsData = [],
      hiddenInfo = {},
      contentInfo = {},
      onChange,
      __lugiad__header__absolute__ = false,
    } = props;
    let data;
    if (onChange) {
      data = propsData;
    } else {
      data = state.data;
    }
    const isLimitHiddenInfo = !__lugiad__header__absolute__ && 'hiddenInfo' in props;
    const activeHiddenInfo = isLimitHiddenInfo ? hiddenInfo : state.hiddenInfo;
    const showData = fetchShowData(data, activeHiddenInfo);

    const isLimitContentInfo = !__lugiad__header__absolute__ && 'contentInfo' in props;
    const activeContentInfo = isLimitContentInfo ? contentInfo : state.contentInfo;

    return {
      data,
      showData,
      hiddenInfo: activeHiddenInfo,
      contentInfo: activeContentInfo,
    };
  }

  componentDidMount() {
    document.body.addEventListener('mousemove', this.onMouseMove);
    document.body.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousemove', this.onMouseMove);
    document.body.removeEventListener('mouseup', this.onMouseUp);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      theme: nextTheme,
      data: nextData,
      title: nextTitle,
      hiddenInfo: nextHiddenInfo = {},
      contentInfo: nextContentInfo = {},
      __lugiad__header__absolute__: __next__lugiad__header__absolute__,
    } = nextProps;

    const {
      theme,
      data,
      title,
      hiddenInfo = {},
      contentInfo = {},
      __lugiad__header__absolute__,
    } = this.props;

    const {
      data: nextStateData = [],
      showData: nextStateShowData = [],
      contentInfo: nextStateContentInfo = {},
      hiddenInfo: nextStateHiddenInfo = {},
    } = nextState;
    const {
      data: stateData = [],
      showData: stateShowData = [],
      contentInfo: stateContentInfo = {},
      hiddenInfo: stateHiddenInfo = {},
    } = this.state;

    return (
      title !== nextTitle ||
      __lugiad__header__absolute__ !== __next__lugiad__header__absolute__ ||
      this.isObjectChange(theme, nextTheme) ||
      this.isObjectChange(data, nextData) ||
      this.isObjectChange(hiddenInfo, nextHiddenInfo) ||
      contentInfo !== nextContentInfo ||
      this.isObjectChange(stateData, nextStateData) ||
      this.isObjectChange(stateShowData, nextStateShowData) ||
      this.isObjectChange(stateContentInfo, nextStateContentInfo) ||
      this.isObjectChange(stateHiddenInfo, nextStateHiddenInfo)
    );
  }

  isLimitHiddenInfo = () => {
    const { __lugiad__header__absolute__ = false } = this.props;
    return !__lugiad__header__absolute__ && 'hiddenInfo' in this.props;
  };

  gatherChildrenHiddenInfo = (
    __initHiddenInfo__: Object,
    __initHiddenInfoChangeEvents__: Object,
    __initSetStateHiddenInfo__: Object
  ) => {
    const { title = '页面布局' } = this.props;
    const { hiddenInfo = {}, contentInfo = {} } = this.state;
    __initHiddenInfo__[this.wrapId] = {
      hiddenInfo,
      contentInfo,
      title,
      isLimit: this.isLimitHiddenInfo(),
    };
    __initHiddenInfoChangeEvents__[this.wrapId] = this.onHiddenInfoChange;
    __initSetStateHiddenInfo__[this.wrapId] = this.setHiddenInfoState;
  };

  isObjectChange = (preObject: Object, nextObject: Object) =>
    JSON.stringify(preObject) !== JSON.stringify(nextObject);

  onHiddenInfoChange = target => {
    const { onHiddenInfoChange } = this.props;
    onHiddenInfoChange && onHiddenInfoChange(target);
  };

  setHiddenInfoState = hiddenInfo => {
    this.setState({
      hiddenInfo,
    });
  };

  updateAllItemInfo = (data: Object, showData: Object) => {
    const { allItemInfo, allShowItemInfo, allDropInfo } = this.fetchAllItemInfo(data, showData);
    this.allItemInfo = allItemInfo;
    this.allShowItemInfo = allShowItemInfo;
    this.allDropInfo = allDropInfo;
  };

  fetchAllItemInfo = (data: Object, showData: Object) => {
    const allItemInfo = {};
    const allShowItemInfo = {};
    const allDropInfo = {};
    this.filterAllItem(allItemInfo, data);
    this.filterAllItem(allShowItemInfo, showData);
    this.filterDropItem(allDropInfo, showData);
    return { allItemInfo, allShowItemInfo, allDropInfo };
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

  getFlexWrap = (type: typeType) => {
    return type === 'row' ? RowFlexWrap : ColFlexWrap;
  };

  getElementTarget = (id: string) => {
    return document.getElementById(id);
  };

  getWrapId = () => {
    const date = new Date();
    return `__page_layout_wrap__${date.getTime()}`;
  };

  exposeData = (data: Object) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    } else {
      this.setState({ data });
    }
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

  getSpacingItemInfo = (type: typeType, data: Object) => {
    let totalCount = 0;
    let totalSpacing = 0;
    data.forEach((item: Object) => {
      const { id, spacing = false, numberWidth = 0, numberHeight = 0 } = item;
      const { lineCount = 0 } = this.allDropInfo[id];
      totalCount = totalCount + lineCount;
      if (spacing) {
        const spacingSize = type === 'row' ? Number(numberHeight) : Number(numberWidth);
        totalSpacing = totalSpacing + spacingSize;
      }
    });
    return { totalCount, totalSpacing };
  };

  fetchFatherSize = (type: typeType, element: Object, data: Object) => {
    const fatherWidth = element.offsetWidth;
    const fatherHeight = element.offsetHeight;
    const { totalCount, totalSpacing } = this.getSpacingItemInfo(type, data);
    const allMarginValue = defaultMargin * totalCount;
    const allSize = type === 'row' ? fatherHeight : fatherWidth;
    return allSize - allMarginValue - totalSpacing;
  };

  fetchFlexToValue = (flexValue: number, fatherSize: number, letter: number = 100) => {
    return (fatherSize * flexValue) / letter;
  };

  fetchAllBrotherItemsFlex = (type: typeType, brotherItems: Object[]) => {
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
    type: typeType,
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

  onLineMouseDown = (type: typeType, index: number, data: Object, targetItem: Object) => (
    event: any
  ) => {
    this.canDropItem = false;
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

    this.closelyTargetInfo = this.fetchCloselyTargetInfo(
      type,
      preItem,
      nextItem,
      this.fatherSize,
      brotherItems
    );
    this.initMouseOffsetX = event.clientX;
    this.initMouseOffsetY = event.clientY;
    this.preItem = this.allItemInfo[preId];
    this.nextItem = this.allItemInfo[nextId];
    this.canDropLine = true;
  };

  fetchSize2Flex = (size: number, fatherSize: number, letter: number = 100) => {
    return (size / fatherSize) * letter;
  };

  getNewPreItemSize = (size: number, distance: number, maxSize: number) => {
    const targetValue = size + distance;
    return targetValue <= 0 ? 0 : targetValue >= maxSize ? maxSize : targetValue;
  };

  onMouseMove = (event: any) => {
    if (!this.canDropLine) {
      return;
    }

    if (!this.isMoveLine) {
      this.isMoveLine = true;
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
    this.canDropItem = true;
    if (!this.canDropLine || !this.isMoveLine) {
      return;
    }
    this.isMoveLine = false;
    this.canDropLine = false;
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

    const { data = [] } = this.state;
    const changeItems = {
      [preId]: newPreItem,
      [nextId]: newNextItem,
    };

    const nextData = this.fetchNextData(changeItems, data);
    this.exposeData(nextData);
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

  getTopLine = (id: string, type: typeType, index: number, data: Object): null | React.Node => {
    const dropItem = this.allDropInfo[id];
    const { topLine = false } = dropItem;

    return topLine ? (
      <FlexLine type={type} onMouseDown={this.onLineMouseDown(type, index, data, dropItem)} />
    ) : null;
  };

  getSpacingTopLine = (
    id: string,
    type: typeType,
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
    type: typeType,
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
    const { enlarge = false } = this.props;
    const { contentInfo = {} } = this.state;
    const target = contentInfo[id] || {};
    const { component } = target;
    if (!component) {
      return null;
    }

    return (
      <React.Fragment>
        {component}
        {enlarge ? (
          <EnlargeIconWrap onClick={this.onEnlargePage(id, component)}>
            <Icon iconClass={'lugia-icon-logo_codepen'} />
          </EnlargeIconWrap>
        ) : null}
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
    if (!contentInfo[id] || !this.canDropItem) {
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
    event.target.style.opacity = '0.7';
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

    this.removeCloneNode();
    this.dragItem = {};
    const { __lugiad__header__absolute__ = false } = this.props;
    const isLimitContentInfo = !__lugiad__header__absolute__ && 'contentInfo' in this.props;

    if (isLimitContentInfo) {
      this.exposeContentInfo(nextContentInfo);
    } else {
      this.setState({
        contentInfo: nextContentInfo,
      });
    }
  };

  exposeContentInfo = (contentInfo: Object) => {
    const { onContentInfoChange } = this.props;
    onContentInfoChange && onContentInfoChange(contentInfo);
  };

  getContainerBackground = () => {
    const { getPartOfThemeConfig } = this.props;
    const config = getPartOfThemeConfig('Container');
    const { normal: { background: { color = '#f5f5f5' } = {} } = {} } = config;
    return color;
  };
  getPageLayoutComponent = (data: Object = []) => {
    if (data.length === 0) {
      return null;
    }
    const { drag = false } = this.props;
    const { contentInfo = {} } = this.state;

    return data.map((item: Object, index: number) => {
      const { id = '', type = 'row', size = {}, spacing = false, children = [] } = item;
      if (!id) {
        return null;
      }
      if (spacing) {
        const { numberWidth = 50, numberHeight = 50 } = item;
        const SpacingBox = type === 'row' ? SpacingRowBox : SpacingColBox;
        return (
          <React.Fragment>
            {this.getSpacingTopLine(id, type, index, data)}
            <SpacingBox width={numberWidth} height={numberHeight} />
            {this.getSpacingBottomLine(id, type, index, data)}
          </React.Fragment>
        );
      }
      const { width = '100%', height = '100%' } = size;
      const { widthFlex, heightFlex } = this.fetchPercentToFlexValue(size);
      const FlexWrap = this.getFlexWrap(type);
      const flexValue = type === 'row' ? heightFlex : widthFlex;
      const noChild = children.length === 0;
      const flexboxBackground = !noChild ? 'transparent' : this.flexBackground;
      const dragEvent =
        noChild && drag
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
            background={flexboxBackground}
            {...dragEvent}
          >
            {noChild ? this.getPageItemWrap(id) : this.getPageLayoutComponent(children)}
          </FlexWrap>
        </React.Fragment>
      );
    });
  };

  updateInfo = () => {
    const { data = [], showData = [] } = this.state;
    const {
      __initHiddenInfo__,
      __initHiddenInfoChangeEvents__ = {},
      __initSetStateHiddenInfo__ = {},
    } = this.context;
    if (__initHiddenInfo__) {
      this.gatherChildrenHiddenInfo(
        __initHiddenInfo__,
        __initHiddenInfoChangeEvents__,
        __initSetStateHiddenInfo__
      );
    }
    this.updateAllItemInfo(data, showData);
  };

  render() {
    const { showData = [], contentInfo = {} } = this.state;
    this.updateInfo();
    return (
      <React.Fragment>
        <PageLayoutWrap id={this.wrapId} themeProps={this.getWrapThemeProps()}>
          {this.getPageLayoutComponent(showData)}
        </PageLayoutWrap>
        <EnlargeContainer ref={this.enlargeContainer} contentInfo={contentInfo} />
      </React.Fragment>
    );
  }

  getWrapThemeProps = () => {
    const { getPartOfThemeProps } = this.props;
    return getPartOfThemeProps('Container');
  };
}

export default PageLayout;
