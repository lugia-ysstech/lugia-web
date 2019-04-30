/**
 *
 * create by liangguodong on 2018/10/10
 *
 * @flow
 */
import {
  isVertical,
  plusWidth,
  computePage,
  matchType,
  addActivityValue2Data,
  addWidth2Data,
} from '../utils';
import { hasActivityValueData } from '../demo';
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

  const data = [{ a: 'a' }, { a: 'b' }, { a: 'c' }];
  const singleActivityValue = [{ a: 'a', activityValue: '1' }, { a: 'b' }, { a: 'c' }];
  const activityValueDatas = [
    { a: 'a', activityValue: '_key_0' },
    { a: 'b', activityValue: '_key_1' },
    { a: 'c', activityValue: '_key_2' },
  ];
  const newSingleActivityValue = [
    { a: 'a', activityValue: '1' },
    { a: 'b', activityValue: '_key_1' },
    { a: 'c', activityValue: '_key_2' },
  ];
  const allActivityValue = [
    { a: 'a', activityValue: '1' },
    { a: 'b', activityValue: '2' },
    { a: 'c', activityValue: '3' },
  ];
  function testAddActivityValue2Data(paramData: Array<Object>, expectData: Array<Object>) {
    it(' testAddActivityValue2Data ', () => {
      expect(addActivityValue2Data(paramData)).toEqual(expectData);
    });
  }
  testAddActivityValue2Data(hasActivityValueData, hasActivityValueData);
  testAddActivityValue2Data(data, activityValueDatas);
  testAddActivityValue2Data(singleActivityValue, newSingleActivityValue);
  testAddActivityValue2Data(allActivityValue, allActivityValue);

  const sampleWidthSize = [1, 2, 3];
  const anotherWidthSize = [100, 2, 30];
  const sampleWithWidths = [{ a: 'a', width: 1 }, { a: 'b', width: 2 }, { a: 'c', width: 3 }];
  const anotherWithWidths = [{ a: 'a', width: 100 }, { a: 'b', width: 2 }, { a: 'c', width: 30 }];

  function testAddWidth2Data(
    paramData: Array<Object>,
    widthSize: Array<number>,
    expectData: Array<Object>
  ) {
    it(' testAddWidth2Data ', () => {
      expect(addWidth2Data(paramData, widthSize)).toEqual(expectData);
    });
  }
  testAddWidth2Data(data, sampleWidthSize, sampleWithWidths);
  testAddWidth2Data(data, anotherWidthSize, anotherWithWidths);
});
