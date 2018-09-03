//@flow
import type { ThemeType } from '@lugia/lugia-web';

import { createGetMargin, getMargin } from '../ThemeUtils';

describe('ThemeUtils', () => {
  function testGetMargin(theme: { theme: ThemeType }, expectMargin: string) {
    it(`getMargin = theme:${JSON.stringify(theme)} `, () => {
      expect(getMargin(theme)).toBe(expectMargin);
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
});
