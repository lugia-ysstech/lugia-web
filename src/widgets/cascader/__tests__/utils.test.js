/**
 * create by szfeng
 */
import 'jest-styled-components';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  isHasValue,
  isHasDefaultValue,
  getValue,
  getLastLevelValue,
  getInitExpandedPath,
  letValueSplitToArray,
  getFilterValueData,
  getLastIndex,
  mapTreeDataToGetLeaf,
  mapTreeDataToGetDisplayValue,
  getInputValue,
} from '../utils';

Enzyme.configure({ adapter: new Adapter() });

const data = [
  {
    text: '一级菜单1',
    value: 'a1',
    disabled: false,
  },
  { text: '一级菜单2', value: 'a2', disabled: false },
  { text: '一级菜单3', value: 'a3', disabled: false },
  {
    text: '一级菜单4',
    value: 'a4',
    disabled: false,
    children: [
      {
        text: '次级菜单4-1',
        value: 'a4-1',
        children: [{ text: '三级菜单4-1-1', value: 'a4-1-1' }],
      },
    ],
  },
  { text: '一级菜单5', value: 'a5', disabled: true },
  {
    text: '一级菜单6',
    value: 'a6',
    disabled: false,
    children: [
      { text: '次级菜单6-1', value: 'a6-1' },
      {
        text: '次级菜单6-2',
        value: 'a6-2',
        children: [
          {
            text: '三级菜单6-2-1',
            value: 'a6-2-1',
            children: [
              { text: 'sub1', value: 'suba1', children: [{ text: 'sub2', value: 'suba2' }] },
            ],
          },
          { text: '三级菜单6-2-2', value: 'a6-2-2' },
          { text: '三级菜单6-2-3', value: 'a6-2-3' },
        ],
      },
    ],
  },
];

const treeData = [
  { key: 'a1', title: '一级菜单1', pid: undefined, path: undefined, isLeaf: true },
  { key: 'a2', title: '一级菜单2', pid: undefined, path: undefined, isLeaf: true },
  { key: 'a3', title: '一级菜单3', pid: undefined, path: undefined, isLeaf: true },
  { key: 'a4', title: '一级菜单4', pid: undefined, path: undefined },
  { key: 'a4-1', title: '次级菜单4-1', pid: 'a4', path: 'a4' },
  { key: 'a4-1-1', title: '三级菜单4-1-1', pid: 'a4-1', path: 'a4/a4-1', isLeaf: true },
  { key: 'a5', title: '一级菜单5', pid: undefined, path: undefined, isLeaf: true },
  { key: 'a6', title: '一级菜单6', pid: undefined, path: undefined },
  { key: 'a6-1', title: '次级菜单6-1', pid: 'a6', path: 'a6', isLeaf: true },
  { key: 'a6-2', title: '次级菜单6-2', pid: 'a6', path: 'a6' },
  { key: 'a6-2-1', title: '三级菜单6-2-1', pid: 'a6-2', path: 'a6/a6-2' },
  { key: 'suba1', title: 'sub1', pid: 'a6-2-1', path: 'a6/a6-2/a6-2-1' },
  { key: 'suba2', title: 'sub2', pid: 'suba1', path: 'a6/a6-2/a6-2-1/suba1', isLeaf: true },
  { key: 'a6-2-2', title: '三级菜单6-2-2', pid: 'a6-2', path: 'a6/a6-2', isLeaf: true },
  { key: 'a6-2-3', title: '三级菜单6-2-3', pid: 'a6-2', path: 'a6/a6-2', isLeaf: true },
];

describe('Cascader', () => {
  it('getInitStart ', () => {
    expect(isHasValue({})).toBeFalsy();
    expect(isHasValue({ value: null })).toBeTruthy();
    expect(isHasValue({ value: 0 })).toBeTruthy();
    expect(isHasValue({ value: '' })).toBeTruthy();
  });

  it('isHasDefaultValue ', () => {
    expect(isHasDefaultValue({})).toBeFalsy();
    expect(isHasDefaultValue({ defaultValue: null })).toBeTruthy();
    expect(isHasDefaultValue({ defaultValue: 0 })).toBeTruthy();
    expect(isHasDefaultValue({ defaultValue: '' })).toBeTruthy();
  });

  it('getValue ', () => {
    expect(getValue({}, null)).toEqual([]);
    expect(getValue({ value: [] }, null)).toEqual([]);
    expect(getValue({ value: [''] }, null)).toEqual(['']);
    expect(getValue({ value: null }, null)).toEqual([null]);
    expect(getValue({ value: undefined }, null)).toEqual([]);
    expect(getValue({ value: 0 }, null)).toEqual([0]);
    expect(getValue({ value: [123, 345] }, null)).toEqual([123, 345]);

    expect(getValue({ defaultValue: ['深院月斜人静'] }, null)).toEqual(['深院月斜人静']);
    expect(getValue({ defaultValue: [] }, null)).toEqual([]);
    expect(getValue({ defaultValue: [''] }, null)).toEqual(['']);
    expect(getValue({ defaultValue: null }, null)).toEqual([null]);
    expect(getValue({ defaultValue: undefined }, null)).toEqual([]);
    expect(getValue({ defaultValue: 0 }, null)).toEqual([0]);
    expect(getValue({ defaultValue: [123, 345] }, null)).toEqual([123, 345]);

    expect(getValue({ value: [], defaultValue: ['深院月斜人静'] }, null)).toEqual([]);
    expect(getValue({ value: [''], defaultValue: ['深院月斜人静'] }, null)).toEqual(['']);
    expect(getValue({ value: null, defaultValue: ['深院月斜人静'] }, null)).toEqual([null]);
    expect(getValue({ value: undefined, defaultValue: ['深院月斜人静'] }, null)).toEqual([]);
    expect(getValue({ value: 0, defaultValue: ['深院月斜人静'] }, null)).toEqual([0]);
    expect(getValue({ value: [123, 345], defaultValue: ['深院月斜人静'] }, null)).toEqual([
      123,
      345,
    ]);

    expect(getValue({}, { value: [''] })).toEqual(['']);
    expect(getValue({ value: [] }, { value: ['苦莫苦于多愿'] })).toEqual([]);
    expect(getValue({ value: [''] }, { value: ['苦莫苦于多愿'] })).toEqual(['']);
    expect(getValue({ value: null }, { value: ['苦莫苦于多愿'] })).toEqual([null]);
    expect(getValue({ value: undefined }, { value: ['苦莫苦于多愿'] })).toEqual([]);
    expect(getValue({ value: 0 }, { value: ['苦莫苦于多愿'] })).toEqual([0]);
    expect(getValue({ value: [123, 345] }, { value: ['苦莫苦于多愿'] })).toEqual([123, 345]);

    expect(getValue({ defaultValue: ['深院月斜人静'] }, { value: undefined })).toEqual(undefined);
    expect(getValue({ defaultValue: ['深院月斜人静'] }, { value: [] })).toEqual([]);
    expect(getValue({ defaultValue: ['深院月斜人静'] }, { value: [''] })).toEqual(['']);
    expect(getValue({ defaultValue: ['深院月斜人静'] }, { value: null })).toEqual(null);
    expect(getValue({ defaultValue: ['深院月斜人静'] }, { value: ['123'] })).toEqual(['123']);
    expect(getValue({ defaultValue: ['深院月斜人静'] }, { value: 0 })).toEqual(0);
    expect(getValue({ defaultValue: ['深院月斜人静'] }, { value: ['苦莫苦于多愿'] })).toEqual([
      '苦莫苦于多愿',
    ]);

    expect(
      getValue({ value: undefined, defaultValue: ['深院月斜人静'] }, { value: ['苦莫苦于多愿'] })
    ).toEqual([]);
    expect(
      getValue({ value: [], defaultValue: ['深院月斜人静'] }, { value: ['苦莫苦于多愿'] })
    ).toEqual([]);
    expect(
      getValue({ value: [''], defaultValue: ['深院月斜人静'] }, { value: ['苦莫苦于多愿'] })
    ).toEqual(['']);
    expect(
      getValue({ value: null, defaultValue: ['深院月斜人静'] }, { value: ['苦莫苦于多愿'] })
    ).toEqual([null]);
    expect(
      getValue({ value: ['123'], defaultValue: ['深院月斜人静'] }, { value: ['苦莫苦于多愿'] })
    ).toEqual(['123']);
    expect(
      getValue({ value: 0, defaultValue: ['深院月斜人静'] }, { value: ['苦莫苦于多愿'] })
    ).toEqual([0]);
    expect(
      getValue({ value: [1, 2, 3], defaultValue: ['深院月斜人静'] }, { value: ['苦莫苦于多愿'] })
    ).toEqual([1, 2, 3]);
  });

  it('getLastIndex ', () => {
    expect(getLastIndex([1, 2, 3])).toBe(2);
    expect(getLastIndex([1])).toBe(0);
  });

  it('getInitExpandedPath ', () => {
    expect(getInitExpandedPath({ value: 1 })).toEqual([1]);
    expect(getInitExpandedPath({ value: [] })).toEqual([]);
    expect(getInitExpandedPath({ value: ['深院月斜人静'] })).toEqual(['深院月斜人静']);
    expect(getInitExpandedPath({ value: '1' })).toEqual(['1']);
  });

  // 如果是数字的话，容错性考虑
  it('letValueSplitToArray ', () => {
    expect(letValueSplitToArray('1/2', '/')).toEqual(['1', '2']);
    expect(letValueSplitToArray(['1/2'], '/')).toEqual(['1', '2']);
  });

  it('getLastLevelValue ', () => {
    expect(getLastLevelValue([])).toEqual(undefined);
    expect(getLastLevelValue([''])).toEqual('');
    expect(getLastLevelValue(['1', '2'])).toEqual('2');
    expect(getLastLevelValue(['1', '2', '3'])).toEqual('3');
  });

  it('getFilterValueData ', () => {
    expect(getFilterValueData(data, [], '/')).toEqual([]);
    expect(getFilterValueData(data, ['a6/a6-2/a6-2-1/suba1/suba2'], '/')).toEqual([
      'a6',
      'a6-2',
      'a6-2-1',
      'suba1',
      'suba2',
    ]);
    expect(getFilterValueData(data, ['a6/a6-2/a6-2-1/s/suba2'], '/')).toEqual([
      'a6',
      'a6-2',
      'a6-2-1',
    ]);
    expect(getFilterValueData(data, ['0/a6-2/a6-2-1/s/suba2'], '/')).toEqual([]);
    expect(getFilterValueData(data, ['a6/c/a6-2-1/s/suba2'], '/')).toEqual(['a6']);
  });

  it('mapTreeDataToGetLeaf ', () => {
    expect(mapTreeDataToGetLeaf([], data, treeData, '/')).toBe(false);
    expect(mapTreeDataToGetLeaf(treeData, ['a6', 'a6-2', 'a6-2-1', 'suba1', 'suba2'])).toBe(true);
    expect(mapTreeDataToGetLeaf(treeData, ['a1'])).toBe(true);
    expect(mapTreeDataToGetLeaf(treeData, ['a6'])).toBe(false);
    expect(mapTreeDataToGetLeaf(treeData, ['a6', 'a6-2'])).toBe(false);
  });

  it('mapTreeDataToGetDisplayValue ', () => {
    expect(mapTreeDataToGetDisplayValue(treeData, [])).toEqual([]);
    expect(
      mapTreeDataToGetDisplayValue(treeData, ['a6', 'a6-2', 'a6-2-1', 'suba1', 'suba2'])
    ).toEqual(['一级菜单6', '次级菜单6-2', '三级菜单6-2-1', 'sub1', 'sub2']);

    expect(mapTreeDataToGetDisplayValue(treeData, ['a6', 'a6-2'])).toEqual([
      '一级菜单6',
      '次级菜单6-2',
    ]);
    expect(mapTreeDataToGetDisplayValue(treeData, ['a6', 'a6-2', 'a6-2-1', 'suba1'])).toEqual([
      '一级菜单6',
      '次级菜单6-2',
      '三级菜单6-2-1',
      'sub1',
    ]);
  });

  it('getInputValue ', () => {
    expect(mapTreeDataToGetDisplayValue(treeData, [])).toEqual([]);
  });
});
