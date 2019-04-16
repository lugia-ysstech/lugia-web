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
        widthRange: [0, 1024],
      },
    };
    const result = Element.handleWindowConfig(config);
    const index0 = 0;
    const index1 = 1;
    expect(result).toEqual({
      ranges: [[1025, 1366], [0, 1024]],
      rangesMap: { [index0]: '1366x1080', [index1]: '1024x768' },
      rangeMaxValues: [1366, 1024],
      rangeMinValues: [1025, 0],
    });
  });

  it('getRanges', () => {
    const target = mount(<Component />);
    const Element = target.instance();
    const index0 = 0;
    const index1 = 1;

    const result = Element.getRanges(
      50,
      {
        [index0]: '50x100',
        [index1]: '101x200',
      },
      [0, 101]
    );
    expect(result).toBe('50x100');

    const result2 = Element.getRanges(
      201,
      {
        [index0]: '50x100',
        [index1]: '101x200',
      },
      [0, 101]
    );
    expect(result2).toBe('101x200');

    const result3 = Element.getRanges(
      100,
      {
        [index0]: '50x100',
        [index1]: '101x200',
      },
      [0, 101]
    );
    expect(result3).toBe('50x100');
  });

  it('getRanges： get min range value', () => {
    const target = mount(<Component />);
    const Element = target.instance();
    const index0 = 0;
    const index1 = 1;
    const index2 = 2;
    const index3 = 3;

    expect(
      Element.getRanges(
        50,
        {
          [index0]: '200x300',
          [index1]: '101x200',
          [index2]: '400x500',
        },
        [200, 101, 400]
      )
    ).toBe('101x200');
    expect(
      Element.getRanges(
        200,
        {
          [index0]: '200x300',
          [index1]: '101x200',
          [index2]: '400x500',
        },
        [200, 101, 400]
      )
    ).toBe('200x300');

    expect(
      Element.getRanges(
        50,
        {
          [index0]: '50x100',
          [index1]: '101x200',
        },
        [100, 201]
      )
    ).toBe('50x100');

    expect(
      Element.getRanges(
        500,
        {
          [index0]: '100x200',
          [index1]: '201x300',
          [index2]: '401x500',
          [index3]: '301x400',
        },
        [100, 201, 401, 301]
      )
    ).toBe('401x500');
  });

  it('getRanges : errorType', () => {
    const target = mount(<Component />);
    const Element = target.instance();

    const errorRes1 = Element.getRanges();
    expect(errorRes1).toBe('default');

    const errorRes2 = Element.getRanges(100);
    expect(errorRes2).toBe('default');

    const errorRes3 = Element.getRanges(undefined, [[0, 100]]);
    expect(errorRes3).toBe('default');
  });

  it('matchValue', () => {
    const target = mount(<Component />);
    const Element = target.instance();

    Element.matchValue(50, [0, 101]);
    expect(Element.matchValue(50, [0, 101]).result).toBe(0);
    expect(Element.matchValue(50, [0, 101]).resultIndex).toBe(0);

    expect(Element.matchValue(50, [100, 201, 301]).result).toBe(100);
    expect(Element.matchValue(50, [100, 201, 301]).resultIndex).toBe(0);

    expect(Element.matchValue(500, [301, 100, 201]).result).toBe(301);
    expect(Element.matchValue(500, [301, 100, 201]).resultIndex).toBe(0);

    expect(Element.matchValue(350, [0, 200, 400, 600]).result).toBe(200);
    expect(Element.matchValue(350, [0, 200, 400, 600]).resultIndex).toBe(1);

    expect(Element.matchValue(350, [400, 600, 0, 200]).result).toBe(200);
    expect(Element.matchValue(350, [400, 600, 0, 200]).resultIndex).toBe(3);

    expect(Element.matchValue(200, [200, 700, 100, 500, 300]).result).toBe(200);
    expect(Element.matchValue(200, [200, 700, 100, 500, 300]).resultIndex).toBe(0);

    expect(Element.matchValue(50, [0, 200, 700, 100, 500, 300]).result).toBe(0);
    expect(Element.matchValue(50, [0, 200, 700, 100, 500, 300]).resultIndex).toBe(0);

    expect(Element.matchValue(50, [200, 700, 0, 100, 500, 300]).result).toBe(0);
    expect(Element.matchValue(50, [200, 700, 0, 100, 500, 300]).resultIndex).toBe(2);
  });

  it('matchValue value: errorType', () => {
    const target = mount(<Component />);
    const Element = target.instance();

    expect(Element.matchValue(0, [0, 200, 400, 600]).result).toBeUndefined();
    expect(Element.matchValue(0, [0, 200, 400, 600]).resultIndex).toBeUndefined();

    expect(Element.matchValue(undefined, [0, 200, 400, 600]).result).toBeUndefined();
    expect(Element.matchValue(undefined, [0, 200, 400, 600]).resultIndex).toBeUndefined();

    expect(Element.matchValue(null, [0, 200, 400, 600]).result).toBeUndefined();
    expect(Element.matchValue(null, [0, 200, 400, 600]).resultIndex).toBeUndefined();
  });

  it('matchValue rangeValue: errorType', () => {
    const target = mount(<Component />);
    const Element = target.instance();

    expect(Element.matchValue(350, undefined).result).toBeUndefined();
    expect(Element.matchValue(350, undefined).resultIndex).toBeUndefined();

    expect(Element.matchValue(350, null).result).toBeUndefined();
    expect(Element.matchValue(350, null).resultIndex).toBeUndefined();

    expect(Element.matchValue(350, []).result).toBeUndefined();
    expect(Element.matchValue(350, []).resultIndex).toBeUndefined();
  });
});
