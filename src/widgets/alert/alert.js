/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { AlertProps, AlertState, Type } from '../css/alert';
import { Alert, CloseText, Description, Message, getPosition, TypeCSS } from '../css/alert';
import changeColor from '../css/utilsColor';
import get from '../css/theme-common-dict';
import Icon from '../icon';

const mFontSize = '$lugia-dict.@lugia/lugia-web.mFontSize';
const sFontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const xsFontSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';
const themeColor = get('themeColor');
const successColor = get('successColor');
const warningColor = get('warningColor');
const dangerColor = get('dangerColor');

const AlertIcons = {
  info: 'lugia-icon-reminder_info_circle_o',
  success: 'lugia-icon-reminder_check_circle_o',
  error: 'lugia-icon-reminder_close_circle_o',
  warning: 'lugia-icon-reminder_exclamation_circle_o',
};
const TypeThemeProps = {
  info: {
    normal: {
      color: themeColor,
      border: {
        left: { color: themeColor, style: 'solid', width: 4 },
        radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
      },
      background: { color: changeColor(themeColor, 0, 0, 10).rgba },
    },
  },
  success: {
    normal: {
      color: successColor,
      border: {
        left: { color: successColor, style: 'solid', width: 4 },
        radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
      },
      background: { color: changeColor(successColor, 0, 0, 10).rgba },
    },
  },
  warning: {
    normal: {
      color: warningColor,
      border: {
        left: { color: warningColor, style: 'solid', width: 4 },
        radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
      },
      background: { color: changeColor(warningColor, 0, 0, 10).rgba },
    },
  },
  error: {
    normal: {
      color: dangerColor,
      border: {
        left: { color: dangerColor, style: 'solid', width: 4 },
        radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
      },
      background: { color: changeColor(dangerColor, 0, 0, 10).rgba },
    },
  },
};

export default ThemeProvider(
  class extends React.Component<AlertProps, AlertState> {
    alert: any;

    constructor() {
      super();
      this.state = {
        visible: true,
        animateStart: false,
        height: 0,
      };
    }

    componentDidMount() {
      const height = this.alert && this.alert.offsetHeight;
      this.setState({
        height,
      });
    }

    getDefaultTheme(type: Type) {
      if (TypeThemeProps[type]) {
        return TypeThemeProps[type];
      }
      return TypeThemeProps.info;
    }

    getAlertIconTheme = () => {
      const { getPartOfThemeHocProps, type = 'info' } = this.props;
      const { viewClass, theme } = getPartOfThemeHocProps('AlertIcon');
      const hasDect = this.isInProps('description');
      const typeTheme = TypeCSS[type] || TypeCSS.info;
      const iconTheme = deepMerge(
        {
          [viewClass]: {
            normal: {
              font: { size: hasDect ? mFontSize : sFontSize },
              cursor: 'default',
              color: typeTheme.color,
              getCSS() {
                return `
                      position: absolute;
                      ${getPosition({ hasDect })};
                    `;
              },
            },
          },
        },
        theme
      );

      return {
        viewClass,
        theme: iconTheme,
      };
    };

    render() {
      const {
        type = 'info',
        showIcon = false,
        message = '警告提示',
        closable = false,
        description,
        icon,
        getPartOfThemeProps,
      } = this.props;
      const { visible, height, animateStart } = this.state;
      const hasDect = this.isInProps('description');
      const alertWrapTheme = getPartOfThemeProps('Container');
      const alertMessageTheme = getPartOfThemeProps('AlertMessage');
      const alertDescriptionTheme = getPartOfThemeProps('AlertDescription');
      const alertIconTheme = getPartOfThemeProps('AlertIcon');
      alertIconTheme.propsConfig = { hasDect, type };
      const defaultAlertTheme = this.getDefaultTheme(type);
      alertWrapTheme.themeConfig = deepMerge(defaultAlertTheme, alertWrapTheme.themeConfig);
      alertWrapTheme.propsConfig.hasDect = hasDect;
      alertWrapTheme.propsConfig.showIcon = showIcon;
      alertMessageTheme.propsConfig.hasDect = hasDect;

      return visible ? (
        <Alert
          ref={(node: any) => (this.alert = node)}
          type={type}
          showIcon={showIcon}
          visible={visible}
          animateStart={animateStart}
          height={height}
          hasDect={hasDect}
          themeProps={alertWrapTheme}
        >
          {showIcon ? (
            <Icon iconClass={icon || AlertIcons[type]} {...this.getAlertIconTheme()} singleTheme />
          ) : null}
          <Message hasDect={hasDect} showIcon={showIcon} themeProps={alertMessageTheme}>
            {message}
          </Message>
          <Description showIcon={showIcon} themeProps={alertDescriptionTheme}>
            {description}
          </Description>
          {closable && this.getCloseText()}
        </Alert>
      ) : null;
    }

    getCloseText = () => {
      const { closeText, type = 'info', getPartOfThemeProps, getPartOfThemeHocProps } = this.props;
      const CloseTextTheme = getPartOfThemeProps('CloseText');
      const { theme: IconThemeProps, viewClass: IconViewClass } = getPartOfThemeHocProps(
        'CloseIcon'
      );
      const closeIconTheme = deepMerge(
        {
          [IconViewClass]: {
            normal: {
              color: mediumGreyColor,
              fontSize: sFontSize,
            },
            hover: {
              color: darkGreyColor,
            },
            disabled: {
              color: disableTextColor,
            },
          },
        },
        IconThemeProps
      );
      CloseTextTheme.propsConfig = { textInProps: this.isInProps('closeText'), type };
      return (
        <CloseText
          onClick={this.handleClose}
          themeProps={CloseTextTheme}
          type={type}
          hasDect={this.isInProps('description')}
        >
          {closeText || (
            <Icon
              theme={closeIconTheme}
              viewClass={IconViewClass}
              iconClass="lugia-icon-reminder_close"
              singleTheme
            />
          )}
        </CloseText>
      );
    };
    handleClose = (e: Event) => {
      const { onClose } = this.props;
      e.preventDefault();
      this.setState({
        animateStart: true,
      });
      onClose && onClose(e);
      setTimeout(() => {
        this.setState({ visible: false });
      }, 250);
    };

    isInProps(value: string): boolean {
      return value in this.props;
    }
  },
  Widget.Alert
);
