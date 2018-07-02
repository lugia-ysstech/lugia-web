/**
 *
 * create by ligx
 *
 * @flow
 */
import colors, { colorsFactory } from '../stateColor';
import unitColor from '../utilsColor';

const { mockFunction, VerifyOrder } = require('@lugia/jverify');
const { create } = mockFunction;

// 获取mock后的目标方法

const defaultColor = '#684fff';

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
  it('colors', () => {
    expect(colors.toString()).toBe(colorsFactory(unitColor).toString());
    expect(colors.__changeColor__).toBe(unitColor);
  });
});
