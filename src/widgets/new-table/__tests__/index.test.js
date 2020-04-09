/**
 *
 * create by szfeng
 *
 * @flow
 */
import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  restColumnsIntoData,
  isSelectSameItem,
  keyUpHandler,
  keyDownHandler,
  getThemeForTable,
  defaultTableTheme,
  restColumnsWithRender,
  isSelected,
  isEditCell,
  resetSelectRow,
  resetSelectRowFromArray,
  getCellItem,
  resetItemName,
  getClearSingleSelectCell,
  getMovedCells,
} from '../editTable';
import EditTable from '../editTableView';
import Table from '../table';
import renderer from 'react-test-renderer';

const { mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

const render = () => true;
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    align: 'center',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: 'isIn',
    dataIndex: 'isIn',
    key: 'isIn',
    width: 200,
    render,
  },
];

const columnsIntoData = [
  { name: '姓名', age: 'Age', address: 'Address', isIn: 'isIn', isHead: true },
];

const columnsWidthRender = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    align: 'center',
    render: () => true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    render: () => true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
    render: () => true,
  },
  {
    title: 'isIn',
    dataIndex: 'isIn',
    key: 'isIn',
    width: 200,
    customRender: render,
    render: () => true,
  },
];

const data = [
  { name: '', age: 28, key: '1', isIn: true },
  { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
  { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
  { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
  { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
];

const dataKeyMap = {
  columnsMap: {
    name: 0,
    age: 1,
    address: 2,
    isIn: 3,
  },
  dataMap: {
    0: { name: '', age: 28, key: '1', isIn: true },
    1: { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
    2: { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
    3: { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
    4: { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
    5: { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
  },
};

const getCmp = (target: any): Object => {
  return target.children().instance();
};
Enzyme.configure({ adapter: new Adapter() });

describe('new-table', () => {
  it(' Table css ', () => {
    const cmp = <Table data={data} columns={columns} />;
    expect(renderer.create(cmp).toJSON()).toMatchSnapshot();
  });

  it(' EditTable css', () => {
    const cmp = <EditTable data={data} columns={columns} />;
    expect(renderer.create(cmp).toJSON()).toMatchSnapshot();
  });

  it(' Table data & columns ', () => {
    const cmp = mount(<Table data={data} columns={columns} />);
    expect(cmp.props().data).toEqual(data);
    expect(cmp.props().columns).toEqual(columns);
  });

  it(' Table tableSize=middle,tableStyle=linear', () => {
    const cmp = mount(
      <Table data={data} columns={columns} tableSize={'middle'} tableStyle={'linear'} />
    );
    expect(cmp.props().tableSize).toEqual('middle');
    expect(cmp.props().tableStyle).toEqual('linear');
  });

  it(' Table tableSize=large,tableStyle=bordered', () => {
    const cmp = mount(
      <Table data={data} columns={columns} tableSize={'large'} tableStyle={'bordered'} />
    );
    expect(cmp.props().tableSize).toEqual('large');
    expect(cmp.props().tableStyle).toEqual('bordered');
  });

  it(' EditTable restColumnsIntoData ', () => {
    expect(restColumnsIntoData(columns)).toEqual(columnsIntoData);
  });

  it(' EditTable restColumnsIntoData  columns is null || undefined || []', () => {
    expect(restColumnsIntoData(null)).toEqual([]);
    expect(restColumnsIntoData(undefined)).toEqual([]);
    expect(restColumnsIntoData([])).toEqual([]);
  });

  const oldItem = { selectColumn: 0, selectRow: 0 },
    currentItem = { selectColumn: 0, selectRow: 0 },
    falseItem = { selectColumn: 0, selectRow: 1 };

  it(' EditTable isSelectSameItem', () => {
    expect(isSelectSameItem(oldItem, currentItem)).toBeTruthy();
    expect(isSelectSameItem(oldItem, falseItem)).toBeFalsy();
  });

  it(' EditTable isSelectSameItem currentItem  is null || undefined || {}', () => {
    expect(isSelectSameItem(oldItem, null)).toBeFalsy();
    expect(isSelectSameItem(oldItem, undefined)).toBeFalsy();
    expect(isSelectSameItem(oldItem, {})).toBeFalsy();
  });

  it(' EditTable isSelectSameItem oldItem  is null || undefined || {}', () => {
    expect(isSelectSameItem(null, currentItem)).toBeFalsy();
    expect(isSelectSameItem(undefined, currentItem)).toBeFalsy();
    expect(isSelectSameItem({}, currentItem)).toBeFalsy();
  });

  const targetTheme = {
    viewClass: 'abc',
    theme: {
      abc: {
        Container: {
          normal: { width: '100%' },
        },
      },
    },
  };
  const resultTheme = {
    viewClass: 'abc',
    theme: {
      abc: {
        Container: {
          normal: { width: '100%' },
        },
        ...defaultTableTheme,
      },
    },
  };

  const targetWithTdTheme = {
    viewClass: 'abc',
    theme: {
      abc: {
        Container: {
          normal: { width: '100%' },
        },
        Td: { normal: { padding: 20 } },
      },
    },
  };
  const resultWithTdTheme = {
    viewClass: 'abc',
    theme: {
      abc: {
        Container: {
          normal: { width: '100%' },
        },
        Td: { normal: { padding: 20 } },
      },
    },
  };

  it(' EditTable getThemeForTable', () => {
    expect(getThemeForTable(targetTheme, defaultTableTheme)).toEqual(resultTheme);
    expect(getThemeForTable(targetWithTdTheme, defaultTableTheme)).toEqual(resultWithTdTheme);
  });
  //
  // it(' EditTable restColumnsWithRender', () => {
  //   expect(restColumnsWithRender(columns)).toEqual(columnsWidthRender);
  // });

  it(' EditTable restColumnsWithRender columns is null || undefined || []', () => {
    expect(restColumnsWithRender(null)).toEqual([]);
    expect(restColumnsWithRender(undefined)).toEqual([]);
    expect(restColumnsWithRender([])).toEqual([]);
  });

  const selectCell = [{ selectColumn: 0, selectRow: 0 }];
  const multipleSelectCell = [{ selectColumn: 0, selectRow: 0 }, { selectColumn: 1, selectRow: 1 }];

  it(' EditTable isSelected', () => {
    expect(isSelected(currentItem, selectCell)).toBeTruthy();
    expect(isSelected(currentItem, multipleSelectCell)).toBeTruthy();
  });

  it(' EditTable isSelected selectCell is null || undefined || []', () => {
    expect(isSelected(currentItem, null)).toBeFalsy();
    expect(isSelected(currentItem, undefined)).toBeFalsy();
    expect(isSelected(currentItem, [])).toBeFalsy();
  });

  it(' EditTable isSelected currentItem is null || undefined || {}', () => {
    expect(isSelected(null, selectCell)).toBeFalsy();
    expect(isSelected(undefined, selectCell)).toBeFalsy();
    expect(isSelected({}, selectCell)).toBeFalsy();
  });

  it(' EditTable isEditCell', () => {
    expect(isEditCell(currentItem, falseItem)).toBeFalsy();
    expect(isEditCell(currentItem, oldItem)).toBeTruthy();
  });

  it(' EditTable isEditCell editCell is null || undefined || {}', () => {
    expect(isEditCell(currentItem, null)).toBeFalsy();
    expect(isEditCell(currentItem, undefined)).toBeFalsy();
    expect(isEditCell(currentItem, {})).toBeFalsy();
  });

  it(' EditTable isEditCell currentItem is null || undefined || {}', () => {
    expect(isEditCell(null, oldItem)).toBeFalsy();
    expect(isEditCell(undefined, oldItem)).toBeFalsy();
    expect(isEditCell({}, oldItem)).toBeFalsy();
  });

  const current = { selectColumn: 2, selectRow: 2 },
    oldValue = [{ selectColumn: 1, selectRow: 1 }];

  it(' EditTable resetItemName ', () => {
    const resetItemNameProps = current;
    const resetItemNameRes = { columnIndex: 2, rowIndex: 1 };

    expect(resetItemName(resetItemNameProps)).toEqual(resetItemNameRes);
  });

  it(' EditTable getCellItem ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { mockEditTableListener, EditTableListener } = mockListener(cmp);
    const getKeyMaps = mockEditTableListener.mockFunction('getKeyMaps');
    getKeyMaps.returned(dataKeyMap);

    const getCellItemProps = { newItem: current, EditTableListener, columns };
    const getCellItemRes = {
      currentCell: { address: 'some where' },
      record: { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
      cellIndex: { rowIndex: 1, columnIndex: 2 },
    };

    expect(getCellItem(getCellItemProps)).toEqual(getCellItemRes);
  });

  it(' EditTable resetSelectRowFromArray ', () => {
    const resetSelectRowFromArrayProps = oldValue;
    const resetSelectRowFromArrayRes = [{ rowIndex: 0, columnIndex: 1 }];

    expect(resetSelectRowFromArray(resetSelectRowFromArrayProps)).toEqual(
      resetSelectRowFromArrayRes
    );

    const resetSelectRowFromArrayMultipleProps = [
      { selectColumn: 0, selectRow: 1 },
      { selectColumn: 1, selectRow: 1 },
      { selectColumn: 3, selectRow: 2 },
    ];
    const resetSelectRowFromArrayMultipleRes = [
      { rowIndex: 0, columnIndex: 0 },
      { rowIndex: 0, columnIndex: 1 },
      { rowIndex: 1, columnIndex: 3 },
    ];
    expect(resetSelectRowFromArray(resetSelectRowFromArrayMultipleProps)).toEqual(
      resetSelectRowFromArrayMultipleRes
    );
  });

  it(' EditTable resetSelectRow ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { mockEditTableListener, EditTableListener } = mockListener(cmp);
    const getKeyMaps = mockEditTableListener.mockFunction('getKeyMaps');
    getKeyMaps.returned(dataKeyMap);

    expect(cmp.EditTableListener.dataKeyMap).toEqual(dataKeyMap);

    const resetSelectRowProps = {
      EditTableListener,
      currentItem: current,
      newValue: [current],
      oldValue,
      columns,
    };
    const resetSelectRowRes = {
      currentItem: {
        currentCell: { address: 'some where' },
        record: { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
        cellIndex: { rowIndex: 1, columnIndex: 2 },
      },
      newValue: [{ rowIndex: 1, columnIndex: 2 }],
      oldValue: [{ rowIndex: 0, columnIndex: 1 }],
    };

    expect(resetSelectRow(resetSelectRowProps)).toEqual(resetSelectRowRes);
  });

  it(' EditTable getClearSingleSelectCell has select ', () => {
    const clearCellItem = { selectColumn: 0, selectRow: 1 };
    const clearSelectCell = [
      { selectColumn: 0, selectRow: 1 },
      { selectColumn: 2, selectRow: 1 },
      { selectColumn: 3, selectRow: 1 },
    ];
    const clearCellRes = [{ selectColumn: 2, selectRow: 1 }, { selectColumn: 3, selectRow: 1 }];
    expect(getClearSingleSelectCell(clearCellItem, clearSelectCell)).toEqual(clearCellRes);
  });

  it(' EditTable getClearSingleSelectCell has no select ', () => {
    const clearCellItem = { selectColumn: 0, selectRow: 4 };
    const clearSelectCell = [
      { selectColumn: 0, selectRow: 1 },
      { selectColumn: 2, selectRow: 1 },
      { selectColumn: 3, selectRow: 1 },
    ];
    const clearCellRes = [
      { selectColumn: 0, selectRow: 1 },
      { selectColumn: 2, selectRow: 1 },
      { selectColumn: 3, selectRow: 1 },
    ];
    expect(getClearSingleSelectCell(clearCellItem, clearSelectCell)).toEqual(clearCellRes);
  });

  function mockListener(instance: Object) {
    const order = VerifyOrder.create();
    const mockEditTableListener = mockObject.create(
      instance.EditTableListener,
      VerifyOrderConfig.create('EditTableListener', order)
    );

    return { order, mockEditTableListener, EditTableListener: mockEditTableListener.target };
  }
});
