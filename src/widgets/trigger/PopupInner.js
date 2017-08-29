import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import ContentBox from './ContentBox';
import VisibleBox from './VisibleBox';

class PopupInner extends Component {
  static propTypes = {
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    children: PropTypes.any,
  };

  render () {
    const { className, visible, onMouseEnter, onMouseLeave, style, children, } = this.props;
    return (
      <VisibleBox
        visible={visible}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
      >
        <ContentBox visible={visible}>
          {children}
        </ContentBox>
      </VisibleBox>
    );
  }
}

export default PopupInner;
