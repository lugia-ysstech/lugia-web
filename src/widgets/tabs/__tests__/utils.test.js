/**
 *
 * create by liangguodong on 2018/10/10
 *
 * @flow
 */
import { isVertical, plusWidth, computePage, matchTab } from '../utils';
import type { TabPositionType, TabType } from '../../css/tabs';
describe('utils', () => {
  function testIsVertical(tabPosition: string, expectValue: boolean) {
    it(` isVertical ${tabPosition} `, () => {
      expect(isVertical(tabPosition)).toBe(expectValue);
    });
  }
  testIsVertical('left', true);
  testIsVertical('right', true);
  testIsVertical('top', false);
  testIsVertical('bottom', false);
  function testmatchTab(
    tabPosition: TabPositionType | TabType,
    expectTabPosition: TabPositionType | TabType,
    expectValue: boolean
  ) {
    it(` matchTab ${tabPosition} `, () => {
      expect(matchTab(tabPosition, expectTabPosition)).toBe(expectValue);
    });
  }
  testmatchTab('left', 'left', true);
  testmatchTab('right', 'right', true);
  testmatchTab('top', 'top', true);
  testmatchTab('bottom', 'bottom', true);
  testmatchTab('left', 'right', false);
  testmatchTab('left', 'top', false);
  testmatchTab('left', 'bottom', false);
  testmatchTab('right', 'top', false);
  testmatchTab('right', 'left', false);
  testmatchTab('right', 'bottom', false);
  testmatchTab('top', 'left', false);
  testmatchTab('top', 'right', false);
  testmatchTab('top', 'bottom', false);
  testmatchTab('bottom', 'left', false);
  testmatchTab('bottom', 'right', false);
  testmatchTab('bottom', 'top', false);

  testmatchTab('line', 'line', true);
  testmatchTab('card', 'card', true);
  testmatchTab('window', 'window', true);
  testmatchTab('line', 'card', false);
  testmatchTab('line', 'window', false);
  testmatchTab('card', 'line', false);
  testmatchTab('card', 'window', false);
  testmatchTab('window', 'line', false);
  testmatchTab('window', 'card', false);

  function testPlusWidth(index: number, width: Array<number>, expectValue: number) {
    it(' PlusWidth  ', () => {
      expect(plusWidth(index, width)).toBe(expectValue);
    });
  }
  testPlusWidth(2, [2, 3, 4], 9);
  testPlusWidth(4, [0, 0, 0, 0, 0], 0);
  testPlusWidth(4, [1, 2, 3, 4, 5], 15);

  function testComputePage(offset: number, actualSize: number, expectValue: number) {
    it(` testComputePage ${offset} ${actualSize} `, () => {
      expect(computePage(offset, actualSize)).toBe(expectValue);
    });
  }
  testComputePage(100, 0, 0);
  testComputePage(100, 50, 1);
  testComputePage(100, 400, 4);
  testComputePage(100, 300, 3);
  testComputePage(200, 320, 2);
  testComputePage(200, 330, 2);
  testComputePage(200, 390, 2);
  testComputePage(200, 410, 3);
});
