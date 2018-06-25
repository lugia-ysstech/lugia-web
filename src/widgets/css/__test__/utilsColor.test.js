/**
 *
 * create by ligx
 *
 * @flow
 */
import changeColor from '../utilsColor';

describe('utilsColor', () => {
  beforeEach(() => {});

  it('主色', () => {
    expect(changeColor('#684fff').color).toBe('#684fff');
  });
  it('S值下调20%', () => {
    expect(changeColor('#684fff', 20).color).toBe('#9482ff');
  });
  it('B值下调20%', () => {
    expect(changeColor('#684fff', 0, 20).color).toBe('#533fcc');
  });
  it('S值下调45%', () => {
    expect(changeColor('#684fff', 45).color).toBe('#cac2ff');
  });
  it('幽灵：正常色透明5%', () => {
    expect(changeColor('#684fff', 0, 0, 5).rgba).toBe('rgba(104,79,255,0.05)');
  });
  it('正常幽灵透明30%（0.05*30）', () => {
    expect(changeColor('#684fff', 0, 0, 1.5).rgba).toBe('rgba(104,79,255,0.015)');
  });
});
