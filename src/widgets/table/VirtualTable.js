import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import RcTable from '@lugia/rc-table';
import classNames from 'classnames';

// todo: 使用虚拟表格, 须传入scroll.y, 如若不传, 使用当前可视高度作为y;

const defaultScrollbarSize = 18;
const singleElasticMinWidth = 24;

export default function VirtualTable(props) {
  const { columns, scroll } = props;
  const { x: scrollX = 0 } = scroll || {};
  const columnsLength = columns.length;

  const [tableWidth, setTableWidth] = useState(0);

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

  const renderVirtualList = (rawData, cbParams) => {
    // 未能正确获取scrollbarSize, 当前为0;
    const { scrollbarSize, ref, onScroll } = cbParams;

    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={columnsLength}
        columnWidth={index => {
          const { width } = mergedColumns[index];

          return totalHeight > scroll.y && index === columnsLength - 1
            ? width - defaultScrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
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
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <RcTable
        {...props}
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
