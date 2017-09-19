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
    { key: '1.1', title: '1.1', pid: '1', },
    { key: '1.2', title: '1.2', pid: '1', },
    { key: '1.2.1', title: '1.2.1', pid: '1.2', },
    { key: '1.2.2', title: '1.2.2', pid: '1.2', },
    { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', },
    { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', },
    { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', },
    { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', },

    { key: '1.3', title: '1.3', pid: '1', },
    { key: '1.3.1', title: '1.3.1', pid: '1.3', },
    { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', },
    { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', },
    { key: '1.3.2', title: '1.3.2', pid: '1.3', },
    { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', },
    { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', },
    { key: '1.3.3', title: '1.3.3', pid: '1.3', },

    { key: '2', title: '2', },
    { key: '2.1', title: '2.1', pid: '2', },
    { key: '2.1.1', title: '2.1.1', pid: '2.1', },
    { key: '2.1.2', title: '2.1.2', pid: '2.1', },
    { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', },
    { key: '2.2', title: '2.2', pid: '2', },
    { key: '2.2.1', title: '2.2.1', pid: '2.2', },
    { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', },
    { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', },
    { key: '2.2.2', title: '2.2.2', pid: '2.2', },

    { key: '3', title: '3', },
    { key: '3.1', title: '3.1', pid: '3', },
    { key: '3.2', title: '32.2', pid: '3', },
    { key: '4', title: '4', },
  ];
  /*
     1
       1.1
       1.2
         1.2.1
         1.2.2
           1.2.2.1
             1.2.2.1.1
             1.2.2.1.2
           1.2.2.2
       1.3
         1.3.1
           1.3.1.1
           1.3.1.2
         1.3.2
           1.3.2.1
           1.3.2.2
         1.3.3
     2
       2.1
         2.1.1
         2.1.2
           2.1.2.1
      2.2
         2.2.1
           2.2.1.1
           2.2.1.2
         2.2.2
     3
       3.1
       3.2
     4
  */

  it('generateTreeNode empty', () => {
    const tree = new Tree();
    exp(tree.generateTreeNode([])).to.be.eql([]);
  });


  it('generateTreeNode is tree', () => {

    const tree = new Tree();
    exp(tree.generateTreeNode(datas)).to.be.eql([{
        key: '1',
        title: '1',
        children: [{ key: '1.1', title: '1.1', pid: '1', }, {
          key: '1.2',
          title: '1.2',
          pid: '1',
          children: [{ key: '1.2.1', title: '1.2.1', pid: '1.2', }, {
            key: '1.2.2',
            title: '1.2.2',
            pid: '1.2',
            children: [{
              key: '1.2.2.1',
              title: '1.2.2.1',
              pid: '1.2.2',
              children: [{ key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', }, {
                key: '1.2.2.1.2',
                title: '1.2.2.1.2',
                pid: '1.2.2.1',
              },],
            }, { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', },],
          },],
        }, {
          key: '1.3',
          title: '1.3',
          pid: '1',
          children: [{
            key: '1.3.1',
            title: '1.3.1',
            pid: '1.3',
            children: [{ key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', }, {
              key: '1.3.1.2',
              title: '1.3.1.2',
              pid: '1.3.1',
            },],
          }, {
            key: '1.3.2',
            title: '1.3.2',
            pid: '1.3',
            children: [{ key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', }, {
              key: '1.3.2.2',
              title: '1.3.2.2',
              pid: '1.3.2',
            },],
          }, { key: '1.3.3', title: '1.3.3', pid: '1.3', },],
        },],
      }, {
        key: '2',
        title: '2',
        children: [{
          key: '2.1',
          title: '2.1',
          pid: '2',
          children: [{ key: '2.1.1', title: '2.1.1', pid: '2.1', }, {
            key: '2.1.2',
            title: '2.1.2',
            pid: '2.1',
            children: [{ key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', },],
          },],
        }, {
          key: '2.2',
          title: '2.2',
          pid: '2',
          children: [{
            key: '2.2.1',
            title: '2.2.1',
            pid: '2.2',
            children: [{ key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', }, {
              key: '2.2.1.2',
              title: '2.2.1.2',
              pid: '2.2.1',
            },],
          }, { key: '2.2.2', title: '2.2.2', pid: '2.2', },],
        },],
      }, {
        key: '3',
        title: '3',
        children: [{ key: '3.1', title: '3.1', pid: '3', }, { key: '3.2', title: '32.2', pid: '3', },],
      }, { key: '4', title: '4', },]
    );
  });


  it('getPathNode 起始节点为1级结点', () => {

    const tree = new Tree();
    exp(tree.getPathNode(datas, 1, '1')).to.be.eql([
      { key: '1', title: '1', },]);
  });

  it('getPathNode 起始结点非根结点 2 级', () => {
    const tree = new Tree();
    exp(tree.getPathNode(datas, 2, '1.2')).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', },]);
  });

  it('getPathNode 起始结点非根结点 3 级', () => {
    const tree = new Tree();
    exp(tree.getPathNode(datas, 7, '1.2.2.1')).to.be.eql([
      { key: '1', title: '1', },
      { key: '1.2', title: '1.2', pid: '1', },
      { key: '1.2.2', title: '1.2.2', pid: '1.2', },
      { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', },]);
  });

  it('slice empty', () => {
    const tree = new Tree();
    exp(tree.getPathNode([], 1, '')).to.be.eql([]);
  });
  it('slice topLevel', () => {
    const tree = new Tree();
    const mockTree = mockObject.create(tree);
    const generateTreeNode = mockTree.mockFunction('generateTreeNode');
    const getPathNode = mockTree.mockFunction('getPathNode');
    const expectResult = [1, 2, 3, 4,];
    generateTreeNode.returned(expectResult);
    exp(tree.slice(datas, 0, 5)).to.be.eql(expectResult);
    exp(generateTreeNode.getCallArgs(0)[ 0 ]).to.be.eql(datas.slice(0, 5));
    exp(generateTreeNode.callTimes()).to.be.equal(1);
    exp(getPathNode.callTimes()).to.be.equal(0);
  });

  it('slice not topLevel', () => {
    const tree = new Tree();
    const mockTree = mockObject.create(tree);
    const generateTreeNode = mockTree.mockFunction('generateTreeNode');
    const getPathNode = mockTree.mockFunction('getPathNode');
    const expectResult = [1, 2, 3, 4,];
    const pathNode = [1, 2, 3, 4,];
    generateTreeNode.returned(expectResult);
    getPathNode.returned(pathNode);
    exp(tree.slice(datas, 1, 5)).to.be.eql(expectResult);
    exp(generateTreeNode.callTimes()).to.be.equal(1);
    exp(getPathNode.callTimes()).to.be.equal(1);
    exp(generateTreeNode.getCallArgs(0)[ 0 ]).to.be.eql(pathNode.concat(datas.slice(1, 6
    )));

  });


});
