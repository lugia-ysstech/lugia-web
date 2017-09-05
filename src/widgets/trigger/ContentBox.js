/**
 * Trigger内容盒子
 * @flow
 */
import * as React from 'react';
import VisibleBox from '../common/VisibleBox';
import MaskBox from '../common/MaskBox';

type ContentBoxProps = {
  children?: React.Node,
  visible: boolean,
  isMask: boolean,
}


class ContentBox extends React.Component<ContentBoxProps> {
  static defaultProps = {
    isMask: false,
    visible: false,
  };

  shouldComponentUpdate (nextProps: ContentBoxProps) {
    return nextProps.visible !== this.props.visible;
  }

  render () {
    const { isMask, ...props } = this.props;
    if (isMask) {
      return <MaskBox {...this.props}/>;
    }
    if (React.Children.count(props.children) > 1) {
      return <VisibleBox {...this.props}/>;
    }

    return React.Children.only(props.children);
  }
}

export default ContentBox;
