import React, { useState, useEffect, useRef } from 'react';
import ResizeObserver from 'rc-resize-observer';
import RcTable from '@lugia/rc-table';
import VirtualList from './VirtualList';
import getUuid from '../utils/getUuid';
import {
  defaultScrollbarSize,
  singleElasticMinWidth,
  defaultRowHeight,
  defaultRowNum,
} from './constants';

export default function VirtualTable(props) {
  const { columns, scroll } = props;
  const { x: scrollX = 0, y: scrollY = defaultRowHeight * defaultRowNum } = scroll || {};

  const columnsLength = columns.length;
  const tableId = `lugia-virtual-table-${getUuid()}`;

  const [tableWidth, setTableWidth] = useState(0);
  const [tableBodyHeight, setTableBodyHeight] = useState(scrollY);

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

  const getBodyHeight = () => {
    const tableDomRef = document.getElementById(tableId);
    const tableParentDomRef = tableDomRef.parentNode;
    const tableHeaderDomRef = tableDomRef.querySelector('.rc-table-header');

    const { offsetHeight: parentOffsetHeight, style } = tableParentDomRef;
    const { paddingTop, paddingBottom } = style;
    const { offsetHeight: headerHeight } = tableHeaderDomRef;

    const parentContentHeight =
      parentOffsetHeight - getNumByString(paddingTop) - getNumByString(paddingBottom);

    return parentContentHeight - headerHeight;
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
    />
  );

  return (
    <ResizeObserver
      onResize={config => {
        const { width } = config;
        const bodyHeight = getBodyHeight();

        setTableWidth(width);
        setTableBodyHeight(bodyHeight);
      }}
    >
      <RcTable
        {...props}
        scroll={{ ...scroll, y: tableBodyHeight }}
        id={tableId}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: replaceVirtualList,
        }}
      />
    </ResizeObserver>
  );
}
