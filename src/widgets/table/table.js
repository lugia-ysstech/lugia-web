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

const TableHeaderHeight = 54;

export default ThemeProvider(
  class extends React.Component<TableProps, TableState> {
    getTableBodyHeight = (themeHeight: string | number) => {
      const { showHeader = true } = this.props;
      if (!themeHeight) {
        return {};
      }
      const height = parseInt(themeHeight);
      return {
        y: showHeader ? height - TableHeaderHeight : height,
      };
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
      const scrollObj = this.getTableBodyHeight(themeHeight);
      const styles = {};
      if (themeWidth) {
        if (typeof themeWidth === 'number') {
          styles.width = px2remcss(themeWidth);
        } else {
          styles.width = themeWidth;
        }
      }
      if (children) {
        return (
          <div className={this.getClass(tableStyle)} style={{ ...styles }}>
            <RcTable
              {...this.props}
              data={data}
              showHeader={showHeader}
              rowClassName={(record, i) => `row-${i}`}
              className="table"
              scroll={{ ...scrollObj }}
            >
              {children}
            </RcTable>
          </div>
        );
      }
      return (
        <div className={this.getClass(tableStyle)} style={{ ...styles }}>
          <RcTable
            {...this.props}
            columns={columns}
            data={data}
            showHeader={showHeader}
            scroll={{ ...scrollObj }}
          />
        </div>
      );
    }
    getClass = (tableStyle: 'zebraStripe' | 'linear' | 'bordered'): string => {
      return `lugia-table-${tableStyle}`;
    };
  },
  Widget.Table
);
