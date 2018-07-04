/**
 *
 * create by ligx
 *
 * @flow
 */
import colors, { colorsFactory, replaceStyle } from '../stateColor';
import unitColor from '../utilsColor';

const { mockFunction, VerifyOrder } = require('@lugia/jverify');
const { create } = mockFunction;

// 获取mock后的目标方法

const defaultColor = '#684fff';

const DefaultCommonStyle = {
  themeColor: '#684fff', //主题色
  successColor: '#56c22d', //成功色
  warningColor: '#f8ac30', //警告色
  dangerColor: '#f22735', //危险色
  blackColor: '#333333', //黑色
  darkGreyColor: '#666666', //深灰色
  mediumGreyColor: '#999999', //中灰色
  lightGreyColor: '#cccccc', //浅灰色
  superLightColor: '#e8e8e8', //超浅色
  disableColor: '#f2f2f2', //禁止色
  defaultColor: '#ffffff', //默认白色色
  borderColor: '#cccccc', //边框色
  borderDisableColor: '#e8e8e8', //边框禁止色
  borderSize: '1px', //边框大小
  boxShadowOpacity: '20%', //边框透明度
  hShadow: '0', //边框水平偏移值（X）
  vShadow: '0', //边框竖直偏移值（Y）
  shadowSpread: '6px', //边框大小
  borderRadius: '4px', //圆角通用
  circleBorderRadius: '50%', //圆角-特殊
  transitionTime: '0.3s', //过渡时间
  rulesColor: '#fff', //分割线颜色
  rulesSize: '1px', //分割线大小
  rulesOpacity: '40%', //分割线透明度
  padding: '10px', //元素左右padding
  paddingToText: '6px', //文字到元素的距离
  marginToSameElement: '10px', //同级元素与元素之间距离
  marginToDifferentElement: '30px', //元素组之间距离
  marginToPeerElementForY: '10px', //同级元素竖向间距
  marginToSameElementForY: '6px', //竖向文字到元素距离
  marginToSonElement: '16px', //主从关系元素间距
};
describe('stateColor', () => {
  beforeEach(() => {});

  function colorsFactoryTestCase(themeColor?: string = 'default Color') {
    it(`colorsFactory: color is ${themeColor}`, () => {
      const verifyOrder = VerifyOrder.create();
      const mock = create({ mockName: 'target', verifyOrder });

      const targetFunc = mock.getFunction();

      const normalColorMock = { color: 'normalColorMock' };
      mock.returned(normalColorMock);

      const hoverColorMock = { color: 'hoverColorMock' };
      mock.returned(hoverColorMock);

      const mouseDownColorMock = { color: 'mouseDownColorMock' };
      mock.returned(mouseDownColorMock);

      const disabledColorMock = { color: 'disabledColor' };
      mock.returned(disabledColorMock);

      const spiritColorMock = { rgba: 'spiritColor' };
      mock.returned(spiritColorMock);

      const disabledSpiritBackgroundColorMock = { rgba: 'disabledSpiritBackgroundColor' };
      mock.returned(disabledSpiritBackgroundColorMock);

      const disabledSpiritFontAndBorderColorMock = { rgba: 'disabledSpiritFontAndBorderColorMock' };
      mock.returned(disabledSpiritFontAndBorderColorMock);
      const stateColor = colorsFactory(targetFunc);
      const {
        normalColor,
        hoverColor,
        mouseDownColor,
        disabledColor,
        spiritColor,
        disabledSpiritFontAndBorderColor,
        disabledSpiritBackgroundColor,
      } = stateColor(themeColor);
      expect(stateColor.__changeColor__).toBe(targetFunc);
      expect(normalColor).toBe(normalColorMock.color);
      expect(hoverColor).toBe(hoverColorMock.color);
      expect(mouseDownColor).toBe(mouseDownColorMock.color);
      expect(disabledColor).toBe(disabledColorMock.color);
      expect(spiritColor).toBe(spiritColorMock.rgba);
      expect(disabledSpiritBackgroundColor).toBe(disabledSpiritBackgroundColorMock.rgba);
      expect(disabledSpiritFontAndBorderColor).toBe(disabledSpiritFontAndBorderColorMock.rgba);
      verifyOrder.verify((arg: Object) => {
        const { target: changeColor } = arg;
        themeColor = themeColor ? themeColor : defaultColor;
        changeColor(themeColor);
        changeColor(themeColor, 20);
        changeColor(themeColor, 0, 20);
        changeColor(themeColor, 45);
        changeColor(themeColor, 0, 0, 5);
        changeColor(themeColor, 0, 0, 1.5);
        changeColor(themeColor, 0, 0, 30);
      });
    });
  }

  colorsFactoryTestCase('themeColor');
  colorsFactoryTestCase();

  it('colors result verify', () => {
    const result = colors();
    expect(result).toMatchObject(DefaultCommonStyle);
  });

  it('colors', () => {
    expect(colors.toString()).toBe(colorsFactory(unitColor).toString());
    expect(colors.__changeColor__).toBe(unitColor);
  });
  const comstyleKeys = Object.keys(DefaultCommonStyle);

  function replaceStyleCase(changeSytleCount: number) {
    it(`replaceStyle for ${changeSytleCount} style`, () => {
      const targetStyle = {};

      const exceptionStyle = Math.random() + 'r';
      targetStyle[exceptionStyle] = exceptionStyle + 'k';
      comstyleKeys.slice(0, changeSytleCount).forEach((key: string) => {
        targetStyle[key] = DefaultCommonStyle[key] + '_change';
      });

      replaceStyle(targetStyle);

      const changeStyleNames = Object.keys(targetStyle);
      comstyleKeys.forEach((key: string) => {
        if (changeStyleNames.includes(key)) {
          expect(colors()[key]).toBe(targetStyle[key]);
          return;
        }
        expect(colors()[key]).toBe(DefaultCommonStyle[key]);
      });
      expect(colors()[exceptionStyle]).toBeUndefined();
    });
  }

  for (let i = 0; i < comstyleKeys.length; i++) {
    replaceStyleCase(i);
  }
});
