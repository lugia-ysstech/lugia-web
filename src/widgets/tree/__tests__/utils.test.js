//@flow
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';

import { mockObject, } from 'vx-mock';
import utils from '../utils';

const { expect: exp, } = chai;

describe('utils', () => {


  const datas = [
    { key: '1', title: '1', },
    { key: '1.1', title: '1.1', pid: '1', path: '1', },
    { key: '1.2', title: '1.2', pid: '1', path: '1', },
    { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
    { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
    { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
    { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', },
    { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', },
    { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', },
    { key: '1.3', title: '1.3', pid: '1', path: '1', },
    { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
    { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', },
    { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', },
    { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
    { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', },
    { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', },
    { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', },

    { key: '2', title: '2', },
    { key: '2.1', title: '2.1', pid: '2', path: '2', },
    { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', },
    { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
    { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', },
    { key: '2.2', title: '2.2', pid: '2', path: '2', },
    { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2', },
    { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', },
    { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', },
    { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', },

    { key: '3', title: '3', },
    { key: '3.1', title: '3.1', pid: '3', path: '3', },
    { key: '3.2', title: '32.2', pid: '3', path: '3', },
    { key: '4', title: '4', },
  ];


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
    const result = utils.checkTree(datas);
    console.info(result);
    exp(result).to.be.eql([]);
  });

  it('checkTree is rowData wrong', () => {
    const mock = mockObject.create(utils);
    const isRightTreeRowData = mock.mockFunction('isRightTreeRowData');
    const errors = ['1', '2', '3',];
    isRightTreeRowData.returned(errors[ 0 ]);
    isRightTreeRowData.returned(errors[ 1 ]);
    isRightTreeRowData.returned(errors[ 2 ]);
    exp(utils.checkTree([{}, {}, {},])).to.be.eql(errors.map(err => `{}==>${err}`));
    isRightTreeRowData.reset();
  });

  it('checkTree is right', () => {
    const mock = mockObject.create(utils);
    const isRightTreeRowData = mock.mockFunction('isRightTreeRowData');
    const errors = ['', '', '',];
    isRightTreeRowData.returned(errors[ 0 ]);
    isRightTreeRowData.returned(errors[ 1 ]);
    isRightTreeRowData.returned(errors[ 2 ]);
    exp(utils.checkTree([{}, {}, {},])).to.be.eql([]);
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
    const errorNodes = [{ key: '1.1', pid: '2', path: '1/7', },
      { key: '1.2', pid: '2', path: '1/7', },
      { key: '1.3', pid: '2', path: '1/7', },
      { key: '1.4', pid: '2', path: '1/7', },];
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
      { key: '1.1.2', pid: '1.1', path: '1', },];
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
    const errorNodes = [{ key: '1.1', pid: '2', path: '1/2', },
      { key: '1.2', pid: '2', path: '1/2', },

      { key: '1.3', pid: '2', path: '1/2', },
      { key: '1.4', pid: '2', path: '1/2', },];
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


  it('slice not topLevel 真实测试', () => {
    exp(utils.slice(datas, 8, 5, { expandedAll: true, target: { ['1' + '']: true, }, })).to.be.eql(
      [{ key: '1', title: '1', },
        { key: '2', title: '2', },
        { key: '2.1', title: '2.1', pid: '2', path: '2', },
        { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', },
        { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
        {
          key: '2.1.2.1',
          title: '2.1.2.1',
          pid: '2.1.2',
          path: '2/2.1/2.1.2',
        },]
    );
  });

  it('generateTreeNode empty', () => {
    exp(utils.generateTreeNode([])).to.be.eql([]);
  });


  it('generateTreeNode is tree', () => {
    exp(utils.generateTreeNode(datas)).to.be.eql([{
        key: '1',
        title: '1',
        children: [
          { key: '1.1', title: '1.1', pid: '1', path: '1', },
          {
            key: '1.2',
            title: '1.2',
            pid: '1', path: '1',
            children: [
              { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
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
                      },
                      {
                        key: '1.2.2.1.2',
                        title: '1.2.2.1.2',
                        pid: '1.2.2.1',
                        path: '1/1.2/1.2.2/1.2.2.1',
                      },],
                  },
                  {
                    key: '1.2.2.2',
                    title: '1.2.2.2',
                    pid: '1.2.2',
                    path: '1/1.2/1.2.2',
                  },],
              },],
          }, {
            key: '1.3',
            title: '1.3',
            pid: '1',
            path: '1',
            children: [{
              key: '1.3.1',
              title: '1.3.1',
              pid: '1.3',
              path: '1/1.3',
              children: [{ key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', }, {
                key: '1.3.1.2',
                title: '1.3.1.2',
                pid: '1.3.1',
                path: '1/1.3/1.3.1',
              },],
            }, {
              key: '1.3.2',
              title: '1.3.2',
              pid: '1.3',
              path: '1/1.3',
              children: [{ key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', }, {
                key: '1.3.2.2',
                title: '1.3.2.2',
                pid: '1.3.2',
                path: '1/1.3/1.3.2',
              },],
            }, { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', },],
          },],
      }, {
        key: '2',
        title: '2',
        children: [{
          key: '2.1',
          title: '2.1',
          pid: '2',
          path: '2',
          children: [{
            key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1',
          }, {
            key: '2.1.2',
            title: '2.1.2',
            pid: '2.1',
            path: '2/2.1',

            children: [{
              key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2',
            },],
          },],
        }, {
          key: '2.2',
          title: '2.2',
          pid: '2',
          path: '2',

          children: [{
            key: '2.2.1',
            title: '2.2.1',
            pid: '2.2',
            path: '2/2.2',

            children: [{
              key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1',
            }, {
              key: '2.2.1.2',
              title: '2.2.1.2',
              pid: '2.2.1',
              path: '2/2.2/2.2.1',
            },],
          }, { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', },],
        },],
      }, {
        key: '3',
        title: '3',
        children: [{ key: '3.1', title: '3.1', pid: '3', path: '3', }, {
          key: '3.2',
          title: '32.2',
          pid: '3',
          path: '3',
        },],
      }, { key: '4', title: '4', },]
    );
  });


  it('getPathNodes 起始节点为1级结点', () => {

    exp(utils.getPathNodes(datas, 1, '1')).to.be.eql([
      { key: '1', title: '1', },]);
  });

  it('getPathNodes 起始结点非根结点 2 级', () => {
    exp(utils.getPathNodes(datas, 2, '1.2')).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },]);
  });

  it('getPathNodes 起始结点非根结点 3 级', () => {
    exp(utils.getPathNodes(datas, 7, '1.2.2.1')).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },]);
  });

  it('slice empty', () => {
    exp(utils.getPathNodes([], 1, '')).to.be.eql([]);
  });

  it('slice topLevel', () => {
    const mockUtils = mockObject.create(utils);
    const getPathNodes = mockUtils.mockFunction('getPathNodes');
    exp(utils.slice(datas, 0, 5)).to.be.eql(datas.slice(0, 5));
    exp(getPathNodes.callTimes()).to.be.equal(0);
  });

  it('slice not topLevel', () => {
    const mockUtils = mockObject.create(utils);
    const getPathNodes = mockUtils.mockFunction('getPathNodes');
    const sliceExpand = mockUtils.mockFunction('sliceExpand');
    const pathNode = [1, 2, 3, 4,];
    const start = 1;
    const total = 5;

    getPathNodes.returned(pathNode);
    const sliceResult = [5, 7, 5, 75,];
    sliceExpand.returned(sliceResult);
    const expandInfo = { expandedAll: false, target: {}, };
    exp(utils.slice(datas, start, total, expandInfo)).to.be.eql(sliceResult);

    exp(getPathNodes.callTimes()).to.be.equal(1);
    exp(sliceExpand.callTimes()).to.be.equal(1);

    exp(sliceExpand.getCallArgs(0)).to.be.eql([datas, start, total, expandInfo, pathNode,]);
  });


  it('sliceExpand expand is undefined, is eql [].slice(start, start + total)', () => {
    const start = 1;
    const total = 5;
    exp(utils.sliceExpand(datas, start, total)).to.be.eql(datas.slice(start, start + total));

  });

  it('sliceExpand expand is exisit expandedAll true toproot collapse', () => {
    const start = 0;
    const total = 5;
    const expandDatas = [{ key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ];

    const expandObj = {
      target: {
        ['1' + '']: true,
      },
      expandedAll: true,
    };
    exp(utils.sliceExpand(expandDatas, start, total, expandObj)).to.be.eql([
      { key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });
  it('sliceExpand expand is exisit expandedAll false', () => {
    const start = 1;
    const total = 5;
    const expandDatas = [{ key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ];

    const expandObj = {
      target: {
        ['1' + '']: true,
        ['1.1' + '']: true,
        ['1.2.1' + '']: true,
        ['1.2.2' + '']: true,
        ['1.2.2.1' + '']: true,
        ['1.3' + '']: true,
        ['2' + '']: true,
      },
      expandedAll: false,
    };
    exp(utils.sliceExpand(expandDatas, start, total, expandObj)).to.be.eql([
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });

  it('sliceExpand expand is exisit expandedAll false start is collapse', () => {
    const start = 1;
    const total = 5;
    const expandDatas = [{ key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ];

    const expandObj = {
      target: {
        ['1.2' + '']: false,
        ['1.2.1' + '']: true,
        ['1.2.2' + '']: true,
        ['1.2.2.1' + '']: true,
        ['1.3' + '']: true,
        ['2' + '']: true,
      },
      expandedAll: false,
    };
    const result = utils.sliceExpand(expandDatas, start, total, expandObj);
    exp(result).to.be.eql([
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });

  it('sliceExpand expand is exisit expandedAll true', () => {
    const start = 1;
    const total = 5;
    const expandDatas = [{ key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ];

    const expandObj = {
      target: {
        ['1.1' + '']: true,
        ['1.2' + '']: true,
        ['1.3' + '']: true,
      },
      expandedAll: true,
    };
    const result = utils.sliceExpand(expandDatas, start, total, expandObj);
    exp(result).to.be.eql([
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });

  it('sliceExpand', () => {
      const start = 0;
      const total = 5;
      const expandDatas = [
        { key: '1', title: '1', },
        { key: '1.1', title: '1.1', pid: '1', path: '1', },
        { key: '1.2', title: '1.2', pid: '1', path: '1', },
        { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
        { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
        { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
        { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', },
        { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', },
        { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', },

        { key: '1.3', title: '1.3', pid: '1', path: '1', },
        { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
        { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', },
        { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', },
        { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
        { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', },
        { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', },
        { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', },

        { key: '2', title: '2', },
        { key: '2.1', title: '2.1', pid: '2', path: '2', },
        { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', },
        { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
        { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', },
        { key: '2.2', title: '2.2', pid: '2', path: '2', },
        { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2', },
        { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', },
        { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', },
        { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', },

        { key: '3', title: '3', },
        { key: '3.1', title: '3.1', pid: '3', path: '3', },
        { key: '3.2', title: '32.2', pid: '3', path: '3', },
        { key: '4', title: '4', },
      ];

      const expandObj = {
        target: {
          ['1' + '']: true,
          ['1.1' + '']: true,
          ['1.2.1' + '']: true,
          ['1.2.2' + '']: true,
        },
        expandedAll: false,
      };


      const actualResult = utils.sliceExpand(expandDatas, start, total, expandObj);
      exp(actualResult).to.be.eql([
        { key: '1', title: '1', },
        { key: '1.1', title: '1.1', pid: '1', path: '1', },
        { key: '1.2', title: '1.2', pid: '1', path: '1', },
        { key: '1.3', title: '1.3', pid: '1', path: '1', },
        { key: '2', title: '2', },

      ]);

    }
  );

  it('sliceExpand expand is exisit expandedAll true container parentNode 1', () => {
    const start = 5;
    const total = 5;
    const expandDatas = [
      { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ];

    const expandObj = {
      target: {
        ['1.1' + '']: true,
      },
      expandedAll: true,
    };
    const result = utils.sliceExpand(expandDatas, start, total, expandObj,
      [
        { key: '1', title: '1', },
        { key: '1.2', title: '1.2', pid: '1', path: '1', },
        { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      ]);
    exp(result).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });

  it('sliceExpand expand is exisit expandedAll true container parentNode 2', () => {
    const start = 1;
    const total = 3;
    const expandDatas = [
      { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ];

    const expandObj = {
      target: {
        ['1.1' + '']: true,
        ['1.2' + '']: true,
      },
      expandedAll: true,
    };
    const result = utils.sliceExpand(expandDatas, start, total, expandObj,
      [
        { key: '1', title: '1', },
      ]);
    exp(result).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
    ]);
  });

  it('getKeys', () => {
    const result = utils.getKeys([{ key: '1', title: '1', }, { key: '2', title: '2', }, { key: '3', title: '3', },]);
    exp(result).to.be.eql(['1', '2', '3',]);
  });

  it('fetchNodeExtendInfo will exisit', () => {

    const expectResultA = {
      nowVisible: 5,
      realyVisible: 6,
      children: 7,
      begats: 8,
    };
    const expectResultB = {
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
    };
    const nodeId = 'sv_tree_root';
    const countInfo = {};
    exp(utils.fetchNodeExtendInfo(nodeId, datas, countInfo, true)).to.be.eql(expectResult);
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
      index: -1,
    };
    const nodeId = 'sv_tree_root';
    const countInfo = {};
    exp(utils.fetchNodeExtendInfo(nodeId, datas, countInfo)).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);
    baseCountInfo[ nodeId ] = expectResult;
    exp(countInfo).to.be.eql(baseCountInfo);
  });

  it('fetchNodeExtendInfo for normal node for expandedAll: false nodeId: 1', () => {

    const expectResult = {
      nowVisible: 3,
      realyVisible: 3,
      children: 3,
      begats: 16,
      index: 0,
    };
    const nodeId = '1';
    const countInfo = {};
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
      index: 0,
    };
    const nodeId = '1';
    const countInfo = {};
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo, true);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });
  it('fetchNodeExtendInfo for normal node for expandedAll: false nodeId: 2', () => {

    const expectResult = {
      nowVisible: 2,
      realyVisible: 2,
      children: 2,
      begats: 9,
      index: 17,

    };
    const nodeId = '2';
    const countInfo = {};
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
    };
    const nodeId = '2';
    const countInfo = {};
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo, true);
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
    };
    const nodeId = '2.1.1';
    const countInfo = {};
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
    };
    const nodeId = '2.1.1';
    const countInfo = {};
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo, true);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });
  it('fetchNodeExtendInfo for normal node for expandedAll: false nodeId: 2.1.2', () => {

    const expectResult = {
      nowVisible: 1,
      realyVisible: 1,
      children: 1,
      index: 20,

      begats: 1,
    };
    const nodeId = '2.1.2';
    const countInfo = {};
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
    };
    const nodeId = '2.1.2';
    const countInfo = {};
    const actual = utils.fetchNodeExtendInfo(nodeId, datas, countInfo, true);
    exp(actual).to.be.eql(expectResult);
    exp(countInfo[ nodeId ]).to.be.eql(expectResult);

  });

});
