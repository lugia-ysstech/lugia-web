import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
  display: ${props => (props.visible ? '' : 'none')};
`;

const MaskBox = Box.extend`
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

class ContentBox extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    visible: PropTypes.bool,
    isMask: PropTypes.bool,
  };

  shouldComponentUpdate (nextProps) {
    return nextProps.visible !== this.props.visible;
  }

  render () {
    const { isMask, ...props } = this.props;
    if (isMask) {
      return <MaskBox {...this.props}/>;
    }
    if (React.Children.count(props.children) > 1) {
      return <Box {...this.props}/>;
    }

    return React.Children.only(props.children);
  }
}

export default ContentBox;
