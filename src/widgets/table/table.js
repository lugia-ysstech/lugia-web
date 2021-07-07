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
import type { TableProps, TableState } from '../css/table';
import { css } from 'styled-components';
import TableTitle from './tableTitle';
import {
  deepCopy,
  getChildrenKeys,
  getAllParentData,
  getValidSelectRowKeys,
  isEqualArray,
  getValidNotCheckedKeys,
} from './utils';
import Empty from '../empty';

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
    sortState: string;
    oldPropsData: Object[];
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
        data,
        sortOrder: true,
      };
      this.tableWrap = React.createRef();
      this.oldPropsData = [];
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
        const { data = [], scroll } = this.props;
        const { data: prevPropsData = [] } = prevProps;
        if (data.length === prevPropsData.length || (scroll && scroll.y)) {
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

    static getDerivedStateFromProps(props, nextState) {
      const { data = [], selectOptions = {}, rowKey = 'key' } = props;
      const { data: stateData = [], sortOrder } = nextState;
      const dataIsSame = isEqualArray(stateData, data, { isStrengthen: false });
      if ('selectRowKeys' in selectOptions) {
        const {
          selectRowKeys = [],
          setCheckboxProps = (record: Object) => {
            return {};
          },
        } = selectOptions;
        const validSelectRowKeys = getValidSelectRowKeys(
          data,
          selectRowKeys,
          [],
          rowKey,
          setCheckboxProps
        );
        const allValidSelected =
          getValidNotCheckedKeys(data, selectRowKeys, rowKey, setCheckboxProps).length <= 0;
        return {
          headChecked: allValidSelected,
          headIndeterminate: !!validSelectRowKeys.length,
          selectRowKeys,
          sortOrder: dataIsSame ? sortOrder : true,
        };
      }
      return { sortOrder: dataIsSame ? sortOrder : true };
    }

    handleParentData = (data: Object, selectRowKeys, selectRecords, rowKey, setCheckboxProps) => {
      const { children: childrenData = [] } = data;
      const notChecked = getValidNotCheckedKeys(
        childrenData,
        selectRowKeys,
        rowKey,
        setCheckboxProps
      );
      if (notChecked.length > 0) {
        selectRowKeys = this.filterKey(selectRowKeys, item => item !== data[rowKey]);
        selectRecords = this.filterKey(selectRecords, item => item[rowKey] !== data[rowKey]);
      } else {
        selectRowKeys = [...selectRowKeys, data[rowKey]];
        selectRecords = [...selectRecords, data];
      }
      return { selectRowKeys, selectRecords };
    };

    tableItemChange = (key, record) => () => {
      const { selectOptions = {}, rowKey = 'key', data: propsData } = this.props;
      const {
        setCheckboxProps = (record: Object) => {
          return {};
        },
      } = selectOptions;
      const { selectRowKeys, data } = this.state;
      const { tableData } = this.getTableData(propsData, data);
      const { children = [], parentId } = record;
      const unSelect = selectRowKeys.includes(key);

      let newSelectRowKeys = [];
      let newRecords = [];
      const { childrenKeys, childrenRecords } = getChildrenKeys(
        children,
        [],
        [],
        rowKey,
        setCheckboxProps
      );
      const parentDataArr = getAllParentData(tableData, parentId, rowKey);
      if (unSelect) {
        newSelectRowKeys = this.filterKey(selectRowKeys, item => item !== key);
        newRecords = this.filterKey(this.selectedRecords, item => item[rowKey] !== key);
        newSelectRowKeys = this.filterKey(newSelectRowKeys, item => !childrenKeys.includes(item));
        newRecords = this.filterKey(newRecords, item => !childrenKeys.includes(item[rowKey]));
      } else {
        newSelectRowKeys = [...selectRowKeys, key, ...childrenKeys];
        newRecords = [...this.selectedRecords, record, ...childrenRecords];
      }
      if (parentDataArr.length > 0) {
        for (let i = parentDataArr.length - 1; i >= 0; i--) {
          const {
            selectRowKeys: parentSelectRowKeys,
            selectRecords: parentSelectRecords,
          } = this.handleParentData(
            parentDataArr[i],
            newSelectRowKeys,
            newRecords,
            rowKey,
            setCheckboxProps
          );
          newSelectRowKeys = parentSelectRowKeys;
          newRecords = parentSelectRecords;
        }
      }
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

    getValidData = (
      tableData: Object[],
      param: {
        selectedRecords: Object[],
        disabledSelectedKeys: any[],
        disabledSelectedRecords: any[],
        validKeys: any[],
        validRecords: any[],
      }
    ) => {
      const { rowKey: cusRowKey = 'key', selectOptions = {} } = this.props;
      const {
        setCheckboxProps = (record: Object) => {
          return {};
        },
      } = selectOptions;
      const { selectRowKeys: stateSelectRowKeys } = this.state;
      const {
        selectedRecords = [],
        disabledSelectedKeys = [],
        disabledSelectedRecords = [],
        validKeys = [],
        validRecords = [],
      } = param;
      tableData.forEach(record => {
        const rowKey = record[cusRowKey];
        const select = stateSelectRowKeys.includes(rowKey);
        const checkboxProps = setCheckboxProps(record) || {};
        const { hasChildren = false, children = [] } = record;
        if (select) {
          selectedRecords.push(record);
          if (checkboxProps.disabled) {
            disabledSelectedKeys.push(rowKey);
            disabledSelectedRecords.push(record);
          }
        }
        if (!checkboxProps.disabled) {
          validKeys.push(rowKey);
          validRecords.push(record);
        }
        if (hasChildren && children.length > 0) {
          this.getValidData(children, {
            selectedRecords,
            disabledSelectedRecords,
            disabledSelectedKeys,
            validRecords,
            validKeys,
          });
        }
      });
      return {
        selectedRecords,
        disabledSelectedKeys,
        disabledSelectedRecords,
        validKeys,
        validRecords,
      };
    };

    getValidKey = () => {
      const selectedRecords = [];
      const validKeys = [];
      const disabledSelectedKeys = [];
      const validRecords = [];
      const disabledSelectedRecords = [];
      const { data: propsData } = this.props;
      const { data = [] } = this.state;
      const { tableData, dataIsSame } = this.getTableData(propsData, data);
      if (!dataIsSame) this.sortState = '';
      const {
        selectedRecords: newSelectedRecords,
        validKeys: newValidKeys,
        disabledSelectedKeys: newDisabledSelectedKeys,
        validRecords: newValidRecords,
        disabledSelectedRecords: newDisabledSelectedRecords,
      } = this.getValidData(tableData, {
        selectedRecords,
        validKeys,
        validRecords,
        disabledSelectedKeys,
        disabledSelectedRecords,
      });
      this.selectedRecords = newSelectedRecords;
      this.validKeys = newValidKeys;
      this.disabledSelectedKeys = newDisabledSelectedKeys;
      this.validRecords = newValidRecords;
      this.disabledSelectedRecords = newDisabledSelectedRecords;
    };
    getSortColumns = (columns: Object[]) => {
      const newColumns = [];
      columns.map(item => {
        const { sorter } = item;
        if (sorter) {
          const newItem = deepCopy(item);
          const { title } = newItem;
          let props = {};
          if (React.isValidElement(title)) {
            props = title.props;
          }
          newItem.title = (
            <div {...props}>
              <TableTitle
                title={item.title}
                positiveSequence={() => this.onSortChange(item, 'ascend')}
                negativeSequence={() => this.onSortChange(item, 'descend')}
              />
            </div>
          );
          newColumns.push(newItem);
        } else {
          newColumns.push(item);
        }
      });
      return newColumns;
    };
    onSortChange = (columnData: Object, type: string) => {
      const { sortOrder } = this.state;
      const { data, onChange } = this.props;
      const { sortState } = this;
      const { sorter, dataIndex } = columnData;
      let sortData = deepCopy(data);
      let newSortOrder = !sortOrder;
      if (sortOrder || (sortState && sortState !== type && !sortOrder)) {
        if (sortState && sortState !== type && !sortOrder) {
          newSortOrder = false;
        }
        sortData = sortData.sort(sorter);
        if (type === 'descend') {
          sortData = sortData.reverse();
        }
      }
      this.sortState = type;
      this.setState({ data: sortData, sortOrder: newSortOrder });
      onChange && onChange({ column: columnData, filed: dataIndex, order: type, data: sortData });
    };

    getStrengthenValue = () => {
      return this.sortState !== '';
    };

    getTableData = (propsData, stateData, isStrengthen?) => {
      const dataIsSame = isEqualArray(stateData, propsData, {
        isStrengthen: isStrengthen || this.getStrengthenValue(),
      });
      const tableData = dataIsSame ? stateData : propsData;
      return { tableData, dataIsSame };
    };

    getDefaultEmpty = () => {
      const theme = {
        [Widget.Empty]: {
          Container: {
            normal: {
              width: 'auto',
            },
          },
        },
      };
      return {
        emptyText: <Empty {...this.props} themeInfo={theme} />,
      };
    };
    render() {
      const {
        children,
        columns = [],
        showHeader = true,
        tableStyle = 'bordered',
        getPartOfThemeProps,
        selectOptions = {},
        size = 'default',
        rowKey: cusRowKey = 'key',
        scroll: propsScroll = {},
        data: propsData = [],
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
        data = [],
      } = this.state;
      const { dataIsSame: propsDataIsChange } = this.getTableData(
        this.oldPropsData,
        propsData,
        true
      );
      const tableData = propsDataIsChange ? data : propsData;

      if (!propsDataIsChange) {
        this.oldPropsData = [...propsData];
      }
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
              {...this.getDefaultEmpty()}
              {...this.props}
              data={tableData}
              showHeader={showHeader}
              rowClassName={(record, i) => `row-${i}`}
              className="table"
            >
              {children}
            </RcTable>
          </TableWrap>
        );
      }
      const theColumns = this.getSortColumns(columns);
      if ('selectOptions' in this.props) {
        this.getValidKey();
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
            const { children = [] } = record;
            const rowKey = record[cusRowKey];
            const select = stateSelectRowKeys.includes(rowKey);
            const checkboxProps = setCheckboxProps(record) || {};
            const notChecked = getValidNotCheckedKeys(
              children,
              stateSelectRowKeys,
              cusRowKey,
              setCheckboxProps
            );
            const allCheck = notChecked.length <= 0 && select;
            const { childrenKeys = [] } = getChildrenKeys(
              children,
              [],
              [],
              cusRowKey,
              setCheckboxProps
            );
            const indeterminate =
              allCheck || notChecked.length === childrenKeys.length ? false : true;
            return (
              <div style={{ fontSize: 0 }}>
                <Checkbox
                  checked={allCheck}
                  onChange={this.tableItemChange(rowKey, record)}
                  {...checkboxProps}
                  indeterminate={indeterminate}
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
            {...this.getDefaultEmpty()}
            {...this.props}
            columns={theColumns}
            data={tableData}
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
