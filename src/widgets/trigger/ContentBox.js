/**
 * Trigger内容盒子
 * @flow
 */
import * as React from 'react';
import VisibleBox from '../common/VisibleBox';


const MaskBox = VisibleBox.extend`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #373737;
  background-color: rgba(55, 55, 55, 0.6);
  height: 100%;
  filter: alpha(opacity=50);
  z-index: 1050;
`;

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
