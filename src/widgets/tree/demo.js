/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Tree from './';

const { TreeNode, } = Tree;


const bigTree = [];
for (let a = 0; a < 5; a++) {
  bigTree.push({
    key: `${a}`,
    title: `${a}`,
  });
  for (let b = 0; b < 5; b++) {
    const keyb = `${a}.${b}`;
    bigTree.push({
      key: keyb,
      title: keyb,
      pid: `${a}`,
      path: `${a}`,
    });
    for (let c = 0; c < 20; c++) {
      const keyc = `${a}.${b}.${c}`;
      bigTree.push({
        key: keyc,
        title: keyc,
        pid: `${keyb}`,
        path: `${a}/${keyb}`,
      });
      for (let d = 0; d < 400; d++) {
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
const now = new Date();
const len = bigTree.length;
let root = 0;
for (let i = 0; i < len; i++) {
  const node = bigTree[ i ];
  if (!node.pid) {
    root++;
  }
}
console.info(new Date() - now);
const onSelect = (selectedKeys, info) => {
  },
  onCheck = (checkedKeys, info) => {
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
// rowData.forEach((row: Object, i: number) => {
//   row.title = row.title + '-' + i;
// });
console.info(bigTree.length);

function f1 () {

  const childrenIdx = [];
  const id2nodeExpandInfo = {};
  const length = bigTree.length;
  let children = 0;
  for (let index = 0; index < length; index++) {
    const row = bigTree[ index ];
    if (row.pid !== undefined) {
      childrenIdx.push(index);
      children++;
    }
    const key = row.key;
    const container = id2nodeExpandInfo.hasOwnProperty(key);
    if (!container) {
      id2nodeExpandInfo[ key ] = index;
    }
  }
}

function f2 () {

  const childrenIdx = [];
  const id2nodeExpandInfo = {};
  const length = bigTree.length;
  const children = 0;
  for (let index = 0; index < length; index++) {
    const row = bigTree[ index ];
    if (row.pid !== undefined) {
      //   childrenIdx.push(index);
      //   children++;
    }
    const key = row.key;
    const container = id2nodeExpandInfo[ key ];
    if (!container) {
      // id2nodeExpandInfo[ key ] = { index, };
    }
  }
}

function f3 () {

  const childrenIdx = [];
  const id2nodeExpandInfo = {};
  const length = bigTree.length;
  const children = 0;
  for (let index = 0; index < length; index++) {
    const row = bigTree[ index ];
    if (row.pid !== undefined) {
      //   childrenIdx.push(index);
      //   children++;
    }
    const key = row.key;
    const container = key in id2nodeExpandInfo;
    if (!container) {
      // id2nodeExpandInfo[ key ] = { index, };
    }
  }
}

//
// console.time('f3');
// f3();
// console.timeEnd('f3');

console.time('f1');
f1();
console.timeEnd('f1');

// console.time('f2');
// f2();
// console.timeEnd('f2');


export default class extends React.Component<Object, Object> {
  constructor (props: Object) {
    super(props);
    this.state = { query: '', };
  }

  render () {


    return [<Tree
      key="tree"
      query={this.state.query}
      expandAll
      showLine
      data={rowData}
      checkable
      onSelect={onSelect}
      onChange={this.onTreeChange}
      onCheck={onCheck}
      onlySelectLeaf
    >
    </Tree>,
      <input onChange={this.onChange} key="query"/>,];
  }

  onTreeChange = (v: any) => {
    console.info(v);
  };
  onChange = (e: Object) => {
    this.setState({ query: e.target.value, });
  };
}
