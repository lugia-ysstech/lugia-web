//@flow
import * as React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShortKeyBoard from '../ShortKeyBoard';
import Keys from '../../consts/KeyBoard';

Enzyme.configure({ adapter: new Adapter() });

describe('ShortKeyBoard', (keyConfig: Object[] = []) => {
  const createShortBoardCompent = function() {
    const Target = ShortKeyBoard(() => {
      return <div />;
    }, keyConfig);
    const cmp = mount(<Target />);
    return cmp;
  };
  it('getMethod', () => {
    const cmp = createShortBoardCompent();

    const instance = cmp.instance();
    expect(
      instance.getMethod(
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
    const cmp = createShortBoardCompent();

    const instance = cmp.instance();
    expect(
      instance.getMethod(
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
      instance.getMethod(
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
      instance.getMethod(
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
    const cmp = createShortBoardCompent();

    const instance = cmp.instance();
    expect(instance.getMethod(null, {})).toEqual([]);
    expect(instance.getMethod([], {})).toEqual([]);
    expect(instance.getMethod(undefined)).toEqual([]);
    expect(
      instance.getMethod(
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
    const cmp = createShortBoardCompent();
    const instance = cmp.instance();
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
    expect(instance.matchKeyCode(source)(target)).toBeTruthy();
  });
  it('matchKeyCode no Equal', () => {
    const cmp = createShortBoardCompent();
    const instance = cmp.instance();
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
    expect(instance.matchKeyCode(source)(target)).toBeFalsy();
  });

  it('matchKeyCode attr is undefined', () => {
    const cmp = createShortBoardCompent();
    const instance = cmp.instance();
    const source = {
      keyCode: Keys.UP,
      altKey: false,
      shiftKey: false,
      ctrlKey: false,
    };
    const target = {
      keyCode: Keys.UP,
    };
    expect(instance.matchKeyCode(source)(target)).toBeFalsy();
  });

  it('pickMethod param is empty', () => {
    const cmp = createShortBoardCompent();
    const instance = cmp.instance();

    expect(instance.pickMethod({ method: null })).toEqual([]);
    expect(instance.pickMethod({ method: [] })).toEqual([]);
    expect(instance.pickMethod({ method: undefined })).toEqual([]);
    expect(instance.pickMethod({ method: '' })).toEqual([]);
    expect(instance.pickMethod({ method: '   ' })).toEqual([]);
    expect(instance.pickMethod({ method: '   hello' })).toEqual(['hello']);
    expect(instance.pickMethod({ method: ['', 'hello', ''] })).toEqual(['hello']);
    expect(instance.pickMethod({ method: ['', '   ', 'hello'] })).toEqual(['hello']);
  });
  it('pickMethod param ', () => {
    const cmp = createShortBoardCompent();
    const instance = cmp.instance();

    expect(instance.pickMethod({ method: 'a' })).toEqual(['a']);
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
