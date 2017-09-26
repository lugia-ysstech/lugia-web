/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Tree from './';

const { TreeNode, } = Tree;
export default () => {


  const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    },
    onCheck = (checkedKeys, info) => {
      console.log('onCheck', checkedKeys, info);
    };
  const onExpand = keys => {
    console.info(keys);
    return false;
  };
  const rowData = [
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
  return <Tree
    defaultExpandAll
    // expandedKeys={[]}
    onExpand={onExpand}
    showLine
    data={rowData}
    checkable
    defaultExpandedKeys={['0-0-0', '0-0-1',]}
    defaultSelectedKeys={['0-0-0', '0-0-1',]}
    defaultCheckedKeys={['0-0-0', '0-0-1',]}
    onSelect={onSelect}
    onCheck={onCheck}
  >
   
  </Tree>;
};
