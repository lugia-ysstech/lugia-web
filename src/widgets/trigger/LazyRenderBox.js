import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
  display: ${props => {
  return props.visible ? '' : 'none';
}};
`;

class LazyRenderBox extends Component {
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
    if (isMask || React.Children.count(props.children) > 1) {
      return <Box {...this.props}/>;
    }

    return React.Children.only(props.children);
  }
}

export default LazyRenderBox;
