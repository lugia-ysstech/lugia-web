import React from 'react';
import { deepMerge } from '@lugia/object-utils';
import get from '../css/theme-common-dict';
import ToolTip from '../tooltip/index';
import { DefaultHelp, isValidateError } from '../css/input';

import {
  TipBottom,
  InnerTipText,
  InnerTip,
  InnerTipMask,
  FatherContainer,
  defaultBorderThemeProps,
  defaultFontColorThemeProps,
} from './validateCSS';

const ValidateHoc = (Target: Object) => {
  class ValidateContainer extends React.Component {
    state = {
      _isTipMaskVisible: false,
      _isToolTipVisible: false,
    };

    onFocus = (event: UIEvent) => {
      const { onFocus, disabled, readOnly } = this.props;
      if (disabled || readOnly) {
        return;
      }
      this.setState({ _isToolTipVisible: true, _isTipMaskVisible: false });
      onFocus && onFocus(event);
    };

    onBlur = (event: UIEvent) => {
      const { onBlur, disabled } = this.props;

      if (disabled) {
        return;
      }
      this.setState({ _isToolTipVisible: false, _isTipMaskVisible: true });
      onBlur && onBlur(event);
    };
    render() {
      const {
        validateType,
        validateStatus,
        help,
        getPartOfThemeHocProps,
        getPartOfThemeProps,
        isValidate = true,
      } = this.props;

      const theHelp = help || DefaultHelp;
      const result = (
        <Target
          {...this.props}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          getValidateBorderDefaultTheme={defaultBorderThemeProps}
          getValidateValueDefaultTheme={defaultFontColorThemeProps}
          validateTextThemeProps={() => getPartOfThemeProps('ValidateErrorText')}
        />
      );

      if (!isValidate) {
        return result;
      }
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
                getCSS() {
                  return 'display: block;';
                },
              },
            },
          },
        };
        const { _isToolTipVisible } = this.state;
        return (
          <ToolTip
            theme={newTheme}
            viewClass={viewClass}
            title={theHelp}
            action={'focus'}
            popArrowType={'round'}
            placement={'topLeft'}
            visible={isValidateError(validateStatus) && _isToolTipVisible}
          >
            {result}
          </ToolTip>
        );
      }
      if (validateType === 'bottom') {
        const innerThemeProps = getPartOfThemeProps('ValidateErrorText', {
          props: { validateStatus },
        });
        return (
          <React.Fragment>
            {result}
            <TipBottom themeProps={innerThemeProps}>{theHelp}</TipBottom>
          </React.Fragment>
        );
      }
      const { _isTipMaskVisible } = this.state;
      if (validateType === 'inner') {
        const innerThemeProps = getPartOfThemeProps('ValidateErrorText', {
          props: { validateStatus, _isTipMaskVisible },
        });
        return (
          <FatherContainer>
            {result}
            <InnerTip themeProps={innerThemeProps}>
              <InnerTipMask />
              <InnerTipText themeProps={innerThemeProps}>{theHelp}</InnerTipText>
            </InnerTip>
          </FatherContainer>
        );
      }
      return result;
    }
  }
  return ValidateContainer;
};
export default ValidateHoc;
