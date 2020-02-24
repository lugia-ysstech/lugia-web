/** * * create by szfeng * */

import React, { useState } from 'react';
import Theme from '../theme/index';
import TreeSelect from './index';
import Widget from '../consts/index';
const data1 = [
  {
    value: '1',
    text: '1',
    children: [
      { value: '1.1', text: '1.1', pid: '1', path: '1', isLeaf: true },
      {
        value: '1.2',
        text: '1.2',
        pid: '1',
        path: '1',
        children: [
          { value: '1.2.1', text: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true },
          { value: '1.2.2', text: '1.2.2', pid: '1.2', path: '1/1.2', isLeaf: true },
        ],
      },
    ],
  },
];
const data2 = [
  {
    value: '1',
    text: '1',
    children: [
      { value: '1.1', text: '1.1', pid: '1', path: '1', isLeaf: true },
      {
        value: '1.2',
        text: '1.2',
        pid: '1',
        path: '1',
        children: [
          { value: '1.2.1', text: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true },
          { value: '1.2.2', text: '1.2.2', pid: '1.2', path: '1/1.2', isLeaf: true },
        ],
      },
    ],
  },
  {
    value: '2',
    text: '2',
    children: [
      { value: '2.1', text: '2.1', pid: '2', path: '2' },
      { value: '2.2', text: '2.2', pid: '2', path: '2' },
    ],
  },
];
/** 测试用例步骤： 1.  打开页面后 2.  点开树的下拉框 3.  在命令行执行upDateData函数 4.  再次点开树的下拉框，此时，应该可以看到【2】这个结点展开，并且可以展开收起。 */ export default () => {
  const config = { [Widget.TreeSelect]: { width: 300, height: 500 } };
  const [treeData, updateData] = useState(data1);
  window.upDateData = () => {
    updateData(data2);
  };
  return (
    <Theme config={config}>
      <TreeSelect
        ref={cmp => (window.c1 = cmp)}
        data={treeData}
        onlySelectLeaf
        igronSelectField="notCanSelect"
        expandAll
        mutliple
        translateTreeData
      />
    </Theme>
  );
};
