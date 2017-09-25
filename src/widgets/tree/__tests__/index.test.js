//@flow
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Tree from '../';

import { mockObject, } from 'vx-mock';

const { expect: exp, } = chai;


describe('Input', () => {


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

  it('slice not topLevel 真实测试', () => {
    const tree = new Tree({ children: null, });
    const mockTree = mockObject.create(tree);
    const generateTreeNode = mockTree.mockFunction('generateTreeNode');
    generateTreeNode.returned([]);
    tree.slice(datas, 8, 5, { expandedAll: true, target: { ['1' + '']: true, }, });
    exp(generateTreeNode.getCallArgs(0)[0]).to.be.eql( [{ key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '2.1', title: '2.1', pid: '2', path: '2', },
      { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', },
      { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
      { key: '2.1.2.1',
        title: '2.1.2.1',
        pid: '2.1.2',
        path: '2/2.1/2.1.2', },]
    );
  });

  it('generateTreeNode empty', () => {
    const tree = new Tree({ children: null, });
    exp(tree.generateTreeNode([])).to.be.eql([]);
  });


  it('generateTreeNode is tree', () => {
    const tree = new Tree({ children: null, });
    exp(tree.generateTreeNode(datas)).to.be.eql([{
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

    const tree = new Tree({ children: null, });
    exp(tree.getPathNodes(datas, 1, '1')).to.be.eql([
      { key: '1', title: '1', },]);
  });

  it('getPathNodes 起始结点非根结点 2 级', () => {
    const tree = new Tree({ children: null, });
    exp(tree.getPathNodes(datas, 2, '1.2')).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },]);
  });

  it('getPathNodes 起始结点非根结点 3 级', () => {
    const tree = new Tree({ children: null, });
    exp(tree.getPathNodes(datas, 7, '1.2.2.1')).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },]);
  });

  it('slice empty', () => {
    const tree = new Tree({ children: null, });
    exp(tree.getPathNodes([], 1, '')).to.be.eql([]);
  });

  it('slice topLevel', () => {
    const tree = new Tree({ children: null, });
    const mockTree = mockObject.create(tree);
    const generateTreeNode = mockTree.mockFunction('generateTreeNode');
    const getPathNodes = mockTree.mockFunction('getPathNodes');
    const expectResult = [1, 2, 3, 4,];
    generateTreeNode.returned(expectResult);
    exp(tree.slice(datas, 0, 5)).to.be.eql(expectResult);
    exp(generateTreeNode.getCallArgs(0)[ 0 ]).to.be.eql(datas.slice(0, 5));
    exp(generateTreeNode.callTimes()).to.be.equal(1);
    exp(getPathNodes.callTimes()).to.be.equal(0);
  });

  it('slice not topLevel', () => {
    const tree = new Tree({ children: null, });
    const mockTree = mockObject.create(tree);
    const generateTreeNode = mockTree.mockFunction('generateTreeNode');
    const getPathNodes = mockTree.mockFunction('getPathNodes');
    const sliceExpand = mockTree.mockFunction('sliceExpand');
    const expectResult = [1, 2, 3, 4,];
    const pathNode = [1, 2, 3, 4,];
    const start = 1;
    const total = 5;

    generateTreeNode.returned(expectResult);
    getPathNodes.returned(pathNode);
    const sliceResult = [5, 7, 5, 75,];
    sliceExpand.returned(sliceResult);
    const expandInfo = { expandedAll: false, target: {}, };
    exp(tree.slice(datas, start, total, expandInfo)).to.be.eql(expectResult);

    exp(generateTreeNode.callTimes()).to.be.equal(1);
    exp(getPathNodes.callTimes()).to.be.equal(1);
    exp(sliceExpand.callTimes()).to.be.equal(1);

    exp(sliceExpand.getCallArgs(0)).to.be.eql([datas, start, total, expandInfo, pathNode,]);
  });



  it('sliceExpand expand is undefined, is eql [].slice(start, start + total)', () => {
    const tree = new Tree({ children: null, });
    const start = 1;
    const total = 5;
    exp(tree.sliceExpand(datas, start, total)).to.be.eql(datas.slice(start, start + total));

  });

  it('sliceExpand expand is exisit expandedAll true toproot collapse', () => {
    const tree = new Tree({ children: null, });
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
    exp(tree.sliceExpand(expandDatas, start, total, expandObj)).to.be.eql([
      { key: '1', title: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });
  it('sliceExpand expand is exisit expandedAll false', () => {
    const tree = new Tree({ children: null, });
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
    exp(tree.sliceExpand(expandDatas, start, total, expandObj)).to.be.eql([
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });

  it('sliceExpand expand is exisit expandedAll false start is collapse', () => {
    const tree = new Tree({ children: null, });
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
    const result = tree.sliceExpand(expandDatas, start, total, expandObj);
    exp(result).to.be.eql([
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });

  it('sliceExpand expand is exisit expandedAll true', () => {
    const tree = new Tree({ children: null, });
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
    const result = tree.sliceExpand(expandDatas, start, total, expandObj);
    exp(result).to.be.eql([
      { key: '1.1', title: '1.1', pid: '1', path: '1', },
      { key: '1.2', title: '1.2', pid: '1', path: '1', },
      { key: '1.3', title: '1.3', pid: '1', path: '1', },
      { key: '2', title: '2', },
      { key: '3', title: '3', },
    ]);
  });

  it('sliceExpand', () => {
      const tree = new Tree({ children: null, });
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


      const actualResult = tree.sliceExpand(expandDatas, start, total, expandObj);
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
    const tree = new Tree({ children: null, });
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
    const result = tree.sliceExpand(expandDatas, start, total, expandObj,
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
    const tree = new Tree({ children: null, });
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
    const result = tree.sliceExpand(expandDatas, start, total, expandObj,
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
    const tree = new Tree({ children: null, });
    const result = tree.getKeys([{ key: '1', title: '1', }, { key: '2', title: '2', }, { key: '3', title: '3', },]);
    exp(result).to.be.eql(['1', '2', '3',]);
  });


});
