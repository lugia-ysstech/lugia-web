/*
 * create by shine_lee
 * @e-mail: wangyi_lixian@163.com
 * @date: 2022/1/17
 *
 */

import React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import classNames from 'classnames';
import { defaultScrollbarSize, defaultRowHeight } from './constants';

export default (props: any) => {
  const {
    rawData,
    cbParams,
    connectObject,
    gridRef,
    columns = [],
    tableWidth,
    tableBodyHeight,
    rowHeight = defaultRowHeight,
    gridStyle = {},
  } = props;
  const columnsLength = columns.length;
  // 未能正确获取scrollbarSize, 当前为0;
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
              'virtual-table-cell-last': columnIndex === columns.length - 1,
            })}
            style={{ ...style, ...gridStyle }}
          >
            {rawData[rowIndex][columns[columnIndex].dataIndex]}
          </div>
        );
      }}
    </Grid>
  );
};
