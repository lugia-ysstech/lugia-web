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
import { Alert, CloseIcon, CloseText, Description, Icons, Message } from '../css/alert';
import changeColor from '../css/utilsColor';
import colorsFunc from '../css/stateColor';

const AlertIcons = {
  info: 'lugia-icon-reminder_info_circle_o',
  success: 'lugia-icon-reminder_check_circle_o',
  error: 'lugia-icon-reminder_close_circle_o',
  warning: 'lugia-icon-reminder_exclamation_circle_o',
};
const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  mediumGreyColor,
  blackColor,
  darkGreyColor,
} = colorsFunc();
const TypeThemeProps = {
  info: {
    normal: {
      color: themeColor,
      border: {
        left: { color: themeColor, style: 'solid', width: 4 },
        radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
      },
      background: { color: changeColor(themeColor, 0, 0, 20).rgba },
    },
  },
  success: {
    normal: {
      color: successColor,
      border: {
        left: { color: successColor, style: 'solid', width: 4 },
        radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
      },
      background: { color: changeColor(successColor, 0, 0, 20).rgba },
    },
  },
  warning: {
    normal: {
      color: warningColor,
      border: {
        left: { color: warningColor, style: 'solid', width: 4 },
        radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
      },
      background: { color: changeColor(warningColor, 0, 0, 20).rgba },
    },
  },
  error: {
    normal: {
      color: dangerColor,
      border: {
        left: { color: dangerColor, style: 'solid', width: 4 },
        radius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
      },
      background: { color: changeColor(dangerColor, 0, 0, 20).rgba },
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

    getDefaultPaddiong = () => {
      const { showIcon } = this.props;
      const hasDect = this.isInProps('description');
      let verticalPad = 12;
      let leftPad = 10;

      if (showIcon) {
        if (hasDect) {
          leftPad = 40;
        } else {
          leftPad = 34;
        }
      }
      if (hasDect) {
        verticalPad = 18;
      }
      const padding = {
        top: verticalPad,
        bottom: verticalPad,
        left: leftPad,
        right: 10,
      };
      return padding;
    };

    getMessageFont = () => {
      const hasDect = this.isInProps('description');
      let font = 14;
      if (hasDect) {
        font = 18;
      }
      return { normal: { font: { fontSize: font } } };
    };

    render() {
      const {
        type = 'info',
        showIcon = false,
        getTheme,
        message = '警告提示',
        closable = false,
        description,
        icon,
        themeProps,
        getPartOfThemeProps,
      } = this.props;
      const { visible, height, animateStart } = this.state;
      const hasDect = this.isInProps('description');

      const AlertWrapTheme = getPartOfThemeProps('AlertWrap');
      const AlertMessageTheme = getPartOfThemeProps('AlertMessage');
      const AlertDescriptionTheme = getPartOfThemeProps('AlertDescription');
      const defaultAlertTheme = this.getDefaultTheme(type);
      defaultAlertTheme.normal.padding = this.getDefaultPaddiong();
      AlertWrapTheme.themeConfig = deepMerge(defaultAlertTheme, AlertWrapTheme.themeConfig);
      console.log('ssss', AlertMessageTheme);
      AlertMessageTheme.themeConfig = deepMerge(
        this.getMessageFont(),
        AlertMessageTheme.themeConfig
      );
      console.log(AlertMessageTheme);
      return visible ? (
        <Alert
          ref={(node: any) => (this.alert = node)}
          type={type}
          showIcon={showIcon}
          visible={visible}
          animateStart={animateStart}
          height={height}
          hasDect={hasDect}
          themeProps={AlertWrapTheme}
        >
          {showIcon ? (
            <Icons
              theme={getTheme()}
              hasDect={hasDect}
              type={type}
              iconClass={icon || AlertIcons[type]}
            />
          ) : null}
          <Message hasDect={hasDect} showIcon={showIcon} themeProps={AlertMessageTheme}>
            {message}
          </Message>
          <Description showIcon={showIcon} themeProps={AlertDescriptionTheme}>
            {description}
          </Description>
          {closable && this.getCloseText()}
        </Alert>
      ) : null;
    }

    getCloseText = () => {
      const { closeText, type = 'info', getTheme } = this.props;
      return (
        <CloseText
          onClick={this.handleClose}
          theme={getTheme()}
          type={type}
          textInProps={this.isInProps('closeText')}
          hasDect={this.isInProps('description')}
        >
          {closeText || <CloseIcon iconClass="lugia-icon-reminder_close" />}
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
