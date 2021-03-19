/**
 *
 * create by szfeng
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import ThemeProvider from '@lugia/theme-hoc';
import InnerTree, { TreeProps } from './tree';
import { getTreeData } from '../menu/utils';
import { getMenuItemHeight } from '../css/tree';
import Widget from '../consts/index';
import Empty from '../empty';

class OriginTree extends React.Component<TreeProps> {
  static defaultProps = {
    translateTreeData: false,
    pathSeparator: '|',
    valueField: 'value',
    displayField: 'text',
    pathField: 'path',
    pidField: 'pid',
    size: 'default',
  };
  innerTree: Object;

  constructor(props: TreeProps) {
    super(props);
    this.innerTree = React.createRef();
  }

  getEmptyTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const containerThemeConfig = getPartOfThemeConfig('Container');
    const {
      normal: { width = 250, height = 200, opacity = 1, background: { color } = {} } = {},
    } = containerThemeConfig;
    return {
      [Widget.Empty]: {
        Container: {
          normal: {
            width,
            height,
            opacity,
            background: {
              color,
            },
          },
        },
      },
    };
  };

  render() {
    const { props } = this;
    const data = this.getTreeData();
    const { draggable, expandAll, size, __dontShowEmpty } = props;
    if (data.length === 0 && !__dontShowEmpty) {
      return <Empty theme={this.getEmptyTheme()} />;
    }
    const activeExpandAll = draggable ? true : expandAll;
    const menuItemHeight = getMenuItemHeight(size);
    return (
      <InnerTree
        {...props}
        ref={this.innerTree}
        data={data}
        expandAll={activeExpandAll}
        menuItemHeight={menuItemHeight}
      />
    );
  }

  getTreeData = () => {
    const { translateTreeData, data = [] } = this.props;
    return translateTreeData === true ? this.mapDataTranslateTreeData() : data;
  };

  mapDataTranslateTreeData = () => {
    const { igronSelectField = 'disabled', pathSeparator = '|' } = this.props;
    return getTreeData({ ...this.props, igronSelectField }, pathSeparator);
  };
}

export default ThemeProvider(OriginTree, Widget.Tree);
