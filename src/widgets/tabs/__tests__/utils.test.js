/**
 *
 * create by liangguodong on 2018/10/10
 *
 * @flow
 */
import { isVertical, plusWidth, computePage, matchType, addActivityKey2Data } from '../utils';
import type { EditEventType, TabPositionType, TabType } from '../../css/tabs';
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
  testIsVertical('12323', false);
  function testmatchTab(
    tabPosition: TabPositionType | TabType | EditEventType,
    expectTabPosition: TabPositionType | TabType | EditEventType,
    expectValue: boolean
  ) {
    it(` matchTab ${tabPosition} `, () => {
      expect(matchType(tabPosition, expectTabPosition)).toBe(expectValue);
    });
  }
  testmatchTab('left', 'left', true);
  testmatchTab('left', 'right', false);
  testmatchTab('right', 'right', true);
  testmatchTab('right', 'left', false);

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
