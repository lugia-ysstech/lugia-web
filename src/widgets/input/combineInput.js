import React from 'react';
import Input from './index';
import Select from '../select/index';

import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import MouseEventAdaptor from '../common/MouseEventAdaptor';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import Widget from '../consts';
import { getDisplayTextSize, getInputHeight } from '../css/input';
import { getIconSize } from '../css/pagination';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';
import type { InputProps } from './input';
import { units } from '@lugia/css';
import get from '../css/theme-common-dict';
import Icon from '../icon';

const { px2remcss } = units;

const borderRadius = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const paddingToText = '$lugia-dict.@lugia/lugia-web.paddingToText';

const defaultIconClass = 'lugia-icon-financial_classification';
const _BeforeType = 'Before';
const _AfterType = 'After';

const CombineContainer: Object = CSSComponent({
  tag: 'div',
  className: 'CombineContainer',
  normal: {
    selectNames: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
    defaultTheme: {
      background: { color: disableColor },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { size, position },
      } = themeProps;
      const { height } = themeMeta;
      const theHeight = getInputHeight(height, size);
      return {
        height: theHeight,
        ...getBorderCSSByPosition(position),
      };
    },
  },
  css: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${() => px2remcss(get('padding'))};
  `,
});
const CombineText: Object = CSSComponent({
  tag: 'div',
  className: 'CombineText',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font']],
    defaultTheme: {
      color: blackColor,
    },
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { size } = propsConfig;
      const { fontSize, font: { size: innerFontSize } = {} } = themeMeta;
      const theSize = innerFontSize || fontSize || getDisplayTextSize(size);
      return {
        fontSize: theSize,
      };
    },
  },
  disabled: {
    selectNames: [['color'], ['fontSize'], ['font']],
    defaultTheme: {
      color: disableTextColor,
    },
  },
});
const CombineInputContainer: Object = CSSComponent({
  tag: 'div',
  className: 'CombineInputContainer',
  normal: {
    selectNames: [['width'], ['height'], ['padding'], ['margin']],
    defaultTheme: {
      width: '100%',
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { size },
      } = themeProps;
      const { height } = themeMeta;
      const theHeight = getInputHeight(height, size);
      return {
        height: theHeight,
      };
    },
  },
  css: css`
    display: flex;
  `,
});

const InnerInputContainer: props = StaticComponent({
  tag: 'span',
  className: 'InnerInputContainer',
  css: css`
    flex: ${props => {
      const { addBefore, addAfter } = props;
      return addBefore && addAfter ? '3' : addBefore || addAfter ? '4;' : '1;';
    }};
  `,
});
type AddType = 'display' | 'select' | 'custom';
type IconPositionType = 'before' | 'after';
type _InnerPositionType = 'Before' | 'After' | 'Both';

type CombineInputProps = {
  addBefore?: boolean,
  addAfter?: boolean,
  beforeType?: AddType,
  afterType?: AddType,
  beforeIconClass?: string,
  afterIconClass?: string,
  beforeIconPosition?: IconPositionType,
  afterIconPosition?: IconPositionType,
  beforeSelectData?: Object[],
  afterSelectData?: Object[],
  beforeSelectDisplayValue?: string,
  afterSelectDisplayValue?: string,
  beforeSelectValueField?: string,
  afterSelectValueField?: string,
  beforeSelectDisplayField?: string,
  afterSelectDisplayField?: string,
  beforeRenderValue?: string | React.ReactNode,
  afterRenderValue?: string | React.ReactNode,
  onBeforeSelectChange?: Function,
  onAfterSelectChange?: Function,
} & InputProps;

const checkValue = (actualValue: string, expectValue: string) => {
  return actualValue === expectValue;
};
const getBorderCSSByPosition = (position: _InnerPositionType) => {
  let border;
  switch (position) {
    case _BeforeType:
      border = { right: { width: 0 } };
      break;
    case _AfterType:
      border = { left: { width: 0 } };
      break;
    default:
      border = {};
  }

  return {
    border,
    borderRadius: getBorderRadiusCSSByPosition(position),
  };
};
const getBorderRadiusCSSByPosition = (position: _InnerPositionType) => {
  let borderRadius;
  switch (position) {
    case _BeforeType:
      borderRadius = getBorderRadius(0, ['tr', 'br']);
      break;
    case _AfterType:
      borderRadius = getBorderRadius(0, ['tl', 'bl']);
      break;
    default:
      borderRadius = '';
  }
  return borderRadius;
};

class CombineInput extends React.Component<CombineInputProps> {
  static defaultProps = {
    disabled: false,
    size: 'default',
    defaultValue: '',
    isShowClearButton: true,
    canClear: true,
    addBefore: true,
    addAfter: true,
    beforeType: 'select',
    afterType: 'display',
    beforeRenderValue: 'http://',
    afterRenderValue: '.com',
    beforeIconPosition: 'before',
    afterIconPosition: 'before',
  };

  getDisplayText(position: _InnerPositionType, text: string) {
    const { getPartOfThemeProps, disabled, size } = this.props;
    const themeProps = getPartOfThemeProps(`${position}Content`, { props: { size } });
    return text !== '' ? (
      <CombineText disabled={disabled} themeProps={themeProps}>
        {text}
      </CombineText>
    ) : null;
  }

  getDisplayIcon(position: _InnerPositionType, iconClass: string, iconPosition: IconPositionType) {
    const { getPartOfThemeHocProps, disabled, size } = this.props;
    const { theme, viewClass } = getPartOfThemeHocProps(`${position}Icon`);

    const theIconPosition = checkValue(iconPosition, 'after') ? 'left' : 'right';
    const iconDefaultTheme = {
      [viewClass]: {
        normal: {
          color: blackColor,
          getThemeMeta(themeMeta) {
            const { fontSize, font: { size: innerFontSize } = {} } = themeMeta;
            const theSize = innerFontSize || fontSize || getIconSize(size);
            return {
              fontSize: theSize,
              margin: {
                [theIconPosition]: paddingToText,
              },
            };
          },
        },
        disabled: {
          color: disableTextColor,
        },
      },
    };
    const theTheme = deepMerge(iconDefaultTheme, theme);
    return iconClass !== '' ? (
      <Icon
        size={size}
        iconPosition={iconPosition}
        disabled={disabled}
        singleTheme
        iconClass={iconClass}
        viewClass={viewClass}
        theme={theTheme}
      />
    ) : null;
  }

  getDisplayRender(position: _InnerPositionType) {
    return checkValue(position, _BeforeType)
      ? this.getBeforeRenderContent()
      : checkValue(position, _AfterType)
      ? this.getAfterRenderContent()
      : '';
  }

  getAfterRenderContent() {
    const {
      afterType,
      afterRenderValue,
      afterIconPosition,
      afterIconClass = defaultIconClass,
    } = this.props;
    return checkValue(afterType, 'display')
      ? this.getDisplayInnerContent(_AfterType, afterRenderValue, afterIconClass, afterIconPosition)
      : checkValue(afterType, 'custom')
      ? afterRenderValue
      : '';
  }

  getBeforeRenderContent() {
    const {
      beforeType,
      beforeRenderValue,
      beforeIconPosition,
      beforeIconClass = defaultIconClass,
    } = this.props;

    return checkValue(beforeType, 'display')
      ? this.getDisplayInnerContent(
          _BeforeType,
          beforeRenderValue,
          beforeIconClass,
          beforeIconPosition
        )
      : checkValue(beforeType, 'custom')
      ? beforeRenderValue
      : '';
  }

  getDisplayInnerContent(
    position: _InnerPositionType,
    renderValue: string | React.ReactNode,
    iconClass: string,
    iconPosition: IconPositionType
  ) {
    if (checkValue(iconPosition, 'after')) {
      return [
        this.getDisplayText(position, renderValue),
        this.getDisplayIcon(position, iconClass, iconPosition),
      ];
    }
    return [
      this.getDisplayIcon(position, iconClass, iconPosition),
      this.getDisplayText(position, renderValue),
    ];
  }

  getBeforeSelect() {
    const {
      size,
      disabled,
      beforeSelectData,
      onBeforeSelectChange,
      beforeRenderValue,
      beforeSelectDisplayValue,
      beforeSelectValueField,
      beforeSelectDisplayField,
      beforeSelectPullIconClass,
      createPortal,
      popupContainerId,
    } = this.props;
    const { theme, viewClass } = this.getSelectTheme(_BeforeType);
    return (
      <Select
        popupContainerId={popupContainerId}
        createPortal={createPortal}
        disabled={disabled}
        value={beforeRenderValue}
        displayValue={beforeSelectDisplayValue}
        valueField={beforeSelectValueField}
        displayField={beforeSelectDisplayField}
        pullIconClass={beforeSelectPullIconClass}
        data={beforeSelectData}
        viewClass={viewClass}
        theme={theme}
        size={size}
        onChange={onBeforeSelectChange}
      />
    );
  }

  getAfterSelect() {
    const {
      size,
      disabled,
      afterSelectData,
      onAfterSelectChange,
      afterRenderValue,
      afterSelectDisplayValue,
      afterSelectValueField,
      afterSelectDisplayField,
      afterSelectPullIconClass,
      createPortal,
      popupContainerId,
    } = this.props;
    const { theme, viewClass } = this.getSelectTheme(_AfterType);

    return (
      <Select
        popupContainerId={popupContainerId}
        createPortal={createPortal}
        disabled={disabled}
        value={afterRenderValue}
        displayValue={afterSelectDisplayValue}
        valueField={afterSelectValueField}
        displayField={afterSelectDisplayField}
        pullIconClass={afterSelectPullIconClass}
        data={afterSelectData}
        viewClass={viewClass}
        theme={theme}
        size={size}
        onChange={onAfterSelectChange}
      />
    );
  }

  getBeforeCombineContent(): React$Node {
    const { beforeType } = this.props;
    if (checkValue(beforeType, 'select')) {
      return this.getBeforeSelect();
    }
    return this.getDisplayContent(_BeforeType);
  }

  getAfterCombineContent(): React$Node {
    const { afterType } = this.props;
    if (checkValue(afterType, 'select')) {
      return this.getAfterSelect();
    }
    return this.getDisplayContent(_AfterType);
  }

  getDisplayContent(position: _InnerPositionType) {
    const { getPartOfThemeProps, size } = this.props;
    const combineThemeProps = getPartOfThemeProps(`${position}Content`, {
      props: { position, size },
    });
    const {
      themeConfig: { normal: { height } = {} },
    } = getPartOfThemeProps('Container');
    const defaultTheme = {
      themeConfig: {
        normal: deepMerge(
          {
            border: getBorder(get('normalBorder')),
            borderRadius: getBorderRadius(borderRadius),
            height,
          },
          getBorderCSSByPosition(position)
        ),
      },
    };

    const theThemeProps = deepMerge(defaultTheme, combineThemeProps);
    return (
      <CombineContainer themeProps={theThemeProps}>
        {this.getDisplayRender(position)}
      </CombineContainer>
    );
  }

  getContainerHeight() {
    const { getPartOfThemeProps } = this.props;
    const {
      themeConfig: { normal: { height } = {} },
    } = getPartOfThemeProps('Container');
    return height;
  }

  getSelectTheme(position: _InnerPositionType) {
    const { getPartOfThemeHocProps, addBefore, addAfter } = this.props;

    const { theme: selectThemeProps, viewClass } = getPartOfThemeHocProps(`${position}Select`);
    const height = this.getContainerHeight();
    const theme = deepMerge(
      {
        [viewClass]: {
          Container: {
            normal: {
              ...getBorderCSSByPosition(position),
              height,
              getCSS() {
                return addBefore || addAfter ? 'flex:1;' : '';
              },
            },
            hover: {
              ...getBorderCSSByPosition(position),
            },
            focus: {
              ...getBorderCSSByPosition(position),
            },
            active: {
              ...getBorderCSSByPosition(position),
            },
            disabled: {
              ...getBorderCSSByPosition(position),
            },
          },
        },
      },
      selectThemeProps
    );

    return { theme, viewClass };
  }

  getInputTheme = () => {
    const { getPartOfThemeHocProps, addAfter, addBefore } = this.props;
    const { theme: inputThemeProps, viewClass } = getPartOfThemeHocProps('Input');

    const position =
      addAfter && addBefore ? 'Both' : addAfter ? _BeforeType : addBefore ? _AfterType : '';
    const theme = deepMerge(
      {
        [viewClass]: {
          Container: {
            normal: {
              borderRadius: getBorderRadiusCSSByPosition(position),
            },
            hover: {
              borderRadius: getBorderRadiusCSSByPosition(position),
            },
            focus: {
              borderRadius: getBorderRadiusCSSByPosition(position),
            },
            active: {
              borderRadius: getBorderRadiusCSSByPosition(position),
            },
            disabled: {
              borderRadius: getBorderRadiusCSSByPosition(position),
            },
          },
        },
      },
      inputThemeProps
    );
    return {
      theme,
      viewClass,
    };
  };

  render() {
    const { addBefore, addAfter, getPartOfThemeProps, size } = this.props;

    const input = <Input {...this.props} {...this.getInputTheme()} />;
    if (!addBefore && !addAfter) {
      return input;
    }
    const combineInputContainerThemeProps = getPartOfThemeProps('Container', {
      props: {
        size,
      },
    });
    return (
      <CombineInputContainer themeProps={combineInputContainerThemeProps}>
        {addBefore ? this.getBeforeCombineContent() : null}
        <InnerInputContainer addBefore={addBefore} addAfter={addAfter}>
          {input}
        </InnerInputContainer>
        {addAfter ? this.getAfterCombineContent() : null}
      </CombineInputContainer>
    );
  }
}
const TargetTxtBox = ThemeHoc(
  MouseEventAdaptor(KeyBoardEventAdaptor(CombineInput)),
  Widget.CombineInput,
  {
    hover: true,
    active: true,
  }
);

export default TargetTxtBox;
