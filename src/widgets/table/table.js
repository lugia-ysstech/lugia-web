/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import RcTable from 'rc-table';
import 'rc-table/assets/index.css';
import './style/lugia-table.css';
import type { TableProps, TableState } from '../css/table';
import { px2remcss } from '../css/units';

export default ThemeProvider(
  class extends React.Component<TableProps, TableState> {
    getThemeSize = (themeValue: string | number, target: string, outResult: Object) => {
      if (themeValue) {
        if (typeof themeValue === 'number') {
          outResult[target] = px2remcss(themeValue);
        } else {
          outResult[target] = themeValue;
        }
      }
      return outResult;
    };

    render() {
      const {
        children,
        columns,
        data,
        showHeader = true,
        tableStyle = 'bordered',
        getPartOfThemeConfig,
      } = this.props;
      const containerTheme = getPartOfThemeConfig('Container') || {};
      const { normal: normalTheme = {} } = containerTheme;
      const themeWidth = normalTheme.width;
      const themeHeight = normalTheme.height;
      const styles = {};
      this.getThemeSize(themeWidth, 'width', styles);
      this.getThemeSize(themeHeight, 'height', styles);
      if (children) {
        return (
          <div className={this.getClass(tableStyle)} style={{ ...styles, overflow: 'auto' }}>
            <RcTable
              {...this.props}
              data={data}
              showHeader={showHeader}
              rowClassName={(record, i) => `row-${i}`}
              className="table"
            >
              {children}
            </RcTable>
          </div>
        );
      }
      return (
        <div className={this.getClass(tableStyle)} style={{ ...styles, overflow: 'auto' }}>
          <RcTable {...this.props} columns={columns} data={data} showHeader={showHeader} />
        </div>
      );
    }
    getClass = (tableStyle: 'zebraStripe' | 'linear' | 'bordered'): string => {
      return `lugia-table-${tableStyle}`;
    };
  },
  Widget.Table
);
