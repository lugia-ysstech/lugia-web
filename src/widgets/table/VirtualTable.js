import React, { useState, useEffect, useRef, useReducer } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import RcTable from '@lugia/rc-table';
import VirtualList from './VirtualList';
import getUuid from '../utils/getUuid';
import { disconnectResizeObserver, existResizeObserverTarget } from '../utils';
import {
  defaultScrollbarSize,
  singleElasticMinWidth,
  defaultRowHeight,
  defaultRowNum,
  defaultGridStyle,
  VirtualGridClassName,
  BodyInfoChange,
} from './constants';

function reducer(state, action) {
  switch (action.type) {
    case BodyInfoChange:
      const { width, height, scrollBarWidth } = action;

      return {
        ...state,
        tableWidth: width,
        tableBodyHeight: height,
        scrollBarWidth,
      };
    default:
      throw new Error('未定义action类型');
  }
}
function getFixedNum(value) {
  if (typeof value !== 'number') {
    return 0;
  }

  return +value.toFixed(2);
}

export default function VirtualTable(props) {
  const { columns, scroll, virtualRowHeight, renderVirtualGrid, virtualGridStyle } = props;
  const { x: scrollX = 0, y: scrollY = defaultRowHeight * defaultRowNum } = scroll || {};

  const columnsLength = columns.length;
  const tableId = `lugia-virtual-table-${getUuid()}`;

  const [state, dispatch] = useReducer(reducer, {
    tableWidth: 0,
    tableBodyHeight: scrollY,
    scrollBarWidth: defaultScrollbarSize,
  });
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: scrollLeft => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });
  const { tableWidth, tableBodyHeight, scrollBarWidth } = state;

  const gridRef = useRef();
  const columnsInfoRef = useRef({ sumPropsWidth: 0, widthPropsColumnsCount: 0 });
  const resizeObserverRef = useRef({
    tableWidthResizeObserver: null,
  });

  const columnsInfoRefCurrent = columnsInfoRef.current;

  if (!tableWidth) {
    columns.forEach(({ width }) => {
      if (width) {
        columnsInfoRefCurrent.sumPropsWidth += width;
        columnsInfoRefCurrent.widthPropsColumnsCount += 1;
      }
    });
  }

  const isAllColumnsHasWidth = columnsLength === columnsInfoRefCurrent.widthPropsColumnsCount;
  const withoutWidthPropsColumnsCount =
    columns.length - columnsInfoRefCurrent.widthPropsColumnsCount;

  useEffect(() => {
    const tableDomRef = document.getElementById(tableId);

    createResizeObserver();
    if (resizeObserverRef.current.tableWidthResizeObserver) {
      resizeObserverRef.current.tableWidthResizeObserver.observe(tableDomRef);
    }
  }, [tableId]);

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  const createResizeObserver = () => {
    disconnectResizeObserver(resizeObserverRef.current.tableWidthResizeObserver);

    resizeObserverRef.current.tableWidthResizeObserver = new ResizeObserver(entries => {
      const existTarget = existResizeObserverTarget(entries);
      if (!existTarget) {
        return;
      }

      const { width, height, scrollBarWidth: currentScrollBarWidth } = getBodyInfo();

      if (tableWidth !== width || scrollBarWidth !== currentScrollBarWidth) {
        dispatch({ type: BodyInfoChange, width, height, scrollBarWidth: currentScrollBarWidth });
        resetVirtualGrid();
      }
    });
  };

  const getNumByString = value => {
    if (!value) {
      return 0;
    }

    return parseFloat(value);
  };
  const getBorderPaddingHeight = data => {
    return data.reduce((pre, current) => pre + getNumByString(current), 0);
  };

  const getSiblingHeight = data => {
    let sumHeight = 0;
    data.forEach(item => {
      if (item.id !== tableId) {
        const { offsetHeight = 0 } = item;

        sumHeight += offsetHeight;
      }
    });

    return sumHeight;
  };

  const getBodyInfo = () => {
    const tableDomRef = document.getElementById(tableId);
    const tableParentDomRef = tableDomRef.parentNode;
    const childrenDom = tableParentDomRef.children;
    const siblingHeightSum = getSiblingHeight(Array.from(childrenDom));
    const tableHeaderDomRef = tableDomRef.querySelector('.rc-table-header');
    const GridWrapDomRef = tableDomRef.querySelector(`.${VirtualGridClassName}`);

    const { offsetWidth: tableWidth } = tableDomRef;
    const { offsetHeight: parentOffsetHeight } = tableParentDomRef;
    const { offsetWidth, clientWidth } = GridWrapDomRef;
    const { paddingTop, paddingBottom, borderTop, borderBottom } = getComputedStyle(
      tableParentDomRef
    );
    const { offsetHeight: headerHeight } = tableHeaderDomRef;

    const parentContentHeight =
      parentOffsetHeight -
      getBorderPaddingHeight([paddingTop, paddingBottom, borderTop, borderBottom]);

    return {
      width: tableWidth,
      height: parentContentHeight - siblingHeightSum - headerHeight,
      scrollBarWidth: offsetWidth - clientWidth,
    };
  };

  const getBaseWidth = () => {
    if (scrollX > 0) {
      const tableWidthAndBar = tableWidth + scrollBarWidth;

      return scrollX > tableWidthAndBar ? scrollX : tableWidthAndBar;
    }

    const { sumPropsWidth } = columnsInfoRefCurrent;
    const sumPropsWidthWithElastic =
      sumPropsWidth + withoutWidthPropsColumnsCount * singleElasticMinWidth;

    return tableWidth > sumPropsWidthWithElastic ? tableWidth : sumPropsWidthWithElastic;
  };
  const baseWidth = getBaseWidth();

  const getMergedColumns = () => {
    if (isAllColumnsHasWidth) {
      const { sumPropsWidth } = columnsInfoRefCurrent;

      return columns.map((column, index) => {
        const { width } = column;
        const computedWidth = getFixedNum((width / sumPropsWidth) * baseWidth);

        const choseWidth =
          scrollX > 0 && index === columns.length - 1
            ? computedWidth - scrollBarWidth
            : computedWidth;

        return { ...column, width: choseWidth };
      });
    }

    const scrollRelateWidth = scrollX > 0 ? scrollBarWidth : 0;
    const { sumPropsWidth } = columnsInfoRefCurrent;
    const elasticWidthSum = baseWidth - sumPropsWidth - scrollRelateWidth;
    const meanWidth = getFixedNum(elasticWidthSum / withoutWidthPropsColumnsCount);
    const elasticSingleWidth = meanWidth > scrollBarWidth ? meanWidth : scrollBarWidth;

    return columns.map(column => {
      if (column.width) {
        return column;
      }

      return {
        ...column,
        width: elasticSingleWidth,
      };
    });
  };
  const mergedColumns = getMergedColumns();

  const replaceVirtualList = (rawData, cbParams) => (
    <VirtualList
      rawData={rawData}
      cbParams={cbParams}
      connectObject={connectObject}
      gridRef={gridRef}
      columns={mergedColumns}
      tableWidth={tableWidth}
      tableBodyHeight={tableBodyHeight}
      scrollBarWidth={scrollBarWidth}
      renderVirtualGrid={renderVirtualGrid}
      rowHeight={virtualRowHeight || defaultRowHeight}
      gridStyle={virtualGridStyle || defaultGridStyle}
    />
  );

  return (
    <RcTable
      {...props}
      scroll={{ ...scroll, y: tableBodyHeight }}
      id={tableId}
      className="lugia-table virtual-table"
      columns={mergedColumns}
      pagination={false}
      components={{
        body: replaceVirtualList,
      }}
    />
  );
}
