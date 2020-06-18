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
import { Alert, CloseText, Description, Message, TitleWrap, TypeCSS } from '../css/alert';
import changeColor from '../css/utilsColor';
import get from '../css/theme-common-dict';
import Icon from '../icon';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const warningColor = '$lugia-dict.@lugia/lugia-web.warningColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const AlertIcons = {
  info: 'lugia-icon-reminder_info_circle_o',
  success: 'lugia-icon-reminder_check_circle_o',
  error: 'lugia-icon-reminder_close_circle_o',
  warning: 'lugia-icon-reminder_exclamation_circle_o',
};
const TypeThemeProps = () => ({
  info: {
    normal: {
      color: themeColor,
      border: getBorder({ color: themeColor, width: 4, style: 'solid' }, ['l']),
      borderRadius: getBorderRadius(get('borderRadiusValue')),
      background: { color: changeColor(get('themeColor'), 0, 0, 10).rgba },
    },
  },
  success: {
    normal: {
      color: successColor,
      border: getBorder({ color: successColor, width: 4, style: 'solid' }, ['l']),
      borderRadius: getBorderRadius(get('borderRadiusValue')),
      background: { color: changeColor(get('successColor'), 0, 0, 10).rgba },
    },
  },
  warning: {
    normal: {
      color: warningColor,
      border: getBorder({ color: warningColor, width: 4, style: 'solid' }, ['l']),
      borderRadius: getBorderRadius(get('borderRadiusValue')),
      background: { color: changeColor(get('warningColor'), 0, 0, 10).rgba },
    },
  },
  error: {
    normal: {
      color: dangerColor,
      border: getBorder({ color: dangerColor, width: 4, style: 'solid' }, ['l']),
      borderRadius: getBorderRadius(get('borderRadiusValue')),
      background: { color: changeColor(get('dangerColor'), 0, 0, 10).rgba },
    },
  },
});
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
      if (TypeThemeProps()[type]) {
        return TypeThemeProps()[type];
      }
      return TypeThemeProps().info;
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
              font: { size: hasDect ? get('mFontSize') : get('sFontSize') },
              cursor: 'default',
              color: typeTheme.color,
              margin: {
                left: get('padding'),
              },
            },
          },
        },
        theme
      );
      const {
        [viewClass]: {
          normal: {
            font: { size },
          },
        },
      } = iconTheme;

      return {
        viewClass,
        theme: iconTheme,
        size,
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
      alertDescriptionTheme.propsConfig.iconSize = this.getAlertIconTheme().size;
      alertDescriptionTheme.propsConfig.showIcon = showIcon;

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
          <TitleWrap>
            {showIcon ? (
              <Icon
                iconClass={icon || AlertIcons[type]}
                {...this.getAlertIconTheme()}
                singleTheme
              />
            ) : null}
            <Message hasDect={hasDect} showIcon={showIcon} themeProps={alertMessageTheme}>
              {message}
            </Message>
          </TitleWrap>
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
              color: get('mediumGreyColor'),
              fontSize: get('sFontSize'),
            },
            hover: {
              color: get('darkGreyColor'),
            },
            disabled: {
              color: get('disableTextColor'),
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
