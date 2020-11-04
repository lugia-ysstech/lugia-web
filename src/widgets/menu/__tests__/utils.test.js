/**
 * create by szfeng
 */
import 'jest-styled-components';
import {
  getCascaderKeys,
  getChildData,
  getExpandDataOrSelectData,
  getExpandedData,
  getExpandedPath,
  getExpandedPathFromPropsOrState,
  getInitAllChildData,
  getPopupVisible,
  getSelectedKeys,
  getTargetOrDefaultTarget,
  getTreeData,
  isRoot,
  letExpandpathOrSelectedKeysToArray,
} from '../utils';

describe('Menu utils', () => {
  it('isRoot ', () => {
    expect(isRoot(0)).toBeTruthy();
    expect(isRoot(1)).toBeFalsy();
    expect(isRoot('0')).toBeFalsy();
    expect(isRoot(undefined)).toBeFalsy();
    expect(isRoot([])).toBeFalsy();
    expect(isRoot({})).toBeFalsy();
  });

  it('getSelectedKeys ', () => {
    expect(getSelectedKeys({ selectedKeys: [1, 2, 3] }, {})).toEqual([1, 2, 3]);
    expect(getSelectedKeys({ selectedKeys: [1, 2, 3] }, { selectedKeys: [4, 5, 6] })).toEqual([
      1,
      2,
      3,
    ]);
    expect(getSelectedKeys({ selectedKeys: [] }, { selectedKeys: [4, 5, 6] })).toEqual([]);
    expect(getSelectedKeys({}, { selectedKeys: [4, 5, 6] })).toEqual([4, 5, 6]);
  });

  it('getPopupVisible ', () => {
    expect(getPopupVisible({ popupVisible: true }, {})).toBeTruthy();
    expect(getPopupVisible({ popupVisible: false }, {})).toBeFalsy();
    expect(getPopupVisible({ popupVisible: true }, { childData: [1, 2, 3] })).toBeTruthy();
    expect(getPopupVisible({ popupVisible: false }, { childData: [1, 2, 3] })).toBeFalsy();
    expect(getPopupVisible({}, { childData: [1, 2, 3] })).toBeTruthy();
  });

  it('getTargetOrDefaultTarget ', () => {
    const a = 1;
    const b = 1;
    const trueCondition = a === b;
    const falseCondition = a !== b;
    expect(getTargetOrDefaultTarget(trueCondition, 5, 6)).toBe(5);
    expect(getTargetOrDefaultTarget(falseCondition, 5, 6)).toBe(6);
  });

  it('getExpandedPath ', () => {
    expect(getExpandedPath({ expandedPath: [1, 2] }, {})).toEqual([1, 2]);
    expect(getExpandedPath({ expandedPath: [1, 2] }, { expandedPath: [5, 6] })).toEqual([1, 2]);
    expect(getExpandedPath({}, { expandedPath: [5, 6] })).toEqual([5, 6]);
  });

  const data = [
    {
      text: '1',
      value: '1',
      disabled: false,
      children: [
        {
          text: '1-1',
          value: '1-1',
          disabled: false,
          children: [
            {
              text: '1-1-1',
              value: '1-1-1',
              disabled: false,
              children: [
                {
                  text: '1-1-1-1',
                  value: '1-1-1-1',
                  disabled: false,
                  children: [{ text: '1-1-1-1-1', value: '1-1-1-1-1', disabled: false }],
                },
              ],
            },
          ],
        },
      ],
    },
    { text: '2', value: '2', disabled: false },
    { text: '3', value: '3', disabled: false },
  ];

  const treeData = [
    {
      describe: undefined,
      disabled: false,
      icon: undefined,
      isLeaf: false,
      pid: undefined,
      text: '1',
      value: '1',
    },
    {
      describe: undefined,
      disabled: false,
      icon: undefined,
      isLeaf: false,
      path: '1',
      pid: '1',
      text: '1-1',
      value: '1-1',
    },
    {
      describe: undefined,
      disabled: false,
      icon: undefined,
      isLeaf: false,
      path: '1|1-1',
      pid: '1-1',
      text: '1-1-1',
      value: '1-1-1',
    },
    {
      describe: undefined,
      disabled: false,
      icon: undefined,
      isLeaf: false,
      path: '1|1-1|1-1-1',
      pid: '1-1-1',
      text: '1-1-1-1',
      value: '1-1-1-1',
    },
    {
      describe: undefined,
      disabled: false,
      icon: undefined,
      isLeaf: true,
      path: '1|1-1|1-1-1|1-1-1-1',
      pid: '1-1-1-1',
      text: '1-1-1-1-1',
      value: '1-1-1-1-1',
    },
    {
      describe: undefined,
      disabled: false,
      icon: undefined,
      isLeaf: true,
      pid: undefined,
      text: '2',
      value: '2',
    },
    {
      describe: undefined,
      disabled: false,
      icon: undefined,
      isLeaf: true,
      pid: undefined,
      text: '3',
      value: '3',
    },
  ];

  it('getCascaderKeys ', () => {
    expect(getCascaderKeys([], '/')).toEqual([]);
    expect(getCascaderKeys(['苦'], '/')).toEqual(['苦']);
    expect(getCascaderKeys(['苦/乐'], '/')).toEqual(['苦', '乐']);
    expect(getCascaderKeys(['苦/乐/莫/多/愿'], '/')).toEqual(['苦', '乐', '莫', '多', '愿']);
    expect(getCascaderKeys(['苦'], '|')).toEqual(['苦']);
    expect(getCascaderKeys(['苦|乐'], '|')).toEqual(['苦', '乐']);
    expect(getCascaderKeys(['苦|乐|莫|多|愿'], '|')).toEqual(['苦', '乐', '莫', '多', '愿']);
  });

  it('letExpandpathOrSelectedKeysToArray ', () => {
    expect(letExpandpathOrSelectedKeysToArray({}, null)).toEqual([]);
    expect(letExpandpathOrSelectedKeysToArray({}, undefined)).toEqual([]);
    expect(letExpandpathOrSelectedKeysToArray({}, '')).toEqual([]);
    expect(letExpandpathOrSelectedKeysToArray({}, [])).toEqual([]);
    expect(letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1'])).toEqual(['1']);
    expect(letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1'])).toEqual([
      '1',
      '1-1',
    ]);
    expect(letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1/1-1-1'])).toEqual([
      '1',
      '1-1',
      '1-1-1',
    ]);
    expect(
      letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1/1-1-1/1-1-1-1'])
    ).toEqual(['1', '1-1', '1-1-1', '1-1-1-1']);
    expect(
      letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/2-1/1-1-1/1-1-1-1'])
    ).toEqual(['1']);
    expect(
      letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1/1-2-1/1-1-1-1'])
    ).toEqual(['1', '1-1']);
    expect(
      letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1/1-1-1/1-2-1-1'])
    ).toEqual(['1', '1-1', '1-1-1']);
  });

  it('getExpandDataOrSelectData ', () => {
    expect(getExpandDataOrSelectData({}, null)).toEqual([]);
    expect(getExpandDataOrSelectData({}, undefined)).toEqual([]);
    expect(getExpandDataOrSelectData({}, '')).toEqual([]);
    expect(getExpandDataOrSelectData({}, [])).toEqual([]);
    expect(getExpandDataOrSelectData({}, '')).toEqual([]);
    expect(letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1'])).toEqual(['1']);
    expect(letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1'])).toEqual([
      '1',
      '1-1',
    ]);
    expect(letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1/1-1-1'])).toEqual([
      '1',
      '1-1',
      '1-1-1',
    ]);
    expect(
      letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1/1-1-1/1-1-1-1'])
    ).toEqual(['1', '1-1', '1-1-1', '1-1-1-1']);
    expect(
      letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/2-1/1-1-1/1-1-1-1'])
    ).toEqual(['1']);
    expect(
      letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1/1-2-1/1-1-1-1'])
    ).toEqual(['1', '1-1']);
    expect(
      letExpandpathOrSelectedKeysToArray({ data, separator: '/' }, ['1/1-1/1-1-1/1-2-1-1'])
    ).toEqual(['1', '1-1', '1-1-1']);
  });

  it('getExpandedPathFromPropsOrState ', () => {
    expect(
      getExpandedPathFromPropsOrState({ expandedPath: ['1'] }, { expandedPath: ['2'] })
    ).toEqual(['1']);
    expect(getExpandedPathFromPropsOrState({ expandedPath: [] }, { expandedPath: ['2'] })).toEqual(
      []
    );
    expect(getExpandedPathFromPropsOrState({}, { expandedPath: ['2'] })).toEqual(['2']);
  });

  it('getExpandedData ', () => {
    expect(getExpandedData({ expandedData: ['1', '2'], level: 1 }, {})).toEqual(['1', '2']);
    expect(getExpandedData({ expandedData: ['1', '2'], level: 0 }, {})).toEqual([]);
    expect(getExpandedData({ expandedData: ['1', '2'], level: 0, expandedPath: [] }, {})).toEqual(
      []
    );
    expect(
      getExpandedData(
        { data, expandedData: ['1', '2'], level: 0, expandedPath: ['1/1-1/1-1-1'], separator: '/' },
        {}
      )
    ).toEqual(['1', '1-1', '1-1-1']);
    expect(
      getExpandedData(
        { data, expandedData: ['1', '2'], level: 0, expandedPath: ['1/1-1/1-1-1'], separator: '/' },
        { expandedPath: ['1/1-1'] }
      )
    ).toEqual(['1', '1-1', '1-1-1']);
    expect(
      getExpandedData(
        { data, expandedData: ['1', '2'], level: 0, separator: '/' },
        { expandedPath: ['1/1-1'] }
      )
    ).toEqual(['1', '1-1']);
  });

  it('getTreeData ', () => {
    expect(getTreeData({})).toEqual([]);
    expect(getTreeData({ data })).toEqual(treeData);
    expect(getTreeData({ data }, '+')).toEqual([
      {
        describe: undefined,
        disabled: false,
        icon: undefined,
        isLeaf: false,
        pid: undefined,
        text: '1',
        value: '1',
      },
      {
        describe: undefined,
        disabled: false,
        icon: undefined,
        isLeaf: false,
        path: '1',
        pid: '1',
        text: '1-1',
        value: '1-1',
      },
      {
        describe: undefined,
        disabled: false,
        icon: undefined,
        isLeaf: false,
        path: '1+1-1',
        pid: '1-1',
        text: '1-1-1',
        value: '1-1-1',
      },
      {
        describe: undefined,
        disabled: false,
        icon: undefined,
        isLeaf: false,
        path: '1+1-1+1-1-1',
        pid: '1-1-1',
        text: '1-1-1-1',
        value: '1-1-1-1',
      },
      {
        describe: undefined,
        disabled: false,
        icon: undefined,
        isLeaf: true,
        path: '1+1-1+1-1-1+1-1-1-1',
        pid: '1-1-1-1',
        text: '1-1-1-1-1',
        value: '1-1-1-1-1',
      },
      {
        describe: undefined,
        disabled: false,
        icon: undefined,
        isLeaf: true,
        pid: undefined,
        text: '2',
        value: '2',
      },
      {
        describe: undefined,
        disabled: false,
        icon: undefined,
        isLeaf: true,
        pid: undefined,
        text: '3',
        value: '3',
      },
    ]);
  });

  const allChildData = {
    0: [
      {
        children: [
          {
            children: [
              {
                children: [{ disabled: false, text: '1-1-1-1-1', value: '1-1-1-1-1' }],
                disabled: false,
                text: '1-1-1-1',
                value: '1-1-1-1',
              },
            ],
            disabled: false,
            text: '1-1-1',
            value: '1-1-1',
          },
        ],
        disabled: false,
        text: '1-1',
        value: '1-1',
      },
    ],
    1: [
      {
        children: [
          {
            children: [{ disabled: false, text: '1-1-1-1-1', value: '1-1-1-1-1' }],
            disabled: false,
            text: '1-1-1-1',
            value: '1-1-1-1',
          },
        ],
        disabled: false,
        text: '1-1-1',
        value: '1-1-1',
      },
    ],
    2: [
      {
        children: [{ disabled: false, text: '1-1-1-1-1', value: '1-1-1-1-1' }],
        disabled: false,
        text: '1-1-1-1',
        value: '1-1-1-1',
      },
    ],
  };

  it('getInitAllChildData more level tree', () => {
    const data = [
      {
        text: '1',
        value: '1',
        disabled: false,
        children: [
          {
            text: '1-1',
            value: '1-1',
            disabled: false,
            children: [
              {
                text: '1-1-1',
                value: '1-1-1',
                disabled: false,
                children: [
                  {
                    text: '1-1-1-1',
                    value: '1-1-1-1',
                    disabled: false,
                    children: [{ text: '1-1-1-1-1', value: '1-1-1-1-1', disabled: false }],
                  },
                  {
                    text: '2-1-1-1',
                    value: '2-1-1-1',
                    disabled: false,
                    children: [
                      { text: '2-1-1-1-1', value: '2-1-1-1-1', disabled: false },
                      { text: '2-1-1-1-2', value: '2-1-1-1-2', disabled: false },
                    ],
                  },
                ],
              },
              {
                text: '2-1-1',
                value: '2-1-1',
                disabled: false,
              },
            ],
          },
          {
            text: '2-1',
            value: '2-1',
            disabled: false,
          },
        ],
      },
      {
        text: 'a2',
        value: 'a2',
        disabled: false,
        children: [
          {
            text: 'a2-1',
            value: 'a2-1',
            disabled: false,
          },
        ],
      },
    ];

    expect(
      getInitAllChildData(
        { data, expandedData: ['1'], level: 0, expandedPath: ['1/1-1/1-1-1'], separator: '/' },
        {}
      )
    ).toEqual({
      0: data[0].children,
      1: data[0].children[0].children,
      2: data[0].children[0].children[0].children,
    });
  });
  it('getInitAllChildData ', () => {
    expect(getInitAllChildData({}, {})).toEqual({});
    expect(getInitAllChildData({ data }, {})).toEqual({});
    expect(
      getInitAllChildData(
        { data, expandedData: ['1'], level: 0, expandedPath: ['1/1-1/1-1-1'], separator: '/' },
        {}
      )
    ).toEqual(allChildData);
    expect(
      getInitAllChildData(
        { data, expandedData: ['1'], level: 1, expandedPath: ['1/1-1/1-1-1'], separator: '/' },
        {}
      )
    ).toEqual({
      0: [
        {
          children: [
            {
              children: [
                {
                  children: [{ disabled: false, text: '1-1-1-1-1', value: '1-1-1-1-1' }],
                  disabled: false,
                  text: '1-1-1-1',
                  value: '1-1-1-1',
                },
              ],
              disabled: false,
              text: '1-1-1',
              value: '1-1-1',
            },
          ],
          disabled: false,
          text: '1-1',
          value: '1-1',
        },
      ],
    });
  });

  it('getChildData ', () => {
    expect(getChildData({}, {})).toEqual([]);
    expect(
      getChildData(
        {
          level: 0,
          allChildData,
        },
        {}
      )
    ).toEqual([]);

    expect(
      getChildData(
        {
          level: 1,
          allChildData,
          expandedPath: ['1/1-1/1-1-1'],
          expandedData: ['1', '1-1', '1-1-1'],
        },
        {}
      )
    ).toEqual([
      {
        children: [
          {
            children: [{ disabled: false, text: '1-1-1-1-1', value: '1-1-1-1-1' }],
            disabled: false,
            text: '1-1-1-1',
            value: '1-1-1-1',
          },
        ],
        disabled: false,
        text: '1-1-1',
        value: '1-1-1',
      },
    ]);

    expect(
      getChildData(
        {
          level: 0,
          separator: '/',
          data,
          allChildData,
          expandedPath: ['1/1-1/1-1-1'],
          expandedData: ['1', '1-1', '1-1-1'],
        },
        {}
      )
    ).toEqual([
      {
        children: [
          {
            children: [
              {
                children: [{ disabled: false, text: '1-1-1-1-1', value: '1-1-1-1-1' }],
                disabled: false,
                text: '1-1-1-1',
                value: '1-1-1-1',
              },
            ],
            disabled: false,
            text: '1-1-1',
            value: '1-1-1',
          },
        ],
        disabled: false,
        text: '1-1',
        value: '1-1',
      },
    ]);
  });
});
