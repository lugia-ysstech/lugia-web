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
  const onExpand = () => {
    return false;
  };
  const rowData = [
    { key: '1', title: '1', },
    { key: '1.1', title: '1.1', pid: '1', },
    { key: '1.2', title: '1.2', pid: '1', },
    { key: '1.3', title: '1.3', pid: '1', },
    { key: '1.3.1', title: '1.3.1', pid: '1.3', },
    { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', },
    { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', },
    { key: '2', title: '2', },
    { key: '2.1', title: '2.1', pid: '2', },
    { key: '2.2', title: '2.2', pid: '2', },
  ];
  return <Tree
    onExpand={onExpand}
    showLine
    rowData={rowData}
    checkable
    defaultExpandedKeys={['0-0-0', '0-0-1',]}
    defaultSelectedKeys={['0-0-0', '0-0-1',]}
    defaultCheckedKeys={['0-0-0', '0-0-1',]}
    onSelect={onSelect}
    onCheck={onCheck}
  >
    <TreeNode title="parent 1" key="0-0">
      <TreeNode title="parent 1-0" key="0-0-0">
        <TreeNode title="leaf" key="0-0-0-0"/>
        <TreeNode title="leaf" key="0-0-0-1"/>
      </TreeNode>
      <TreeNode title="parent 1-1" key="0-0-1">
        <TreeNode title={<span style={{ color: '#08c', }}>sss</span>} key="0-0-1-0"/>
      </TreeNode>
    </TreeNode>
  </Tree>;
};
