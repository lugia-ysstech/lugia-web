//@flow
import type { ThemeType } from '@lugia/lugia-web';

import {
  createGetMargin,
  getMargin,
  createGetWidthOrHeight,
  getWidth,
  getHeight,
} from '../ThemeUtils';

describe('ThemeUtils', () => {
  function testGetMargin(theme: { theme: ThemeType }, expectMargin: string) {
    it(`getMargin = theme:${JSON.stringify(theme)} `, () => {
      expect(getMargin(theme)).toBe(expectMargin);
    });
  }
  function testGetWidth(theme: { theme: ThemeType }, expectMargin: string) {
    it(`getWidth = theme:${JSON.stringify(theme)} `, () => {
      expect(getWidth(theme)).toBe(expectMargin);
    });
  }
  function testGetHeight(theme: { theme: ThemeType }, expectMargin: string) {
    it(`getWidth = theme:${JSON.stringify(theme)} `, () => {
      expect(getHeight(theme)).toBe(expectMargin);
    });
  }

  it('createGetMargin', () => {
    const getMyMargin = createGetMargin({
      fontSize: 1,
      default: {
        left: 1,
        right: 2,
        top: 3,
        bottom: 4,
      },
    });
    expect(
      getMyMargin({
        theme: {
          margin: {
            left: 5,
          },
        },
      })
    ).toBe('margin:0.3em 0.2em 0.4em 0.5em;');
  });

  it('createGetMargin', () => {
    const getMyMargin = createGetMargin({
      fontSize: 1,
      default: {
        left: 1,
        right: 2,
        top: 3,
        bottom: 4,
      },
    });
    expect(
      getMyMargin({
        theme: {
          margin: {},
        },
      })
    ).toBe('margin:0.3em 0.2em 0.4em 0.1em;');
  });

  testGetMargin({ theme: {} }, '');
  testGetMargin(
    { theme: { margin: { left: 0, top: 0, bottom: 0, right: 0 } } },
    'margin:0em 0em 0em 0em;'
  );
  testGetMargin(
    { theme: { margin: { left: 10, top: 20, bottom: 10, right: 10 } } },
    'margin:1.6666666666666667em 0.8333333333333334em 0.8333333333333334em 0.8333333333333334em;'
  );
  testGetMargin(
    { theme: { margin: { left: 12, top: 12, bottom: 12, right: 12 } } },
    'margin:1em 1em 1em 1em;'
  );
  testGetMargin(
    { theme: { margin: { left: 12, top: 24, bottom: 0, right: 12 } } },
    'margin:2em 1em 0em 1em;'
  );
  testGetMargin(
    { theme: { margin: { left: 24, top: 12, bottom: 12, right: 12 } } },
    'margin:1em 1em 1em 2em;'
  );
  testGetMargin(
    { theme: { margin: { left: 0, top: 12, bottom: 24, right: 36 } } },
    'margin:1em 3em 2em 0em;'
  );

  testGetMargin({ theme: { margin: 10 } }, 'margin:0.8333333333333334em ');
  testGetMargin({ theme: { margin: 12 } }, 'margin:1em ');
  testGetMargin({ theme: { margin: 0 } }, 'margin:0em ');
  testGetMargin({ theme: { margin: -120 } }, 'margin:-10em ');

  it('createGetWidthOrHeight createGetWidthOrHeight() theme:{ width: 12 }', () => {
    const getMyWidth = createGetWidthOrHeight();

    expect(getMyWidth({ theme: { width: 12 } })).toBe('width: 1em;');
  });

  it('createGetWidthOrHeight theme:{}', () => {
    const getMyWidth = createGetWidthOrHeight();

    expect(getMyWidth({ theme: {} })).toBe('');
  });

  it('createGetWidthOrHeight theme:{}', () => {
    const getMyWidth = createGetWidthOrHeight('width', {
      fontSize: 1,
      defaultWidth: 1,
    });

    expect(getMyWidth({ theme: {} })).toBe('width: 0.1em;');
  });

  it('createGetWidthOrHeight theme:{}', () => {
    const getMyWidth = createGetWidthOrHeight('height', {
      fontSize: 1,
      defaultWidth: 1,
    });

    expect(getMyWidth({ theme: {} })).toBe('height: 0.1em;');
  });

  it('createGetWidthOrHeight default:{fontSize: 1} theme:{}', () => {
    const getMyWidth = createGetWidthOrHeight('width', {
      fontSize: 1,
    });

    expect(getMyWidth({ theme: {} })).toBe('');
  });

  it('createGetWidthOrHeight theme: {width: 10}', () => {
    const getMyWidth = createGetWidthOrHeight('width', {
      fontSize: 1,
      defaultWidth: 1,
    });

    expect(getMyWidth({ theme: { width: 10 } })).toBe('width: 1em;');
  });
  it('createGetHeight theme: {width: 10}', () => {
    const getMyWidth = createGetWidthOrHeight('height', {
      fontSize: 1,
      defaultWidth: 1,
    });

    expect(getMyWidth({ theme: { width: 10 } })).toBe('height: 1em;');
  });

  testGetWidth({ theme: {} }, '');
  testGetWidth({ theme: { width: 0 } }, 'width: 0em;');
  testGetWidth({ theme: { width: 1.2 } }, 'width: 0.1em;');
  testGetWidth({ theme: { width: -1.2 } }, 'width: -0.1em;');

  testGetHeight({ theme: {} }, '');
  testGetHeight({ theme: { width: 0 } }, 'height: 0em;');
  testGetHeight({ theme: { width: 1.2 } }, 'height: 0.1em;');
  testGetHeight({ theme: { width: -1.2 } }, 'height: -0.1em;');
});
