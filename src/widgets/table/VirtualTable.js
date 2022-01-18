import React, { useState, useEffect, useRef, useReducer } from 'react';
import ResizeObserver from 'rc-resize-observer';
import RcTable from '@lugia/rc-table';
import VirtualList from './VirtualList';
import getUuid from '../utils/getUuid';
import {
  defaultScrollbarSize,
  singleElasticMinWidth,
  defaultRowHeight,
  defaultRowNum,
  defaultGridStyle,
} from './constants';

function reducer(state, action) {
  switch (action.type) {
    case 'widthAndHeight':
      return { ...state, tableWidth: action.width, tableBodyHeight: action.height };
    default:
      throw new Error('未定义action类型');
  }
}

export default function VirtualTable(props) {
  const { columns, scroll, virtualRowHeight, renderVirtualGrid, virtualGridStyle } = props;
  const { x: scrollX = 0, y: scrollY = defaultRowHeight * defaultRowNum } = scroll || {};

  const columnsLength = columns.length;
  const tableId = `lugia-virtual-table-${getUuid()}`;

  const [state, dispatch] = useReducer(reducer, { tableWidth: 0, tableBodyHeight: scrollY });
  const { tableWidth, tableBodyHeight } = state;

  const columnsInfoRef = useRef({ sumPropsWidth: 0, widthPropsColumnsCount: 0 });
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

  const getBaseWidth = () => {
    if (scrollX > 0) {
      return scrollX > tableWidth ? scrollX : tableWidth;
    }

    const { sumPropsWidth } = columnsInfoRefCurrent;
    const sumPropsWidthWithElastic =
      sumPropsWidth + withoutWidthPropsColumnsCount * singleElasticMinWidth;

    return tableWidth > sumPropsWidthWithElastic ? tableWidth : sumPropsWidthWithElastic;
  };
  const baseWidth = getBaseWidth();

  const getFixedNum = value => {
    if (typeof value !== 'number') {
      return;
    }

    return +value.toFixed(2);
  };

  const getMergedColumns = () => {
    if (isAllColumnsHasWidth) {
      const { sumPropsWidth } = columnsInfoRefCurrent;

      return columns.map(column => {
        const { width } = column;
        const computedWidth = getFixedNum((width / sumPropsWidth) * baseWidth);

        return { ...column, width: computedWidth };
      });
    }

    const scrollRelateWidth = scrollX > 0 ? defaultScrollbarSize : 0;
    const { sumPropsWidth } = columnsInfoRefCurrent;
    const elasticWidthSum = baseWidth - sumPropsWidth - scrollRelateWidth;
    const meanWidth = getFixedNum(elasticWidthSum / withoutWidthPropsColumnsCount);
    const elasticSingleWidth = meanWidth > defaultScrollbarSize ? meanWidth : defaultScrollbarSize;

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

  const gridRef = useRef();

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

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const getNumByString = value => {
    if (!value) {
      return 0;
    }

    return parseFloat(value);
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

  const getBodyHeight = () => {
    const tableDomRef = document.getElementById(tableId);
    const tableParentDomRef = tableDomRef.parentNode;
    const childrenDom = tableParentDomRef.children;
    const siblingHeightSum = getSiblingHeight(Array.from(childrenDom));
    const tableHeaderDomRef = tableDomRef.querySelector('.rc-table-header');

    const { offsetHeight: parentOffsetHeight, style } = tableParentDomRef;
    const { paddingTop, paddingBottom } = style;
    const { offsetHeight: headerHeight } = tableHeaderDomRef;

    const parentContentHeight =
      parentOffsetHeight - getNumByString(paddingTop) - getNumByString(paddingBottom);

    return parentContentHeight - siblingHeightSum - headerHeight;
  };

  const replaceVirtualList = (rawData, cbParams) => (
    <VirtualList
      rawData={rawData}
      cbParams={cbParams}
      connectObject={connectObject}
      gridRef={gridRef}
      columns={mergedColumns}
      tableWidth={tableWidth}
      tableBodyHeight={tableBodyHeight}
      renderVirtualGrid={renderVirtualGrid}
      rowHeight={virtualRowHeight || defaultRowHeight}
      gridStyle={virtualGridStyle || defaultGridStyle}
    />
  );

  return (
    <ResizeObserver
      onResize={config => {
        const { width } = config;
        const bodyHeight = getBodyHeight();

        dispatch({ type: 'widthAndHeight', width, height: bodyHeight });
      }}
    >
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
    </ResizeObserver>
  );
}
