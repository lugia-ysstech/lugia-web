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
  NoDividedContainer,
  CheckInput,
  NoDividedWrap,
  TextContainer,
  NoDividedIconWrap,
  DividedContainer,
  DividedWrap,
  DevidedTextContainer,
  PullContainer,
  SeparatorBorder,
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
  text: 'string',
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
    divided: false,
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
    const { divided, getTheme } = this.props;
    console.log('getTheme', getTheme());
    console.log('themeConfig', this.props.getPartOfThemeConfig('Container'));
    return divided ? this.getDevidedButton() : this.getNoDevidedButton();
  }

  getWrapThemeProps = dividedThemeConfig => {
    const { divided, type, getPartOfThemeProps, disabled } = this.props;
    const { hasButtonChecked } = this.state;
    return getPartOfThemeProps('Container', {
      props: { type, checked: hasButtonChecked, disabled, divided, dividedThemeConfig },
    });
  };

  getNoDevidedButton = () => {
    const { getPartOfThemeProps, disabled, direction } = this.props;
    const iconClass = this.getIconClass(direction);

    return (
      <NoDividedContainer
        themeProps={this.getWrapThemeProps()}
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
          <TextContainer>{this.getText()}</TextContainer>
          <NoDividedIconWrap themeProps={getPartOfThemeProps('PullIcon')}>
            <CommonIcon iconClass={iconClass} />
          </NoDividedIconWrap>
        </NoDividedWrap>
      </NoDividedContainer>
    );
  };

  getButton = () => {
    const { divided } = this.props;
    return divided ? this.getDevidedButton() : this.getNoDevidedButton();
  };

  getIconClass = (direction: 'up' | 'down') => {
    return direction === 'up' ? 'lugia-icon-direction_up' : 'lugia-icon-direction_down';
  };

  getText = () => {
    const { children, text } = this.props;
    return text ? text.toString() : children;
  };

  getDevidedButton = () => {
    const { props, state } = this;
    const {
      divided,
      type,
      getTheme,
      disabled,
      direction,
      getPartOfThemeProps,
      getPartOfThemeConfig,
    } = props;
    const { hasIconChecked, hasButtonChecked } = state;
    const iconClass = this.getIconClass(direction);

    const { normal = {} } = this.props.getPartOfThemeConfig('TextContainer');
    const { width: textContainerWidth } = normal;
    const dividedThemeConfig = getPartOfThemeConfig('Divided');

    const textContainerTheme = getPartOfThemeProps('TextContainer', {
      props: {
        type,
        checked: hasButtonChecked,
        disabled,
        divided,
      },
    });

    return (
      <DividedContainer
        themeProps={this.getWrapThemeProps(dividedThemeConfig)}
        disabled={disabled}
        divided={divided}
        type={type}
      >
        <SeparatorBorder
          disabled={disabled}
          themeConfig={dividedThemeConfig}
          width={textContainerWidth}
          checked={hasIconChecked || hasButtonChecked}
          type={type}
        />
        <DividedWrap>
          <DevidedTextContainer
            Theme={getTheme()}
            disabled={disabled}
            type={type}
            checked={hasButtonChecked}
            themeProps={textContainerTheme}
          >
            {this.getText()}
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
            themeProps={getPartOfThemeProps('IconContainer', {
              props: { type, checked: hasIconChecked, disabled, divided },
            })}
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
    const { _onClick, disabled } = this.props;
    if (disabled) {
      return;
    }
    _onClick && _onClick(e);
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
    const { onClick, disabled } = this.props;
    if (disabled) {
      return;
    }
    onClick && onClick(e);
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
