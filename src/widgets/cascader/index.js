/**
 *
 * create by szfeng
 *
 * @flow
 */
import React from 'react';
import { getTreeData } from '../menu/utils';
import Widget from '../consts/index';
import Cascader from './cascader';
import ThemeHoc from '@lugia/theme-hoc';
import ValidateHoc from '../input/validateHoc';

class CascaderContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const { separator = '|' } = props;
    this.treeData = getTreeData(props, separator);
  }

  shouldComponentUpdate(nextProps): boolean {
    const { data = [], separator = '|' } = this.props;
    const { data: nextData = [], separator: nextSeparator = '|' } = nextProps;
    if (separator !== nextSeparator || JSON.stringify(data) !== JSON.stringify(nextData)) {
      this.treeData = getTreeData(nextProps, nextSeparator);
    }
    return true;
  }

  render() {
    return <Cascader {...this.props} treeData={this.treeData} />;
  }
}

export default ThemeHoc(ValidateHoc(CascaderContainer), Widget.Cascader, { hover: true });
