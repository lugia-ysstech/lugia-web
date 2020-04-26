/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import CSSComponent from '@lugia/theme-css-hoc';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import RcTable, { INTERNAL_COL_DEFINE } from 'rc-table';
import Checkbox from '../checkbox';
import 'rc-table/assets/index.css';
import './style/lugia-table.css';
import type { TableProps, TableState } from '../css/table';
import { css } from 'styled-components';

const sizePadding = {
  default: 8,
  small: 4,
  large: 16,
};
const sizeHeight = {
  default: 32,
  small: 24,
  large: 40,
};

const TableWrap = CSSComponent({
  tag: 'div',
  className: 'TableWrap',
  normal: {
    selectNames: [['width'], ['height']],
    getCSS(themeMeta, themeProps): string {
      const { background: { color } = {} } = themeMeta;
      const { propsConfig: { size = 'default' } = {} } = themeProps;
      const padding = sizePadding[size] || sizePadding.default;
      let bgColor;
      if (color) {
        bgColor = `tbody .rc-table-cell {
          background: ${color};
        }`;
      }
      return css`
        .rc-table th,
        .rc-table td {
          padding: 0 ${padding}px;
        }

        ${color ? bgColor : ''}
      `;
    },
  },
});

export default ThemeProvider(
  class extends React.Component<TableProps, TableState> {
    selectedRecords: Object[];
    validRecords: Object[];
    disabledSelectedRecords: Object[];
    validKeys: any[];
    disabledSelectedKeys: any[];
    tableWrap: Object;
    constructor(props) {
      super();
      const { data = [], selectOptions: { selectRowKeys = [] } = {}, scroll = {} } = props;

      const dataLength = data.length;
      const selectRowKeyLength = selectRowKeys.length;
      this.state = {
        headChecked: dataLength === selectRowKeyLength && dataLength > 0,
        headIndeterminate: !!selectRowKeyLength,
        selectRowKeys: selectRowKeys || [],
        scroll,
      };
      this.tableWrap = React.createRef();
    }
    componentDidMount() {
      setTimeout(() => {
        if (this.props.scroll && this.props.scroll.y) {
          return;
        }
        const { getPartOfThemeConfig } = this.props;
        const containerTheme = getPartOfThemeConfig('Container') || {};
        const { normal: { height: themeHeight } = {} } = containerTheme;
        const tableHeight = this.computeTableHeight();
        if (tableHeight && themeHeight < tableHeight - 2) {
          this.setState({ scroll: this.getTableBodyHeight(themeHeight) });
        } else {
          this.setState({ scroll: undefined });
        }
      }, 0);
    }

    computeTableHeight() {
      if (this.tableWrap && this.tableWrap.querySelector) {
        const tableWarp = this.tableWrap.querySelector('.rc-table-content');
        const tableBody = this.tableWrap.querySelector('.rc-table-body table');
        const tableHead = this.tableWrap.querySelector('.rc-table-header');
        if (tableWarp && tableWarp.offsetHeight) {
          return tableWarp.offsetHeight;
        } else if (tableBody && tableBody.offsetHeight && tableHead && tableHead.offsetHeight) {
          return parseInt(tableBody.offsetHeight, 10) + parseInt(tableHead.offsetHeight, 10);
        }
      }
    }

    componentDidUpdate(prevProps, prevState) {
      setTimeout(() => {
        const { getPartOfThemeConfig } = this.props;
        const containerTheme = getPartOfThemeConfig('Container') || {};
        const { normal: { height: themeHeight } = {} } = containerTheme;
        const tableHeight = this.computeTableHeight();
        const { data, scroll } = this.props;
        const { data: prevPropsData } = prevProps;
        if (
          !data ||
          !prevPropsData ||
          data.length === prevPropsData.length ||
          (scroll && scroll.y)
        ) {
          return;
        }
        if (tableHeight && themeHeight < tableHeight - 2) {
          this.setState({ scroll: this.getTableBodyHeight(themeHeight) });
        } else {
          this.setState({ scroll: undefined });
        }
        this.tableHeight = tableHeight;
      }, 0);
    }

    static getDerivedStateFromProps(props) {
      const { data, selectOptions = {}, rowKey = 'key' } = props;
      if ('selectRowKeys' in selectOptions) {
        const {
          selectRowKeys = [],
          setCheckboxProps = (record: Object) => {
            return {};
          },
        } = selectOptions;
        let allValidSelected = data && data.length > 0;
        const validSelectRowKeys = [];
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          const itemKey = item[rowKey];
          const checkboxProps = setCheckboxProps(item) || {};
          if (!checkboxProps.disabled) {
            const selectc = selectRowKeys.includes(itemKey);
            if (selectc) {
              validSelectRowKeys.push(itemKey);
            } else {
              allValidSelected = false;
            }
          }
        }
        return {
          headChecked: allValidSelected,
          headIndeterminate: !!validSelectRowKeys.length,
          selectRowKeys,
        };
      }

      return null;
    }

    tableItemChange = (key, record) => () => {
      const { selectOptions = {}, rowKey = 'key' } = this.props;
      const { selectRowKeys } = this.state;
      const unSelect = selectRowKeys.includes(key);
      const newSelectRowKeys = unSelect
        ? this.filterKey(selectRowKeys, item => item !== key)
        : [...selectRowKeys, key];
      const newRecords = unSelect
        ? this.filterKey(this.selectedRecords, item => item[rowKey] !== key)
        : [...this.selectedRecords, record];
      const { onChange } = selectOptions;
      onChange && onChange(newSelectRowKeys, newRecords);
      if ('selectRowKeys' in selectOptions) {
        return;
      }
      const allIn = this.filterKey(this.validKeys, item => !newSelectRowKeys.includes(item));
      this.setState({
        selectRowKeys: newSelectRowKeys,
        headIndeterminate: !!newSelectRowKeys.length,
        headChecked: !allIn.length,
      });
    };

    filterKey(target: string[] | Object[], filter: any => boolean) {
      return target.filter(item => filter(item));
    }

    getTableBodyHeight = (themeHeight: number) => {
      const { showHeader = true, size = 'default' } = this.props;
      if (!themeHeight) {
        return {};
      }
      const tableLineHeight = sizeHeight[size];
      const height = parseInt(themeHeight, 10);
      return {
        y: showHeader ? height - tableLineHeight : height,
      };
    };

    tableHeadChange = () => {
      const { selectOptions = {} } = this.props;
      const { headChecked } = this.state;
      const { onChange } = selectOptions;
      const selectedKeys = headChecked
        ? this.disabledSelectedKeys || []
        : [...this.validKeys, ...this.disabledSelectedKeys];
      const selectedRecords = headChecked
        ? this.disabledSelectedRecords || []
        : [...this.validRecords, ...this.disabledSelectedRecords];

      onChange && onChange(selectedKeys, selectedRecords);

      if ('selectRowKeys' in selectOptions) return;

      this.setState({
        selectRowKeys: selectedKeys,
        headIndeterminate: !headChecked,
        headChecked: !headChecked,
      });
    };

    render() {
      const {
        children,
        columns = [],
        data,
        showHeader = true,
        tableStyle = 'bordered',
        getPartOfThemeProps,
        selectOptions = {},
        size = 'default',
        rowKey: cusRowKey = 'key',
        scroll: propsScroll = {},
      } = this.props;

      this.selectedRecords = [];
      this.validKeys = [];
      this.disabledSelectedKeys = [];
      this.validRecords = [];
      this.disabledSelectedRecords = [];
      const {
        headChecked,
        headIndeterminate,
        selectRowKeys: stateSelectRowKeys,
        scroll = {},
      } = this.state;

      const containerPartOfThemeProps = getPartOfThemeProps('Container', {
        props: { size },
      });
      if (children) {
        return (
          <TableWrap
            themeProps={containerPartOfThemeProps}
            className={this.getClass(tableStyle, size)}
            ref={el => {
              this.tableWrap = el;
            }}
          >
            <RcTable
              {...this.props}
              data={data}
              showHeader={showHeader}
              rowClassName={(record, i) => `row-${i}`}
              className="table"
            >
              {children}
            </RcTable>
          </TableWrap>
        );
      }
      const theColumns = [...columns];
      if ('selectOptions' in this.props) {
        const {
          setCheckboxProps = (record: Object) => {
            return {};
          },
          width = 60,
        } = selectOptions;
        const selectColumnItem = {
          title: (
            <div style={{ fontSize: 0 }}>
              <Checkbox
                checked={headChecked}
                indeterminate={headIndeterminate}
                onChange={this.tableHeadChange}
              />
            </div>
          ),
          className: 'lugia-select-column',
          key: 'selection-column',
          width,
          render: (text, record) => {
            const rowKey = record[cusRowKey];
            const select = stateSelectRowKeys.includes(rowKey);
            const checkboxProps = setCheckboxProps(record) || {};

            if (select) {
              this.selectedRecords.push(record);
              if (checkboxProps.disabled) {
                this.disabledSelectedKeys.push(rowKey);
                this.disabledSelectedRecords.push(record);
              }
            }
            if (!checkboxProps.disabled) {
              this.validKeys.push(rowKey);
              this.validRecords.push(record);
            }

            return (
              <div style={{ fontSize: 0 }}>
                <Checkbox
                  checked={select}
                  onChange={this.tableItemChange(rowKey, record)}
                  {...checkboxProps}
                />
              </div>
            );
          },
          [INTERNAL_COL_DEFINE]: {
            className: 'lugia-selection-col',
          },
        };
        theColumns.unshift(selectColumnItem);
      }
      let expandIconColumnIndex =
        theColumns && theColumns[0] && theColumns[0][cusRowKey] === 'selection-column' ? 1 : 0;
      if ('expandIconColumnIndex' in this.props) {
        const { expandIconColumnIndex: propsIndex } = this.props;
        expandIconColumnIndex = Number(propsIndex);
      }
      return (
        <TableWrap
          ref={el => {
            this.tableWrap = el;
          }}
          themeProps={containerPartOfThemeProps}
          className={this.getClass(tableStyle, size)}
        >
          <RcTable
            {...this.props}
            columns={theColumns}
            data={data}
            showHeader={showHeader}
            expandIconColumnIndex={expandIconColumnIndex}
            scroll={{ ...scroll, ...propsScroll }}
          />
        </TableWrap>
      );
    }
    getClass = (
      tableStyle: 'zebraStripe' | 'linear' | 'bordered',
      size: 'default' | 'small' | 'large'
    ): string => {
      const sizeClassName = `lugia-${size}-table`;
      return `lugia-table lugia-table-${tableStyle} ${sizeClassName}`;
    };
  },
  Widget.Table
);
