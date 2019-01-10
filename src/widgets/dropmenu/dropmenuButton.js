/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import CommonIcon from '../icon';
import {
  DividedContainer,
  DividedWrap,
  TextContainer,
  PullContainer,
  CheckInput,
  SeparatorBorder,
  NoDividedContainer,
  NoDividedWrap,
  BasicContainer,
  BasicTextContainer,
  BasicWrap,
  BasicText,
  BasicIconWrap,
  NoDividedIconWrap,
  DevidedTextContainer,
} from '../css/dropmenubutton';

type DropMenuButtonProps = {
  getTheme: Function,
  divided: boolean,
  type: 'customs' | 'basic' | 'primary',
  children: any,
  _onClick?: Function,
  onClick?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  disabled: boolean,
  direction: 'up' | 'down',
};

type DropMenuButtonState = {
  hasIconChecked: boolean,
  hasButtonChecked: boolean,
};

class DropMenuButton extends React.Component<DropMenuButtonProps, DropMenuButtonState> {
  static displayName = Widget.DropMenuButton;
  static defaultProps = {
    getTheme: () => {
      return {};
    },
    divided: true,
    type: 'customs',
    disabled: false,
    direction: 'down',
  };

  constructor(props: DropMenuButtonProps) {
    super(props);
    this.state = {
      hasIconChecked: false,
      hasButtonChecked: false,
    };
  }

  render() {
    const { type } = this.props;
    return type === 'basic' ? this.getBasicButton() : this.getButton();
  }

  getButton = () => {
    const { divided } = this.props;
    return divided ? this.getDevidedButton() : this.getNoDevidedButton();
  };

  getIconClass = (direction: 'up' | 'down') => {
    return direction === 'up' ? 'lugia-icon-direction_up' : 'lugia-icon-direction_down';
  };

  getBasicButton = () => {
    const { props, state } = this;
    const { getTheme, children, disabled, direction } = props;
    const { hasButtonChecked } = state;
    const iconClass = this.getIconClass(direction);
    return (
      <BasicContainer Theme={getTheme()}>
        <BasicWrap
          disabled={disabled}
          onClick={this.handleClickWrap}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          Theme={getTheme()}
          checked={hasButtonChecked}
        >
          <CheckInput
            disabled={disabled}
            type="button"
            onClick={this.handleLeftButtonClick}
            onBlur={this.handleButtonBlur}
          />
          <BasicTextContainer Theme={getTheme()} checked={hasButtonChecked} disabled={disabled}>
            <BasicText>{children}</BasicText>
            <BasicIconWrap>
              <CommonIcon iconClass={iconClass} />
            </BasicIconWrap>
          </BasicTextContainer>
        </BasicWrap>
      </BasicContainer>
    );
  };

  getDevidedButton = () => {
    const { props, state } = this;
    const { divided, type, getTheme, children, disabled, direction } = props;
    const { hasIconChecked, hasButtonChecked } = state;
    const iconClass = this.getIconClass(direction);
    return (
      <DividedContainer disabled={disabled} divided={divided} type={type} Theme={getTheme()}>
        <SeparatorBorder
          disabled={disabled}
          iconChecked={hasIconChecked}
          buttonChecked={hasButtonChecked}
          type={type}
          Theme={getTheme()}
        />
        <DividedWrap>
          <DevidedTextContainer
            Theme={getTheme()}
            disabled={disabled}
            type={type}
            checked={hasButtonChecked}
          >
            {children}
            <CheckInput
              type="button"
              disabled={disabled}
              onBlur={this.handleButtonBlur}
              onClick={this.handleLeftButtonClick}
            />
          </DevidedTextContainer>
          <PullContainer
            disabled={disabled}
            type={type}
            Theme={getTheme()}
            checked={hasIconChecked}
            onClick={this.handleIconClick}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <CheckInput disabled={disabled} type="button" onBlur={this.handleIconBlur} />
            <CommonIcon iconClass={iconClass} />
          </PullContainer>
        </DividedWrap>
      </DividedContainer>
    );
  };

  getNoDevidedButton = () => {
    const { divided, type, getTheme, children, disabled, direction } = this.props;
    const { hasButtonChecked } = this.state;
    const iconClass = this.getIconClass(direction);
    return (
      <NoDividedContainer
        type={type}
        disabled={disabled}
        Theme={getTheme()}
        checked={hasButtonChecked}
        divided={divided}
        onClick={this.handleClickWrap}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <CheckInput
          disabled={disabled}
          onClick={this.handleLeftButtonClick}
          type="button"
          onBlur={this.handleButtonBlur}
        />
        <NoDividedWrap>
          <TextContainer>{children}</TextContainer>
          <NoDividedIconWrap>
            <CommonIcon iconClass={iconClass} />
          </NoDividedIconWrap>
        </NoDividedWrap>
      </NoDividedContainer>
    );
  };

  handleClickWrap = e => {
    const { onClick, disabled } = this.props;
    if (disabled) {
      return;
    }
    onClick && onClick(e);
    this.onTriggerShow(e);
  };

  handleIconClick = e => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.onTriggerShow(e);
    this.setState({
      hasIconChecked: true,
    });
  };

  handleLeftButtonClick = e => {
    const { onClick, disabled } = this.props;
    if (disabled) {
      return;
    }
    onClick && onClick(e);
    this.setState({
      hasButtonChecked: true,
    });
  };

  handleIconBlur = () => {
    this.setState({
      hasIconChecked: false,
    });
  };

  onTriggerShow(e) {
    const { _onClick, disabled } = this.props;
    if (disabled) {
      return;
    }
    _onClick && _onClick(e);
  }
  handleButtonBlur = () => {
    this.setState({
      hasButtonChecked: false,
    });
  };

  onMouseEnter = e => {
    const { onMouseEnter, disabled } = this.props;
    if (disabled) {
      return;
    }
    onMouseEnter && onMouseEnter(e);
  };

  onMouseLeave = e => {
    const { onMouseLeave, disabled } = this.props;
    if (disabled) {
      return;
    }
    onMouseLeave && onMouseLeave(e);
  };
}

export default ThemeProvider(DropMenuButton, Widget.DropMenuButton);
