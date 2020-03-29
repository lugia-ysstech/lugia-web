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
import EditTable, { restDataWithMark, setFirstRowAsHead, restColumnsIntoData } from '../editTable';
import Table from '../table';
import renderer from 'react-test-renderer';

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
  },
];

const columnsIntoData = [{ name: '姓名', age: 'Age', address: 'Address', isIn: 'isIn' }];

const data = [
  { name: '', age: 28, key: '1', isIn: true },
  { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true },
  { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true },
  { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true },
  { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true },
];

const Markdata = [
  { name: '', age: 28, key: '1', isIn: true, lugiaMark: 0 },
  { name: 'Rose', age: 36, address: 'some where', key: '2', isIn: true, lugiaMark: 1 },
  { name: 'Uzi', age: 36, address: 'some where', key: '3', isIn: false, lugiaMark: 2 },
  { name: 'ClearLove', age: 36, address: 'some where', key: '4', isIn: true, lugiaMark: 3 },
  { name: 'Rookie', age: 36, address: 'some where', key: '5', isIn: true, lugiaMark: 4 },
  { name: 'TheShy', age: 36, address: 'some where', key: '6', isIn: true, lugiaMark: 5 },
];
const restColumnsWithMark = (columns: Array<Object>) => {
  if (!columns) return;
  const newCols = [];
  columns.forEach((item, index) => {
    const { lugiaMark: oldMark, render } = item;
    const newItem = { ...item };
    const lugiaMark = oldMark || index;
    newItem.lugiaMark = lugiaMark;
    newItem.customRender = render;
    newItem.render = () => {
      return true;
    };
    newCols.push(newItem);
  });
  return newCols;
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

  it(' EditTable data & columns ', () => {
    const cmp = mount(<EditTable data={data} columns={columns} />);
    expect(getCmp(cmp).state.data).toEqual(
      setFirstRowAsHead(restDataWithMark(restColumnsIntoData(columns).concat(data)))
    );
    expect(JSON.stringify(getCmp(cmp).state.columns)).toEqual(
      JSON.stringify(restColumnsWithMark(columns))
    );
  });

  it(' EditTable restColumnsIntoData ', () => {
    expect(restColumnsIntoData(columns)).toEqual(columnsIntoData);
  });

  it(' EditTable restDataWithMark ', () => {
    expect(restDataWithMark(data)).toEqual(Markdata);
  });
});
