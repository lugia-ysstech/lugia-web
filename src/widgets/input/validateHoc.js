import React from 'react';
import { deepMerge } from '@lugia/object-utils';
import get from '../css/theme-common-dict';
import ToolTip from '../tooltip/index';
import { TipBottom, InnerTipText, FatherContainer, BottomContainer } from './validateCSS';
import { getWidthCSS } from './utils';
import { DefaultHelp, isValidateError } from '../css/validateHoc';
const ValidateHoc = (Target: Object) => {
  class ValidateContainer extends React.Component {
    state = {
      _isValidateVisible: true,
    };

    onFocus = (event: UIEvent) => {
      const { onFocus, disabled, readOnly } = this.props;
      if (disabled || readOnly) {
        return;
      }
      this.setState({ _isValidateVisible: false });
      onFocus && onFocus(event);
    };

    onBlur = (event: UIEvent) => {
      const { onBlur, disabled, readOnly } = this.props;

      if (disabled || readOnly) {
        return;
      }
      this.setState({ _isValidateVisible: true });
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

      if (validateType === 'top') {
        const { theme: validateTopTipThemeProps, viewClass } = getPartOfThemeHocProps(
          'ValidateErrorText'
        );
        const newTheme = {
          [viewClass]: {
            Container: deepMerge(
              {
                normal: {
                  background: { color: get('darkGreyColor') },
                  getCSS() {
                    return 'display: inline-block;';
                  },
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
        return (
          <ToolTip
            theme={newTheme}
            viewClass={viewClass}
            propsConfig={{ width: theWidth }}
            title={theHelp}
            action={'focus'}
            popArrowType={'round'}
            placement={'topLeft'}
            visible={isValidateError(validateStatus) && _isValidateVisible}
          >
            {result}
          </ToolTip>
        );
      }
      const innerProps = validateType === 'inner' ? { _isValidateVisible } : {};
      const validateThemeProps = getPartOfThemeProps('ValidateErrorText', {
        props: { validateStatus, ...innerProps },
      });
      const ContainerThemeProps = getPartOfThemeProps('Container');

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
            <InnerTipText themeProps={validateThemeProps}>{theHelp}</InnerTipText>
          </FatherContainer>
        );
      }
      return <Target {...this.props} />;
    }
  }
  return ValidateContainer;
};
export default ValidateHoc;
