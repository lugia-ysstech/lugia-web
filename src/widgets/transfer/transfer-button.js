/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import Button from '../button';
import Widget from '../consts/index';
import Theme from '../theme';
import { OperationBtn } from '../css/transfer-group';

type TransferButtonProps = {
  onLeftClick: Function,
  onRightClick: Function,
  leftModel: Object,
  rightModel: Object,
};
type TransferButtonState = {
  leftDisabled: boolean,
  rightDisabled: boolean,
};
export default class TransferButton extends React.Component<
  TransferButtonProps,
  TransferButtonState
> {
  static displayName = 'TransferButton';
  constructor(props: TransferButtonProps) {
    super(props);
    const { leftModel, rightModel } = props;

    this.state = {
      leftDisabled: !leftModel.getSelectedkeys().length,
      rightDisabled: !rightModel.getSelectedkeys().length,
    };
    leftModel.on('onSelectedKeyChange', param => {
      const { data } = param;
      this.setState({
        leftDisabled: !data.length,
      });
    });
    rightModel.on('onSelectedKeyChange', param => {
      const { data } = param;
      this.setState({
        rightDisabled: !data.length,
      });
    });
  }

  render() {
    const { leftDisabled, rightDisabled } = this.state;
    const buttonView = {
      [Widget.Button]: {
        width: 38,
      },
    };
    return (
      <OperationBtn>
        <Theme config={buttonView}>
          <Button
            icon="lugia-icon-direction_right"
            onClick={this.handleClick('left')}
            type="primary"
            disabled={leftDisabled}
          />
        </Theme>

        <br />
        <Theme config={buttonView}>
          <Button
            icon="lugia-icon-direction_Left"
            onClick={this.handleClick('right')}
            type="primary"
            disabled={rightDisabled}
          />
        </Theme>
      </OperationBtn>
    );
  }
  handleClick = (type: 'left' | 'right') => () => {
    const { leftDisabled, rightDisabled } = this.state;
    const { onLeftClick, onRightClick } = this.props;
    const disabled = type === 'left' ? leftDisabled : rightDisabled;
    const click = type === 'left' ? onLeftClick : onRightClick;
    if (disabled) {
      return;
    }
    click && click();
  };
}
