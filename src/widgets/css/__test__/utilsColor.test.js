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
    expect(changeColor('#56c22d').color).toBe('#56c22d');
    expect(changeColor('#f8ac30').color).toBe('#f8ac30');
    expect(changeColor('#f22735').color).toBe('#f22735');
  });
  it('S值下调20%', () => {
    expect(changeColor('#684fff', 20).color).toBe('#9482ff');
    expect(changeColor('#56c22d', 20).color).toBe('#72c254');
    expect(changeColor('#f8ac30', 20).color).toBe('#f8bf62');
    expect(changeColor('#f22735', 20).color).toBe('#f25762');
  });
  it('B值下调20%', () => {
    expect(changeColor('#684fff', 0, 20).color).toBe('#533fcc');
    expect(changeColor('#56c22d', 0, 20).color).toBe('#3f8f21');
    expect(changeColor('#f8ac30', 0, 20).color).toBe('#c58926');
    expect(changeColor('#f22735', 0, 20).color).toBe('#bf1f2a');
  });
  it('S值下调45%', () => {
    expect(changeColor('#684fff', 45).color).toBe('#cac2ff');
    expect(changeColor('#56c22d', 45).color).toBe('#95c284');
    expect(changeColor('#f8ac30', 45).color).toBe('#f8d6a0');
    expect(changeColor('#f22735', 45).color).toBe('#f2949a');
  });
  it('幽灵：正常色透明5%', () => {
    expect(changeColor('#684fff', 0, 0, 5).rgba).toBe('rgba(104,79,255,0.05)');
    expect(changeColor('#56c22d', 0, 0, 5).rgba).toBe('rgba(86,194,45,0.05)');
    expect(changeColor('#f8ac30', 0, 0, 5).rgba).toBe('rgba(248,172,48,0.05)');
    expect(changeColor('#f22735', 0, 0, 5).rgba).toBe('rgba(242,39,53,0.05)');
  });
  it('正常幽灵透明30%（0.05*30）', () => {
    expect(changeColor('#684fff', 0, 0, 1.5).rgba).toBe('rgba(104,79,255,0.015)');
    expect(changeColor('#56c22d', 0, 0, 1.5).rgba).toBe('rgba(86,194,45,0.015)');
    expect(changeColor('#f8ac30', 0, 0, 1.5).rgba).toBe('rgba(248,172,48,0.015)');
    expect(changeColor('#f22735', 0, 0, 1.5).rgba).toBe('rgba(242,39,53,0.015)');
  });
});
