/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Component from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('design-responsive', () => {
  it('design-responsive -> handleWindowConfig', () => {
    const target = mount(<Component />);
    const Element = target.instance();
    const errorRes = Element.handleWindowConfig();
    expect(errorRes).toEqual({});

    const errorTypeRes = Element.handleWindowConfig('afff');
    expect(errorTypeRes).toEqual({});

    const spaceRes1 = Element.handleWindowConfig({});
    expect(spaceRes1).toEqual({});

    const spaceRes2 = Element.handleWindowConfig([]);
    expect(spaceRes2).toEqual({});

    const config = {
      '1366x1080': {
        mainPadSize: {
          width: 1366,
          height: 1080,
        },
        widthRange: [1025, 1366],
      },
      '1024x768': {
        mainPadSize: {
          width: 1024,
          height: 768,
        },
        widthRange: [799, 1024],
      },
      '799x1023': {
        mainPadSize: {
          width: 1024,
          height: 768,
        },
        widthRange: [0, 799],
      },
    };
    const result = Element.handleWindowConfig(config);
    const index0 = 1025;
    const index1 = 0;
    const index2 = 799;
    expect(result).toEqual({
      rangesMap: {
        [index0]: { rangeDesc: '1366x1080' },
        [index1]: { rangeDesc: '799x1023' },
        [index2]: { rangeDesc: '1024x768' },
      },
      rangeMinValues: [0, 799, 1025],
    });
  });

  it('increasingSortArray', () => {
    const target = mount(<Component />);
    const Element = target.instance();

    expect(Element.increasingSortArray([9, 5, 7, 4])).toEqual([4, 5, 7, 9]);
  });

  it('getRange', () => {
    const target = mount(<Component />);
    const Element = target.instance();
    const index0 = 0;
    const index1 = 101;

    expect(
      Element.getRange(
        50,
        {
          [index0]: { rangeDesc: '50x100' },
          [index1]: { rangeDesc: '101x200' },
        },
        [0, 101]
      )
    ).toBe('50x100');

    expect(
      Element.getRange(
        201,
        {
          [index0]: { rangeDesc: '50x100' },
          [index1]: { rangeDesc: '101x200' },
        },
        [0, 101]
      )
    ).toBe('101x200');

    expect(
      Element.getRange(
        100,
        {
          [index0]: { rangeDesc: '50x100' },
          [index1]: { rangeDesc: '101x200' },
        },
        [0, 101]
      )
    ).toBe('50x100');
  });

  it('getRange', () => {
    const target = mount(<Component />);
    const Element = target.instance();
    const rangeMinValues = [200, 700, 100, 500, 300];
    const [index1, index2, index3, index4, index5] = rangeMinValues;
    const rangeMap = {
      [index1]: { rangeDesc: '200x399' },
      [index2]: { rangeDesc: '700x799' },
      [index3]: { rangeDesc: '100x199' },
      [index4]: { rangeDesc: '500x599' },
      [index5]: { rangeDesc: '300x399' },
    };

    expect(Element.getRange(50, rangeMap, rangeMinValues.sort())).toBe('100x199');
    expect(Element.getRange(100, rangeMap, rangeMinValues.sort())).toBe('100x199');
    expect(Element.getRange(400, rangeMap, rangeMinValues.sort())).toBe('300x399');
    expect(Element.getRange(499, rangeMap, rangeMinValues.sort())).toBe('300x399');
    expect(Element.getRange(500, rangeMap, rangeMinValues.sort())).toBe('500x599');
    expect(Element.getRange(800, rangeMap, rangeMinValues.sort())).toBe('700x799');
  });

  it('getRange : errorType', () => {
    const target = mount(<Component />);
    const Element = target.instance();

    expect(Element.getRange()).toBe('default');

    expect(Element.getRange(100)).toBe('default');

    expect(Element.getRange(100, undefined)).toBe('default');

    expect(Element.getRange(100, [])).toBe('default');

    expect(Element.getRange(100, [0, 101])).toBe('default');

    expect(Element.getRange(undefined, [0, 101], undefined)).toBe('default');
  });
});
