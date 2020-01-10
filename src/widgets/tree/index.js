/**
 *
 * create by szfeng
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import InnerTree from './tree';
import { getTreeData } from '../menu/utils';

class Tree extends React.Component<any, any> {
  static defaultProps = {
    translateTreeData: false,
    pathSeparator: '/',
    valueField: 'value',
    displayField: 'text',
  };
  innerTree: Object;

  constructor(props: any) {
    super(props);
    this.innerTree = React.createRef();
  }

  render() {
    let { props } = this;
    const data = this.getTreeData();
    const { draggable } = props;
    if (draggable) {
      props = { ...props, expandAll: true };
    }
    return <InnerTree {...props} ref={this.innerTree} data={data} />;
  }

  getTreeData = () => {
    const { translateTreeData, data } = this.props;
    return translateTreeData === true ? this.mapDataTranslateTreeData() : data;
  };

  mapDataTranslateTreeData = () => {
    const { igronSelectField = 'disabled', pathSeparator = '/' } = this.props;
    return getTreeData({ ...this.props, igronSelectField }, pathSeparator);
  };
}

export default Tree;
