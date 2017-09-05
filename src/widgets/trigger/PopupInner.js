/**
 * 弹出面板内框
 * @flow
 */
import * as React from 'react';
import ContentBox from './ContentBox';
import VisibleBox from '../common/VisibleBox';

const PopupInnerBox = VisibleBox.extend`
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: 1050;
`;

type PopupInnerProps = {
  visible: boolean,
  onMouseEnter: Function,
  onMouseLeave: Function,
  children: React.Node,
};

class PopupInner extends React.Component<PopupInnerProps> {
  static defaultProps = {
    visible: true,
  };

  render () {
    const { visible, onMouseEnter, onMouseLeave, children, } = this.props;
    return (
      <PopupInnerBox
        visible={visible}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <ContentBox visible={visible}>
          {children}
        </ContentBox>
      </PopupInnerBox>
    );
  }
}

export default PopupInner;
