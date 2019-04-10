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
    expect(result).toEqual({
      ranges: [[1025, 1366], [0, 1024]],
      rangesMap: { 0: '1366x1080', 1: '1024x768' },
    });
  });

  it('design-responsive -> getRange', () => {
    const target = mount(<Component />);
    const Element = target.instance();

    const errorRes1 = Element.getRange();
    expect(errorRes1).toBe('default');

    const errorRes2 = Element.getRange(100);
    expect(errorRes2).toBe('default');

    const errorRes3 = Element.getRange(undefined, [[0, 100]]);
    expect(errorRes3).toBe('default');

    const result = Element.getRange(50, [[0, 100], [101, 200]], { 0: '50x100', 1: '101x200' });
    expect(result).toBe('50x100');

    const result2 = Element.getRange(201, [[0, 100], [101, 200]], { 0: '50x100', 1: '101x200' });
    expect(result2).toBe('default');

    const result3 = Element.getRange(100, [[0, 100], [101, 200]], { 0: '50x100', 1: '101x200' });
    expect(result3).toBe('50x100');
  });
});
