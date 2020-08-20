import React from 'react';
import { deepMerge } from '@lugia/object-utils';
import get from '../css/theme-common-dict';
import ToolTip from '../tooltip/index';
import { TipBottom, InnerTipText, FatherContainer, BottomContainer } from './validateCSS';
import { getWidthCSS } from './utils';
import { DefaultHelp, isValidateError } from '../css/validateHoc';
import { getBorderRadius } from '@lugia/theme-utils';
const hasValidateStatusInProps = (props: Object) => {
  return 'validateStatus' in props;
};
const ValidateHoc = (Target: Object) => {
  class ValidateContainer extends React.Component {
    state = {
      _isValidateVisible: false,
    };
    static defaultProps = {
      validateType: 'top',
    };

    onFocus = (event: UIEvent) => {
      const { onFocus, disabled, readOnly } = this.props;
      if (disabled || readOnly) {
        return;
      }
      this.setState({ _isValidateVisible: true });
      onFocus && onFocus(event);
    };

    onBlur = (event: UIEvent) => {
      const { onBlur, disabled, readOnly } = this.props;

      if (disabled || readOnly) {
        return;
      }
      this.setState({ _isValidateVisible: false });
      onBlur && onBlur(event);
    };

    render() {
      const {
        validateType,
        validateStatus,
        help,
        getPartOfThemeHocProps,
        getPartOfThemeProps,
        getPartOfThemeConfig,
      } = this.props;
      const { _isValidateVisible } = this.state;
      const theHelp = help || DefaultHelp;
      const result = (
        <Target
          {...this.props}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          validateTextThemeProps={() => getPartOfThemeProps('ValidateErrorText')}
        />
      );
      const isOpenValidate = hasValidateStatusInProps(this.props);
      if (!isOpenValidate) {
        return <Target {...this.props} />;
      }
      const innerProps =
        validateType === 'inner' ? { innerVisible: !_isValidateVisible } : { innerVisible: true };
      const validateThemeProps = getPartOfThemeProps('ValidateErrorText', {
        props: { validateStatus, ...innerProps },
      });
      const { __lugiad__header__absolute__ } = this.props;
      const innerThemeProps = deepMerge(validateThemeProps, getPartOfThemeProps('Container'));
      const bottomProps = __lugiad__header__absolute__ ? { inMega: true } : {};
      const ContainerThemeProps = getPartOfThemeProps('Container', { props: bottomProps });

      if (validateType === 'bottom') {
        return (
          <BottomContainer themeProps={ContainerThemeProps}>
            {result}
            <TipBottom themeProps={validateThemeProps}>{theHelp}</TipBottom>
          </BottomContainer>
        );
      }

      if (validateType === 'inner') {
        return (
          <FatherContainer themeProps={ContainerThemeProps}>
            {result}
            <InnerTipText themeProps={innerThemeProps}>{theHelp}</InnerTipText>
          </FatherContainer>
        );
      }
      const { theme: validateTopTipThemeProps, viewClass } = getPartOfThemeHocProps(
        'ValidateErrorText'
      );
      const newTheme = {
        [viewClass]: {
          Container: deepMerge(
            {
              normal: {
                borderRadius: getBorderRadius(2),
                background: { color: get('blackColor') },
                getCSS() {
                  return 'display: inline-block;';
                },
              },
              hover: {
                background: { color: get('blackColor') },
              },
            },
            validateTopTipThemeProps[viewClass]
          ),
          TooltipTitle: deepMerge(
            { normal: { color: get('defaultColor') } },
            validateTopTipThemeProps[viewClass]
          ),
          ChildrenContainer: {
            normal: {
              getCSS(themeMeta, themeProps) {
                const { propsConfig } = themeProps;
                const { width = '100%' } = propsConfig;
                const widthCSS = getWidthCSS(width);
                return `${widthCSS};height:100%;display: block;`;
              },
            },
          },
        },
      };
      const { normal: { width } = {} } = getPartOfThemeConfig('Container');
      const theWidth = width || '100%';
      const { createPortal = true, popupContainerId } = this.props;
      return (
        <ToolTip
          popupContainerId={popupContainerId}
          createPortal={createPortal}
          theme={newTheme}
          viewClass={viewClass}
          propsConfig={{ width: theWidth }}
          title={theHelp}
          action={'focus'}
          placement={'topLeft'}
          visible={isValidateError(validateStatus)}
        >
          {result}
        </ToolTip>
      );
    }
  }
  return ValidateContainer;
};
export default ValidateHoc;
