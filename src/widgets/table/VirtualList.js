/*
 * create by shine_lee
 * @e-mail: wangyi_lixian@163.com
 * @date: 2022/1/17
 *
 */

import React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import classNames from 'classnames';
import { defaultScrollbarSize, defaultRowHeight, defaultGridBorderStyle } from './constants';

export default props => {
  const {
    rawData,
    cbParams,
    connectObject,
    gridRef,
    columns = [],
    tableWidth,
    tableBodyHeight,
    rowHeight = defaultRowHeight,
    renderVirtualGrid,
    gridStyle = {},
  } = props;
  const columnsLength = columns.length;
  const { scrollbarSize, ref, onScroll } = cbParams;

  ref.current = connectObject;
  const totalHeight = rawData.length * rowHeight;

  return (
    <Grid
      ref={gridRef}
      className="virtual-grid"
      columnCount={columnsLength}
      columnWidth={index => {
        const { width } = columns[index];

        return totalHeight > tableBodyHeight && index === columnsLength - 1
          ? width - defaultScrollbarSize - 1
          : width;
      }}
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
      {gridInfo => {
        const { columnIndex, rowIndex, style } = gridInfo;

        if (typeof renderVirtualGrid === 'function') {
          return renderVirtualGrid({ ...gridInfo });
        }

        return (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === columns.length - 1,
            })}
            style={{ ...style, ...defaultGridBorderStyle, ...gridStyle }}
          >
            {rawData[rowIndex][columns[columnIndex].dataIndex]}
          </div>
        );
      }}
    </Grid>
  );
};
