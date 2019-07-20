//@flow
import * as React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getMethod, matchKeyCode, pickMethod } from '../ShortKeyBoard';
import Keys from '../../consts/KeyBoard';

Enzyme.configure({ adapter: new Adapter() });

describe('ShortKeyBoard', (keyConfig: Object[] = []) => {
  it('getMethod', () => {
    expect(
      getMethod(
        [
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: ['onUp', 'onDown'],
          },
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: ['onChange'],
          },
        ],
        {
          ctrlKey: true,
          shiftKey: true,
          keyCode: Keys.UP,
        }
      )
    ).toEqual([['onUp', 'onDown'], ['onChange']]);
  });
  it('getMethod method is empty', () => {
    expect(
      getMethod(
        [
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: ['onUp', 'onDown'],
          },
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: [],
          },
        ],
        {
          ctrlKey: true,
          shiftKey: true,
          keyCode: Keys.UP,
        }
      )
    ).toEqual([['onUp', 'onDown'], []]);

    expect(
      getMethod(
        [
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: ['onUp', 'onDown'],
          },
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: null,
          },
        ],
        {
          ctrlKey: true,
          shiftKey: true,
          keyCode: Keys.UP,
        }
      )
    ).toEqual([['onUp', 'onDown'], []]);

    expect(
      getMethod(
        [
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: ['onUp', 'onDown'],
          },
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: undefined,
          },
        ],
        {
          ctrlKey: true,
          shiftKey: true,
          keyCode: Keys.UP,
        }
      )
    ).toEqual([['onUp', 'onDown'], []]);
  });
  it('getMethod param is empty', () => {
    expect(getMethod(null, {})).toEqual([]);
    expect(getMethod([], {})).toEqual([]);
    expect(getMethod(undefined)).toEqual([]);
    expect(
      getMethod(
        [
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: ['onUp', 'onDown'],
          },
          {
            ctrlKey: true,
            shiftKey: true,
            keyCode: Keys.UP,
            method: ['onChange'],
          },
        ],
        null
      )
    ).toEqual([]);
  });
  it('matchKeyCode is Equal', () => {
    const source = {
      keyCode: Keys.UP,
      altKey: false,
      shiftKey: true,
      ctrlKey: true,
    };
    const target = {
      keyCode: Keys.UP,
      altKey: false,
      shiftKey: true,
      ctrlKey: true,
    };
    expect(matchKeyCode(source)(target)).toBeTruthy();
  });
  it('matchKeyCode no Equal', () => {
    const source = {
      keyCode: Keys.UP,
      altKey: true,
      shiftKey: true,
      ctrlKey: true,
    };
    const target = {
      keyCode: Keys.UP,
      altKey: false,
      shiftKey: true,
      ctrlKey: true,
    };
    expect(matchKeyCode(source)(target)).toBeFalsy();
  });

  it('matchKeyCode attr is undefined', () => {
    const source = {
      keyCode: Keys.UP,
      altKey: false,
      shiftKey: false,
      ctrlKey: false,
    };
    const target = {
      keyCode: Keys.UP,
    };
    expect(matchKeyCode(source)(target)).toBeTruthy();
  });

  it('pickMethod param is empty', () => {
    expect(pickMethod({ method: null })).toEqual([]);
    expect(pickMethod({ method: [] })).toEqual([]);
    expect(pickMethod({ method: undefined })).toEqual([]);
    expect(pickMethod({ method: '' })).toEqual([]);
    expect(pickMethod({ method: '   ' })).toEqual([]);
    expect(pickMethod({ method: '   hello' })).toEqual(['hello']);
    expect(pickMethod({ method: ['', 'hello', ''] })).toEqual(['hello']);
    expect(pickMethod({ method: [null, 'hello', undefined] })).toEqual(['hello']);
    expect(pickMethod({ method: ['', '   ', 'hello'] })).toEqual(['hello']);
  });
  it('pickMethod param ', () => {
    expect(pickMethod({ method: 'a' })).toEqual(['a']);
  });
  it('composeTest', () => {
    // const Target = ShortKeyBoard(() => {
    //   return <div></div>;
    // }, [{
    //   ctrl: true,
    //   shift: true,
    //   keyCode: Keys.UP,
    //   method: 'onUp',
    // }]);
    // const cmp = mount(<Target/>);
    // cmp.find('div').at(0).simulate({
    //   keyCode: Keys.UP,
    //   altKey: true,
    //   shiftKey: true,
    //   ctrlKey: true,
    // });
  });
});
