/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import RcTree, { TreeNode, } from 'rc-tree';
import classNames from 'classnames';
import './index.css';

export default class Tree extends React.Component {
  render () {
    const props = this.props;
    const { prefixCls, className, showLine, } = props;
    const checkable = props.checkable;
    const classString = classNames({
      [`${prefixCls}-show-line`]: !!showLine,
    }, className);
    return (<RcTree {...props} className={classString}
                    checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
      {this.props.children}
    </RcTree>);
  }
}
Tree.TreeNode = TreeNode;
Tree.defaultProps = {
  prefixCls: 'ant-tree',
  checkable: false,
  showIcon: false,
};
