import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import RcTable from '@lugia/rc-table';
import classNames from 'classnames';
import getUuid from '../utils/getUuid';

// todo: 不传入scroll.y时, 且获取不到外层高度时;

const defaultScrollbarSize = 18;
const singleElasticMinWidth = 24;
const defaultRowHeight = 32;

export default function VirtualTable(props) {
  const { columns, scroll } = props;
  const { x: scrollX = 0, y: scrollY = 0 } = scroll || {};

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

  const getBodyHeight = () => {
    const tableDomRef = document.getElementById(tableId);
    const tableParentDomRef = tableDomRef.parentNode;
    const tableHeaderDomRef = tableDomRef.querySelector('.rc-table-header');

    const { offsetHeight: parentOffsetHeight, style } = tableParentDomRef;
    const { paddingTop, paddingBottom } = style;
    const { offsetHeight: headerHeight } = tableHeaderDomRef;

    const parentContentHeight =
      parentOffsetHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
    const bodyHeight = parentContentHeight - headerHeight;

    return bodyHeight;
  };

  const renderVirtualList = (rawData, cbParams) => {
    // 未能正确获取scrollbarSize, 当前为0;
    const { scrollbarSize, ref, onScroll } = cbParams;

    ref.current = connectObject;
    const totalHeight = rawData.length * defaultRowHeight;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={columnsLength}
        columnWidth={index => {
          const { width } = mergedColumns[index];

          return totalHeight > tableBodyHeight && index === columnsLength - 1
            ? width - defaultScrollbarSize - 1
            : width;
        }}
        height={tableBodyHeight}
        rowCount={rawData.length}
        rowHeight={() => defaultRowHeight}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => {
          return (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              })}
              style={{ ...style, borderRight: '1px solid #888', borderBottom: '1px solid #888' }}
            >
              {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
            </div>
          );
        }}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={config => {
        const { width } = config;
        const borderHeight = getBodyHeight();

        setTableWidth(width);
        setTableBodyHeight(borderHeight);
      }}
    >
      <RcTable
        {...props}
        id={tableId}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
}
