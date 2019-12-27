/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import Icon from '../icon';
import { deepMerge } from '@lugia/object-utils';

import {
  NoDividedContainer,
  CheckInput,
  NoDividedWrap,
  NoDevidedTextContainer,
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
  switchIconClass: Object,
  text: 'string',
  showSwitch: boolean,
  getPartOfThemeProps: Function,
  getPartOfThemeConfig: Function,
  getPartOfThemeHocProps: Function,
  icons: Object,
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
    switchIconClass: {
      iconClass: 'lugia-icon-direction_down',
    },
    showSwitch: true,
    icons: {},
  };

  constructor(props: DropMenuButtonProps) {
    super(props);
    this.state = {
      hasIconChecked: false,
      hasButtonChecked: false,
    };
  }

  render() {
    const { divided } = this.props;
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
    const { getPartOfThemeProps, disabled, switchIconClass, showSwitch } = this.props;
    const { viewClass, theme } = this.getIconTheme('SwitchIcon');
    const { iconClass, iconSrc } = switchIconClass;
    const channel = this.props.createEventChannel(['active', 'hover', 'disabled']);

    return (
      <NoDividedContainer
        themeProps={this.getWrapThemeProps()}
        onClick={this.handleClickWrap}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        {...channel.provider}
      >
        <CheckInput
          disabled={disabled}
          onClick={this.handleLeftButtonClick}
          type="button"
          onBlur={this.handleButtonBlur}
        />
        <NoDividedWrap>
          {this.getPreIcon(channel)}
          <NoDevidedTextContainer
            lugiaConsumers={channel.consumer}
            themeProps={getPartOfThemeProps('TextContainer', { disabled })}
          >
            {this.getText()}
          </NoDevidedTextContainer>
          {this.getSuffixIcon(channel)}

          {showSwitch ? (
            <Icon
              iconClass={iconClass}
              src={iconSrc}
              singleTheme
              viewClass={viewClass}
              theme={theme}
              lugiaConsumers={channel.consumer}
            />
          ) : null}
        </NoDividedWrap>
      </NoDividedContainer>
    );
  };

  getPreOrSuffixIcon = (type: string, iconClass: string, src: string, channel: object) => {
    const { viewClass, theme } = this.getIconTheme(type);

    return (
      <Icon
        iconClass={iconClass}
        lugiaConsumers={channel.consumer}
        src={src}
        singleTheme
        viewClass={viewClass}
        theme={theme}
      />
    );
  };

  getPreIcon = (channel: Object) => {
    const { icons = {} } = this.props;
    if (!icons) {
      return null;
    }
    const { preIconClass, preIconSrc } = icons;
    if (!preIconClass && !preIconSrc) {
      return null;
    }

    return this.getPreOrSuffixIcon('PreIcon', preIconClass, preIconSrc, channel);
  };

  getSuffixIcon = (channel: Object) => {
    const { icons = {} } = this.props;
    if (!icons) {
      return null;
    }
    const { suffixIconClass, suffixIconSrc } = icons;
    if (!suffixIconClass && !suffixIconSrc) {
      return null;
    }

    return this.getPreOrSuffixIcon('SuffixIcon', suffixIconClass, suffixIconSrc, channel);
  };

  getButton = () => {
    const { divided } = this.props;
    return divided ? this.getDevidedButton() : this.getNoDevidedButton();
  };

  getText = () => {
    const { children, text } = this.props;
    return text ? text.toString() : children;
  };

  getDividedContainerRadius = () => {
    const { normal: { borderRadius = {} } = {} } = this.props.getPartOfThemeConfig('Container');

    return borderRadius;
  };

  createChannel = () => {
    return this.props.createEventChannel(['active', 'hover', 'disabled']);
  };

  getDevidedButton = () => {
    const { props, state } = this;
    const {
      divided,
      type,
      getTheme,
      disabled,
      switchIconClass,
      getPartOfThemeProps,
      getPartOfThemeConfig,
    } = props;
    const { hasIconChecked, hasButtonChecked } = state;
    const { iconClass, iconSrc } = switchIconClass;
    const leftChannel = this.createChannel();
    const rightChannel = this.createChannel();

    const { normal: { width: textContainerWidth } = {} } = this.props.getPartOfThemeConfig(
      'TextContainer'
    );

    const dividedThemeConfig = getPartOfThemeConfig('Divided');

    const textContainerTheme = getPartOfThemeProps('TextContainer', {
      props: {
        type,
        checked: hasButtonChecked,
        disabled,
        divided,
        borderRadius: this.getDividedContainerRadius(),
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
            disabled={disabled}
            type={type}
            checked={hasButtonChecked}
            themeProps={textContainerTheme}
            {...leftChannel.provider}
          >
            {this.getPreIcon(leftChannel)}
            {this.getText()}
            {this.getSuffixIcon(leftChannel)}

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
            {...rightChannel.provider}
            themeProps={getPartOfThemeProps('SwitchIconContainer', {
              props: {
                type,
                checked: hasIconChecked,
                disabled,
                divided,
                borderRadius: this.getDividedContainerRadius(),
              },
            })}
            checked={hasIconChecked}
            onClick={this.handleIconClick}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <CheckInput disabled={disabled} type="button" onBlur={this.handleIconBlur} />
            <Icon
              iconClass={iconClass}
              lugiaConsumers={rightChannel.consumer}
              singleTheme
              {...this.props.getPartOfThemeHocProps('SwitchIcon')}
              src={iconSrc}
            />
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

  getIconTheme = (iconType: string) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(iconType);

    switch (iconType) {
      case 'SwitchIcon':
        const defaultSwitchIconTheme = {
          normal: {
            padding: {
              top: 0,
              left: 6,
              bottom: 0,
              right: 6,
            },
            getCSS: () => {
              return `
              transition: all 0.3s
              `;
            },
          },
        };
        return {
          viewClass,
          theme: deepMerge(
            {
              [viewClass]: { ...defaultSwitchIconTheme },
            },
            theme
          ),
        };

      case 'PreIcon':
        const defaultPreIconTheme = {
          normal: {
            padding: {
              top: 0,
              left: 0,
              bottom: 0,
              right: 3,
            },
            getCSS: () => {
              return `
              transition: all 0.3s
              `;
            },
          },
        };

        return {
          viewClass,
          theme: deepMerge(
            {
              [viewClass]: { ...defaultPreIconTheme },
            },
            theme
          ),
        };

      case 'SuffixIcon':
        const defaultSuffixIconTheme = {
          normal: {
            padding: {
              top: 0,
              left: 3,
              bottom: 0,
              right: 0,
            },
            getCSS: () => {
              return `
              transition: all 0.3s
              `;
            },
          },
        };

        return {
          viewClass,
          theme: deepMerge(
            {
              [viewClass]: { ...defaultSuffixIconTheme },
            },
            theme
          ),
        };
      default:
        break;
    }

    return { viewClass, theme };
  };
}

export default ThemeProvider(DropMenuButton, Widget.DropMenuButton);
