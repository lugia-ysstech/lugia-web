/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import Button from '../button';
import { OperationBtn } from '../css/transfer-group';

type TransferButtonProps = {
  onLeftClick: Function,
  onRightClick: Function,
  leftModel: Object,
  rightModel: Object,
  theme: Object,
  transferButtonIcon?: Object,
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

  getButtonTheme = () => {
    const { theme = {} } = this.props;
    const { viewClass, theme: buttonTheme } = theme;
    const defaultTheme = {
      [viewClass]: {
        Container: {
          normal: {
            width: 38,
            padding: {
              top: 0,
              right: 12,
              bottom: 0,
              left: 12,
            },
          },
        },
      },
    };
    const theButtonTheme = deepMerge(defaultTheme, buttonTheme);

    return {
      viewClass,
      theme: theButtonTheme,
    };
  };

  render() {
    const { leftDisabled, rightDisabled } = this.state;
    const {
      size,
      transferButtonIcon: {
        transferLeftButtonIcon = 'lugia-icon-direction_right',
        transferRightButtonIcon = 'lugia-icon-direction_Left',
      } = {},
    } = this.props;
    return (
      <OperationBtn>
        <Button
          size={size}
          icon={transferLeftButtonIcon}
          onClick={this.handleClick('left')}
          type="primary"
          disabled={leftDisabled}
          {...this.getButtonTheme()}
        />

        <br />

        <Button
          size={size}
          icon={transferRightButtonIcon}
          onClick={this.handleClick('right')}
          type="primary"
          disabled={rightDisabled}
          {...this.getButtonTheme()}
        />
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
