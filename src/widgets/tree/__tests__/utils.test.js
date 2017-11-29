//@flow
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';

import { mockObject, } from 'vx-mock';
import TreeUtils from '../utils';

const { expect: exp, } = chai;

describe('utils', () => {

  const children1D2 = [ 3, 4, ];
  const children1D2D2 = [ 5, 8, ];
  const children1D3 = [ 10, 13, 16, ];
  const children2D1D2 = [ 21, ];
  const childrenRoot = [ 0, 17, 27, 30, ];
  const children1 = [ 1, 2, 9, ];
  const children2 = [ 18, 22, ];

  const datas: Array<Object> = [
    { key: '1', title: '1', },
    { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, },
    { key: '1.2', title: '1.2', pid: '1', path: '1', },
    { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, },
    { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
    { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
    { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
    { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
    { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true, },

    { key: '1.3', title: '1.3', pid: '1', path: '1', },
    { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
    { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
    { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
    { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
    { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
    { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
    { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true, },

    { key: '2', title: '2', },
    { key: '2.1', title: '2.1', pid: '2', path: '2', },
    { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true, },
    { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
    { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true, },
    { key: '2.2', title: '2.2', pid: '2', path: '2', },
    { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2', },
    { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
    { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
    { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true, },

    { key: '3', title: '3', },
    { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
    { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
    { key: '4', title: '4', isLeaf: true, },
  ];
  const key2row = {};
  datas.forEach((row: Object) => {
    const { key, } = row;
    key2row[ key ] = row;
  });
  let utils;
  beforeEach(() => {
    utils = new TreeUtils(datas, { expandAll: false, });
  });
  /*
0      1
1        1.1
2        1.2
3          1.2.1
4          1.2.2
5            1.2.2.1
6              1.2.2.1.1
7              1.2.2.1.2
8            1.2.2.2
9        1.3
10         1.3.1
11           1.3.1.1
12           1.3.1.2
13         1.3.2
14           1.3.2.1
15           1.3.2.2
16         1.3.3
17     2
18       2.1
19         2.1.1
20         2.1.2
21           2.1.2.1
22      2.2
23         2.2.1
24           2.2.1.1
25           2.2.1.2
26         2.2.2
27     3
28       3.1
29       3.2
30     4
  */


  it('checkTree', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    const result = utils.checkTree(datas);
    exp(result).to.be.eql([]);
  });

  it('checkTree is rowData wrong', () => {
    const mock = mockObject.create(utils);
    const isRightTreeRowData = mock.mockFunction('isRightTreeRowData');
    const errors = [ '1', '2', '3', ];
    isRightTreeRowData.returned(errors[ 0 ]);
    isRightTreeRowData.returned(errors[ 1 ]);
    isRightTreeRowData.returned(errors[ 2 ]);
    exp(utils.checkTree([ {}, {}, {}, ])).to.be.eql(errors.map(err => `{}==>${err}`));
    isRightTreeRowData.reset();
  });

  it('checkTree is right', () => {
    const mock = mockObject.create(utils);
    const isRightTreeRowData = mock.mockFunction('isRightTreeRowData');
    const errors = [ '', '', '', ];
    isRightTreeRowData.returned(errors[ 0 ]);
    isRightTreeRowData.returned(errors[ 1 ]);
    isRightTreeRowData.returned(errors[ 2 ]);
    exp(utils.checkTree([ {}, {}, {}, ])).to.be.eql([]);
    isRightTreeRowData.reset();
  });

  it('utils.isRightTreeRowData {}', () => {
    exp(utils.isRightTreeRowData({})).to.be.eql(utils.Error.EmptyError);
    exp(utils.isRightTreeRowData({ key: '', title: '', })).to.be.eql(utils.Error.EmptyError);

  });

  it('utils.isRightTreeRowData only key title', () => {
    exp(utils.isRightTreeRowData({ key: '1', title: '1', })).to.be.eql('');
  });


  it('utils.isRightTreeRowData exist pid & path => true', () => {
    exp(utils.isRightTreeRowData({ key: '1', title: '2', pid: '2', path: '2', })).to.be.eql('');
  });

  it('utils.isRightTreeRowData exist pid & path  path not container pid', () => {
    exp(utils.isRightTreeRowData({
      key: '1',
      title: '2',
      pid: '2',
      path: '3',
    })).to.be.eql(utils.Error.PathNotContainerPid);
  });

  it('utils.isRightTreeRowData exist pid & path path == key', () => {
    exp(utils.isRightTreeRowData({ key: '1', title: '2', pid: '2', path: '1', })).to.be.eql(utils.Error.PathEqlKey);
  });

  it('utils.isRightTreeRowData exist pid & path pid == key', () => {
    exp(utils.isRightTreeRowData({ key: '1', title: '2', pid: '1', path: '3', })).to.be.eql(utils.Error.PidEqlKey);
  });

  it('utils.isRightTreeRowData exist pid, not exist  path ', () => {
    exp(utils.isRightTreeRowData({ key: '1', title: '2', pid: '2', })).to.be.eql(utils.Error.PidPathMustSameExist);
    exp(utils.isRightTreeRowData({ key: '1', title: '2', path: '2', })).to.be.eql(utils.Error.PidPathMustSameExist);
  });

  it('isRightLevel pid is not exist', () => {
    const datas = [
      { key: '1', pid: '3', },
      { key: '1', pid: '4', },
      { key: '1', pid: '5', },
      { key: '1', pid: '6', },
      { key: '1', pid: '7', },
    ];
    exp(utils.isRightLevel(datas)).to.be.eql(datas.map(({ pid, }) => `找不到key:${pid}的结点.`));
  });

  const leveIsError = ({ key, pid, }) => `${key}结点的层级位置错误，必须处于父节点【${pid}】的范围内!`;
  const pathIsError = ({ key, }) => `${key}结点path信息错误!`;

  it('isRightLevel pid level before level ', () => {
    const errorNodes = [ { key: '1.1', pid: '2', path: '1/7', },
      { key: '1.2', pid: '2', path: '1/7', },
      { key: '1.3', pid: '2', path: '1/7', },
      { key: '1.4', pid: '2', path: '1/7', }, ];
    const datas = [
      { key: '1', },
      { key: '2', pid: '1', path: '1', },
      ...errorNodes,
      { key: '3', pid: '1', path: '1', },
      { key: '4', pid: '1', path: '1', },
    ];
    const errors = utils.isRightLevel(datas);
    const expectErrors = errorNodes.map(pathIsError);
    exp(errors).to.be.eql(expectErrors);
  });

  it('isRightLevel path is error', () => {

    const errorNodes = [
      { key: '1.1.1', pid: '1.1', path: '1', },
      { key: '1.1.2', pid: '1.1', path: '1', }, ];
    const datas = [
      { key: '1', },
      { key: '1.1', pid: '1', path: '1', },
      ...errorNodes,
      { key: '3', },
      { key: '4', },
    ];
    const errors = utils.isRightLevel(datas);
    const expectErrors = errorNodes.map(pathIsError);
    exp(errors).to.be.eql(expectErrors);

  });

  it('isRightLevel pid level after level but not join, is after "3"', () => {
    const errorNodes = [ { key: '1.1', pid: '2', path: '1/2', },
      { key: '1.2', pid: '2', path: '1/2', },

      { key: '1.3', pid: '2', path: '1/2', },
      { key: '1.4', pid: '2', path: '1/2', }, ];
    const datas = [
      { key: '1', },
      { key: '2', pid: '1', path: '1', },
      { key: '3', pid: '1', path: '1', },
      ...errorNodes,
      { key: '4', pid: '1', path: '1', },
    ];

    const errors = utils.isRightLevel(datas);
    const expectErrors = errorNodes.map(leveIsError);
    exp(errors).to.be.eql(expectErrors);
  });


  it('generateRealTreeData  expandAll: true 第一次获取', () => {
    const id2ExtendInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    exp(utils.generateRealTreeData({

      id2ExtendInfo,
    })).to.be.eql(datas);
  });


  it('generateRealTreeData expandAll: false 第一次获取', () => {
    const id2ExtendInfo = {};
    const utils = new TreeUtils(datas, { expandAll: false, });
    const actual = utils.generateRealTreeData({

      id2ExtendInfo,
    });

    exp(actual).to.be.eql([
      { key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
      { key: '4', title: '4', isLeaf: true, },
    ]);
  });


  it('generateRealTreeData expandAll: true 折叠全部', () => {
    const id2ExtendInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });

    utils.colapseNode('1', id2ExtendInfo);
    utils.colapseNode('2', id2ExtendInfo);
    utils.colapseNode('3', id2ExtendInfo);
    utils.colapseNode('4', id2ExtendInfo);
    const actual = utils.generateRealTreeData({

      id2ExtendInfo,
    });

    exp(actual).to.be.eql([
      { key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
      { key: '4', title: '4', isLeaf: true, },
    ]);
    exp(utils.generateRealTreeData({

      id2ExtendInfo,
    })).to.be.equal(actual);
  });
  it('search 版本未变 查询条件未变 直接返回旧值', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });
    const mockUtils = mockObject.create(utils);
    const result = [ '知行合一', ];
    const query: string = '';
    const mock = mockUtils.mockFunction('generateRealTreeData');
    mock.returned(result);
    const id2ExtendInfo = {};
    const expandInfo = {

      id2ExtendInfo,
    };

    exp(utils.search(expandInfo, query)).to.be.equal(result);
    utils.oldVersion = 1;
    utils.version = 1;
    exp(utils.search(expandInfo, query)).to.be.equal(result);
    exp(mock.callTimes()).to.be.equal(1);
    exp(mock.getCallArgs(0)).to.be.eql([ expandInfo, ]);
  });
  it('search 版本改变 查询条件未变 重新计算', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });
    const mockUtils = mockObject.create(utils);
    const result = [ '知行合一', ];
    const other = [ '有名万物之始', ];
    const query: string = '';
    const mock = mockUtils.mockFunction('generateRealTreeData');
    mock.returned(result);
    mock.returned(other);
    const id2ExtendInfo = {};
    const expandInfo = {

      id2ExtendInfo,
    };

    exp(utils.search(expandInfo, query)).to.be.equal(result);
    exp(utils.search(expandInfo, query)).to.be.equal(other);
    exp(mock.callTimes()).to.be.equal(2);
    exp(mock.getCallArgs(0)).to.be.eql([ expandInfo, ]);
    exp(mock.getCallArgs(1)).to.be.eql([ expandInfo, ]);

  });
  it('search 版本未变 查询条件改变 重新计算', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });
    const mockUtils = mockObject.create(utils);
    const result = [ '知行合一', ];
    const other = [ '有名万物之始', ];
    const query: string = '';
    const mock = mockUtils.mockFunction('generateRealTreeData');
    mock.returned(result);
    mock.returned(other);
    const id2ExtendInfo = {};
    const expandAll = true;
    const expandInfo = {

      id2ExtendInfo,
    };
    utils.oldVersion = 1;
    utils.version = 1;
    exp(utils.search(expandInfo, query)).to.be.equal(result);
    exp(utils.search(expandInfo, query + 'different')).to.be.not.equal(result);
    exp(mock.callTimes()).to.be.equal(2);

    exp(mock.getCallArgs(0)).to.be.eql([ expandInfo, ]);
    exp(mock.getCallArgs(1)).to.be.eql([ expandInfo, ]);
  });
  it('search query: 1.2 matchAll', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });
    const mockUtils = mockObject.create(utils);

    const mockMatch = mockUtils.mockFunction('match');
    for (let i = 0; i < datas.length; i++) {
      mockMatch.returned(true);
    }
    const query: string = '诸行无常';
    const id2ExtendInfo = {};

    const expandInfo = {

      id2ExtendInfo,
    };

    exp(utils.search(expandInfo, query)).to.be.eql(datas);
  });
  it('search query: 1.2 notMatch', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });
    const mockUtils = mockObject.create(utils);

    const mockMatch = mockUtils.mockFunction('match');
    for (let i = 0; i < datas.length; i++) {
      mockMatch.returned(false);
    }
    const query: string = '诸行无常';
    const id2ExtendInfo = {};

    const expandInfo = {

      id2ExtendInfo,
    };

    exp(utils.search(expandInfo, query)).to.be.eql([]);
  });
  it('search query: 1.2 解决断开的问题, 只匹配到叶子结点', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });
    const mockUtils = mockObject.create(utils);

    const mockMatch = mockUtils.mockFunction('match');
    for (let i = 0; i < datas.length; i++) {
      const row = datas[ i ];
      const { isLeaf = false, } = row;
      mockMatch.mock((title: string) => {
        return !!key2row[ title ].isLeaf;
      });
    }
    const query: string = '诸行无常';
    const id2ExtendInfo = {};

    const expandInfo = {

      id2ExtendInfo,
    };

    const result = utils.search(expandInfo, query);
    exp(result).to.be.eql(datas);
  });
  it('search query: 1.2.2.1', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });
    const query: string = '1.2.2.1';
    const id2ExtendInfo = {};

    const expandInfo = {

      id2ExtendInfo,
    };

    const result = utils.search(expandInfo, query);
    const queryResult = [ { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
    ];
    exp(utils.treeData).to.be.eql(queryResult);
    exp(result).to.be.eql(queryResult);
    const oldTreeData = utils.treeData;
    utils.colapseNode('1.2', expandInfo.id2ExtendInfo);

    exp(utils.search(expandInfo, query), '查询出对应的结点').to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', }, ]);
    exp(utils.treeData, 'query没变化则treeData要是原来的值').to.be.equal(oldTreeData);
    exp(utils.search(expandInfo, '')).to.be.eql(datas);
    utils.expandNode('1.2', id2ExtendInfo);

    exp(utils.treeData, '查询全部后，treeData会变为原始的数组值').to.be.equal(datas);
  });
  it('search Query条件变化的时候，expand id2ExpandInfo要重新计算', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });
    const query: string = '1.2.2.1';
    const id2ExtendInfo = {};

    const expandInfo = {

      id2ExtendInfo,
    };
    utils.search(expandInfo, query);
    utils.search(expandInfo, '');
    exp(Object.keys(expandInfo.id2ExtendInfo).length).to.be.eql(datas.length + 1);
  });
  it('search 连续查找', () => {
    const utils = new TreeUtils(datas, { expandAll: true, });

    const expandInfo = {
      id2ExtendInfo: {},
    };

    exp(utils.search(expandInfo, '1.2.1', 'eql')).to.be.eql([ { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, }, ]);

    exp(utils.search(expandInfo, '1.2.1', 'eql')).to.be.eql([ { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, }, ]);

    exp(utils.search(expandInfo, '1.2.2', 'eql')).to.be.eql([ { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', }, ]);
    exp(utils.search(expandInfo, '1.3', 'eql')).to.be.eql([ { key: '1', title: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
    ]);
  });
  it('generateRealTreeData expandAll: true 折叠全部后 再 全部展开', () => {
    const rs = [];
    Array.prototype.push.apply(rs, datas);
    const id2ExtendInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.colapseNode('1', id2ExtendInfo);
    utils.colapseNode('2', id2ExtendInfo);
    utils.colapseNode('3', id2ExtendInfo);
    utils.colapseNode('4', id2ExtendInfo);
    utils.expandNode('1', id2ExtendInfo);
    utils.expandNode('2', id2ExtendInfo);
    utils.expandNode('3', id2ExtendInfo);
    utils.expandNode('4', id2ExtendInfo);
    const actual = utils.generateRealTreeData({

      id2ExtendInfo,
    });
    exp(actual).to.be.eql(datas);
  });
  it('generateRealTreeData expandAll: true 折叠1 2 ', () => {
    const id2ExtendInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });

    utils.colapseNode('1', id2ExtendInfo);
    utils.colapseNode('2', id2ExtendInfo);
    const actual = utils.generateRealTreeData({

      id2ExtendInfo,
    });
    exp(actual).to.be.eql([
      { key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
      { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
      { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
      { key: '4', title: '4', isLeaf: true, }, ]);
  });

  it('match val: null', () => {
    exp(utils.match(null, '', 'include')).to.be.false;
    exp(utils.match(undefined, '', 'include')).to.be.false;

    exp(utils.match(null, '', 'start')).to.be.false;
    exp(utils.match(undefined, '', 'start')).to.be.false;

    exp(utils.match(null, '', 'end')).to.be.false;
    exp(utils.match(undefined, '', 'end')).to.be.false;

    exp(utils.match(null, '', 'eql')).to.be.false;
    exp(utils.match(undefined, '', 'eql')).to.be.false;

  });
  it('match val: 123,  start', () => {
    const val = '123';
    exp(utils.match(val, '1', 'start')).to.be.true;
    exp(utils.match(val, '12', 'start')).to.be.true;
    exp(utils.match(val, '123', 'start')).to.be.true;
    exp(utils.match(val, '5', 'start')).to.be.false;
  });


  it('match val: 123,  start splitQuery: ,', () => {
    utils = new TreeUtils(datas, { expandAll: false, splitQuery: ',', });
    exp(utils.match('123,234', '1,2', 'start')).to.be.true;
    exp(utils.match('123,234', '1|2', 'start')).to.be.false;
  });

  it('match val: 123,  start splitQuery: |', () => {
    utils = new TreeUtils(datas, { expandAll: false, splitQuery: '|', });
    exp(utils.match('123,234', '1,2', 'start')).to.be.false;
    exp(utils.match('123,234', '1|2', 'start')).to.be.true;

  });


  it('match val: 123,  end', () => {
    const val = '123';
    exp(utils.match(val, '1,2,3', 'end')).to.be.false;
    exp(utils.match(val, '3', 'end')).to.be.true;
    exp(utils.match(val, '23', 'end')).to.be.true;
    exp(utils.match(val, '123', 'end')).to.be.true;
    exp(utils.match(val, '5', 'end')).to.be.false;
  });

  it('match val: 123,  start splitQuery: ,', () => {
    utils = new TreeUtils(datas, { expandAll: false, splitQuery: ',', });
    exp(utils.match('321,432', '1,2', 'end')).to.be.true;
    exp(utils.match('321,432', ',', 'end')).to.be.false;
    exp(utils.match('321,432', '1|2', 'end')).to.be.false;
  });

  it('match val: 123,  start splitQuery: |', () => {
    utils = new TreeUtils(datas, { expandAll: false, splitQuery: '|', });
    exp(utils.match('321,432', '1,2', 'end')).to.be.false;
    exp(utils.match('321,432', ',', 'end')).to.be.false;
    exp(utils.match('321,432', '1|2', 'end')).to.be.true;
    exp(utils.match('321,432', '|', 'end')).to.be.false;
  });

  it('match val: 123,  include', () => {
    const val = '123';
    exp(utils.match(val, '3', 'include')).to.be.true;
    exp(utils.match(val, '23', 'include')).to.be.true;
    exp(utils.match(val, '1', 'include')).to.be.true;
    exp(utils.match(val, '2', 'include')).to.be.true;
    exp(utils.match(val, 'a', 'include')).to.be.false;
    exp(utils.match(val, '1,2,3', 'include')).to.be.false;
  });

  it('match val: 123,  query: 空字符串', () => {
    exp(utils.match('1', '', 'include')).to.be.false;
    exp(utils.match('1', '', 'eql')).to.be.false;
    exp(utils.match('1', '', 'start')).to.be.false;
    exp(utils.match('1', '', 'end')).to.be.false;

  });
  it('match val: 123,  include container splitQuery: ,', () => {
    utils = new TreeUtils(datas, { expandAll: false, splitQuery: ',', });
    exp(utils.match('1', '1,2', 'include')).to.be.true;
    exp(utils.match('2', '1,2', 'include')).to.be.true;
    exp(utils.match('3', '1,2', 'include')).to.be.false;
    exp(utils.match('3', ',', 'include')).to.be.false;
  });
  it('match val: 123,  include container splitQuery: |', () => {
    utils = new TreeUtils(datas, { expandAll: false, splitQuery: '|', });
    exp(utils.match('1', '1|2', 'include')).to.be.true;
    exp(utils.match('2', '1|2', 'include')).to.be.true;
    exp(utils.match('3', '1|2', 'include')).to.be.false;
    exp(utils.match('3', '|', 'include')).to.be.false;
  });

  it('match val: 123,  eql', () => {
    const val = '123';
    exp(utils.match(val, '3', 'eql')).to.be.false;
    exp(utils.match(val, '23', 'eql')).to.be.false;
    exp(utils.match(val, '1', 'eql')).to.be.false;
    exp(utils.match(val, '2', 'eql')).to.be.false;
    exp(utils.match(val, '123', 'eql')).to.be.true;
  });

  it('generateRealTreeData expandAll: true 折叠1.2 2', () => {
    const id2ExtendInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });

    utils.colapseNode('1.2', id2ExtendInfo);
    utils.colapseNode('2', id2ExtendInfo);
    const actual = utils.generateRealTreeData({

      id2ExtendInfo,
    });
    exp(actual).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
      { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
      { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
      { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
      { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
      { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
      { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true, },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
      { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
      { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
      { key: '4', title: '4', isLeaf: true, }, ]);
  });


  it('generateRealTreeData expandAll: false 展开 1 2 3 ', () => {
    const id2ExtendInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });

    utils.expandNode('1', id2ExtendInfo);
    utils.expandNode('2', id2ExtendInfo);
    utils.expandNode('3', id2ExtendInfo);
    const actual = utils.generateRealTreeData({

      id2ExtendInfo,
    });
    exp(actual).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '2.1', title: '2.1', pid: '2', path: '2', },
      { key: '2.2', title: '2.2', pid: '2', path: '2', },
      { key: '3', title: '3', },
      { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
      { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
      { key: '4', title: '4', isLeaf: true, }, ]);
  });

  it('generateRealTreeData expandAll: false 展开 1 1.1  1.3 1.3.1 1.3.2 3', () => {
    const id2ExtendInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });

    utils.expandNode('1', id2ExtendInfo);
    utils.expandNode('1.1', id2ExtendInfo);
    utils.expandNode('1.3', id2ExtendInfo);
    utils.expandNode('1.3.1', id2ExtendInfo);
    utils.expandNode('1.3.2', id2ExtendInfo);
    utils.expandNode('3', id2ExtendInfo);
    const actual = utils.generateRealTreeData({

      id2ExtendInfo,
    });
    exp(actual).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
      { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
      { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
      { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
      { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
      { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
      { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true, },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
      { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
      { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
      { key: '4', title: '4', isLeaf: true, }, ]);
  });

  it('generateRealTreeData empty', () => {
    const expandAll = false;
    const utils = new TreeUtils([], { expandAll, });
    const id2ExtendInfo = {};
    exp(utils.generateRealTreeData({

      id2ExtendInfo,
    })).to.be.eql([]);
  });

  it('generateTreeNode empty', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    exp(utils.generateTreeNode([])).to.be.eql([]);
  });


  it('generateTreeNode is tree', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    const orignalDatas = JSON.parse(JSON.stringify(datas));
    const actual = utils.generateTreeNode(datas);
    const expectResult = [ {
      key: '1',
      title: '1',
      children: [
        { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, },
        {
          key: '1.2',
          title: '1.2',
          pid: '1', path: '1',
          children: [
            { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, },
            {
              key: '1.2.2',
              title: '1.2.2',
              pid: '1.2',
              path: '1/1.2',
              children: [
                {
                  path: '1/1.2/1.2.2',
                  key: '1.2.2.1',
                  title: '1.2.2.1',
                  pid: '1.2.2',
                  children: [

                    {
                      key: '1.2.2.1.1',
                      title: '1.2.2.1.1',
                      pid: '1.2.2.1',
                      path: '1/1.2/1.2.2/1.2.2.1',
                      isLeaf: true,

                    },
                    {
                      key: '1.2.2.1.2',
                      title: '1.2.2.1.2',
                      pid: '1.2.2.1',
                      path: '1/1.2/1.2.2/1.2.2.1',
                      isLeaf: true,

                    }, ],
                },
                {
                  key: '1.2.2.2',
                  title: '1.2.2.2',
                  pid: '1.2.2',
                  path: '1/1.2/1.2.2',
                  isLeaf: true,

                }, ],
            }, ],
        }, {
          key: '1.3',
          title: '1.3',
          pid: '1',
          path: '1',
          children: [ {
            key: '1.3.1',
            title: '1.3.1',
            pid: '1.3',
            path: '1/1.3',
            children: [ {
              key: '1.3.1.1',
              title: '1.3.1.1',
              pid: '1.3.1',
              path: '1/1.3/1.3.1',
              isLeaf: true,
            }, {
              key: '1.3.1.2',
              title: '1.3.1.2',
              pid: '1.3.1',
              path: '1/1.3/1.3.1',
              isLeaf: true,
            }, ],
          }, {
            key: '1.3.2',
            title: '1.3.2',
            pid: '1.3',
            path: '1/1.3',
            children: [
              {
                key: '1.3.2.1',
                title: '1.3.2.1',
                pid: '1.3.2',
                path: '1/1.3/1.3.2',
                isLeaf: true,
              },
              {
                key: '1.3.2.2',
                title: '1.3.2.2',
                pid: '1.3.2',
                path: '1/1.3/1.3.2',
                isLeaf: true,

              }, ],
          }, {
            key: '1.3.3',
            title: '1.3.3',
            pid: '1.3',
            path: '1/1.3',
            isLeaf: true,
          }, ],
        }, ],
    }, {
      key: '2',
      title: '2',
      children: [ {
        key: '2.1',
        title: '2.1',
        pid: '2',
        path: '2',
        children: [ {
          key: '2.1.1',
          title: '2.1.1',
          pid: '2.1',
          path: '2/2.1',
          isLeaf: true,
        }, {
          key: '2.1.2',
          title: '2.1.2',
          pid: '2.1',
          path: '2/2.1',

          children: [ {
            key: '2.1.2.1',
            title: '2.1.2.1',
            pid: '2.1.2',
            path: '2/2.1/2.1.2',
            isLeaf: true,

          }, ],
        }, ],
      }, {
        key: '2.2',
        title: '2.2',
        pid: '2',
        path: '2',

        children: [ {
          key: '2.2.1',
          title: '2.2.1',
          pid: '2.2',
          path: '2/2.2',

          children: [ {
            key: '2.2.1.1',
            title: '2.2.1.1',
            pid: '2.2.1',
            path: '2/2.2/2.2.1',
            isLeaf: true,

          }, {
            key: '2.2.1.2',
            title: '2.2.1.2',
            pid: '2.2.1',
            path: '2/2.2/2.2.1',
            isLeaf: true,
          }, ],
        }, {
          key: '2.2.2',
          title: '2.2.2',
          pid: '2.2',
          path: '2/2.2',
          isLeaf: true,
        }, ],
      }, ],
    }, {
      key: '3',
      title: '3',
      children: [ {
        key: '3.1',
        title: '3.1', pid: '3',
        path: '3',
        isLeaf: true,
      }, {
        key: '3.2',
        title: '3.2',
        pid: '3',
        path: '3',
        isLeaf: true,
      }, ],
    }, {
      key: '4', title: '4', isLeaf: true,
    }, ];
    exp(datas).to.be.eql(orignalDatas);
    exp(actual).to.be.eql(expectResult);
  });


  it('getPathNodes 起始节点为1级结点', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    exp(utils.getPathNodes(datas, 1, {})).to.be.eql([
      { key: '1', title: '1', }, ]);
  });

  it('getPathNodes 起始结点非根结点 2 级', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    exp(utils.getPathNodes(datas, 3, {})).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', }, ]);
  });

  it('getPathNodes 起始结点非根结点 3 级', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    exp(utils.getPathNodes(datas, 7, {})).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', }, ]);
  });

  it('slice empty', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    exp(utils.getPathNodes([], 1, {})).to.be.eql([]);
  });


  it('getKeys', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    const result = utils.getKeys([ { key: '1', title: '1', }, { key: '2', title: '2', }, { key: '3', title: '3', }, ]);
    exp(result).to.be.eql([ '1', '2', '3', ]);
  });

  it('fetchNodeExtendInfo will exisit', () => {
    const utils = new TreeUtils(datas, { expandAll: false, });
    const expectResultA: Object = {
      nowVisible: 5,
      realyVisible: 6,
      children: 7,
      begats: 8,
    };
    const expectResultB: Object = {
      nowVisible: 8,
      realyVisible: 7,
      children: 6,
      begats: 5,
    };
    const nodeIdA = 'a';
    const nodeIdB = 'b';
    const countInfo = {
      [nodeIdA]: expectResultA,
      [nodeIdB]: expectResultB,
    };
    exp(utils.fetchNodeExtendInfo(nodeIdA, datas, countInfo)).to.be.eql(expectResultA);
    exp(utils.fetchNodeExtendInfo(nodeIdB, datas, countInfo)).to.be.eql(expectResultB);
  });
  const baseCountInfo: Object = {
    ['1' + '']: { index: 0, },
    ['2' + '']: { index: 17, },
    ['3' + '']: { index: 27, },
    ['4' + '']: { index: 30, },
    ['1.1' + '']: { index: 1, },
    ['1.2' + '']: { index: 2, },
    '1.2.1': { index: 3, },
    '1.2.2': { index: 4, },
    '1.2.2.1': { index: 5, },
    '1.2.2.1.1': { index: 6, },
    '1.2.2.1.2': { index: 7, },
    '1.2.2.2': { index: 8, },
    ['1.3' + '']: { index: 9, },
    '1.3.1': { index: 10, },
    '1.3.1.1': { index: 11, },
    '1.3.1.2': { index: 12, },
    '1.3.2': { index: 13, },
    '1.3.2.1': { index: 14, },
    '1.3.2.2': { index: 15, },
    '1.3.3': { index: 16, },
    ['2.1' + '']: { index: 18, },
    '2.1.1': { index: 19, },
    '2.1.2': { index: 20, },
    '2.1.2.1': { index: 21, },
    ['2.2' + '']: { index: 22, },
    '2.2.1': { index: 23, },
    '2.2.1.1': { index: 24, },
    '2.2.1.2': { index: 25, },
    '2.2.2': { index: 26, },
    [ '3.1' + '']: { index: 28, },
    ['3.2' + '']: { index: 29, },
  };
  it('fetchNodeExtendInfo for virual root for expandAll: true', () => {
    const expectResult = {
      nowVisible: datas.length,
      realyVisible: datas.length,
      children: 4,
      begats: datas.length,
      index: -1,
      childrenIdx: childrenRoot,
    };
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    const nodeId = utils.VirtualRoot;

    exp(utils.fetchNodeExtendInfo(nodeId, datas, countInfo)).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
    baseCountInfo[ nodeId ] = expectResult;
    exp(countInfo).to.be.eql(baseCountInfo);
  });

  it('fetchNodeExtendInfo for virual root for expandAll: false', () => {

    const expectResult = {
      nowVisible: 4,
      realyVisible: 4,
      children: 4,
      begats: datas.length,
      childrenIdx: childrenRoot,
      index: -1,
    };
    const utils = new TreeUtils(datas, { expandAll: false, });

    const nodeId = utils.VirtualRoot;
    const countInfo = {};

    exp(utils.fetchNodeExtendInfo(nodeId, datas, countInfo)).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
    baseCountInfo[ nodeId ] = expectResult;
    exp(countInfo).to.be.eql(baseCountInfo);
  });

  it('fetchNodeExtendInfo for normal node for expandAll: false nodeId: 1', () => {

    const expectResult = {
      nowVisible: 0,
      realyVisible: 0,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    };
    const nodeId = '1';
    const countInfo = {};
    const utils = new TreeUtils(datas, { expandAll: false, });

    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
  });

  it('fetchNodeExtendInfo for normal node for expandAll: true  nodeId: 1', () => {

    const expectResult = {
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    };
    const nodeId = '1';
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });

    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });
  it('fetchNodeExtendInfo for normal node for expandAll: false nodeId: 2', () => {

    const expectResult = {
      nowVisible: 0,
      realyVisible: 0,
      children: 2,
      begats: 9,
      index: 17,
      childrenIdx: children2,

    };
    const nodeId = '2';
    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });

  it('fetchNodeExtendInfo for normal node for expandAll: true  nodeId: 2', () => {

    const expectResult = {
      nowVisible: 9,
      realyVisible: 9,
      children: 2,
      begats: 9,
      index: 17,
      childrenIdx: children2,

    };
    const nodeId = '2';
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });
  it('fetchNodeExtendInfo for normal node for expandAll: false nodeId: 2.1.1', () => {

    const expectResult = {
      nowVisible: 0,
      realyVisible: 0,
      children: 0,
      begats: 0,
      index: 19,
      childrenIdx: [],

    };
    const nodeId = '2.1.1';
    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);

  });

  it('fetchNodeExtendInfo for normal node for expandAll: true  nodeId: 2.1.1', () => {

    const expectResult = {
      nowVisible: 0,
      realyVisible: 0,
      children: 0,
      begats: 0,
      index: 19,
      childrenIdx: [],
    };
    const nodeId = '2.1.1';
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);

  });
  it('fetchNodeExtendInfo for normal node for expandAll: false nodeId: 2.1.2', () => {

    const expectResult = {
      nowVisible: 0,
      realyVisible: 0,
      children: 1,
      index: 20,
      childrenIdx: children2D1D2,
      begats: 1,
    };
    const nodeId = '2.1.2';
    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });

  it('fetchNodeExtendInfo for normal node for expandAll: true  nodeId: 2.1.2', () => {

    const expectResult = {
      nowVisible: 1,
      realyVisible: 1,
      children: 1,
      index: 20,
      begats: 1,
      childrenIdx: children2D1D2,

    };
    const nodeId = '2.1.2';
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });

  it('expandNode expandAll: false nodeId: 1', () => {

    const nodeId = '1';
    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode(nodeId, countInfo);
    const expectResult = {
      nowVisible: 3,
      expanded: true,
      childrenIdx: children1,
      realyVisible: 3,
      children: 3,
      begats: 16,
      index: 0,
    };
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
  });


  it('expandNode expandAll: true nodeId: 1', () => {

    const nodeId = '1';
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode(nodeId, countInfo);
    const expectResult = {
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      childrenIdx: children1,

      begats: 16,
      index: 0,
    };
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });
  it('colapseNode expandAll: true nodeId: 1', () => {

    const nodeId = '1';
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode(nodeId, countInfo);
    utils.colapseNode(nodeId, countInfo);

    const expectResult = {
      nowVisible: 0,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
      expanded: false,
    };
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 15,
      realyVisible: 15,
      children: 4,
      begats: 31,
      index: -1,
      childrenIdx: childrenRoot,

    });
  });

  it('colapseNode expandAll: false nodeId: 1', () => {

    const nodeId = '1';
    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode(nodeId, countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 7,
      realyVisible: 7,
      children: 4,
      begats: 31,
      childrenIdx: childrenRoot,
      index: -1,
    });
    utils.colapseNode(nodeId, countInfo);
    const expectResult = {
      nowVisible: 0,
      realyVisible: 3,
      children: 3,
      begats: 16,
      expanded: false,
      childrenIdx: children1,
      index: 0,
    };
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 4,
      realyVisible: 4,
      children: 4,
      childrenIdx: childrenRoot,
      begats: 31,
      index: -1,
    });
  });

  it('expandNode expandAll: true nodeId: 1 展开折叠的结点', () => {

    const nodeId = '1';
    const countInfo = {};
    countInfo[ nodeId ] = {
      nowVisible: 0,
      realyVisible: 16,
      children: 3,
      expanded: false,
      begats: 16,
      childrenIdx: children1,

      index: 0,
    };
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode(nodeId, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      expanded: true,
      childrenIdx: children1,
      begats: 16,
      index: 0,
    });
  });

  it('expandNode expandAll: true nodeId: 1 展开初始化的结点', () => {

    const nodeId = '1';
    const countInfo = {};
    countInfo[ nodeId ] = {
      nowVisible: 0,
      realyVisible: 16,
      children: 3,
      childrenIdx: [],
      begats: 16,
      index: 0,
    };
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode(nodeId, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 0,
      realyVisible: 16,
      childrenIdx: [],
      children: 3,
      begats: 16,
      index: 0,
    });
  });

  it('expandNode expandAll: false nodeId: 1 展开初始化的结点', () => {

    const nodeId = '1';
    const countInfo = {};
    countInfo[ nodeId ] = {
      nowVisible: 0,
      realyVisible: 3,
      childrenIdx: [],
      children: 3,
      begats: 16,
      index: 0,
    };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode(nodeId, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 3,
      realyVisible: 3,
      children: 3,
      childrenIdx: [],
      begats: 16,
      expanded: true,
      index: 0,
    });

  });
  it('expandNode expandAll: false nodeId: 1 展开展开结点', () => {

    const nodeId = '1';
    const countInfo = {};
    countInfo[ nodeId ] = {
      nowVisible: 0,
      childrenIdx: [],
      realyVisible: 3,
      children: 3,
      expanded: true,
      begats: 16,
      index: 0,
    };
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode(nodeId, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 0,
      childrenIdx: [],
      realyVisible: 3,
      children: 3,
      expanded: true,
      begats: 16,
      index: 0,
    });

  });
  it('colapseNode expandAll: true nodeId: 1 折叠折叠结点', () => {

    const nodeId = '1';
    const countInfo = {};
    countInfo[ nodeId ] = {
      nowVisible: 0,
      realyVisible: 16,
      children: 3,
      expanded: false,
      childrenIdx: [],
      begats: 16,
      index: 0,
    };
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.colapseNode(nodeId, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 0,
      childrenIdx: [],
      realyVisible: 16,
      children: 3,
      expanded: false,
      begats: 16,
      index: 0,
    });
  });

  it('colapseNode expandAll: true nodeId: 1 折叠初始化的结点', () => {

    const nodeId = '1';
    const countInfo = {};
    countInfo[ nodeId ] = {
      nowVisible: 0,
      realyVisible: 16,
      children: 3,
      childrenIdx: [],
      begats: 16,
      index: 0,
    };
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.colapseNode(nodeId, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 0,
      realyVisible: 16,
      children: 3,
      childrenIdx: [],
      begats: 16,
      expanded: false,
      index: 0,
    });
  });

  it('colapseNode expandAll: false nodeId: 1 折叠折叠结点', () => {

    const nodeId = '1';
    const countInfo = {};
    countInfo[ nodeId ] = {
      nowVisible: 0,
      realyVisible: 3,
      childrenIdx: [],
      children: 3,
      expanded: false,
      begats: 16,
      index: 0,
    };
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.colapseNode(nodeId, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 0,
      realyVisible: 3,
      childrenIdx: [],
      children: 3,
      begats: 16,
      expanded: false,
      index: 0,
    });

  });
  it('colapseNode expandAll: false nodeId: 1 折叠初始化结点', () => {

    const nodeId = '1';
    const countInfo = {};
    countInfo[ nodeId ] = {
      nowVisible: 3,
      realyVisible: 3,
      children: 3,
      childrenIdx: [],
      begats: 16,
      index: 0,
    };
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.colapseNode(nodeId, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 0,
      realyVisible: 3,
      children: 3,
      childrenIdx: [],
      expanded: false,
      begats: 16,
      index: 0,
    });

  });

  it('expandNode expandAll: false nodeId: 1 , 1.1 重复展开', () => {

    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 3,
      expanded: true,
      realyVisible: 3,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });

    function reapat () {
      utils.expandNode('1.2', countInfo);
      exp(countInfo[ '1' ]).to.be.eql({
        nowVisible: 5,
        expanded: true,
        realyVisible: 5,
        children: 3,
        childrenIdx: children1,
        begats: 16,
        index: 0,
      });
      exp(countInfo[ '1.2' ]).to.be.eql({
        nowVisible: 2,
        realyVisible: 2,
        children: 2,
        childrenIdx: children1D2,
        expanded: true,
        begats: 6,
        index: 2,
      });

    }

    reapat();
    reapat();
    reapat();
  });
  it('expandNode expandAll: true nodeId: 1 , 1.1 重复展开', () => {

    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);

    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });

    function reapat () {
      utils.expandNode('1.2', countInfo);
      exp(countInfo[ '1' ]).to.be.eql({
        nowVisible: 16,
        realyVisible: 16,
        children: 3,
        begats: 16,
        childrenIdx: children1,
        index: 0,
      });
      exp(countInfo[ '1.2' ]).to.be.eql({
        nowVisible: 6,
        realyVisible: 6,
        childrenIdx: children1D2,
        children: 2,
        begats: 6,
        index: 2,
      });

    }

    reapat();
    reapat();
    reapat();
  });

  it('colapseNode expandAll: false 展开:(1->1.2) 折叠:(1.2) 重复折叠', () => {

    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);
    utils.expandNode('1.2', countInfo);

    function reapat () {
      utils.colapseNode('1.2', countInfo);
      exp(countInfo[ '1' ]).to.be.eql({
        nowVisible: 3,
        expanded: true,
        realyVisible: 3,
        children: 3,
        childrenIdx: children1,
        begats: 16,
        index: 0,
      });
      exp(countInfo[ '1.2' ]).to.be.eql({
        nowVisible: 0,
        realyVisible: 2,
        childrenIdx: children1D2,
        children: 2,
        expanded: false,
        begats: 6,
        index: 2,
      });
    }

    reapat();
    reapat();
    reapat();
  });

  it('colapseNode expandAll: false 展开:(1->1.2) 折叠:(1 -> 1.2) 重复折叠', () => {

    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);
    utils.expandNode('1.2', countInfo);
    utils.colapseNode('1', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 0,
      expanded: false,
      realyVisible: 5,
      children: 3,
      childrenIdx: children1,
      begats: 16,
      index: 0,
    });
    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 2,
      realyVisible: 2,
      children: 2,
      expanded: true,
      childrenIdx: children1D2,

      begats: 6,
      index: 2,
    });

    function reapat () {


      utils.colapseNode('1.2', countInfo);
      exp(countInfo[ '1' ]).to.be.eql({
          nowVisible: 0,
          realyVisible: 3,
          children: 3,
          begats: 16,
          index: 0,
          childrenIdx: children1,
          expanded: false,
        }
      );
      exp(countInfo[ '1.2' ]).to.be.eql({
        nowVisible: 0,
        realyVisible: 2,
        children: 2,
        childrenIdx: children1D2,

        expanded: false,
        begats: 6,
        index: 2,
      });
    }

    reapat();
    reapat();
    reapat();
  });
  it('colapseNode expandAll: true 展开:(1->1.2) 折叠:(1.2) 重复折叠', () => {

    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);
    utils.expandNode('1.2', countInfo);

    function reapat () {
      utils.colapseNode('1.2', countInfo);
      exp(countInfo[ '1' ]).to.be.eql({
        nowVisible: 10,
        realyVisible: 10,
        childrenIdx: children1,

        children: 3,
        begats: 16,
        index: 0,
      });
      exp(countInfo[ '1.2' ]).to.be.eql({
        nowVisible: 0,
        childrenIdx: children1D2,

        realyVisible: 6,
        children: 2,
        expanded: false,
        begats: 6,
        index: 2,
      });
    }

    reapat();
    reapat();
    reapat();
  });

  it('colapseNode expandAll: true 展开:(1->1.2) 折叠:(1 -> 1.2) 重复折叠', () => {

    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);
    utils.expandNode('1.2', countInfo);
    utils.colapseNode('1', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 0,
      expanded: false,
      realyVisible: 16,
      childrenIdx: children1,
      children: 3,
      begats: 16,
      index: 0,
    });
    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 6,
      realyVisible: 6,
      children: 2,
      childrenIdx: children1D2,

      begats: 6,
      index: 2,
    });

    function reapat () {


      utils.colapseNode('1.2', countInfo);
      exp(countInfo[ '1' ]).to.be.eql({
          nowVisible: 0,
          realyVisible: 10,
          childrenIdx: children1,
          children: 3,
          begats: 16,
          index: 0,
          expanded: false,
        }
      );
      exp(countInfo[ '1.2' ]).to.be.eql({
        nowVisible: 0,
        realyVisible: 6,
        children: 2,
        expanded: false,
        childrenIdx: children1D2,

        begats: 6,
        index: 2,
      });
    }

    reapat();
    reapat();
    reapat();
  });

  it('expandNode expandAll: false nodeId: 1 -> 1.1-> 1.2->1.2.2->1.3', () => {

    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 3,
      expanded: true,
      realyVisible: 3,
      children: 3,
      begats: 16,
      index: 0,
      childrenIdx: children1,
    });

    utils.expandNode('1.1', countInfo);

    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 3,
      expanded: true,
      realyVisible: 3,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });
    exp(countInfo[ '1.1' ]).to.be.eql({
      index: 1,
    });

    utils.expandNode('1.2', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 5,
      expanded: true,
      realyVisible: 5,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });
    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 2,
      realyVisible: 2,
      children: 2,
      expanded: true,
      begats: 6,
      childrenIdx: children1D2,
      index: 2,
    });


    utils.expandNode('1.2.2', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 7,
      realyVisible: 7,
      expanded: true,
      childrenIdx: children1,
      children: 3,
      begats: 16,
      index: 0,
    });
    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 4,
      realyVisible: 4,
      children: 2,
      expanded: true,
      childrenIdx: children1D2,
      begats: 6,
      index: 2,
    });
    exp(countInfo[ '1.2.2' ]).to.be.eql({
      nowVisible: 2,
      realyVisible: 2,
      children: 2,
      expanded: true,
      childrenIdx: children1D2D2,
      begats: 4,
      index: 4,
    });

  });

  it('expandNode expandAll: true nodeId: 1 -> 1.1-> 1.2->1.2.2->1.3', () => {
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });

    utils.expandNode('1.1', countInfo);

    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });
    exp(countInfo[ '1.1' ]).to.be.eql({
      index: 1,
    });

    utils.expandNode('1.2', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });

    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 6,
      realyVisible: 6,
      childrenIdx: children1D2,
      children: 2,
      begats: 6,
      index: 2,
    });

    utils.expandNode('1.2.2', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });

    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 6,
      realyVisible: 6,
      children: 2,
      begats: 6,
      childrenIdx: children1D2,
      index: 2,
    });

    exp(countInfo[ '1.2.2' ]).to.be.eql({
      nowVisible: 4,
      realyVisible: 4,
      childrenIdx: children1D2D2,
      children: 2,
      begats: 4,
      index: 4,
    });

    utils.expandNode('1.3', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      childrenIdx: children1,

      children: 3,
      begats: 16,
      index: 0,
    });

    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 6,
      realyVisible: 6,
      children: 2,
      begats: 6,
      index: 2,
      childrenIdx: children1D2,
    });

    exp(countInfo[ '1.3' ]).to.be.eql({
      nowVisible: 7,
      realyVisible: 7,
      children: 3,
      childrenIdx: children1D3,
      begats: 7,
      index: 9,
    });

    exp(countInfo[ '1.2.2' ]).to.be.eql({
      nowVisible: 4,
      realyVisible: 4,
      childrenIdx: children1D2D2,
      children: 2,
      begats: 4,
      index: 4,
    });

  });
  it('collapsed expandAll: true nodeId: 展开( 1 -> 1.1-> 1.2->1.2.2->1.3) 折叠: (1.2)', () => {
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);

    utils.expandNode('1.1', countInfo);

    utils.expandNode('1.2', countInfo);

    utils.expandNode('1.2.2', countInfo);

    utils.expandNode('1.3', countInfo);

    utils.colapseNode('1.2', countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 25,
      realyVisible: 25,
      children: 4,
      childrenIdx: childrenRoot,
      begats: 31,
      index: -1,
    });

    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 10,
      realyVisible: 10,
      childrenIdx: children1,

      children: 3,
      begats: 16,
      index: 0,
    });

    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 0,
      realyVisible: 6,
      children: 2,
      expanded: false,
      begats: 6,
      index: 2,
      childrenIdx: children1D2,
    });

    exp(countInfo[ '1.3' ]).to.be.eql({
      nowVisible: 7,
      childrenIdx: children1D3,
      realyVisible: 7,
      children: 3,
      begats: 7,
      index: 9,
    });

    exp(countInfo[ '1.2.2' ]).to.be.eql({
      nowVisible: 4,
      realyVisible: 4,
      childrenIdx: children1D2D2,
      children: 2,
      begats: 4,
      index: 4,
    });

  });

  it('collapsed expandAll: true nodeId: 展开( 1 -> 1.1-> 1.2->1.2.2->1.3) 折叠: (1.2.2)', () => {
    const countInfo = {};
    const expandAll = true;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);

    utils.expandNode('1.1', countInfo);

    utils.expandNode('1.2', countInfo);

    utils.expandNode('1.2.2', countInfo);

    utils.expandNode('1.3', countInfo);

    utils.colapseNode('1.2.2', countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 27,
      realyVisible: 27,
      children: 4,
      begats: 31,
      childrenIdx: childrenRoot,
      index: -1,
    });
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 12,
      childrenIdx: children1,

      realyVisible: 12,
      children: 3,
      begats: 16,
      index: 0,
    });

    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 2,
      realyVisible: 2,
      children: 2,
      begats: 6,
      index: 2,
      childrenIdx: children1D2,

    });

    exp(countInfo[ '1.3' ]).to.be.eql({
      nowVisible: 7,
      realyVisible: 7,
      childrenIdx: children1D3,
      children: 3,
      begats: 7,
      index: 9,
    });

    exp(countInfo[ '1.2.2' ]).to.be.eql({
      nowVisible: 0,
      childrenIdx: children1D2D2,
      expanded: false,
      realyVisible: 4,
      children: 2,
      begats: 4,
      index: 4,
    });

  });

  it('collapsed expandAll: fasle nodeId: 展开( 1 -> 1.1-> 1.2->1.2.2->1.3) 折叠: (1.2.2)', () => {
    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);

    utils.expandNode('1.1', countInfo);

    utils.expandNode('1.2', countInfo);

    utils.expandNode('1.2.2', countInfo);

    utils.expandNode('1.3', countInfo);

    utils.colapseNode('1.2.2', countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 12,
      childrenIdx: childrenRoot,
      realyVisible: 12,
      children: 4,
      begats: 31,
      index: -1,
    });

    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 8,
      childrenIdx: children1,
      realyVisible: 8,

      expanded: true,
      children: 3,
      begats: 16,
      index: 0,
    });

    exp(countInfo[ '1.2' ]).to.be.eql({
      nowVisible: 2,
      realyVisible: 2,
      children: 2,
      expanded: true,
      begats: 6,
      index: 2,
      childrenIdx: children1D2,

    });
    exp(countInfo[ '1.3' ]).to.be.eql({
      nowVisible: 3,
      realyVisible: 3,
      children: 3,
      childrenIdx: children1D3,
      begats: 7,
      index: 9,
      expanded: true,

    });

    exp(countInfo[ '1.2.2' ]).to.be.eql({
      nowVisible: 0,
      childrenIdx: children1D2D2,
      expanded: false,
      realyVisible: 2,
      children: 2,
      begats: 4,
      index: 4,
    });

  });

  it('collapsed expandAll: fasle nodeId: 折叠展开交叉的情况', () => {
    const countInfo = {};
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.expandNode('1', countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 7,
      realyVisible: 7,
      children: 4,
      childrenIdx: childrenRoot,
      begats: 31,
      index: -1,
    });
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 3,
      childrenIdx: children1,

      realyVisible: 3,
      children: 3,
      begats: 16,
      index: 0,
      expanded: true,
    });

    utils.colapseNode('1', countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 4,
      realyVisible: 4,
      children: 4,
      childrenIdx: childrenRoot,
      begats: 31,
      index: -1,
    });
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 0,
      realyVisible: 3,
      children: 3,
      begats: 16,
      childrenIdx: children1,

      index: 0,
      expanded: false,
    });
    utils.expandNode('1', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 3,
      realyVisible: 3,
      children: 3,
      childrenIdx: children1,

      begats: 16,
      index: 0,
      expanded: true,
    });
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 7,
      realyVisible: 7,
      children: 4,
      childrenIdx: childrenRoot,
      begats: 31,
      index: -1,
    });
    utils.expandNode('1.2', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 5,
      realyVisible: 5,
      children: 3,
      begats: 16,
      childrenIdx: children1,

      index: 0,
      expanded: true,
    });
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 9,
      realyVisible: 9,
      children: 4,
      childrenIdx: childrenRoot,
      begats: 31,
      index: -1,
    });

    utils.colapseNode('1.2', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 3,
      realyVisible: 3,
      children: 3,
      childrenIdx: children1,

      begats: 16,
      index: 0,
      expanded: true,
    });
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 7,
      childrenIdx: childrenRoot,

      realyVisible: 7,
      children: 4,
      begats: 31,
      index: -1,
    });

    utils.expandNode('1.2', countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 9,
      childrenIdx: childrenRoot,

      realyVisible: 9,
      children: 4,
      begats: 31,
      index: -1,
    });
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 5,
      realyVisible: 5,
      children: 3,
      begats: 16,
      childrenIdx: children1,

      index: 0,
      expanded: true,
    });
    utils.expandNode('1.2.2', countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 11,
      realyVisible: 11,
      children: 4,
      begats: 31,
      childrenIdx: childrenRoot,

      index: -1,
    });
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 7,
      realyVisible: 7,
      children: 3,
      begats: 16,
      childrenIdx: children1,

      index: 0,
      expanded: true,
    });
    utils.colapseNode('1.2.2', countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 5,
      realyVisible: 5,
      children: 3,
      begats: 16,
      index: 0,
      childrenIdx: children1,

      expanded: true,
    });
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 9,
      realyVisible: 9,
      childrenIdx: childrenRoot,

      children: 4,
      begats: 31,
      index: -1,
    });
  });
  it('slice all node', () => {
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    exp(utils.slice(datas, 0, 100, {})).to.be.eql({ rows: datas, parentCount: 0, });
  });
  it('slice all 1.2.2.1.2', () => {
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    exp(utils.slice(datas, 7, 100, {})).to.be.eql({
      rows: [
        { key: '1', title: '1', },
        { key: '1.2', title: '1.2', pid: '1', path: '1', },
        { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
        { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
        { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
        { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true, },

        { key: '1.3', title: '1.3', pid: '1', path: '1', },
        { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
        { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
        { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
        { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
        { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
        { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
        { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true, },

        { key: '2', title: '2', },
        { key: '2.1', title: '2.1', pid: '2', path: '2', },
        { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true, },
        { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
        { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true, },
        { key: '2.2', title: '2.2', pid: '2', path: '2', },
        { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2', },
        { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
        { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
        { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true, },

        { key: '3', title: '3', },
        { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
        { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
        { key: '4', title: '4', isLeaf: true, },
      ], parentCount: 4,
    });
  });

  it('generateRealTreeData children === nowVisible', () => {

    const bigTree = [];
    for (let a = 0; a < 3; a++) {
      bigTree.push({
        key: `${a}`,
        title: `${a}`,
      });
      for (let b = 0; b < 2; b++) {
        const keyb = `${a}.${b}`;
        bigTree.push({
          key: keyb,
          title: keyb,
          pid: `${a}`,
          path: `${a}`,
        });
        for (let c = 0; c < 3; c++) {
          const keyc = `${a}.${b}.${c}`;
          bigTree.push({
            key: keyc,
            title: keyc,
            pid: `${keyb}`,
            path: `${a}/${keyb}`,
          });
          for (let d = 0; d < 5; d++) {
            const key = `${a}.${b}.${c}.${d}`;
            bigTree.push({
              key,
              title: key,
              pid: `${keyc}`,
              isLeaf: true,
              path: `${a}/${keyb}/${keyc}`,
            });
          }
        }
      }
    }
    const expandAll = false;
    const utils = new TreeUtils(bigTree, { expandAll, });
    const id2ExtendInfo = {};

    utils.expandNode('0', id2ExtendInfo);
    utils.expandNode('0.0', id2ExtendInfo);
    utils.expandNode('0.0.0', id2ExtendInfo);
    const actual = utils.generateRealTreeData({
      id2ExtendInfo,
    });
    exp(actual).to.be.eql([
      { key: '0', title: '0', }, { key: '0.0', title: '0.0', pid: '0', path: '0', },
      { key: '0.0.0', title: '0.0.0', pid: '0.0', path: '0/0.0', },
      { key: '0.0.0.0', title: '0.0.0.0', pid: '0.0.0', isLeaf: true, path: '0/0.0/0.0.0', },
      { key: '0.0.0.1', title: '0.0.0.1', pid: '0.0.0', isLeaf: true, path: '0/0.0/0.0.0', },
      { key: '0.0.0.2', title: '0.0.0.2', pid: '0.0.0', isLeaf: true, path: '0/0.0/0.0.0', },
      { key: '0.0.0.3', title: '0.0.0.3', pid: '0.0.0', isLeaf: true, path: '0/0.0/0.0.0', },
      { key: '0.0.0.4', title: '0.0.0.4', pid: '0.0.0', isLeaf: true, path: '0/0.0/0.0.0', },
      { key: '0.0.1', title: '0.0.1', pid: '0.0', path: '0/0.0', },
      { key: '0.0.2', title: '0.0.2', pid: '0.0', path: '0/0.0', },
      { key: '0.1', title: '0.1', pid: '0', path: '0', },
      { key: '1', title: '1', },
      { key: '2', title: '2', }, ]);
  });

  it('selectNode key: 1.3.2.1 unSelectNode Key: 1.3.2.1', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectNode('1.3.2.1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
        [getKey('1.3.2')]: 1,
        [getKey('1.3.2.1')]: 1,
      }, checked: {
        [getKey('1.3.2.1')]: true,
      }, value: {
        [getKey('1.3.2.1')]: true,
      },
    });

    utils.unSelectNode('1.3.2.1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {},
      checked: {},
      value: {},
    });
  });
  it('selectNode key: 1.3.2 unSelectNode Key: 1.3.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectNode('1.3.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 3,
        [getKey('1.3')]: 3,
        [getKey('1.3.2')]: 3,
      }, checked: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
      }, value: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
      },
    });

    utils.unSelectNode('1.3.2', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {},
      checked: {},
      value: {},
    });
  });
  it('selectNode key: 1.3.2 unSelectNode Key: 1.3.2.1 1.3.2.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectNode('1.3.2', selectedInfo, nodeExpandInfo);

    utils.unSelectNode('1.3.2.1', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 2,
        [getKey('1.3')]: 2,
        [getKey('1.3.2')]: 2,
      },
      checked: {
        [getKey('1.3.2.2')]: true,

      },
      value: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.2')]: true,
      },
    });

    utils.unSelectNode('1.3.2.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
        [getKey('1.3.2')]: 1,
      },
      checked: {},
      value: {
        [getKey('1.3.2')]: true,
      },
    });

  });
  it('selectNode key: 1.3.2.1 unSelectNode Key: 1.3.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectNode('1.3.2.1', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
        [getKey('1.3.2')]: 1,
        [getKey('1.3.2.1')]: 1,
      },
      checked: {
        [getKey('1.3.2.1')]: true,

      },
      value: {
        [getKey('1.3.2.1')]: true,
      },
    });

    utils.unSelectNode('1.3.2', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {},
      checked: {},
      value: {},
    });


  });
  it('selectDirNode key: 1.3', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectDirNode('1.3', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
      },
      checked: {},
      value: {
        [getKey('1.3')]: true,
      },
    });
  });
  it('selectDirNode key: 1.3.2.1 1.3.2.2 1.3.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectDirNode('1.3.2.1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
        [getKey('1.3.2')]: 1,
        [getKey('1.3.2.1')]: 1,
      },
      checked: {
        [getKey('1.3.2.1')]: true,
      },
      value: {
        [getKey('1.3.2.1')]: true,
      },
    });

    utils.selectDirNode('1.3.2.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 2,
        [getKey('1.3')]: 2,
        [getKey('1.3.2')]: 2,
        [getKey('1.3.2.1')]: 1,
        [getKey('1.3.2.2')]: 1,
      },
      checked: {
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
      },
      value: {
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
      },
    });
    utils.selectDirNode('1.3.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 3,
        [getKey('1.3')]: 3,
        [getKey('1.3.2')]: 3,
        [getKey('1.3.2.1')]: 1,
        [getKey('1.3.2.2')]: 1,
      },
      checked: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,

      },
      value: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
      },
    });
  });

  it('selectDirNode key: 1.3.2.1 1.3.2.2 1.3.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectDirNode('1.3.2.1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
        [getKey('1.3.2')]: 1,
        [getKey('1.3.2.1')]: 1,
      },
      checked: {
        [getKey('1.3.2.1')]: true,
      },
      value: {
        [getKey('1.3.2.1')]: true,
      },
    });

    utils.selectDirNode('1.3.2.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 2,
        [getKey('1.3')]: 2,
        [getKey('1.3.2')]: 2,
        [getKey('1.3.2.1')]: 1,
        [getKey('1.3.2.2')]: 1,
      },
      checked: {
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
      },
      value: {
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
      },
    });
    utils.selectDirNode('1.3.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 3,
        [getKey('1.3')]: 3,
        [getKey('1.3.2')]: 3,
        [getKey('1.3.2.1')]: 1,
        [getKey('1.3.2.2')]: 1,
      },
      checked: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,

      },
      value: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
      },
    });
    utils.selectDirNode('1.3.1.1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 4,
        [getKey('1.3')]: 4,
        [getKey('1.3.2')]: 3,
        [getKey('1.3.2.1')]: 1,
        [getKey('1.3.2.2')]: 1,
        [getKey('1.3.1')]: 1,
        [getKey('1.3.1.1')]: 1,

      },
      checked: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
        [getKey('1.3.1.1')]: true,

      },
      value: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
        [getKey('1.3.1.1')]: true,
      },
    });

    utils.selectDirNode('1.3.1.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 5,
        [getKey('1.3')]: 5,
        [getKey('1.3.2')]: 3,
        [getKey('1.3.2.1')]: 1,
        [getKey('1.3.2.2')]: 1,
        [getKey('1.3.1')]: 2,
        [getKey('1.3.1.1')]: 1,
        [getKey('1.3.1.2')]: 1,

      },
      checked: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,

      },
      value: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,
      },
    });

    utils.selectDirNode('1.3.1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 6,
        [getKey('1.3')]: 6,
        [getKey('1.3.2')]: 3,
        [getKey('1.3.2.1')]: 1,
        [getKey('1.3.2.2')]: 1,
        [getKey('1.3.1')]: 3,
        [getKey('1.3.1.1')]: 1,
        [getKey('1.3.1.2')]: 1,

      },
      checked: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
        [getKey('1.3.1')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,

      },
      value: {
        [getKey('1.3.2')]: true,
        [getKey('1.3.2.1')]: true,
        [getKey('1.3.2.2')]: true,
        [getKey('1.3.1')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,
      },
    });

  });


  it('selectNode key: 1.3.1 selectDirNode key: 1.3', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectNode('1.3.1.1', selectedInfo, nodeExpandInfo);


    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
        [getKey('1.3.1')]: 1,
        [getKey('1.3.1.1')]: 1,
      },
      checked: {
        [getKey('1.3.1.1')]: true,
      },
      value: {
        [getKey('1.3.1.1')]: true,

      },
    });

  });

  it('selectNode key: 1.3.1.2  1.3.1.1 unSelectNode Key: 1.3.1.1', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectNode('1.3.1.1', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
        [getKey('1.3.1')]: 1,
        [getKey('1.3.1.1')]: 1,
      },
      checked: {
        [getKey('1.3.1.1')]: true,

      },
      value: {
        [getKey('1.3.1.1')]: true,
      },
    });
    utils.selectNode('1.3.1.2', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 2,
        [getKey('1.3')]: 2,
        [getKey('1.3.1')]: 2,
        [getKey('1.3.1.1')]: 1,
        [getKey('1.3.1.2')]: 1,
      },
      checked: {
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,

      },
      value: {
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,
      },
    });
    utils.unSelectNode('1.3.1.2', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.3')]: 1,
        [getKey('1.3.1')]: 1,
        [getKey('1.3.1.1')]: 1,
      },
      checked: {
        [getKey('1.3.1.1')]: true,

      },
      value: {
        [getKey('1.3.1.1')]: true,
      },
    });


  });

  it('selectNode key: 1.3.1 unSelectNode Key: 1.3.1.1  selectNode key: 1.3.1', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const utils = new TreeUtils(datas, { expandAll: true, });
    utils.selectNode('1.3.1', selectedInfo, nodeExpandInfo);
    utils.unSelectNode('1.3.1.1', selectedInfo, nodeExpandInfo);
    utils.selectNode('1.3.1.1', selectedInfo, nodeExpandInfo);
    utils.selectNode('1.3.1.2', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 3,
        [getKey('1.3')]: 3,
        [getKey('1.3.1')]: 3,
        [getKey('1.3.1.1')]: 1,
      },
      checked: {
        [getKey('1.3.1')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,

      },
      value: {
        [getKey('1.3.1')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,
      },
    });


  });


  it('selectNode key: 1.2.2 unSelectNode Key: 1.2.2.1.1 & 1.2.2.1.2 & 1.2.2.1', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectNode('1.2.2', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 5,
        [getKey('1.2')]: 5,
        [getKey('1.2.2')]: 5,
        [getKey('1.2.2.1')]: 3,
      },
      checked: {
        [getKey('1.2.2')]: true,
        [getKey('1.2.2.1')]: true,
        [getKey('1.2.2.1.1')]: true,
        [getKey('1.2.2.1.2')]: true,
        [getKey('1.2.2.2')]: true,

      },
      value: {
        [getKey('1.2.2')]: true,
        [getKey('1.2.2.1')]: true,
        [getKey('1.2.2.1.1')]: true,
        [getKey('1.2.2.1.2')]: true,
        [getKey('1.2.2.2')]: true,
      },
    });
    utils.unSelectNode('1.2.2.1.1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 4,
        [getKey('1.2')]: 4,
        [getKey('1.2.2')]: 4,
        [getKey('1.2.2.1')]: 2,
      },
      checked: {
        [getKey('1.2.2.2')]: true,
        [getKey('1.2.2.1.2')]: true,

      },
      value: {
        [getKey('1.2.2')]: true,
        [getKey('1.2.2.1')]: true,
        [getKey('1.2.2.1.2')]: true,
        [getKey('1.2.2.2')]: true,
      },
    });
    utils.unSelectNode('1.2.2.1.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 3,
        [getKey('1.2')]: 3,
        [getKey('1.2.2')]: 3,
        [getKey('1.2.2.1')]: 1,
      },
      checked: {
        [getKey('1.2.2.2')]: true,

      },
      value: {
        [getKey('1.2.2')]: true,
        [getKey('1.2.2.1')]: true,
        [getKey('1.2.2.2')]: true,
      },
    });

    utils.unSelectNode('1.2.2.1', selectedInfo, nodeExpandInfo);

    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 2,
        [getKey('1.2')]: 2,
        [getKey('1.2.2')]: 2,
      },
      checked: {
        [getKey('1.2.2.2')]: true,

      },
      value: {
        [getKey('1.2.2')]: true,
        [getKey('1.2.2.2')]: true,
      },
    });

  });


  it(' selectNode key: 1.2 unSelectNode Key: 1.2.1 - 1.2.2.2 - 1.2.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, });
    utils.selectNode('1.2', selectedInfo, nodeExpandInfo);
    utils.unSelectNode('1.2.1', selectedInfo, nodeExpandInfo);
    utils.unSelectNode('1.2.2.2', selectedInfo, nodeExpandInfo);
    utils.unSelectNode('1.2.2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql({
      halfchecked: {
        [getKey('1')]: 1,
        [getKey('1.2')]: 1,
      },
      checked: {},
      value: {
        [getKey('1.2')]: true,
      },
    });
  });
  it(' selectNode key: 1.2 onlySelectLeaf: true,  unSelectNode Key:  1.2.1 - 1.2.2.2 - 1.2.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, onlySelectLeaf: true, });
    utils.selectNode('1.2', selectedInfo, nodeExpandInfo);
    utils.unSelectNode('1.2.1', selectedInfo, nodeExpandInfo);
    utils.unSelectNode('1.2.2.2', selectedInfo, nodeExpandInfo);
    utils.unSelectNode('1.2.2', selectedInfo, nodeExpandInfo);
    utils.selectNode('1.2.1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo.value).to.be.eql({
      [getKey('1.2.1')]: true,
    });
  });
  it(' selectDirNode key: 1 onlySelectLeaf: true,  ', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, onlySelectLeaf: true, });
    utils.selectDirNode('1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo.value).to.be.eql({});
  });
  it(' selectDirNode key: 1 igronSelectField: disabled,  ', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils([ { key: '1', title: '1', disabled: true, }, ], {
      expandAll,
      igronSelectField: 'disabled',
    });
    utils.selectDirNode('1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo.value).to.be.eql({});
  });
  it(' selectDirNode key: 1 limitCount: 1  ', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, limitCount: 1, });
    utils.selectDirNode('1', selectedInfo, nodeExpandInfo);
    utils.selectDirNode('2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo.value).to.be.eql({
      [ getKey('1')]: true,
    });
  });
  it(' selectNode key: 1 limitCount: 3  ', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, limitCount: 3, });
    utils.selectNode('1', selectedInfo, nodeExpandInfo);
    utils.selectNode('2', selectedInfo, nodeExpandInfo);
    exp(selectedInfo.value).to.be.eql({
      [ getKey('1')]: true,
      [ getKey('1.1')]: true,
      [ getKey('1.2')]: true,
    });
    //TODO: 未考虑如果叶子结点不能选择的话 checked不能为true
    // exp(selectedInfo.checked).to.be.eql({
    //   [ getKey('1.1')]: true,
    //   [ getKey('1.2')]: true,
    // });
  });

  it(' selectNode key: 1.2 igronSelectField: disabled,  unSelectNode Key:  1.2.1 - 1.2.2.2 - 1.2.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils([ { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, disabled: true, },
      { key: '1.2', title: '1.2', pid: '1', path: '1', disabled: true, },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, disabled: true, },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true, disabled: true, }, ], {
      expandAll,
      onlySelectLeaf: false,
      igronSelectField: 'disabled',
    });
    utils.selectNode('1.2', selectedInfo, nodeExpandInfo);

    exp(selectedInfo.value).to.be.eql({
      [getKey('1.2.2')]: true,
      [getKey('1.2.2.1')]: true,
      [getKey('1.2.2.1.1')]: true,
      [getKey('1.2.2.1.2')]: true,
    });
  });
  it(' selectNode key: 1.2 onlySelectLeaf: true igronSelectField: disabled,  unSelectNode Key:  1.2.1 - 1.2.2.2 - 1.2.2', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils([ { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, disabled: true, },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, disabled: true, },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true, disabled: true, }, ], {
      expandAll,
      onlySelectLeaf: true,
      igronSelectField: 'disabled',
    });
    utils.selectNode('1.2', selectedInfo, nodeExpandInfo);

    exp(selectedInfo.value).to.be.eql({
      [getKey('1.2.2.1.1')]: true,
      [getKey('1.2.2.1.2')]: true,
    });
  });

  it(' selectNode key: 1 onlySelectLeaf: true', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { halfchecked: {}, checked: {}, value: {}, };
    const expandAll = false;
    const utils = new TreeUtils(datas, { expandAll, onlySelectLeaf: true, });
    utils.selectNode('1', selectedInfo, nodeExpandInfo);
    exp(selectedInfo.value).to.be.eql({
      [getKey('1.1')]: true,
      [getKey('1.2.1')]: true,
      [getKey('1.2.2.1.1')]: true,
      [getKey('1.2.2.1.2')]: true,
      [getKey('1.2.2.2')]: true,
      [getKey('1.3.1.1')]: true,
      [getKey('1.3.1.2')]: true,
      [getKey('1.3.2.1')]: true,
      [getKey('1.3.2.2')]: true,
      [getKey('1.3.3')]: true,
    });
  });

  it('value2SelectInfo only leafNode', () => {

    const value = {
      [getKey('1.2.2.1.1')]: true,
      [getKey('1.2.2.1.2')]: true,
    };
    const id2ExtendInfo = {};
    utils.initAllNodeIndexAndTopRoot(datas, id2ExtendInfo);

    const result = utils.value2SelectInfo(Object.keys(value), [], value, id2ExtendInfo);
    exp(result).to.be.eql(
      {
        halfchecked: {
          [getKey('1')]: 2,
          [getKey('1.2')]: 2,
          [getKey('1.2.2')]: 2,
          [getKey('1.2.2.1')]: 2,
          [getKey('1.2.2.1.1')]: 1,
          [getKey('1.2.2.1.2')]: 1,
        },
        checked: {
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
        },
        value: {
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
        },
      }
    );
  });
  it('value2SelectInfo leafNode & dirNdoe  halfChecked 不存在', () => {

    const value = {
      [getKey('1.3.1')]: true,
      [getKey('1.2.2.1.1')]: true,
      [getKey('1.2.2.1.2')]: true,
    };
    const id2ExtendInfo = {};
    utils.initAllNodeIndexAndTopRoot(datas, id2ExtendInfo);

    const result = utils.value2SelectInfo(Object.keys(value), [], value, id2ExtendInfo);
    exp(result).to.be.eql(
      {
        halfchecked: {
          [getKey('1')]: 3,
          [getKey('1.3')]: 1,
          [getKey('1.3.1')]: 1,
          [getKey('1.2')]: 2,
          [getKey('1.2.2')]: 2,
          [getKey('1.2.2.1')]: 2,
          [getKey('1.2.2.1.1')]: 1,
          [getKey('1.2.2.1.2')]: 1,
        },
        checked: {
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
        },
        value: {
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
          [getKey('1.3.1')]: true,
        },
      }
    );
  });
  it('value2SelectInfo leafNode & dirNdoe  halfChecked 已存在', () => {

    const value = {
      [getKey('1.2.2.1')]: true,
      [getKey('1.2.2.1.1')]: true,
      [getKey('1.2.2.1.2')]: true,
    };
    const id2ExtendInfo = {};
    utils.initAllNodeIndexAndTopRoot(datas, id2ExtendInfo);

    const result = utils.value2SelectInfo(Object.keys(value), [], value, id2ExtendInfo);
    exp(result).to.be.eql(
      {
        halfchecked: {
          [getKey('1')]: 3,
          [getKey('1.2')]: 3,
          [getKey('1.2.2')]: 3,
          [getKey('1.2.2.1')]: 3,
          [getKey('1.2.2.1.1')]: 1,
          [getKey('1.2.2.1.2')]: 1,
        },
        checked: {
          [getKey('1.2.2.1')]: true,
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
        },
        value: {
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
          [getKey('1.2.2.1')]: true,
        },
      }
    );
  });
  it('value2SelectInfo leafNode & dirNdoe  三级结点', () => {

    const value = {
      [getKey('1.2.2')]: true,
      [getKey('1.2.2.1')]: true,
      [getKey('1.2.2.1.1')]: true,
      [getKey('1.2.2.1.2')]: true,
      [getKey('1.2.2.2')]: true,
    };
    const id2ExtendInfo = {};
    utils.initAllNodeIndexAndTopRoot(datas, id2ExtendInfo);

    const result = utils.value2SelectInfo(Object.keys(value), [], value, id2ExtendInfo);
    exp(result).to.be.eql(
      {
        halfchecked: {
          [getKey('1')]: 5,
          [getKey('1.2.2.1.1')]: 1,
          [getKey('1.2')]: 5,
          [getKey('1.2.2')]: 5,
          [getKey('1.2.2.1')]: 3,
          [getKey('1.2.2.1.2')]: 1,
          [getKey('1.2.2.2')]: 1,
        },
        checked: {
          [getKey('1.2.2')]: true,
          [getKey('1.2.2.1')]: true,
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
          [getKey('1.2.2.2')]: true,
        },
        value: {
          [getKey('1.2.2')]: true,
          [getKey('1.2.2.1')]: true,
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
          [getKey('1.2.2.2')]: true,
        },
      }
    );
  });

  it('value2SelectInfo 配合查询  query: 1.3.1 选择 1  query: 1.3.1.a', () => {
    const id2ExtendInfo = {};
    const expandInfo = {
      id2ExtendInfo,
    };

    const selectedInfo = {
      halfchecked: {},
      checked: {},
      value: {},
    };
    utils.search(expandInfo, '1.3.1');
    utils.selectNode('1', selectedInfo, expandInfo.id2ExtendInfo);

    utils.search(expandInfo, '1.3.1.a');

    let result = utils.value2SelectInfo(Object.keys(selectedInfo.value), [], selectedInfo.value, expandInfo.id2ExtendInfo);
    exp(result).to.be.eql({
      halfchecked: {},
      checked: {},
      value: {
        [getKey('1')]: true,
        [getKey('1.3')]: true,
        [getKey('1.3.1')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,
      },
    });
    utils.search(expandInfo, '');
    result = utils.value2SelectInfo(Object.keys(selectedInfo.value), [], selectedInfo.value, expandInfo.id2ExtendInfo);
    exp(result).to.be.eql({
      halfchecked: {
        [getKey('1')]: 5,
        [getKey('1.3')]: 4,
        [getKey('1.3.1')]: 3,
        [getKey('1.3.1.1')]: 1,
        [getKey('1.3.1.2')]: 1,
      },
      checked: {
        [getKey('1.3.1')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,
      },
      value: {
        [getKey('1')]: true,
        [getKey('1.3')]: true,
        [getKey('1.3.1')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,
      },
    });
  });
  it('value2SelectInfo 跨级松散', () => {
    const id2ExtendInfo = {};


    const valueObj = {
      [getKey('1')]: true,
      [getKey('1.3')]: true,
      [getKey('1.3.1')]: true,
      [getKey('1.3.1.1')]: true,
      [getKey('1.3.1.2')]: true,
    };
    const result = utils.value2SelectInfo(Object.keys(valueObj), [], valueObj, id2ExtendInfo);
    exp(result).to.be.eql({
      halfchecked: {
        [getKey('1')]: 5,
        [getKey('1.3')]: 4,
        [getKey('1.3.1')]: 3,
        [getKey('1.3.1.1')]: 1,
        [getKey('1.3.1.2')]: 1,
      },
      checked: {
        [getKey('1.3.1')]: true,
        [getKey('1.3.1.1')]: true,
        [getKey('1.3.1.2')]: true,
      },
      value: valueObj,
    });
  });
  it('value2SelectInfo 空对象', () => {
    const id2ExtendInfo = {};


    const result = utils.value2SelectInfo([], [], {}, id2ExtendInfo);
    exp(result).to.be.eql({
      halfchecked: {},
      checked: {},
      value: {},
    });
  });

  function getKey (key: string): string {
    return key;
  }

  it('value2SelectInfo only leafNode', () => {

    const value = {
      [getKey('1.2.2.1.1')]: true,
      [getKey('1.2.2.1.2')]: true,
    };
    const id2ExtendInfo = {};
    utils.initAllNodeIndexAndTopRoot(datas, id2ExtendInfo);

    const result = utils.value2SelectInfo(Object.keys(value), [], value, id2ExtendInfo);
    exp(result).to.be.eql(
      {
        halfchecked: {
          [getKey('1')]: 2,
          [getKey('1.2')]: 2,
          [getKey('1.2.2')]: 2,
          [getKey('1.2.2.1')]: 2,
          [getKey('1.2.2.1.1')]: 1,
          [getKey('1.2.2.1.2')]: 1,
        },
        checked: {
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
        },
        value: {
          [getKey('1.2.2.1.1')]: true,
          [getKey('1.2.2.1.2')]: true,
        },
      }
    );
  });
  it('value2SelectInfo  三级父目录 只有一个子节点', () => {

    const value = {
      [getKey('4')]: true,
      [getKey('5')]: true,
      [getKey('6')]: true,
      [getKey('7')]: true,
    };
    const datas = [ { key: '0', title: '0', },
      {
        key: '1',
        title: '0.0',
        pid: '0',
        path: '0',
      },
      { key: '2', title: '0.0.0', pid: '1', path: '0/1', },
      {
        key: '3',
        title: '0.0.0.0',
        pid: '2',
        isLeaf: true,
        path: '0/1/2',
      },
      { key: '4', title: '1', },
      { key: '5', title: '1.0', pid: '4', path: '4', },
      {
        key: '6',
        title: '1.0.0',
        pid: '5',
        path: '4/5',
      },
      { key: '7', title: '1.0.0.0', pid: '6', isLeaf: true, path: '4/5/6', }, ];
    const id2ExtendInfo = {};

    utils = new TreeUtils(datas, { expandAll: true, });

    const result = utils.value2SelectInfo(Object.keys(value), [], value, id2ExtendInfo);
    exp(result).to.be.eql(
      {
        halfchecked: {
          [getKey('4')]: 4,
          [getKey('5')]: 3,
          [getKey('6')]: 2,
          [getKey('7')]: 1,
        },
        checked: {
          [getKey('4')]: true,
          [getKey('5')]: true,
          [getKey('6')]: true,
          [getKey('7')]: true,
        },
        value: {
          [getKey('4')]: true,
          [getKey('5')]: true,
          [getKey('6')]: true,
          [getKey('7')]: true,
        },
      }
    );
  });

  it('value2SelectInfo  选择根目录下的叶子结点', () => {

    const value = {
      [getKey('4')]: true,
    };

    const id2ExtendInfo = {};

    utils = new TreeUtils(datas, { expandAll: true, });

    const result = utils.value2SelectInfo(Object.keys(value), [], value, id2ExtendInfo);
    exp(result).to.be.eql(
      {
        halfchecked: {},
        checked: {
          [getKey('4')]: true,
        },
        value: {
          [getKey('4')]: true,
        },
      }
    );
  });
  it('value2SelectInfo  存在不包含在树形数据的值 显示值在displayValue里有的', () => {

    const value = {
      [getKey('4')]: true,
      [getKey('100')]: true,
    };

    const id2ExtendInfo = {};

    utils = new TreeUtils(datas, { expandAll: true, });

    const result = utils.value2SelectInfo(Object.keys(value), [ '4', '我', ], value, id2ExtendInfo);

    exp(result).to.be.eql(
      {
        halfchecked: {},
        checked: {
          [getKey('4')]: true,
        },
        value: {
          [getKey('4')]: true,
          [getKey('100')]: true,
        },
      }
    );
    exp(utils.getTitle(Object.keys(value), id2ExtendInfo)).to.be.eql([ '4', '我', ]);
  });

  it('value2SelectInfo  存在不包含在树形数据的值 显示值在displayValue没有的 displayValue就是value 缺失一个displayValue', () => {

    const value = {
      [getKey('4')]: true,
      [getKey('100')]: true,
    };

    const id2ExtendInfo = {};

    utils = new TreeUtils(datas, { expandAll: true, });

    const result = utils.value2SelectInfo(Object.keys(value), [ '4', ], value, id2ExtendInfo);

    exp(result).to.be.eql(
      {
        halfchecked: {},
        checked: {
          [getKey('4')]: true,
        },
        value: {
          [getKey('4')]: true,
          [getKey('100')]: true,
        },
      }
    );
    exp(utils.getTitle([ '4', '100', ], id2ExtendInfo)).to.be.eql([ '4', '100', ]);
  });
  it('value2SelectInfo  存在不包含在树形数据的值 显示值在displayValue没有的 displayValue就是value 缺失多个displayValue', () => {

    const value = {
      [getKey('4')]: true,
      [getKey('100')]: true,
      [getKey('101')]: true,
      [getKey('102')]: true,
    };

    const id2ExtendInfo = {};

    utils = new TreeUtils(datas, { expandAll: true, });

    const result = utils.value2SelectInfo(Object.keys(value), [ '4', ], value, id2ExtendInfo);

    exp(result).to.be.eql(
      {
        halfchecked: {},
        checked: {
          [getKey('4')]: true,
        },
        value: {
          [getKey('4')]: true,
          [getKey('100')]: true,
          [getKey('101')]: true,
          [getKey('102')]: true,
        },
      }
    );
    exp(utils.getTitle(Object.keys(value), id2ExtendInfo)).to.be.eql([ '4', '100', '101', '102', ]);
  });

  it('value2SelectInfo  存在不包含在树形数据的值 显示值在displayValue没有的 displayValue就是value 缺失多个displayValue', () => {

    const value = {
      [getKey('4')]: true,
      [getKey('100')]: true,
      [getKey('101')]: true,
      [getKey('102')]: true,
    };

    const id2ExtendInfo = {};
    const titleDatas = [
      { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true, },

      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
      { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
      { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
      { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
      { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
      { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
      { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true, },

      { key: '2', title: '2', },
      { key: '2.1', title: '2.1', pid: '2', path: '2', },
      { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true, },
      { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
      { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true, },
      { key: '2.2', title: '2.2', pid: '2', path: '2', },
      { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2', },
      { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
      { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
      { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true, },

      { key: '3', title: '3', },
      { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
      { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
      { key: '4', title: '你好', isLeaf: true, }, ];
    utils = new TreeUtils(titleDatas, { expandAll: true, });

    const result = utils.value2SelectInfo(Object.keys(value), [ '4', ], value, id2ExtendInfo);

    exp(result).to.be.eql(
      {
        halfchecked: {},
        checked: {
          [getKey('4')]: true,
        },
        value: {
          [getKey('4')]: true,
          [getKey('100')]: true,
          [getKey('101')]: true,
          [getKey('102')]: true,
        },
      }
    );
    exp(utils.getTitle(Object.keys(value), id2ExtendInfo)).to.be.eql([ '你好', '100', '101', '102', ]);
  });
  it('value2SelectInfo  displayField : 为text', () => {

    const value = {
      [getKey('4')]: true,
      [getKey('100')]: true,
      [getKey('101')]: true,
      [getKey('102')]: true,
    };

    const id2ExtendInfo = {};
    const titleDatas = [
      { key: '1', text: '1', },
      { key: '1.1', text: '1.1', pid: '1', path: '1', isLeaf: true, },
      { key: '1.2', text: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', text: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, },
      { key: '1.2.2', text: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', text: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.2.2.1.1', text: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.1.2', text: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
      { key: '1.2.2.2', text: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true, },

      { key: '1.3', text: '1.3', pid: '1', path: '1', },
      { key: '1.3.1', text: '1.3.1', pid: '1.3', path: '1/1.3', },
      { key: '1.3.1.1', text: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
      { key: '1.3.1.2', text: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
      { key: '1.3.2', text: '1.3.2', pid: '1.3', path: '1/1.3', },
      { key: '1.3.2.1', text: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
      { key: '1.3.2.2', text: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
      { key: '1.3.3', text: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true, },

      { key: '2', text: '2', },
      { key: '2.1', text: '2.1', pid: '2', path: '2', },
      { key: '2.1.1', text: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true, },
      { key: '2.1.2', text: '2.1.2', pid: '2.1', path: '2/2.1', },
      { key: '2.1.2.1', text: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true, },
      { key: '2.2', text: '2.2', pid: '2', path: '2', },
      { key: '2.2.1', text: '2.2.1', pid: '2.2', path: '2/2.2', },
      { key: '2.2.1.1', text: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
      { key: '2.2.1.2', text: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
      { key: '2.2.2', text: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true, },

      { key: '3', text: '3', },
      { key: '3.1', text: '3.1', pid: '3', path: '3', isLeaf: true, },
      { key: '3.2', text: '3.2', pid: '3', path: '3', isLeaf: true, },
      { key: '4', text: '你好', isLeaf: true, }, ];
    utils = new TreeUtils(titleDatas, { expandAll: true, displayField: 'text', });

    const result = utils.value2SelectInfo(Object.keys(value), [ '4', ], value, id2ExtendInfo);

    exp(result).to.be.eql(
      {
        halfchecked: {},
        checked: {
          [getKey('4')]: true,
        },
        value: {
          [getKey('4')]: true,
          [getKey('100')]: true,
          [getKey('101')]: true,
          [getKey('102')]: true,
        },
      }
    );
    exp(utils.getTitle(Object.keys(value), id2ExtendInfo)).to.be.eql([ '你好', '100', '101', '102', ]);
  });

});
