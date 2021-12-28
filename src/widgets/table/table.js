/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import RcTable, { INTERNAL_COL_DEFINE } from '@lugia/rc-table';
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
  isEqualObject,
} from './utils';
import Empty from '../empty';
import Icon from '../icon';
import { deepMerge } from '@lugia/object-utils';
import { style2css } from '@lugia/css';
import getUuid from '../utils/getUuid';
import { HeightType } from '../css/table';

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

const lugiadLayoutName = { auto: 'auto', reactive: 'reactive', fixed: 'fixed' };

const getLugiadHeightTypeBoolean = (lugiadLayout: HeightType) => {
  const { auto, reactive, fixed } = lugiadLayoutName;
  return {
    isAuto: lugiadLayout === auto, // 内容填充
    isReactive: lugiadLayout === reactive, // 自适应
    isFixed: lugiadLayout === fixed, // 固定值
  };
};

const getStringValue = (val: string | number): string => {
  return typeof val === 'number' ? `${val}px` : val;
};
const TableWrap = CSSComponent({
  tag: 'div',
  className: 'TableWrap',
  normal: {
    selectNames: [['width']],
    getCSS(themeMeta, themeProps): string {
      const { height, background: { color } = {} } = themeMeta;
      const {
        propsConfig: {
          size = 'default',
          columnsStyle,
          expandedRowStyle,
          columnsTitleStyle,
          heightType,
          headHeight,
          bodyRowHeight,
          fixedColStyle,
        } = {},
      } = themeProps;
      const padding = sizePadding[size] || sizePadding.default;
      let bgColor;
      if (color) {
        bgColor = `tbody .rc-table-cell {
          background: ${color};
        }`;
      }
      const { isReactive, isFixed } = getLugiadHeightTypeBoolean(heightType);

      let heightStyle = '';
      if (isFixed) {
        heightStyle =
          typeof height === 'number' ? `height:${height}px;` : height ? `height:${height};` : '';
      }
      if (isReactive) {
        heightStyle = 'height:100%;';
      }

      const headHeightString = getStringValue(headHeight);
      const bodyRowHeightString = getStringValue(bodyRowHeight);
      return css`
        ${heightStyle};
        .rc-table th,
        .rc-table td {
          padding: 0 ${padding}px;
        }

        ${color ? bgColor : ''};
        ${columnsStyle};
        ${columnsTitleStyle};
        ${expandedRowStyle};
        ${fixedColStyle};

        .rc-table tbody .rc-table-row {
          height: ${bodyRowHeightString};
        }
        .rc-table tbody .rc-table-row td {
          height: ${bodyRowHeightString};
        }
        .rc-table thead tr {
          height: ${headHeightString};
        }
        .rc-table thead tr th {
          height: ${headHeightString};
        }
      `;
    },
  },
});
export const ExpandIconWrap = StaticComponent({
  tag: 'span',
  className: 'ExpandIconWrap',
  css: css`
    display: inline-flex;
    align-items: center;
  `,
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
    tableId: string;
    oldPropsData: Object[];
    currentPropsDataIsSame: boolean;
    userAgentInfor: string;

    constructor(props) {
      super();
      const { data = [], selectOptions: { selectRowKeys = [] } = {}, scroll = {} } = props;
      this.tableId = `lugia-table-${getUuid()}`;
      this.propsKey = getUuid();

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
      this.columns = this.handleColumns(props);
      this.columnsWidthMap = {};
      this.currentPropsDataIsSame = true;
      this.userAgentInfor = '';
    }
    getLugiadHeightType = (): HeightType => {
      const { lugiadLayout, getPartOfThemeProps, tableHeightType } = this.props;
      const { themeConfig: { normal } = {} } = getPartOfThemeProps('Container');
      const newNormal = normal || {};
      const { height } = newNormal;
      const { fixed, auto } = lugiadLayoutName;
      if (tableHeightType) {
        const hasHeight = 'height' in newNormal;
        if (tableHeightType === fixed && !hasHeight) {
          console.log('表格高度为空,表格内容将完全展示');
        }
        return tableHeightType || auto;
      }

      if (lugiadLayout) {
        const { heightType } = lugiadLayout;
        return heightType;
      }

      //兼容组件主题高度为数字类型时生效
      if (typeof height === 'number') {
        return fixed;
      }

      return auto;
    };

    canShowScrollY = (): boolean => {
      const { isAuto } = getLugiadHeightTypeBoolean(this.getLugiadHeightType());
      if (isAuto) {
        return 0;
      }
      const containerHeight = this.getContainerHeight();
      const tableHeight = this.computeTableHeight();
      return tableHeight && (containerHeight < tableHeight - 2 || tableHeight === containerHeight);
    };

    componentDidMount() {
      setTimeout(() => {
        if (this.tableWrap) {
          this.tableWrap.querySelector('.rc-table-content');
        }
        if (this.props.scroll && this.props.scroll.y) {
          return;
        }
        this.updateScrollY();
      }, 0);

      this.setXScrollerCriticalResizeObserver();
      this.userAgentInfor = navigator.userAgent.toLowerCase();
    }

    disconnectXScrollerCriticalResizeObserver() {
      if (this.xScrollerCriticalResizeObserver) {
        this.xScrollerCriticalResizeObserver.disconnect();
      }
    }

    setXScrollerCriticalResizeObserver() {
      const { xScrollerCritical } = this.props;

      this.disconnectXScrollerCriticalResizeObserver();

      if (xScrollerCritical) {
        this.xScrollerCriticalResizeObserver = new ResizeObserver(entries => {
          if (!entries) {
            return;
          }

          const entry = entries[0];
          if (!entry) {
            return;
          }
          const { target } = entry;

          if (Math.abs(target.scrollWidth - target.clientWidth) <= xScrollerCritical) {
            target.style.overflowX = 'hidden';
          } else {
            target.style.overflowX = '';
          }
        });

        this.xScrollerCriticalResizeObserver.observe(this.getTableBodyDom());
      }
    }

    componentWillUnmount() {
      this.disconnectXScrollerCriticalResizeObserver();
    }

    shouldComponentUpdate(nextProps: TableProps, nextState: TableState) {
      const { columns: nextColumns, fixedColumns: nextFixedColumns } = nextProps;
      const { selectRowKeys: nextSelectRowKeys } = nextState;
      const { columns, fixedColumns } = this.props;
      const { selectRowKeys } = this.state;
      if (
        !isEqualObject(nextColumns, columns) ||
        !isEqualObject(nextSelectRowKeys, selectRowKeys) ||
        !isEqualObject(nextFixedColumns, fixedColumns)
      ) {
        this.columns = this.handleColumns(nextProps);
      }

      return true;
    }

    getContainerHeight = () => {
      if (this.tableWrap) {
        const { offsetHeight } = this.tableWrap;
        return offsetHeight;
      }
      return 0;
    };

    isWinSystem = () => {
      return this.userAgentInfor.indexOf('win32') > 0 || this.userAgentInfor.indexOf('win64') > 0;
    };
    isFirefoxBrowser = () => {
      return this.userAgentInfor.indexOf('firefox') > 0;
    };

    computeTableHeight() {
      if (this.tableWrap && this.tableWrap.querySelector) {
        const tableBody = this.getTableBodyDom();

        if (!tableBody) {
          return;
        }

        let tableBodyHeight = 0;
        if (tableBody && tableBody.offsetHeight) {
          const windowsAndFirefox = this.isWinSystem() && this.isFirefoxBrowser();

          tableBodyHeight = parseInt(tableBody.offsetHeight, 10) + +windowsAndFirefox;
        }

        let tableHeaderHeight = 0;
        const tableHead = this.tableWrap.querySelector('.rc-table-header');
        if (tableHead && tableHead.offsetHeight) {
          tableHeaderHeight = parseInt(tableHead.offsetHeight, 10);
        }
        return tableBodyHeight + tableHeaderHeight;
      }
    }

    getTableDom() {
      return this.getTableBodyDom(true);
    }

    getTableBodyDom(table: boolean = false) {
      if (this.tableWrap && this.tableWrap.querySelector) {
        const tableWarp = this.tableWrap.querySelector('.rc-table-content');
        const tableBody = this.tableWrap.querySelector(`.rc-table-body ${table ? 'table' : ''}`);
        if (tableWarp) {
          return tableWarp;
        } else if (tableBody) {
          return tableBody;
        }
      }
    }
    updateScrollY = () => {
      const tableHeight = this.getContainerHeight();
      if (this.canShowScrollY()) {
        this.setState({ scroll: this.getTableBodyHeight(tableHeight) });
      } else {
        this.setState({ scroll: undefined });
      }
    };

    componentDidUpdate(prevProps, prevState) {
      setTimeout(() => {
        const { data = [], scroll } = this.props;
        const { data: prevPropsData = [] } = prevProps;
        if (data.length === prevPropsData.length || (scroll && scroll.y)) {
          return;
        }
        this.updateScrollY();
      }, 0);

      const { defaultExpandAllRows } = this.props;
      if (defaultExpandAllRows && !this.currentPropsDataIsSame) {
        this.setXScrollerCriticalResizeObserver();
      }
    }

    static getDerivedStateFromProps(props, nextState) {
      const { data = [], selectOptions = {}, rowKey = 'key' } = props;
      const { data: stateData = [], sortOrder } = nextState;
      const dataIsSame = isEqualArray(stateData, data, { isStrengthen: false });
      const tableData = dataIsSame ? stateData : data;
      if ('selectRowKeys' in selectOptions) {
        const {
          selectRowKeys = [],
          setCheckboxProps = () => {
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
          data.length > 0 &&
          getValidNotCheckedKeys(data, selectRowKeys, rowKey, setCheckboxProps).length <= 0;
        return {
          headChecked: allValidSelected,
          headIndeterminate: !!validSelectRowKeys.length,
          selectRowKeys,
          sortOrder: dataIsSame ? sortOrder : true,
          data: tableData,
        };
      }
      return { sortOrder: dataIsSame ? sortOrder : true, data: tableData };
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
        setCheckboxProps = () => {
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
      const { showHeader = true } = this.props;
      if (!themeHeight) {
        return {};
      }
      const tableLineHeight = this.getHeadHeight();
      const height = parseInt(themeHeight, 10);
      return {
        y: showHeader ? height - tableLineHeight : height,
      };
    };

    getHeadHeight = () => {
      const { size = 'default', getPartOfThemeConfig } = this.props;
      const { normal } = getPartOfThemeConfig('Head');
      const { height: headHeight = 0 } = normal || {};
      return headHeight || sizeHeight[size];
    };

    getBodyRowHeight = () => {
      const { getPartOfThemeConfig } = this.props;
      const { normal } = getPartOfThemeConfig('BodyRow');
      const { height: rowHeight = 0 } = normal || {};
      return rowHeight || this.getHeadHeight();
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
        setCheckboxProps = () => {
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

    handleColumns = (currentProps: Object) => {
      const {
        columns = [],
        canFixedColumnsDataIndex = [],
        fixedColumns = [],
        onFixed,
        fixedData = [],
      } = currentProps;
      const newColumns = [];
      const fixLeftColumns = [];
      const fixRightColumns = [];

      columns.forEach(item => {
        const { sorter, dataIndex } = item;
        const canFixed = canFixedColumnsDataIndex.indexOf(dataIndex) > -1;
        if (sorter || canFixed) {
          const newItem = deepCopy(item);
          const { title, dataIndex } = newItem;
          let props = {};
          if (React.isValidElement(title)) {
            props = title.props;
          }
          const fixedOptions = {};
          if (canFixed) {
            const fixInfo = fixedColumns.find(item => item.dataIndex === dataIndex);
            const columnFixed = !!fixInfo;
            fixedOptions.fixed = columnFixed;
            fixedOptions.canFixed = canFixed;
            fixedOptions.onFixed = onFixed;
            fixedOptions.canFixedColumnsDataIndex = canFixedColumnsDataIndex;
            fixedOptions.dataIndex = dataIndex;
            fixedOptions.fixedData = fixedData;
            if (columnFixed) {
              const { direction = 'left' } = fixInfo;
              newItem.fixed = direction;
            }
          }
          newItem.title = (
            <div {...props}>
              <TableTitle
                sorter={sorter}
                title={item.title}
                positiveSequence={() => this.onSortChange(item, 'ascend')}
                negativeSequence={() => this.onSortChange(item, 'descend')}
                {...fixedOptions}
                tableId={this.tableId}
              />
            </div>
          );

          switch (newItem.fixed) {
            case 'left':
              fixLeftColumns.push(newItem);
              break;
            case 'right':
              fixRightColumns.push(newItem);
              break;
            default:
              newColumns.push(newItem);
          }
        } else {
          newColumns.push(item);
        }
      });

      return fixLeftColumns.concat(newColumns, fixRightColumns);
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

    getColumnsClass = className => {
      const { columns, expandedRowRender, data } = this.props;
      const isHasExpand = !!expandedRowRender;
      return (
        columns &&
        columns
          .map((item, index) => {
            const { style } = item;
            if (style) {
              const newIndex = isHasExpand && data.length ? index + 2 : index + 1;
              return `${className}(${newIndex}){${style2css(style)}}`;
            }
            return '';
          })
          .join('')
      );
    };

    getFixedBottomStyle = className => {
      return `${className}(1){position: sticky;z-index:1;bottom:0;};`;
    };

    getColumnsAlignCSS = () => {
      const { columns } = this.props;
      const childrenTitleAlignCSSList = [];
      const columnTdLengthMap = {};
      const level = 1;
      columns &&
        columns.forEach((item, index) => {
          const { titleAlign, children } = item;
          const childIndex = index + 1;
          childrenTitleAlignCSSList.push(
            this.getTitleAlignCSSByIndex(level, childIndex, titleAlign)
          );
          if (Array.isArray(children) && children.length > 0) {
            childrenTitleAlignCSSList.concat(
              this.getChildrenTitleAlignCSS(
                children,
                level,
                columnTdLengthMap,
                childrenTitleAlignCSSList
              )
            );
          }
        });

      return childrenTitleAlignCSSList;
    };

    getTitleAlignCSSByIndex(trIndex: number, tdIndex: number, titleAlign?: string) {
      const titleAlignStyle = titleAlign ? `text-align:${titleAlign} !important;` : '';
      return `table thead tr:nth-child(${trIndex}) th:nth-child(${tdIndex}){${titleAlignStyle}}`;
    }

    getChildrenTitleAlignCSS = (
      children: Object[],
      level: number,
      columnTdLengthMap: Object,
      childrenTitleAlignCSSList: string[]
    ) => {
      level++;
      columnTdLengthMap[level] = columnTdLengthMap[level] || 0;

      children.forEach(item => {
        const { children: nextChildren, titleAlign } = item;
        columnTdLengthMap[level]++;
        const childrenTitleAlignStyle = this.getTitleAlignCSSByIndex(
          level,
          columnTdLengthMap[level],
          titleAlign
        );
        childrenTitleAlignCSSList.push(`${childrenTitleAlignStyle}`);
        if (Array.isArray(nextChildren) && nextChildren.length > 0) {
          childrenTitleAlignCSSList.concat(
            this.getChildrenTitleAlignCSS(
              nextChildren,
              level,
              columnTdLengthMap,
              childrenTitleAlignCSSList
            )
          );
        }
      });
    };
    getHeadStyle = () => {
      return this.getColumnsClass('table thead tr th:nth-child');
    };

    getEveryColumnsStyle = () => {
      return `${this.getColumnsClass('table tbody tr td:nth-child')}${this.getHeadStyle()}`;
    };

    getExpandedRowStyle = () => {
      const { expandedRowStyle } = this.props;
      if (expandedRowStyle) {
        return `.rc-table td.rc-table-row-expand-icon-cell,
        .rc-table th.rc-table-row-expand-icon-cell{${style2css(expandedRowStyle)}}`;
      }
    };

    onExpandedRowsChange = (...param) => {
      const { onExpandedRowsChange } = this.props;
      onExpandedRowsChange && onExpandedRowsChange(...param);
      setTimeout(() => {
        this.updateScrollY();
      }, 0);
    };

    render() {
      const {
        children,
        showHeader = true,
        tableStyle = 'bordered',
        getPartOfThemeProps,
        selectOptions = {},
        size = 'default',
        rowKey: cusRowKey = 'key',
        scroll: propsScroll = {},
        data: propsData = [],
        expandIcon,
        collapseIcon,
        defaultExpandAllRows,
        fixedBottom,
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
      const { dataIsSame: propsDataIsSame } = this.getTableData(this.oldPropsData, propsData, true);
      const tableData = propsDataIsSame ? data : propsData;
      this.currentPropsDataIsSame = propsDataIsSame;

      if (!propsDataIsSame) {
        this.oldPropsData = [...propsData];
      }
      const containerPartOfThemeProps = getPartOfThemeProps('Container', {
        props: {
          size,
          columnsStyle: data.length ? this.getEveryColumnsStyle() : this.getHeadStyle(),
          columnsTitleStyle: this.getColumnsAlignCSS(),
          expandedRowStyle: this.getExpandedRowStyle(),
          headHeight: this.getHeadHeight(),
          bodyRowHeight: this.getBodyRowHeight(),
          heightType: this.getLugiadHeightType(),
          fixedColStyle: fixedBottom
            ? this.getFixedBottomStyle('.rc-table tbody tr:nth-last-child')
            : '',
        },
      });
      const customExpandIcon = prop => {
        const { expandable } = prop;
        return expandable ? (
          <ExpandIconWrap
            className={'custom-icon'}
            onClick={() => {
              prop.onExpand(prop.record);
            }}
          >
            {getCustomIcon(prop)}
          </ExpandIconWrap>
        ) : null;
      };

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
              expandIcon={(expandIcon || collapseIcon) && customExpandIcon}
            >
              {children}
            </RcTable>
          </TableWrap>
        );
      }
      if ('selectOptions' in this.props) {
        this.getValidKey();
        if (this.columns && this.columns[0]) {
          if (this.columns[0].key !== 'selection-column') {
            const {
              setCheckboxProps = () => {
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
                const indeterminate = allCheck || notChecked.length !== childrenKeys.length;
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
            this.columns.unshift(selectColumnItem);
          }
        }
      }
      let expandIconColumnIndex =
        this.columns && this.columns[0] && this.columns[0][cusRowKey] === 'selection-column'
          ? 1
          : 0;
      if ('expandIconColumnIndex' in this.props) {
        const { expandIconColumnIndex: propsIndex } = this.props;
        expandIconColumnIndex = Number(propsIndex);
      }

      const getIconTheme = iconType => {
        const { getPartOfThemeHocProps, expandedRowRender } = this.props;
        const isHasExpandedRow = !!expandedRowRender;
        const { viewClass, theme } = getPartOfThemeHocProps(iconType);
        const defaultTheme = {
          normal: {
            padding: {
              right: isHasExpandedRow ? 0 : 5,
            },
          },
        };
        return {
          viewClass,
          theme: deepMerge(
            {
              [viewClass]: { ...defaultTheme },
            },
            theme
          ),
        };
      };
      const getIconByType = (icon, iconConfig) => {
        const iconType = typeof icon;
        if (iconType === 'string') {
          return <Icon singleTheme iconClass={icon} {...getIconTheme(iconConfig)} />;
        } else if (iconType === 'function') {
          return icon && icon();
        }
      };

      const getCustomIcon = param => {
        return param.expanded
          ? getIconByType(expandIcon, 'ExpandIcon')
          : getIconByType(collapseIcon, 'CollapseIcon');
      };
      if (defaultExpandAllRows) {
        if (!propsDataIsSame) {
          this.propsKey = getUuid();
        }
      }

      return (
        <TableWrap
          id={this.tableId}
          ref={el => {
            this.tableWrap = el;
          }}
          themeProps={containerPartOfThemeProps}
          className={this.getClass(tableStyle)}
          key={this.propsKey}
          size={size}
        >
          <RcTable
            {...this.getDefaultEmpty()}
            {...this.props}
            onExpandedRowsChange={this.onExpandedRowsChange}
            columns={this.columns}
            data={tableData}
            showHeader={showHeader}
            expandIconColumnIndex={expandIconColumnIndex}
            scroll={{ ...scroll, ...propsScroll }}
            expandIcon={(expandIcon || collapseIcon) && customExpandIcon}
          />
        </TableWrap>
      );
    }
    getClass = (tableStyle: 'zebraStripe' | 'linear' | 'bordered'): string => {
      return `lugia-table lugia-table-${tableStyle}`;
    };
  },
  Widget.Table
);
