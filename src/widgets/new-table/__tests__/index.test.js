//@flow
import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import EditTable from '../editTableView';
import Table from '../table';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

const { mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

const render = () => true;
const defaultTableTheme = {
  Td: { normal: { padding: 0 } },
};
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
  { name: '姓名', age: 'Age', address: 'Address', isIn: 'isIn', isLugiaHead: true },
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
    0: { dataItem: { name: '', age: 28, key: '1', isIn: true }, keyValue: 'data-0-1' },
    1: {
      dataItem: { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
      keyValue: 'data-1-2',
    },
    2: {
      dataItem: { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
      keyValue: 'data-2-3',
    },
    3: {
      dataItem: { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
      keyValue: 'data-3-4',
    },
    4: {
      dataItem: { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
      keyValue: 'data-4-5',
    },
    5: {
      dataItem: { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
      keyValue: 'data-5-6',
    },
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

  // it(' EditTable css', () => {
  //   const cmp = <EditTable data={data} columns={columns} />;
  //   expect(renderer.create(cmp).toJSON()).toMatchSnapshot();
  // });

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

  const publicTarget = getCmp(mount(<EditTable data={data} columns={columns} />));
  const { editTableListener: publicEditTableListener } = mockListener(publicTarget);

  it(' Connection restColumnsIntoData ', () => {
    expect(publicEditTableListener.restColumnsIntoData(columns)).toEqual(columnsIntoData);
  });

  it(' Connection restColumnsIntoData  columns is null || undefined || []', () => {
    const { restColumnsIntoData } = publicEditTableListener;
    expect(restColumnsIntoData(null)).toEqual([]);
    expect(restColumnsIntoData(undefined)).toEqual([]);
    expect(restColumnsIntoData([])).toEqual([]);
  });

  const oldItem = { selectColumn: 0, selectRow: 0 },
    currentItem = { selectColumn: 0, selectRow: 0 },
    falseItem = { selectColumn: 0, selectRow: 1 };
  const { isSelectSameItem } = publicEditTableListener;

  it(' Connection isSelectSameItem', () => {
    expect(isSelectSameItem(oldItem, currentItem)).toBeTruthy();
    expect(isSelectSameItem(oldItem, falseItem)).toBeFalsy();
  });

  it(' Connection isSelectSameItem currentItem  is null || undefined || {}', () => {
    expect(isSelectSameItem(oldItem, null)).toBeFalsy();
    expect(isSelectSameItem(oldItem, undefined)).toBeFalsy();
    expect(isSelectSameItem(oldItem, {})).toBeFalsy();
  });

  it(' Connection isSelectSameItem oldItem  is null || undefined || {}', () => {
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

  it(' Connection getThemeForTable', () => {
    const { getThemeForTable } = publicEditTableListener;
    expect(getThemeForTable(targetTheme, defaultTableTheme)).toEqual(resultTheme);
    expect(getThemeForTable(targetWithTdTheme, defaultTableTheme)).toEqual(resultWithTdTheme);
  });

  // it(' EditTable restColumnsWithRender', () => {
  //   expect(restColumnsWithRender(columns)).toEqual(columnsWidthRender);
  // });

  it(' Connection restColumnsWithRender columns is null || undefined || []', () => {
    const { restColumnsWithRender } = publicEditTableListener;
    expect(restColumnsWithRender(null)).toEqual([]);
    expect(restColumnsWithRender(undefined)).toEqual([]);
    expect(restColumnsWithRender([])).toEqual([]);
  });

  const selectCell = [{ selectColumn: 0, selectRow: 0 }];
  const multipleSelectCell = [{ selectColumn: 0, selectRow: 0 }, { selectColumn: 1, selectRow: 1 }];
  const { isSelected } = publicEditTableListener;

  it(' Connection isSelected', () => {
    expect(isSelected(currentItem, selectCell)).toBeTruthy();
    expect(isSelected(currentItem, multipleSelectCell)).toBeTruthy();
  });

  it(' Connection isSelected selectCell is null || undefined || []', () => {
    expect(isSelected(currentItem, null)).toBeFalsy();
    expect(isSelected(currentItem, undefined)).toBeFalsy();
    expect(isSelected(currentItem, [])).toBeFalsy();
  });

  it(' Connection isSelected currentItem is null || undefined || {}', () => {
    expect(isSelected(null, selectCell)).toBeFalsy();
    expect(isSelected(undefined, selectCell)).toBeFalsy();
    expect(isSelected({}, selectCell)).toBeFalsy();
  });

  const { isEditCell } = publicEditTableListener;
  it(' Connection isEditCell', () => {
    expect(isEditCell(currentItem, falseItem)).toBeFalsy();
    expect(isEditCell(currentItem, oldItem)).toBeTruthy();
  });

  it(' Connection isEditCell editCell is null || undefined || {}', () => {
    expect(isEditCell(currentItem, null)).toBeFalsy();
    expect(isEditCell(currentItem, undefined)).toBeFalsy();
    expect(isEditCell(currentItem, {})).toBeFalsy();
  });

  it(' Connection isEditCell currentItem is null || undefined || {}', () => {
    expect(isEditCell(null, oldItem)).toBeFalsy();
    expect(isEditCell(undefined, oldItem)).toBeFalsy();
    expect(isEditCell({}, oldItem)).toBeFalsy();
  });

  const current = { selectColumn: 2, selectRow: 2 },
    oldValue = [{ selectColumn: 1, selectRow: 1 }];

  it(' Connection resetItemName ', () => {
    const resetItemNameProps = current;
    const resetItemNameRes = { columnIndex: 2, rowIndex: 1 };
    const { resetItemName } = publicEditTableListener;
    expect(resetItemName(resetItemNameProps)).toEqual(resetItemNameRes);
  });

  it(' Connection getCellItem ', () => {
    const { getCellItem } = publicEditTableListener;

    const getCellItemProps = { newItem: current, columns };
    const getCellItemRes = {
      currentCell: { address: 'some where' },
      record: { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
      cellIndex: { rowIndex: 1, columnIndex: 2 },
    };

    expect(getCellItem(getCellItemProps)).toEqual(getCellItemRes);
  });

  it(' Connection resetSelectRowFromArray ', () => {
    const resetSelectRowFromArrayProps = oldValue;
    const resetSelectRowFromArrayRes = [{ rowIndex: 0, columnIndex: 1 }];
    const { resetSelectRowFromArray } = publicEditTableListener;

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

  it(' Connection resetSelectRow ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { mockEditTableListener, editTableListener } = mockListener(cmp);
    const getKeyMaps = mockEditTableListener.mockFunction('getKeyMaps');
    getKeyMaps.returned(dataKeyMap);

    expect(cmp.editTableListener.dataKeyMap).toEqual(dataKeyMap);

    const resetSelectRowProps = {
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
    const { resetSelectRow } = editTableListener;
    expect(resetSelectRow(resetSelectRowProps)).toEqual(resetSelectRowRes);
  });

  const { getClearSingleSelectCell } = publicEditTableListener;
  it(' Connection getClearSingleSelectCell has select ', () => {
    const clearCellItem = { selectColumn: 0, selectRow: 1 };
    const clearSelectCell = [
      { selectColumn: 0, selectRow: 1 },
      { selectColumn: 2, selectRow: 1 },
      { selectColumn: 3, selectRow: 1 },
    ];
    const clearCellRes = [{ selectColumn: 2, selectRow: 1 }, { selectColumn: 3, selectRow: 1 }];

    expect(getClearSingleSelectCell(clearCellItem, clearSelectCell)).toEqual(clearCellRes);
  });

  it(' Connection getClearSingleSelectCell has no select ', () => {
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
      instance.editTableListener,
      VerifyOrderConfig.create('editTableListener', order)
    );

    return { order, mockEditTableListener, editTableListener: mockEditTableListener.target };
  }

  it(' Connection getHeaderCell ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { mockEditTableListener, editTableListener } = mockListener(cmp);
    const getKeyMaps = mockEditTableListener.mockFunction('getKeyMaps');
    getKeyMaps.returned(dataKeyMap);

    expect(cmp.editTableListener.dataKeyMap).toEqual(dataKeyMap);

    const resetSelectRowProps = {
      currentItem: { selectColumn: 2, selectRow: 0 },
      newValue: [{ selectColumn: 2, selectRow: 0 }],
      oldValue: [{ selectColumn: 1, selectRow: 0 }],
      columns,
    };

    const resetSelectRowRes = {
      currentItem: { title: 'Address', dataIndex: 'address', key: 'address', width: 200 },
      newValue: [{ title: 'Address', dataIndex: 'address', key: 'address', width: 200 }],
      oldValue: [{ title: 'Age', dataIndex: 'age', key: 'age' }],
    };
    const { getHeaderCell } = editTableListener;
    expect(getHeaderCell(resetSelectRowProps)).toEqual(resetSelectRowRes);

    const multipleResetSelectRowProps = {
      currentItem: { selectColumn: 2, selectRow: 0 },
      newValue: [{ selectColumn: 2, selectRow: 0 }],
      oldValue: [{ selectColumn: 1, selectRow: 0 }, { selectColumn: 0, selectRow: 0 }],
      columns,
    };

    const multipleResetSelectRowRes = {
      currentItem: { title: 'Address', dataIndex: 'address', key: 'address', width: 200 },
      newValue: [{ title: 'Address', dataIndex: 'address', key: 'address', width: 200 }],
      oldValue: [
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: '姓名', dataIndex: 'name', key: 'name', width: 100, align: 'center' },
      ],
    };

    expect(getHeaderCell(multipleResetSelectRowProps)).toEqual(multipleResetSelectRowRes);
  });

  it(' Connection getSelectColumnsInfo ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { mockEditTableListener, editTableListener } = mockListener(cmp);
    const getKeyMaps = mockEditTableListener.mockFunction('getKeyMaps');
    getKeyMaps.returned(dataKeyMap);

    expect(cmp.editTableListener.dataKeyMap).toEqual(dataKeyMap);

    const selectInfo = [{ selectColumn: 1, selectRow: 0 }, { selectColumn: 0, selectRow: 0 }];
    const result = [
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: '姓名', dataIndex: 'name', key: 'name', width: 100, align: 'center' },
    ];

    const { getSelectColumnsInfo } = editTableListener;
    expect(getSelectColumnsInfo(selectInfo, columns)).toEqual(result);
    const selectInfo2 = [
      { selectColumn: 2, selectRow: 0 },
      { selectColumn: 1, selectRow: 0 },
      { selectColumn: 0, selectRow: 0 },
    ];
    const result2 = [
      { title: 'Address', dataIndex: 'address', key: 'address', width: 200 },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: '姓名', dataIndex: 'name', key: 'name', width: 100, align: 'center' },
    ];
    expect(getSelectColumnsInfo(selectInfo2, columns)).toEqual(result2);
    expect(getSelectColumnsInfo([], columns)).toEqual([]);
  });

  it(' Connection changeData ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { mockEditTableListener, editTableListener } = mockListener(cmp);
    const getKeyMaps = mockEditTableListener.mockFunction('getKeyMaps');
    getKeyMaps.returned(dataKeyMap);

    expect(cmp.editTableListener.dataKeyMap).toEqual(dataKeyMap);

    const selectRow = 1,
      keyName = 'age',
      value = 128;
    const result = [
      { name: '', age: 128, key: '1', isIn: true },
      { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
      { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
      { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
      { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
      { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
    ];

    const { changeData } = editTableListener;
    expect(changeData(data, selectRow, keyName, value)).toEqual(result);

    const selectRow1 = 3,
      keyName1 = 'address',
      value1 = 'address';
    const result1 = [
      { name: '', age: 28, key: '1', isIn: true },
      { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
      { name: 'Uzi', age: 36, address: 'address', key: '3', isIn: false },
      { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
      { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
      { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
    ];

    expect(changeData(data, selectRow1, keyName1, value1)).toEqual(result1);
  });

  it(' Connection changeColumns ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { mockEditTableListener, editTableListener } = mockListener(cmp);
    const getKeyMaps = mockEditTableListener.mockFunction('getKeyMaps');
    getKeyMaps.returned(dataKeyMap);

    expect(cmp.editTableListener.dataKeyMap).toEqual(dataKeyMap);

    const props = {
      columns,
      editCell: { selectColumn: 0, selectRow: 0 },
      value: '改变后的数据',
    };
    const result = [
      {
        title: '改变后的数据',
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

    const { changeColumns } = editTableListener;
    expect(changeColumns(props)).toEqual(result);

    const props1 = {
      columns,
      editCell: { selectColumn: 2, selectRow: 0 },
      value: '改变后的数据',
    };
    const result1 = [
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
        title: '改变后的数据',
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

    expect(changeColumns(props1)).toEqual(result1);
  });

  it(' Connection isMultiple ', () => {
    expect(publicEditTableListener.isMultiple()).toBeFalsy();
    publicEditTableListener.emit('enterMultipleSelect');
    expect(publicEditTableListener.isMultiple()).toBeTruthy();
    publicEditTableListener.emit('quitMultipleSelect');
    expect(publicEditTableListener.isMultiple()).toBeFalsy();
  });

  it(' Connection isCanMoveCells ', () => {
    expect(publicEditTableListener.isCanMoveCells()).toBeFalsy();
    publicEditTableListener.emit('enterMoveCells');
    expect(publicEditTableListener.isCanMoveCells()).toBeTruthy();
    publicEditTableListener.emit('quitMoveCells');
    expect(publicEditTableListener.isCanMoveCells()).toBeFalsy();
  });

  it(' Connection isShiftDown ', () => {
    expect(publicEditTableListener.isShiftDown()).toBeFalsy();
    publicEditTableListener.emit('shiftDown');
    expect(publicEditTableListener.isShiftDown()).toBeTruthy();
    publicEditTableListener.emit('shiftUp');
    expect(publicEditTableListener.isShiftDown()).toBeFalsy();
  });

  it(' Connection getMoveTrack ', () => {
    expect(publicEditTableListener.getMoveTrack()).toEqual([]);
    publicEditTableListener.emit('enterMoveTrack', selectCell[0]);
    expect(publicEditTableListener.getMoveTrack()).toEqual(selectCell);
    const selectSell1 = [{ selectColumn: 1, selectRow: 1 }];
    publicEditTableListener.emit('enterMoveTrack', selectSell1[0]);
    expect(publicEditTableListener.getMoveTrack()).toEqual([
      { selectColumn: 0, selectRow: 0 },
      { selectColumn: 1, selectRow: 1 },
    ]);
    publicEditTableListener.emit('quiteMoveTrack');
    expect(publicEditTableListener.getMoveTrack()).toEqual([]);
  });

  it(' Connection setUpdateDataKeyMap & getSelectColumnMark & getSelectDataMark', () => {
    const cmp = getCmp(mount(<EditTable />));
    const { mockEditTableListener, editTableListener } = mockListener(cmp);
    expect(editTableListener.dataKeyMap).toEqual({ columnsMap: {}, dataMap: {} });
    expect(editTableListener.getSelectColumnMark('a')).toEqual(undefined);
    expect(editTableListener.getSelectDataMark(2)).toEqual(undefined);
    const newDataKeyMap = {
      columnsMap: {
        a: 223,
        b: 224,
        c: 225,
      },
      dataMap: {
        0: { dataItem: { a: '', b: 28, c: '1', isIn: true }, keyValue: 'data-0-1' },
      },
    };

    const getKeyMaps = mockEditTableListener.mockFunction('getKeyMaps');
    getKeyMaps.returned(newDataKeyMap);
    editTableListener.setUpdateDataKeyMap(newDataKeyMap);

    expect(editTableListener.dataKeyMap).toEqual(newDataKeyMap);
    expect(editTableListener.getSelectColumnMark('a')).toEqual(223);
    expect(editTableListener.getSelectColumnMark()).toEqual(undefined);
    expect(editTableListener.getSelectDataMark(0)).toEqual({
      dataItem: { a: '', b: 28, c: '1', isIn: true },
      keyValue: 'data-0-1',
    });
    expect(editTableListener.getSelectDataMark(2)).toEqual(undefined);
    expect(editTableListener.getSelectDataMark()).toEqual(undefined);
  });

  it(' Connection getKeyMaps ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { editTableListener } = mockListener(cmp);
    expect(editTableListener.dataKeyMap).toEqual(dataKeyMap);
    const props = {
      columns,
      data: [
        { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
        { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
      ],
    };
    const keyMap = editTableListener.getKeyMaps(props);
    const newDataKeyMap = {
      columnsMap: dataKeyMap.columnsMap,
      dataMap: {
        0: {
          dataItem: { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
          keyValue: 'data-0-5',
        },
        1: {
          dataItem: { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
          keyValue: 'data-1-6',
        },
      },
    };
    expect(keyMap).toEqual(newDataKeyMap);
    const keyMap1 = editTableListener.getKeyMaps();
    expect(keyMap1).toEqual({ dataMap: {}, columnsMap: {} });
  });

  it(' Connection onKeyDown shiftKey ', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { editTableListener } = mockListener(cmp);
    expect(editTableListener.isKeyBoardDown).toBeFalsy();
    const event = {
      key: 'Shift',
      shiftKey: true,
    };
    editTableListener.onKeyDown(event);
    expect(editTableListener.isKeyBoardDown).toBeTruthy();
    expect(editTableListener.isShift).toBeTruthy();
    expect(editTableListener.multipleSelect).toBeTruthy();
    const upEvent = {
      key: 'Shift',
      shiftKey: false,
    };
    editTableListener.onKeyUp(upEvent);
    expect(editTableListener.isKeyBoardDown).toBeFalsy();
    expect(editTableListener.isShift).toBeFalsy();
    expect(editTableListener.multipleSelect).toBeFalsy();
  });

  function ConnectionOnKeyDown(props: Object) {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { mockEditTableListener, editTableListener } = mockListener(cmp);
    const { key, expectResult, defaultCell, enterMoveTrack, canMoveCells = false } = props;
    expect(editTableListener.isKeyBoardDown).toBeFalsy();
    const isCanMoveCells = mockEditTableListener.mockFunction('isCanMoveCells');
    isCanMoveCells.returned(canMoveCells);

    enterMoveTrack && editTableListener.emit('enterMoveTrack', enterMoveTrack);
    editTableListener.emit('updateSelectCell', defaultCell);
    expect(editTableListener.selectCell).toEqual(defaultCell);
    const event = {
      key,
    };
    editTableListener.onKeyDown(event);
    editTableListener.onKeyUp(event);
    expect(editTableListener.selectCell).toEqual(expectResult);
  }

  const onKeyDownMockData = [
    {
      key: 'ArrowLeft',
      expectResult: [{ selectColumn: 1, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      canMoveCells: true,
    },
    {
      key: 'ArrowUp',
      expectResult: [{ selectColumn: 2, selectRow: 0 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      canMoveCells: true,
    },
    {
      key: 'ArrowRight',
      expectResult: [{ selectColumn: 3, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      canMoveCells: true,
    },
    {
      key: 'Tab',
      expectResult: [{ selectColumn: 3, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      canMoveCells: true,
    },
    {
      key: 'ArrowDown',
      expectResult: [{ selectColumn: 2, selectRow: 2 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      canMoveCells: true,
    },
    {
      key: 'Enter',
      expectResult: [{ selectColumn: 1, selectRow: 2 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      enterMoveTrack: { selectColumn: 1, selectRow: 1 },
      canMoveCells: true,
    },
    {
      key: 'ArrowLeft',
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      key: 'ArrowUp',
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      key: 'ArrowRight',
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      key: 'Tab',
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      key: 'ArrowDown',
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      key: 'Enter',
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      enterMoveTrack: { selectColumn: 1, selectRow: 1 },
    },
  ];

  onKeyDownMockData.forEach(item => {
    it(`Connection onKeyDown  ${item.key} ${item.canMoveCells} `, () => {
      ConnectionOnKeyDown(item);
    });
  });

  const getMovedCellsPropsMap = [
    {
      item: { directions: 'left', key: 'ArrowLeft', data, columns },
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      expectResult: [{ selectColumn: 1, selectRow: 1 }],
    },
    {
      item: { directions: 'top', key: 'ArrowUp', data, columns },

      defaultCell: [{ selectColumn: 2, selectRow: 1 }],

      expectResult: [{ selectColumn: 2, selectRow: 0 }],
    },
    {
      item: { directions: 'right', key: 'ArrowRight', data, columns },

      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      expectResult: [{ selectColumn: 3, selectRow: 1 }],
    },
    {
      item: { directions: 'bottom', key: 'ArrowDown', data, columns },

      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      expectResult: [{ selectColumn: 2, selectRow: 2 }],
    },
    {
      item: { directions: 'backToBottom', key: 'Enter', data, columns },
      defaultCell: [{ selectColumn: 2, selectRow: 1 }],
      expectResult: [{ selectColumn: 2, selectRow: 2 }],
    },
    {
      item: { directions: 'left', key: 'ArrowLeft', data, columns },
      defaultCell: undefined,
      expectResult: [{ selectColumn: undefined, selectRow: undefined }],
    },
  ];

  function getMoveCellsTest(props) {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { editTableListener, mockEditTableListener } = mockListener(cmp);
    const { defaultCell, item, expectResult } = props;
    mockEditTableListener.mockFunction('isCanMoveCells').returned(true);
    mockEditTableListener
      .mockFunction('getMoveTrack')
      .returned([{ selectColumn: 2, selectRow: 1 }]);

    editTableListener.emit('updateSelectCell', defaultCell);
    expect(editTableListener.selectCell).toEqual(defaultCell);
    const { selectColumn, selectRow, oldSelectInfo } = editTableListener.getMovedCells(item) || {};
    expect([{ selectColumn, selectRow }]).toEqual(expectResult);
    expect(oldSelectInfo).toEqual(defaultCell);
  }

  getMovedCellsPropsMap.forEach(item => {
    it(`Connection getMovedCells  ${item.item.directions} `, () => {
      getMoveCellsTest(item);
    });
  });

  //updateSelectCell
  it(' Connection updateSelectCell & getSelectCell()', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { editTableListener } = mockListener(cmp);
    expect(editTableListener.getSelectCell()).toEqual([]);
    editTableListener.updateSelectCell([{ selectColumn: 2, selectRow: 1 }]);
    expect(editTableListener.getSelectCell()).toEqual([{ selectColumn: 2, selectRow: 1 }]);
    editTableListener.updateSelectCell([{ selectColumn: 1, selectRow: 1 }]);
    expect(editTableListener.getSelectCell()).toEqual([{ selectColumn: 1, selectRow: 1 }]);
    editTableListener.updateSelectCell([{ selectColumn: 1, selectRow: 5 }]);
    expect(editTableListener.getSelectCell()).toEqual([{ selectColumn: 1, selectRow: 5 }]);
    editTableListener.updateSelectCell();
    expect(editTableListener.getSelectCell()).toEqual(undefined);
    editTableListener.updateSelectCell(undefined);
    expect(editTableListener.getSelectCell()).toEqual(undefined);
  });

  it(' Connection updateEditCell & getEditCell', () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { editTableListener } = mockListener(cmp);
    expect(editTableListener.getEditCell()).toEqual({});
    editTableListener.updateEditCell({ selectColumn: 2, selectRow: 1 });
    expect(editTableListener.getEditCell()).toEqual({ selectColumn: 2, selectRow: 1 });
    editTableListener.updateEditCell({ selectColumn: 1, selectRow: 1 });
    expect(editTableListener.getEditCell()).toEqual({ selectColumn: 1, selectRow: 1 });
    editTableListener.updateEditCell({ selectColumn: 1, selectRow: 5 });
    expect(editTableListener.getEditCell()).toEqual({ selectColumn: 1, selectRow: 5 });
    editTableListener.updateEditCell();
    expect(editTableListener.getEditCell()).toEqual(undefined);
    editTableListener.updateEditCell(undefined);
    expect(editTableListener.getEditCell()).toEqual(undefined);
  });

  const setInputChangedValuePropsMap = [
    {
      info: {
        value: 45,
        editCell: { selectColumn: 1, selectRow: 2 },
        data,
        columns,
        showHeader: true,
      },
      expectResult: [
        { name: '', age: 28, key: '1', isIn: true },
        { name: 'Rose', age: 45, address: 'some where', key: '2', isIn: true },
        { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
        { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
        { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
        { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
      ],
    },
    {
      info: {
        value: 'wsd',
        editCell: { selectColumn: 0, selectRow: 1 },
        data,
        columns,
        showHeader: true,
      },
      expectResult: [
        { name: 'wsd', age: 28, key: '1', isIn: true },
        { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
        { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
        { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
        { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
        { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
      ],
    },
    {
      info: {
        value: 'abc',
        editCell: {},
        data,
        columns,
        showHeader: true,
      },
      expectResult: data,
    },
  ];

  setInputChangedValuePropsMap.forEach(item => {
    it(`Connection setInputChangedValue  ${item.info.value} `, () => {
      const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
      const { editTableListener } = mockListener(cmp);
      const { info, expectResult } = item;
      const { data: newRowData } = editTableListener.setInputChangedValue(info);
      expect(newRowData).toEqual(expectResult);
    });
  });

  const changeDataPropsMap = [
    {
      selectRow: 1,
      data,
      keyName: 'name',
      value: 'newName',
      expectResult: [
        { name: 'newName', age: 28, key: '1', isIn: true },
        { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
        { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
        { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
        { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
        { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
      ],
    },
    {
      selectRow: 2,
      data,
      keyName: 'age',
      value: 122,
      expectResult: [
        { name: '', age: 28, key: '1', isIn: true },
        { name: 'Rose', age: 122, address: 'some where', key: '2', isIn: true },
        { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
        { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
        { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
        { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
      ],
    },
    {
      selectRow: undefined,
      data,
      keyName: 'name',
      value: 'newName',
      expectResult: data,
    },
  ];

  changeDataPropsMap.forEach(item => {
    it(`Connection changeData  ${item.keyName} `, () => {
      const { selectRow, data, keyName, value, expectResult } = item;
      const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
      const { editTableListener } = mockListener(cmp);
      const newRowData = editTableListener.changeData(data, selectRow, keyName, value);
      expect(newRowData).toEqual(expectResult);
    });
  });

  const onCellClickPropsMap = [
    {
      info: {
        e: {},
        selectColumn: 0,
        selectRow: 1,
        isLugiaHead: false,
        isAllowSelect: true,
      },
      isSelected: false,
      isMultiple: false,
      selectCell: [],
      expectResult: [{ selectColumn: 0, selectRow: 1 }],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowSelect: true,
      },
      isSelected: false,
      isMultiple: false,
      selectCell: [],
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowSelect: true,
      },
      isSelected: false,
      isMultiple: false,
      selectCell: [{ selectColumn: 2, selectRow: 2 }],
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowSelect: true,
      },
      isSelected: true,
      isMultiple: false,
      selectCell: [{ selectColumn: 2, selectRow: 1 }],
      expectResult: [],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowSelect: true,
      },
      isSelected: false,
      isMultiple: true,
      selectCell: [{ selectColumn: 2, selectRow: 2 }],
      expectResult: [{ selectColumn: 2, selectRow: 2 }, { selectColumn: 2, selectRow: 1 }],
    },
  ];

  onCellClickPropsMap.forEach(item => {
    it(`Connection onCellClick  selectColumn:${item.info.selectColumn} selectRow: ${item.info.selectRow} `, async () => {
      const { info, isSelected, isMultiple, selectCell, expectResult } = item;
      const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
      const { editTableListener, mockEditTableListener, order } = mockListener(cmp);
      mockEditTableListener.mockFunction('doStopPropagation').returned(true);
      mockEditTableListener.mockFunction('getSelectCell').returned(selectCell);
      mockEditTableListener.mockFunction('isSelected').returned(isSelected);
      mockEditTableListener.mockFunction('isMultiple').returned(isMultiple);

      editTableListener.onCellClick(info);

      order.verify(param => {
        const { editTableListener } = param;
        editTableListener.doStopPropagation(info.e);
        editTableListener.getSelectCell();
        editTableListener.isSelected(
          { selectColumn: info.selectColumn, selectRow: info.selectRow },
          selectCell
        );
        editTableListener.isMultiple();
      });

      expect(editTableListener.getSelectCell()).toEqual(expectResult);
    });
  });

  const onCellDBClickPropsMap = [
    {
      info: {
        e: {},
        selectColumn: 0,
        selectRow: 1,
        isLugiaHead: false,
        isAllowEdit: true,
      },
      isSelected: false,
      isMultiple: false,
      selectCell: [],
      expectResult: [{ selectColumn: 0, selectRow: 1 }],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowEdit: true,
      },
      isSelected: false,
      isMultiple: false,
      selectCell: [],
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowEdit: true,
      },
      isSelected: false,
      isMultiple: false,
      selectCell: [{ selectColumn: 2, selectRow: 2 }],
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowEdit: true,
      },
      isSelected: true,
      isMultiple: false,
      selectCell: [{ selectColumn: 2, selectRow: 1 }],
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowEdit: true,
      },
      isSelected: false,
      isMultiple: true,
      selectCell: [{ selectColumn: 2, selectRow: 2 }],
      expectResult: [{ selectColumn: 2, selectRow: 1 }],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowEdit: false,
      },
      isSelected: false,
      isMultiple: false,
      selectCell: [],
      expectResult: [],
    },
    {
      info: {
        e: {},
        selectColumn: 2,
        selectRow: 1,
        isLugiaHead: false,
        isAllowEdit: false,
      },
      isSelected: false,
      isMultiple: true,
      selectCell: [{ selectColumn: 2, selectRow: 2 }],
      expectResult: [],
    },
  ];

  onCellDBClickPropsMap.forEach((item, index) => {
    it(`Connection onCellDBClick ${index} selectColumn:${item.info.selectColumn} selectRow: ${item.info.selectRow} `, async () => {
      const { info, expectResult } = item;
      const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
      const { editTableListener, mockEditTableListener, order } = mockListener(cmp);
      mockEditTableListener.mockFunction('doStopPropagation').returned(true);

      editTableListener.onCellDBClick(info);

      order.verify(param => {
        const { editTableListener } = param;
        editTableListener.doStopPropagation(info.e);
      });

      expect(editTableListener.getSelectCell()).toEqual(expectResult);
      const editCell = expectResult[0] || {};
      expect(editTableListener.getEditCell()).toEqual(editCell);
    });
  });

  it('Connection clearSelectInfo ', async () => {
    const cmp = getCmp(mount(<EditTable data={data} columns={columns} />));
    const { editTableListener } = mockListener(cmp);
    editTableListener.updateSelectCell([{ selectColumn: 2, selectRow: 1 }]);
    expect(editTableListener.getSelectCell()).toEqual([{ selectColumn: 2, selectRow: 1 }]);
    editTableListener.updateEditCell({ selectColumn: 2, selectRow: 1 });
    expect(editTableListener.getEditCell()).toEqual({ selectColumn: 2, selectRow: 1 });

    editTableListener.clearSelectInfo();
    expect(editTableListener.getSelectCell()).toEqual([]);
    expect(editTableListener.getEditCell()).toEqual({});
  });
});
