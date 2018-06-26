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
  });
  it('没有参数', () => {
    expect(colors('#684fff').normalColor).toBe('#684fff');
  });
});
