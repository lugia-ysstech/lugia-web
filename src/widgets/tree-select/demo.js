/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Theme from '../theme/index';
import TreeSelect from './index';
import Widget from '../consts/index';
import styled from 'styled-components';
import colors from '../css/stateColor';

const data = [
  { value: '1', text: '1' },
  { value: '1.1', text: '1.1', pid: '1', path: '1', isLeaf: true },

  { value: '1.2', text: '1.2', pid: '1', path: '1' },
  { value: '1.2.1', text: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true },
  { value: '1.2.2', text: '1.2.2', pid: '1.2', path: '1/1.2', isLeaf: true },

  { value: '2', text: '2' },
  { value: '2.1', text: '2.1', pid: '2', path: '2' },
  { value: '2.1.1', text: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true },
  { value: '2.1.2', text: '2.1.2', pid: '2.1', path: '2/2.1' },
  { value: '2.1.2.1', text: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true },
];

export default class DefaultTreeSelect extends React.Component<any, any> {
  render() {
    const config = { [Widget.TreeSelect]: { width: 300, height: 500 } };
    return (
      <Theme config={config}>
        <TreeSelect data={data} onlySelectLeaf igronSelectField="notCanSelect" expandAll mutliple />
      </Theme>
    );
  }
}
