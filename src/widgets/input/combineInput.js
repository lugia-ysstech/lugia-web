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
const ExtendContainer: Object = CSSComponent({
  tag: 'div',
  className: 'ExtendContainer',
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
const ExtendText: Object = CSSComponent({
  tag: 'div',
  className: 'ExtendText',
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
type AddType = 'text' | 'select' | 'custom';
type PositionType = 'Before' | 'After' | 'Both';

type CombineInputProps = {
  addBefore?: boolean,
  addAfter?: boolean,
  beforeType?: AddType,
  afterType?: AddType,
  beforeText?: string,
  afterText?: string,
  beforeIconClass?: string,
  afterIconClass?: string,
  beforeSelectData?: Object[],
  afterSelectData?: Object[],
  beforeSelectValue?: string,
  afterSelectValue?: string,
  beforeSelectDisplayValue?: string,
  afterSelectDisplayValue?: string,
  beforeSelectValueField?: string,
  afterSelectValueField?: string,
  beforeSelectDisplayField?: string,
  afterSelectDisplayField?: string,
  beforeRender?: React.ReactNode,
  afterRender?: React.ReactNode,
  onBeforeSelectChange?: Function,
  onAfterSelectChange?: Function,
} & InputProps;

const checkValue = (actualValue: string, expectValue: string) => {
  return actualValue === expectValue;
};
const getBorderCSSByPosition = (position: PositionType) => {
  const border = checkValue(position, 'Before')
    ? { right: { width: 0 } }
    : checkValue(position, 'After')
    ? { left: { width: 0 } }
    : {};
  return {
    border,
    borderRadius: getBorderRadiusCSSByPosition(position),
  };
};
const getBorderRadiusCSSByPosition = (position: PositionType) => {
  return checkValue(position, 'Before')
    ? getBorderRadius(0, ['tr', 'br'])
    : checkValue(position, 'After')
    ? getBorderRadius(0, ['tl', 'bl'])
    : '';
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
    afterType: 'text',
    beforeText: 'http://',
    afterText: '.com',
  };

  getDisplayText(position: PositionType, text: string) {
    const { getPartOfThemeProps, disabled, size } = this.props;
    const themeProps = getPartOfThemeProps(`${position}Content`, { props: { size } });
    return text !== '' ? (
      <ExtendText disabled={disabled} themeProps={themeProps}>
        text
      </ExtendText>
    ) : null;
  }

  getDisplayIcon(position: PositionType) {
    const {
      getPartOfThemeHocProps,
      beforeIconClass = defaultIconClass,
      afterIconClass = defaultIconClass,
      disabled,
    } = this.props;

    const iconClass = checkValue(position, 'Before')
      ? beforeIconClass
      : checkValue(position, 'After')
      ? afterIconClass
      : '';
    const { theme, viewClass } = getPartOfThemeHocProps(`${position}Icon`);
    const iconDefaultTheme = {
      [viewClass]: {
        normal: {
          color: blackColor,
          margin: {
            left: paddingToText,
          },
          getThemeMeta(themeMeta, themeProps) {
            const { propsConfig } = themeProps;
            const { size } = propsConfig;
            const { fontSize, font: { size: innerFontSize } = {} } = themeMeta;
            const theSize = innerFontSize || fontSize || getIconSize(size);
            return {
              fontSize: theSize,
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
        disabled={disabled}
        singleTheme
        iconClass={iconClass}
        viewClass={viewClass}
        theme={theTheme}
      />
    ) : null;
  }

  getDisplayContent(position: PositionType) {
    const { beforeType, beforeText, beforeRender, afterType, afterText, afterRender } = this.props;

    let content = '';

    if (checkValue(position, 'Before')) {
      content = checkValue(beforeType, 'text')
        ? [this.getDisplayText(position, beforeText), this.getDisplayIcon(position)]
        : beforeRender;
    } else if (checkValue(position, 'After')) {
      content = checkValue(afterType, 'text')
        ? [this.getDisplayText(position, afterText), this.getDisplayIcon(position)]
        : afterRender;
    }
    return content;
  }

  generateExtendContentByPosition(position: PositionType): React$Node {
    const {
      size,
      beforeSelectData,
      beforeType,
      onBeforeSelectChange,
      afterSelectData,
      onAfterSelectChange,
      afterType,
      disabled,
      getPartOfThemeProps,
      beforeSelectValue,
      afterSelectValue,
      beforeSelectDisplayValue,
      afterSelectDisplayValue,
      beforeSelectValueField,
      afterSelectValueField,
      beforeSelectDisplayField,
      afterSelectDisplayField,
      beforeSelectPullIconClass,
      afterSelectPullIconClass,
      createPortal,
      popupContainerId,
    } = this.props;

    const { theme, viewClass } = this.getSelectTheme(position);

    if (
      (checkValue(position, 'Before') && checkValue(beforeType, 'select')) ||
      (checkValue(position, 'After') && checkValue(afterType, 'select'))
    ) {
      let data = [];
      let onSelectChange = null;
      let value = [];
      let displayValue = [];
      let valueField = '';
      let displayField = '';
      let pullIconClass = '';
      if (checkValue(position, 'Before')) {
        data = beforeSelectData;
        onSelectChange = onBeforeSelectChange;
        value = beforeSelectValue;
        displayValue = beforeSelectDisplayValue;
        valueField = beforeSelectValueField;
        displayField = beforeSelectDisplayField;
        pullIconClass = beforeSelectPullIconClass;
      } else if (checkValue(position, 'After')) {
        data = afterSelectData;
        onSelectChange = onAfterSelectChange;
        value = afterSelectValue;
        displayValue = afterSelectDisplayValue;
        valueField = afterSelectValueField;
        displayField = afterSelectDisplayField;
        pullIconClass = afterSelectPullIconClass;
      }
      return (
        <Select
          popupContainerId={popupContainerId}
          createPortal={createPortal}
          disabled={disabled}
          value={value}
          displayValue={displayValue}
          valueField={valueField}
          displayField={displayField}
          pullIconClass={pullIconClass}
          data={data}
          viewClass={viewClass}
          theme={theme}
          size={size}
          onChange={onSelectChange}
        />
      );
    }

    const extendThemeProps = getPartOfThemeProps(`${position}Content`, {
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

    const theThemeProps = deepMerge(defaultTheme, extendThemeProps);
    return (
      <ExtendContainer themeProps={theThemeProps}>
        {this.getDisplayContent(position)}
      </ExtendContainer>
    );
  }

  getContainerHeight() {
    const { getPartOfThemeProps } = this.props;
    const {
      themeConfig: { normal: { height } = {} },
    } = getPartOfThemeProps('Container');
    return height;
  }

  getSelectTheme(position: PositionType) {
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
      addAfter && addBefore ? 'Both' : addAfter ? 'Before' : addBefore ? 'After' : '';
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
    const autoInputContainer = getPartOfThemeProps('Container', {
      props: {
        size,
      },
    });
    return (
      <CombineInputContainer themeProps={autoInputContainer}>
        {addBefore ? this.generateExtendContentByPosition('Before') : null}
        <InnerInputContainer addBefore={addBefore} addAfter={addAfter}>
          {input}
        </InnerInputContainer>
        {addAfter ? this.generateExtendContentByPosition('After') : null}
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
