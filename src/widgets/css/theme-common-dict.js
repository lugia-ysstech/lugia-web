/**
 *
 * create by ligx
 *
 * @flow
 */
import { getBorderRadius, getDict } from '@lugia/theme-utils';
import PublicValue from './public-value';
import changeColor from './utilsColor';

const dict = getDict('@lugia/lugia-web');

const NameSpace = 'Default';
const reduceS = 45;
const bgReduceA = 5;
/**
 * 加载lugia-web的默认主题
 */

dict.load(NameSpace, PublicValue);
load(PublicValue);
/**
 * 变更发布（生产）环境下的公共值
 * @param value 新的值
 */
export function load(value: Object) {
  if (value) {
    const ruleColor = getRuleColor(value);
    const buttonRuleColor = getButtonRuleColor(value);
    const alertRuleColor = getAlertRuleColor(value);
    const inputDangerColor = getInputDangerColor(value);
    const sizeBorderRadius = {
      sizeDefaultBorderRadius: 16,
      sizeSmallBorderRadius: 12,
      sizeLargeBorderRadius: 20,
    };
    const sizeSmallPadding = {
      smallPaddingCSS: {
        top: 0,
        right: 14,
        bottom: 0,
        left: 14,
      },
    };
    const sizeOtherPadding = {
      OtherPaddingCSS: {
        top: 0,
        right: 18,
        bottom: 0,
        left: 18,
      },
    };
    const textSizeCSS = {
      textSizeSmall: { size: 12 },
      textSizeOther: { size: 14 },
    };
    const textCircleCSS = {
      textCircleSmall: { size: 12 },
      textCircleOther: { size: 14 },
    };
    const defaultBorderColorCSS = {
      defaultBorderColor: '#e8e8e8',
    };
    const circleBorderRadius = { circleRadiusValue: '50%' };

    dict.load(NameSpace, {
      ...value,
      ...ruleColor,
      ...buttonRuleColor,
      ...alertRuleColor,
      ...inputDangerColor,
      ...sizeBorderRadius,
      ...sizeSmallPadding,
      ...sizeOtherPadding,
      ...textSizeCSS,
      ...textCircleCSS,
      ...defaultBorderColorCSS,
      ...circleBorderRadius,
    });
  }
}
function getReduceColor(
  targetColor: string,
  reduce: { reduceS: number, reduceB?: number, reduceA?: number },
  resultStr: 'color' | 'rgba' = 'color'
) {
  if (targetColor) {
    const { reduceS, reduceB, reduceA } = reduce;
    return changeColor(targetColor, reduceS, reduceB, reduceA)[resultStr];
  }
  return undefined;
}

function getRuleColor(value: Object): Object {
  const { themeColor } = value;
  const ruleColor = {
    normalColor: getReduceColor(themeColor, {}, 'color'),
    hoverColor: getReduceColor(themeColor, { reduceS: 20 }, 'color'),
    mouseDownColor: getReduceColor(themeColor, { reduceS: 0, reduceB: 20 }, 'color'),
    disabledColor: getReduceColor(themeColor, { reduceS: 45 }, 'color'),
    spiritColor: getReduceColor(themeColor, { reduceS: 0, reduceB: 0, reduceA: 5 }, 'rgba'),
    disabledSpiritBackgroundColor: getReduceColor(
      themeColor,
      { reduceS: 0, reduceB: 0, reduceA: 1.5 },
      'rgba'
    ),
    disabledSpiritFontAndBorderColor: getReduceColor(
      themeColor,
      { reduceS: 0, reduceB: 0, reduceA: 30 },
      'rgba'
    ),
  };
  return ruleColor;
}
function getButtonRuleColor(value: Object): Object {
  const { themeColor, successColor, warningColor, dangerColor } = value;
  const buttonRuleColor = {
    defaultColorReduceS: getReduceColor('#333', { reduceS }),
    themeColorReduceS: getReduceColor(themeColor, { reduceS }),
    successColorReduceS: getReduceColor(successColor, { reduceS }),
    warningColorReduceS: getReduceColor(warningColor, { reduceS }),
    dangerColorReduceS: getReduceColor(dangerColor, { reduceS }),
    themeColorReduceA: getReduceColor(
      themeColor,
      { reduceS: 0, reduceB: 0, reduceA: bgReduceA },
      'rgba'
    ),
    successColorReduceA: getReduceColor(
      successColor,
      { reduceS: 0, reduceB: 0, reduceA: bgReduceA },
      'rgba'
    ),
    warningColorReduceA: getReduceColor(
      warningColor,
      { reduceS: 0, reduceB: 0, reduceA: bgReduceA },
      'rgba'
    ),
    dangerColorReduceA: getReduceColor(
      dangerColor,
      { reduceS: 0, reduceB: 0, reduceA: bgReduceA },
      'rgba'
    ),
    mouseDownSuccessColor: getReduceColor(successColor, { reduceS: 0, reduceB: 20 }, 'color'),
    mouseDownWarningColor: getReduceColor(warningColor, { reduceS: 0, reduceB: 20 }, 'color'),
    mouseDownDangerColor: getReduceColor(dangerColor, { reduceS: 0, reduceB: 20 }, 'color'),
  };

  return buttonRuleColor;
}
function getAlertRuleColor(value: Object): Object {
  const { themeColor, successColor, warningColor, dangerColor } = value;
  const alertRuleColor = {
    alertThemeColorReduceA: getReduceColor(
      themeColor,
      { reduceS: 0, reduceB: 0, reduceA: 20 },
      'rgba'
    ),
    alertSuccessColorReduceA: getReduceColor(
      successColor,
      { reduceS: 0, reduceB: 0, reduceA: 20 },
      'rgba'
    ),
    alertWarningColorReduceA: getReduceColor(
      warningColor,
      { reduceS: 0, reduceB: 0, reduceA: 20 },
      'rgba'
    ),
    alertDangerColorReduceA: getReduceColor(
      dangerColor,
      { reduceS: 0, reduceB: 0, reduceA: 20 },
      'rgba'
    ),
  };

  return alertRuleColor;
}
function getInputDangerColor(value: Object): Object {
  const { dangerColor } = value;
  return {
    inputDangerColor: getReduceColor(dangerColor, { reduceS: 0, reduceB: 0, reduceA: 10 }, 'rgba'),
  };
}

const DevNameSpace = 'DevNameSpace';
/**
 * 加载并切换到开发环境的公共值
 * @param value 新的值
 */
export function loadDev(value: Object) {
  dict.load(DevNameSpace, value);
  dict.changeNameSpace(DevNameSpace);
}

/**
 * 恢复为发布（生产）环境的公共值
 */
export function rebackProduction() {
  dict.changeNameSpace(NameSpace);
}

/**
 * 组件中获取公共值的方式为：
 *   naem： 公共值名称
 */
export default function(name: string) {
  console.log('name', name);
  return dict.get(name);
}
