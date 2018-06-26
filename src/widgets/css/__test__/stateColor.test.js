/**
 *
 * create by ligx
 *
 * @flow
 */
import colors from '../stateColor';
describe('stateColor', () => {
  beforeEach(() => {});
  it('有参数 字符串 #684fff', () => {
    expect(colors('#684fff').normalColor).toBe('#684fff');
    expect(colors('#684fff').hoverColor).toBe('#9482ff');
    expect(colors('#684fff').mouseDownColor).toBe('#533fcc');
    expect(colors('#684fff').disabledColor).toBe('#cac2ff');
    expect(colors('#684fff').spiritColor).toBe('rgba(104,79,255,0.05)');
    expect(colors('#684fff').disabledSpiritBackgroundColor).toBe('rgba(104,79,255,0.015)');
    expect(colors('#684fff').disabledSpiritFontAndBorderColor).toBe('rgba(104,79,255,0.3)');
  });
  it('没有参数', () => {
    expect(colors().normalColor).toBe('#684fff');
    expect(colors().hoverColor).toBe('#9482ff');
    expect(colors().mouseDownColor).toBe('#533fcc');
    expect(colors().disabledColor).toBe('#cac2ff');
    expect(colors().spiritColor).toBe('rgba(104,79,255,0.05)');
    expect(colors().disabledSpiritBackgroundColor).toBe('rgba(104,79,255,0.015)');
    expect(colors().disabledSpiritFontAndBorderColor).toBe('rgba(104,79,255,0.3)');
  });
});
