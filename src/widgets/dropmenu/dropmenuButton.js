/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import '../css/sv.css';
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

  getBasicButton = () => {
    const { getTheme, children } = this.props;
    const { hasButtonChecked } = this.state;

    return (
      <BasicContainer Theme={getTheme()}>
        <BasicWrap
          onClick={this.handleClickWrap}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <CheckInput type="button" onBlur={this.handleButtonBlur} />
          <BasicTextContainer checked={hasButtonChecked}>
            <BasicText>{children}</BasicText>
            <BasicIconWrap>
              <CommonIcon iconClass="lugia-icon-direction_down" />
            </BasicIconWrap>
          </BasicTextContainer>
        </BasicWrap>
      </BasicContainer>
    );
  };

  getDevidedButton = () => {
    const { divided, type, getTheme, children } = this.props;
    const { hasIconChecked, hasButtonChecked } = this.state;
    return (
      <DividedContainer divided={divided} type={type} Theme={getTheme()}>
        <SeparatorBorder
          iconChecked={hasIconChecked}
          buttonChecked={hasButtonChecked}
          type={type}
        />
        <DividedWrap>
          <DevidedTextContainer type={type} checked={hasButtonChecked}>
            {children}
            <CheckInput
              type="button"
              onBlur={this.handleButtonBlur}
              onClick={this.handleLeftButtonClick}
            />
          </DevidedTextContainer>
          <PullContainer
            type={type}
            checked={hasIconChecked}
            onClick={this.handleIconClick}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <CheckInput type="button" onBlur={this.handleIconBlur} />
            <CommonIcon iconClass="lugia-icon-direction_down" />
          </PullContainer>
        </DividedWrap>
      </DividedContainer>
    );
  };

  getNoDevidedButton = () => {
    const { divided, type, getTheme, children } = this.props;
    const { hasButtonChecked } = this.state;

    return (
      <NoDividedContainer
        type={type}
        Theme={getTheme()}
        checked={hasButtonChecked}
        divided={divided}
        onClick={this.handleClickWrap}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <CheckInput type="button" onBlur={this.handleButtonBlur} />
        <NoDividedWrap>
          <TextContainer>{children}</TextContainer>
          <NoDividedIconWrap>
            <CommonIcon iconClass="lugia-icon-direction_down" />
          </NoDividedIconWrap>
        </NoDividedWrap>
      </NoDividedContainer>
    );
  };

  handleClickWrap = e => {
    const { onClick } = this.props;
    onClick && onClick(e);
    this.onTriggerShow(e);
  };

  handleIconClick = e => {
    this.onTriggerShow(e);
    this.setState({
      hasIconChecked: true,
    });
  };

  handleLeftButtonClick = e => {
    const { onClick } = this.props;
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
    const { _onClick } = this.props;
    _onClick && _onClick(e);
  }
  handleButtonBlur = () => {
    this.setState({
      hasButtonChecked: false,
    });
  };

  onMouseEnter = e => {
    const { onMouseEnter } = this.props;
    onMouseEnter && onMouseEnter(e);
  };

  onMouseLeave = e => {
    const { onMouseLeave } = this.props;
    onMouseLeave && onMouseLeave(e);
  };
}

export default ThemeProvider(DropMenuButton, Widget.DropMenuButton);
