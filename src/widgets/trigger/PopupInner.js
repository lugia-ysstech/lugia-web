/**
 * 弹出面板内框
 * @flow
 */
import * as React from 'react';
import ContentBox from './ContentBox';
import VisibleBox from '../common/VisibleBox';
import { ZIndex, } from '../common/MaskBox';

const PopupInnerBox = VisibleBox.extend`
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  border-radius: 4px;
  box-sizing: border-box;
  left: -9999px;
  top: -9999px;
  z-index: ${ZIndex + 1};
`;

type PopupInnerProps = {
  visible: boolean,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
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
