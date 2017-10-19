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

  const datas = [
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
  let utils;
  beforeEach(() => {
    utils = new TreeUtils(datas, false);
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
    const utils = new TreeUtils(datas, false);
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


  // [
  //   { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
  //   { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
  //   { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true, },
  //   { key: '3', title: '3', },
  //   { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
  // ]


  it('generateRealTreeData  expandedAll: true 第一次获取', () => {
    const id2ExtendInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    exp(utils.generateRealTreeData({
      expandedAll,
      target: {},
      id2ExtendInfo,
    })).to.be.eql(datas);
  });


  it('generateRealTreeData expandedAll: false 第一次获取', () => {
    const id2ExtendInfo = {};
    const utils = new TreeUtils(datas, false);
    const actual = utils.generateRealTreeData({
      expandedAll: false,
      target: {},
      id2ExtendInfo,
    });

    exp(actual).to.be.eql([
      { key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
      { key: '4', title: '4', isLeaf: true, },
    ]);
  });


  it('generateRealTreeData expandedAll: true 折叠全部', () => {
    const id2ExtendInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);

    utils.colapseNode('1', datas, id2ExtendInfo);
    utils.colapseNode('2', datas, id2ExtendInfo);
    utils.colapseNode('3', datas, id2ExtendInfo);
    utils.colapseNode('4', datas, id2ExtendInfo);
    const actual = utils.generateRealTreeData({
      expandedAll,
      target: {},
      id2ExtendInfo,
    });

    exp(actual).to.be.eql([
      { key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
      { key: '4', title: '4', isLeaf: true, },
    ]);
    exp(utils.generateRealTreeData({
      expandedAll,
      target: {},
      id2ExtendInfo,
    })).to.be.equal(actual);
  });
  it('generateRealTreeData expandedAll: true 折叠全部后 再 全部展开', () => {
    const rs = [];
    Array.prototype.push.apply(rs, datas);
    const id2ExtendInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.colapseNode('1', datas, id2ExtendInfo);
    utils.colapseNode('2', datas, id2ExtendInfo);
    utils.colapseNode('3', datas, id2ExtendInfo);
    utils.colapseNode('4', datas, id2ExtendInfo);
    utils.expandNode('1', datas, id2ExtendInfo);
    utils.expandNode('2', datas, id2ExtendInfo);
    utils.expandNode('3', datas, id2ExtendInfo);
    utils.expandNode('4', datas, id2ExtendInfo);
    const actual = utils.generateRealTreeData({
      expandedAll,
      target: {},
      id2ExtendInfo,
    });
    exp(actual).to.be.eql(datas);
  });
  it('generateRealTreeData expandedAll: true 折叠1 2 ', () => {
    const id2ExtendInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);

    utils.colapseNode('1', datas, id2ExtendInfo);
    utils.colapseNode('2', datas, id2ExtendInfo);
    const actual = utils.generateRealTreeData({
      expandedAll,
      target: {},
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

  it('generateRealTreeData expandedAll: true 折叠1.2 2', () => {
    const id2ExtendInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);

    utils.colapseNode('1.2', datas, id2ExtendInfo);
    utils.colapseNode('2', datas, id2ExtendInfo);
    const actual = utils.generateRealTreeData({
      expandedAll,
      target: {},
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


  it('generateRealTreeData expandedAll: false 展开 1 2 3 ', () => {
    const id2ExtendInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);

    utils.expandNode('1', datas, id2ExtendInfo);
    utils.expandNode('2', datas, id2ExtendInfo);
    utils.expandNode('3', datas, id2ExtendInfo);
    const actual = utils.generateRealTreeData({
      expandedAll,
      target: {},
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

  it('generateRealTreeData expandedAll: false 展开 1 1.1  1.3 1.3.1 1.3.2 3', () => {
    const id2ExtendInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);

    utils.expandNode('1', datas, id2ExtendInfo);
    utils.expandNode('1.1', datas, id2ExtendInfo);
    utils.expandNode('1.3', datas, id2ExtendInfo);
    utils.expandNode('1.3.1', datas, id2ExtendInfo);
    utils.expandNode('1.3.2', datas, id2ExtendInfo);
    utils.expandNode('3', datas, id2ExtendInfo);
    const actual = utils.generateRealTreeData({
      expandedAll,
      target: {},
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
    const expandedAll = false;
    const utils = new TreeUtils([], expandedAll);
    const id2ExtendInfo = {};
    exp(utils.generateRealTreeData({
      expandedAll,
      target: {},
      id2ExtendInfo,
    })).to.be.eql([]);
  });

  it('generateTreeNode empty', () => {
    const utils = new TreeUtils(datas, false);
    exp(utils.generateTreeNode([])).to.be.eql([]);
  });


  it('generateTreeNode is tree', () => {
    const utils = new TreeUtils(datas, false);
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

    exp(actual).to.be.eql(expectResult);
  });


  it('getPathNodes 起始节点为1级结点', () => {
    const utils = new TreeUtils(datas, false);
    exp(utils.getPathNodes(datas, 1, {})).to.be.eql([
      { key: '1', title: '1', }, ]);
  });

  it('getPathNodes 起始结点非根结点 2 级', () => {
    const utils = new TreeUtils(datas, false);
    exp(utils.getPathNodes(datas, 3, {})).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', }, ]);
  });

  it('getPathNodes 起始结点非根结点 3 级', () => {
    const utils = new TreeUtils(datas, false);
    exp(utils.getPathNodes(datas, 7, {})).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', }, ]);
  });

  it('slice empty', () => {
    const utils = new TreeUtils(datas, false);
    exp(utils.getPathNodes([], 1, {})).to.be.eql([]);
  });


  it('getKeys', () => {
    const utils = new TreeUtils(datas, false);
    const result = utils.getKeys([ { key: '1', title: '1', }, { key: '2', title: '2', }, { key: '3', title: '3', }, ]);
    exp(result).to.be.eql([ '1', '2', '3', ]);
  });

  it('fetchNodeExtendInfo will exisit', () => {
    const utils = new TreeUtils(datas, false);
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
  it('fetchNodeExtendInfo for virual root for expandedAll: true', () => {
    const expectResult = {
      nowVisible: datas.length,
      realyVisible: datas.length,
      children: 4,
      begats: datas.length,
      index: -1,
      childrenIdx: childrenRoot,
    };
    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    const nodeId = utils.VirtualRoot;

    exp(utils.fetchNodeExtendInfo(nodeId, datas, countInfo)).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
    baseCountInfo[ nodeId ] = expectResult;
    exp(countInfo).to.be.eql(baseCountInfo);
  });

  it('fetchNodeExtendInfo for virual root for expandedAll: false', () => {

    const expectResult = {
      nowVisible: 4,
      realyVisible: 4,
      children: 4,
      begats: datas.length,
      childrenIdx: childrenRoot,
      index: -1,
    };
    const utils = new TreeUtils(datas, false);

    const nodeId = utils.VirtualRoot;
    const countInfo = {};

    exp(utils.fetchNodeExtendInfo(nodeId, datas, countInfo)).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
    baseCountInfo[ nodeId ] = expectResult;
    exp(countInfo).to.be.eql(baseCountInfo);
  });

  it('fetchNodeExtendInfo for normal node for expandedAll: false nodeId: 1', () => {

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
    const utils = new TreeUtils(datas, false);

    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
  });

  it('fetchNodeExtendInfo for normal node for expandedAll: true  nodeId: 1', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);

    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });
  it('fetchNodeExtendInfo for normal node for expandedAll: false nodeId: 2', () => {

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
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });

  it('fetchNodeExtendInfo for normal node for expandedAll: true  nodeId: 2', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });
  it('fetchNodeExtendInfo for normal node for expandedAll: false nodeId: 2.1.1', () => {

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
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });

  it('fetchNodeExtendInfo for normal node for expandedAll: true  nodeId: 2.1.1', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });
  it('fetchNodeExtendInfo for normal node for expandedAll: false nodeId: 2.1.2', () => {

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
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });

  it('fetchNodeExtendInfo for normal node for expandedAll: true  nodeId: 2.1.2', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });

  it('expandNode expandedAll: false nodeId: 1', () => {

    const nodeId = '1';
    const countInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode(nodeId, datas, countInfo);
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


  it('expandNode expandedAll: true nodeId: 1', () => {

    const nodeId = '1';
    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode(nodeId, datas, countInfo);
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
  it('colapseNode expandedAll: true nodeId: 1', () => {

    const nodeId = '1';
    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode(nodeId, datas, countInfo);
    utils.colapseNode(nodeId, datas, countInfo);

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

  it('colapseNode expandedAll: false nodeId: 1', () => {

    const nodeId = '1';
    const countInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode(nodeId, datas, countInfo);
    exp(countInfo[ utils.VirtualRoot ]).to.be.eql({
      nowVisible: 7,
      realyVisible: 7,
      children: 4,
      begats: 31,
      childrenIdx: childrenRoot,
      index: -1,
    });
    utils.colapseNode(nodeId, datas, countInfo);
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

  it('expandNode expandedAll: true nodeId: 1 展开折叠的结点', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode(nodeId, datas, countInfo);
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

  it('expandNode expandedAll: true nodeId: 1 展开初始化的结点', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode(nodeId, datas, countInfo);
    exp(countInfo[ nodeId ]).to.be.eql({
      nowVisible: 0,
      realyVisible: 16,
      childrenIdx: [],
      children: 3,
      begats: 16,
      index: 0,
    });
  });

  it('expandNode expandedAll: false nodeId: 1 展开初始化的结点', () => {

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
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode(nodeId, datas, countInfo);
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
  it('expandNode expandedAll: false nodeId: 1 展开展开结点', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode(nodeId, datas, countInfo);
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
  it('colapseNode expandedAll: true nodeId: 1 折叠折叠结点', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.colapseNode(nodeId, datas, countInfo);
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

  it('colapseNode expandedAll: true nodeId: 1 折叠初始化的结点', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.colapseNode(nodeId, datas, countInfo);
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

  it('colapseNode expandedAll: false nodeId: 1 折叠折叠结点', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.colapseNode(nodeId, datas, countInfo);
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
  it('colapseNode expandedAll: false nodeId: 1 折叠初始化结点', () => {

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
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.colapseNode(nodeId, datas, countInfo);
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

  it('expandNode expandedAll: false nodeId: 1 , 1.1 重复展开', () => {

    const countInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);
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
      utils.expandNode('1.2', datas, countInfo);
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
  it('expandNode expandedAll: true nodeId: 1 , 1.1 重复展开', () => {

    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);

    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });

    function reapat () {
      utils.expandNode('1.2', datas, countInfo);
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

  it('colapseNode expandedAll: false 展开:(1->1.2) 折叠:(1.2) 重复折叠', () => {

    const countInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);
    utils.expandNode('1.2', datas, countInfo);

    function reapat () {
      utils.colapseNode('1.2', datas, countInfo);
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

  it('colapseNode expandedAll: false 展开:(1->1.2) 折叠:(1 -> 1.2) 重复折叠', () => {

    const countInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);
    utils.expandNode('1.2', datas, countInfo);
    utils.colapseNode('1', datas, countInfo);
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


      utils.colapseNode('1.2', datas, countInfo);
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
  it('colapseNode expandedAll: true 展开:(1->1.2) 折叠:(1.2) 重复折叠', () => {

    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);
    utils.expandNode('1.2', datas, countInfo);

    function reapat () {
      utils.colapseNode('1.2', datas, countInfo);
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

  it('colapseNode expandedAll: true 展开:(1->1.2) 折叠:(1 -> 1.2) 重复折叠', () => {

    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);
    utils.expandNode('1.2', datas, countInfo);
    utils.colapseNode('1', datas, countInfo);
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


      utils.colapseNode('1.2', datas, countInfo);
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

  it('expandNode expandedAll: false nodeId: 1 -> 1.1-> 1.2->1.2.2->1.3', () => {

    const countInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 3,
      expanded: true,
      realyVisible: 3,
      children: 3,
      begats: 16,
      index: 0,
      childrenIdx: children1,
    });

    utils.expandNode('1.1', datas, countInfo);

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
      nowVisible: 0,
      realyVisible: 0,
      children: 0,
      begats: 0,
      index: 1,
      childrenIdx: [],

    });

    utils.expandNode('1.2', datas, countInfo);
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


    utils.expandNode('1.2.2', datas, countInfo);
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

  it('expandNode expandedAll: true nodeId: 1 -> 1.1-> 1.2->1.2.2->1.3', () => {
    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);
    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });

    utils.expandNode('1.1', datas, countInfo);

    exp(countInfo[ '1' ]).to.be.eql({
      nowVisible: 16,
      realyVisible: 16,
      children: 3,
      begats: 16,
      childrenIdx: children1,
      index: 0,
    });
    exp(countInfo[ '1.1' ]).to.be.eql({
      nowVisible: 0,
      realyVisible: 0,
      children: 0,
      begats: 0,
      childrenIdx: [],
      index: 1,
    });

    utils.expandNode('1.2', datas, countInfo);
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

    utils.expandNode('1.2.2', datas, countInfo);
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

    utils.expandNode('1.3', datas, countInfo);
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
  it('collapsed expandedAll: true nodeId: 展开( 1 -> 1.1-> 1.2->1.2.2->1.3) 折叠: (1.2)', () => {
    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);

    utils.expandNode('1.1', datas, countInfo);

    utils.expandNode('1.2', datas, countInfo);

    utils.expandNode('1.2.2', datas, countInfo);

    utils.expandNode('1.3', datas, countInfo);

    utils.colapseNode('1.2', datas, countInfo);
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

  it('collapsed expandedAll: true nodeId: 展开( 1 -> 1.1-> 1.2->1.2.2->1.3) 折叠: (1.2.2)', () => {
    const countInfo = {};
    const expandedAll = true;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);

    utils.expandNode('1.1', datas, countInfo);

    utils.expandNode('1.2', datas, countInfo);

    utils.expandNode('1.2.2', datas, countInfo);

    utils.expandNode('1.3', datas, countInfo);

    utils.colapseNode('1.2.2', datas, countInfo);
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

  it('collapsed expandedAll: fasle nodeId: 展开( 1 -> 1.1-> 1.2->1.2.2->1.3) 折叠: (1.2.2)', () => {
    const countInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);

    utils.expandNode('1.1', datas, countInfo);

    utils.expandNode('1.2', datas, countInfo);

    utils.expandNode('1.2.2', datas, countInfo);

    utils.expandNode('1.3', datas, countInfo);

    utils.colapseNode('1.2.2', datas, countInfo);
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

  it('collapsed expandedAll: fasle nodeId: 折叠展开交叉的情况', () => {
    const countInfo = {};
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.expandNode('1', datas, countInfo);
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

    utils.colapseNode('1', datas, countInfo);
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
    utils.expandNode('1', datas, countInfo);
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
    utils.expandNode('1.2', datas, countInfo);
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

    utils.colapseNode('1.2', datas, countInfo);
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

    utils.expandNode('1.2', datas, countInfo);
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
    utils.expandNode('1.2.2', datas, countInfo);
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
    utils.colapseNode('1.2.2', datas, countInfo);
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
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    exp(utils.slice(datas, 0, 100, {})).to.be.eql({ rows: datas, parentCount: 0, });
  });
  it('slice all 1.2.2.1.2', () => {
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
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
    const expandedAll = false;
    const utils = new TreeUtils(bigTree, expandedAll);
    const id2ExtendInfo = {};

    utils.expandNode('0', bigTree, id2ExtendInfo);
    utils.expandNode('0.0', bigTree, id2ExtendInfo);
    utils.expandNode('0.0.0', bigTree, id2ExtendInfo);
    const actual = utils.generateRealTreeData({
      expandedAll,
      target: {},
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

  it('selectNode key: 1', () => {
    const nodeExpandInfo = {};
    const selectedInfo = { checked: {}, value: {}, };
    const targetKey = '1';
    const expectResult = { checked: {}, value: {}, };
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    utils.selectNode(targetKey, selectedInfo, nodeExpandInfo);

    datas.forEach((row: Object) => {
      const { path, key, } = row;
      if (path && path.startsWith(`${targetKey}`)) {
        expectResult.checked[ key ] = true;
        expectResult.value[ key ] = true;
      }
    });
    expectResult.checked[ targetKey ] = true;
    expectResult.value[ targetKey ] = true;
    exp(selectedInfo).to.be.eql(expectResult);
  });

  it('selectNode key: 1.3.3', () => {
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    const nodeExpandInfo = {};
    const selectedInfo = { checked: {}, value: {}, };
    const targetKey = '1.3.3';
    utils.selectNode(targetKey, selectedInfo, nodeExpandInfo);
    const expectResult = { checked: { [targetKey]: true, }, value: { [targetKey]: true, }, };

    exp(selectedInfo).to.be.eql(expectResult);
  });

  it('selectNode key: 1.3.3', () => {
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    const nodeExpandInfo = {};
    const selectedInfo = { checked: {}, value: {}, };
    const targetKey = '3';
    utils.selectNode(targetKey, selectedInfo, nodeExpandInfo);
    const expectResult = { checked: {}, value: {}, };
    const res = {
      [targetKey]: true,
      ['3.1' + '']: true,
      ['3.2' + '']: true,
    };
    expectResult.checked = res;
    expectResult.value = res;
    exp(selectedInfo).to.be.eql(expectResult);
  });
  it('selectNode key: 1 3', () => {
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    const nodeExpandInfo = {};
    const selectedInfo = { checked: {}, value: {}, };
    const targetKey = '1';
    const three = '3';
    const res = {
      [targetKey]: true,
      [three]: true,
      ['3.1' + '']: true,
      ['3.2' + '']: true,
    };
    const expectResult = { checked: res, value: res, };
    utils.selectNode(targetKey, selectedInfo, nodeExpandInfo);
    utils.selectNode(three, selectedInfo, nodeExpandInfo);

    datas.forEach((row: Object) => {
      const { path, key, } = row;
      if (path && path.startsWith(`${targetKey}`)) {
        expectResult.checked[ key ] = expectResult.value[ key ] = true;
      }
    });
    exp(selectedInfo).to.be.eql(expectResult);
  });

  it('selectNode key: 1 unSelectNode key: 1', () => {
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    const nodeExpandInfo = {};
    const selectedInfo = { checked: {}, value: {}, };
    const targetKey = '1';

    utils.selectNode(targetKey, selectedInfo, nodeExpandInfo);
    const expectResult = { checked: {}, value: {}, };

    datas.forEach((row: Object) => {
      const { path, key, } = row;
      if (path && path.startsWith(`${targetKey}`)) {
        delete expectResult.checked[ key ];
        delete expectResult.value[ key ];
      }
    });
    utils.unSelectNode(targetKey, selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql(expectResult);
  });

  it('selectNode key: 1 unSelectNode key: 1.3', () => {
    const expandedAll = false;
    const utils = new TreeUtils(datas, expandedAll);
    const nodeExpandInfo = {};
    const selectedInfo = { checked: {}, value: {}, };
    const targetKey = '1';
    const three = '1.3.2';

    utils.selectNode(targetKey, selectedInfo, nodeExpandInfo);
    const expectResult = { checked: {}, value: {}, };
    expectResult.value[ targetKey ] = true;
    datas.forEach((row: Object) => {
      const { path, key, } = row;
      if (path && path.startsWith(`${targetKey}`)) {
        expectResult.checked[ key ] = expectResult.value[ key ] = true;
      }
    });
    datas.forEach((row: Object) => {
      const { path, key, } = row;
      if (path && path.startsWith(`${targetKey}/1.3/${three}`)) {
        delete expectResult.checked[ key ];
        delete expectResult.value[ key ];
      }
    });
    delete expectResult.checked[ three ] ;
    delete expectResult.value[ three ] ;
    delete expectResult.checked[ '1.3' + '' ] ;
    utils.unSelectNode(three, selectedInfo, nodeExpandInfo);
    exp(selectedInfo).to.be.eql(expectResult);
  });


});
