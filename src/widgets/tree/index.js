/**
 *
 * create by ligx
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
    valueField: 'key',
    displayField: 'title',
  };
  innerTree: Object;

  constructor(props: any) {
    super(props);
    this.innerTree = React.createRef();
  }

  render() {
    const { props } = this;

    const data = this.getTreeData();
    return <InnerTree ref={this.innerTree} {...props} data={data} />;
  }

  getTreeData = () => {
    const { translateTreeData, data } = this.props;
    return translateTreeData === true ? this.mapDataTranslateTreeData() : data;
  };

  mapDataTranslateTreeData = () => {
    return getTreeData(this.props);
  };
}

export default Tree;
