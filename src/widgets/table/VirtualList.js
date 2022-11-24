/*
 * create by shine_lee
 * @e-mail: wangyi_lixian@163.com
 * @date: 2022/1/17
 *
 */

import React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import classNames from 'classnames';
import { defaultRowHeight, defaultGridBorderStyle, VirtualGridClassName } from './constants';

export default props => {
  const {
    rawData,
    cbParams,
    gridRef,
    columns = [],
    tableWidth,
    tableBodyHeight,
    scrollBarWidth,
    rowHeight = defaultRowHeight,
    renderVirtualGrid,
    gridStyle = {},
  } = props;
  const columnsLength = columns.length;
  const { onScroll } = cbParams;

  const totalHeight = rawData.length * rowHeight;

  const getColumnWidth = index => {
    const { width } = columns[index];

    return totalHeight > tableBodyHeight && index === columnsLength - 1
      ? width - scrollBarWidth - 1
      : width;
  };
  const getGridInner = gridInfo => {
    const { columnIndex, rowIndex, style } = gridInfo;

    if (typeof renderVirtualGrid === 'function') {
      return renderVirtualGrid({ ...gridInfo });
    }

    return (
      <div
        className={classNames('virtual-table-cell', {
          'virtual-table-cell-last': columnIndex === columns.length - 1,
        })}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          ...style,
          ...defaultGridBorderStyle,
          ...gridStyle,
        }}
      >
        {rawData[rowIndex][columns[columnIndex].dataIndex]}
      </div>
    );
  };

  return (
    <Grid
      ref={gridRef}
      className={VirtualGridClassName}
      columnCount={columnsLength}
      columnWidth={getColumnWidth}
      height={tableBodyHeight}
      rowCount={rawData.length}
      rowHeight={() => rowHeight}
      width={tableWidth}
      onScroll={({ scrollLeft }) => {
        onScroll({
          scrollLeft,
        });
      }}
    >
      {getGridInner}
    </Grid>
  );
};