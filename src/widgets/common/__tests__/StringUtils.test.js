import { getDefault, getHrefs, replaceStr, getString } from '../StringUtils';

describe('StringUtils', () => {
  it('getDefault', () => {
    expect(getDefault('')).toBe('');
    expect(getDefault(null)).toBe('');
    expect(getDefault(undefined)).toBe('');

    const defaultValue = 'hello';
    expect(getDefault('', defaultValue)).toBe('');
    expect(getDefault(null, defaultValue)).toBe(defaultValue);
    expect(getDefault(undefined, defaultValue)).toBe(defaultValue);

    expect(getDefault(0, defaultValue)).toBe('0');
    expect(getDefault(1, defaultValue)).toBe('1');
    expect(getDefault(true, defaultValue)).toBe('true');
    expect(getDefault(new Date(), defaultValue)).toBe(new Date().toString());
  });

  it('getHref', () => {
    expect(getHrefs(['/a', 'b', 'c'])).toEqual(['/a', '/a/b', '/a/b/c']);
  });

  it('getHref container /', () => {
    expect(getHrefs(['/a', '/b', '/c'])).toEqual(['/a', '/a/b', '/a/b/c']);
  });

  it('getHref container c/d', () => {
    expect(getHrefs(['/a', '/b', '/c/d'])).toEqual(['/a', '/a/b', '/a/b/c/d']);
  });

  // it('getHref container /', () => {
  //   expect(getHrefs(['/a', 'd/b', '/c'])).toEqual(['/a', '/a/d/b', '/a/d/b/c']);
  // });

  it('getHref path is empty', () => {
    expect(getHrefs(null)).toEqual([]);
    expect(getHrefs(undefined)).toEqual([]);
    expect(getHrefs([])).toEqual([]);
  });

  it('getHref item is empty', () => {
    expect(getHrefs([undefined, 'b', 'c'])).toEqual(['', '/b', '/b/c']);
    expect(getHrefs([null, 'b', 'c'])).toEqual(['', '/b', '/b/c']);
    expect(getHrefs(['', 'b', 'c'])).toEqual(['', '/b', '/b/c']);

    expect(getHrefs(['/a', null, 'c'])).toEqual(['/a', '/a', '/a/c']);
    expect(getHrefs(['/a', '', 'c'])).toEqual(['/a', '/a', '/a/c']);
    expect(getHrefs(['/a', undefined, 'c'])).toEqual(['/a', '/a', '/a/c']);

    expect(getHrefs(['/a', 'b', null])).toEqual(['/a', '/a/b', '/a/b']);
    expect(getHrefs(['/a', 'b', ''])).toEqual(['/a', '/a/b', '/a/b']);
    expect(getHrefs(['/a', 'b', undefined])).toEqual(['/a', '/a/b', '/a/b']);
  });
  it('replaceStr', () => {
    expect(replaceStr('second/:id', { id: 'hel' })).toBe('second/hel');
  });
  it('replaceStr more var', () => {
    expect(replaceStr('second/:id/:name', { id: 'hel', name: 'ligx' })).toBe('second/hel/ligx');
  });

  it('replaceStr empty str', () => {
    expect(replaceStr(0, { id: 'hel' })).toBe('0');
    expect(replaceStr(undefined, { id: 'hel' })).toBe('');
    expect(replaceStr(null, { id: 'hel' })).toBe('');
    expect(replaceStr('', { id: 'hel' })).toBe('');
  });
  it('replaceStr igron param', () => {
    expect(replaceStr(0)).toBe('0');
    expect(replaceStr(undefined)).toBe('');
    expect(replaceStr(null)).toBe('');
    expect(replaceStr('')).toBe('');
  });
  it('replaceStr  empty param ', () => {
    expect(replaceStr(0, null)).toBe('0');
    expect(replaceStr(0, undefined)).toBe('0');
    expect(replaceStr(0, {})).toBe('0');
  });
  it('replaceStr  empty param empty str ', () => {
    expect(replaceStr(null, null)).toBe('');
    expect(replaceStr(undefined, undefined)).toBe('');
    expect(replaceStr('', {})).toBe('');
  });
  function testGetString(str, expectStr) {
    it(`getString ${str}`, () => {
      expect(getString(str)).toBe(expectStr);
    });
  }
  testGetString('123', '123');
  testGetString(0, '');
  testGetString(1, '');
  testGetString(null, '');
  testGetString(undefined, '');
  testGetString('', '');
  testGetString(NaN, '');
});
