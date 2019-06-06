/**
 *
 * create by wcx
 *
 * @flow
 */
import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switch from '../index';
import Wrapper from '../demo';
import renderer from 'react-test-renderer';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '../../consts/KeyCode';
import { delay } from '@lugia/react-test-utils';

Enzyme.configure({ adapter: new Adapter() });

describe('Switch', () => {
  function getSwitchComponent(target) {
    const switchComponent = target
      .find('SwitchComponent')
      // .children()
      // .at(0)
      // .children()
      .at(0)
      .instance();
    return switchComponent;
  }

  function keyDown(target, keyCode) {
    const event = target.handleKeyDown({ keyCode });
    return event;
  }

  it('Wrapper', () => {
    const target = <Wrapper />;
    expect(renderer.create(target)).toMatchSnapshot();
  });
  it('small', () => {
    const target = mount(<Switch size={'small'} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.props.size).toBe('small');
  });
  it('data.length=3 isInverse ', async () => {
    const target = mount(
      <Switch data={[{ text: '年' }, { text: '月' }, { text: '日' }]} isInverse={false} />
    );
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('月');
  });
  it('isInverse & data.length=2', async () => {
    const target = mount(<Switch data={[{ text: '开' }, { text: '关' }]} isInverse defaultValue />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('开');
  });
  it('data.length=1', async () => {
    const target = mount(<Switch data={[{ text: '开' }]} isInverse />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('');
  });
  it('data.length=0', () => {
    const target = mount(<Switch data={[]} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('');
  });
  it('data null', () => {
    const target = mount(<Switch data={[null]} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('');
  });
  it('data null null', () => {
    const target = mount(<Switch data={[null, null]} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('');
  });
  it('data undefined', () => {
    const target = mount(<Switch data={[undefined]} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('');
  });
  it('data undefined,undefined', () => {
    const target = mount(<Switch data={[undefined, undefined]} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('');
  });
  it('data null, 关', () => {
    const target = mount(<Switch data={[null, { text: '月' }]} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('月');
  });
  it('displayFiled', async () => {
    const target = mount(
      <Switch
        displayFiled={'left'}
        data={[{ left: '年', name: 'ppp' }, { left: '月', name: 'ww' }]}
      />
    );
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('月');
  });
  it('no  displayFiled', async () => {
    const target = mount(
      <Switch data={[{ left: '年', name: 'ppp' }, { left: '月', name: 'ww' }]} />
    );
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe(undefined);
  });
  it('no  displayFiled have text', async () => {
    const target = mount(
      <Switch
        data={[{ text: '日', left: '年', name: 'ppp' }, { text: '时', left: '月', name: 'ww' }]}
      />
    );
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('时');
  });
  it('isInverse', () => {
    const target = mount(<Switch isInverse />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.text).toBe('');
  });
  it('value', async () => {
    const target = mount(<Switch value />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('');
  });
  it('defaultValue', async () => {
    const target = mount(<Switch defaultValue />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('');
  });
  it('value& defaultValue', async () => {
    const target = mount(<Switch defaultValue={false} value />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('');
  });
  it('disabled', async () => {
    const target = mount(<Switch disabled />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.props.disabled).toBe(true);
  });
  it('loading', async () => {
    const target = mount(<Switch loading />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.props.loading).toBe(true);
    target.setProps({ loading: false });
    expect(switchComponent.props.loading).toBe(false);
  });
  it(' loading={{delay:3000}}', async () => {
    const target = mount(<Switch loading={{ delay: 3000 }} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.props.loading).toBe(true);
    await delay(3000);
    expect(switchComponent.props.loading).toBe(false);
  });
  it('disabled,loading', async () => {
    const target = mount(<Switch loading disabled />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.props.loading).toBe(true);
    expect(switchComponent.props.disabled).toBe(true);
  });
  it('disabled,loading={{delay:3000}}', async () => {
    const target = mount(<Switch disabled loading={{ delay: 3000 }} />);
    const switchComponent = getSwitchComponent(target);
    expect(switchComponent.props.loading).toBe(true);
    expect(switchComponent.props.disabled).toBe(true);
    await delay(3000);
    expect(switchComponent.props.loading).toBe(false);
    expect(switchComponent.props.disabled).toBe(true);
  });
  it('isMouseDown', async () => {
    const target = mount(<Switch data={[{ text: '年' }, { text: '月' }]} />);
    const switchComponent = getSwitchComponent(target);

    expect(switchComponent.state.isMouseDown).toBe(false);
    switchComponent.mousedown();
    expect(switchComponent.state.isMouseDown).toBe(true);
    switchComponent.mouseup();
    expect(switchComponent.state.isMouseDown).toBe(false);
  });
  it('keyboard onKeyDown: "ENTER","SPACE","RIGHT_ARROW","LEFT_ARROW" ', async () => {
    const target = mount(<Switch autoFocus data={[{ text: '年' }, { text: '月' }]} />);
    const switchComponent = getSwitchComponent(target);

    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');

    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');

    keyDown(switchComponent, RIGHT_ARROW);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, LEFT_ARROW);
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');
  });
  it('value && keyboard onKeyDown: "ENTER","SPACE","RIGHT_ARROW","LEFT_ARROW"', async () => {
    const target = mount(<Switch autoFocus value data={[{ text: '年' }, { text: '月' }]} />);
    const switchComponent = getSwitchComponent(target);

    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, RIGHT_ARROW);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, LEFT_ARROW);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
  });
  it('mouseUp && value &&  keyboard onKeyDown: "ENTER","SPACE","RIGHT_ARROW","LEFT_ARROW"', async () => {
    const target = mount(<Switch autoFocus value data={[{ text: '年' }, { text: '月' }]} />);
    const switchComponent = getSwitchComponent(target);

    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, RIGHT_ARROW);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, LEFT_ARROW);

    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
  });
  it('mouseUp,setProps{value:true} keyboard onKeyDown: "ENTER","SPACE","RIGHT_ARROW","LEFT_ARROW" ', async () => {
    const target = mount(<Switch autoFocus data={[{ text: '年' }, { text: '月' }]} />);
    const switchComponent = getSwitchComponent(target);
    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');
    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');

    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');

    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');

    keyDown(switchComponent, RIGHT_ARROW);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');

    keyDown(switchComponent, LEFT_ARROW);
    expect(switchComponent.state.value).toBe(false);
    expect(switchComponent.state.text).toBe('月');

    target.setProps({ value: true });

    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, ENTER);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, SPACE);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    keyDown(switchComponent, RIGHT_ARROW);
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');

    switchComponent.mouseup();
    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
    keyDown(switchComponent, LEFT_ARROW);

    expect(switchComponent.state.value).toBe(true);
    expect(switchComponent.state.text).toBe('年');
  });

  function testOnChange(
    title: string,
    props: Object,
    keyCodes: Array<any> | null,
    stateValue: Array<any>,
    changeEventValue: Array<any> = []
  ) {
    it(`props: onchange ${title} `, done => {
      let changeCalledNum: number = 0;
      const changeEventLength = changeEventValue.length;
      const onChange: Function = jest.fn(() => {
        changeCalledNum++;
        changeCalledNum === changeEventLength && done();
      });

      const component = mount(<Switch {...props} onChange={onChange} />);
      const switchComponent = getSwitchComponent(component);

      if (keyCodes) {
        keyCodes.forEach((keyCode: any, index: number) => {
          switchComponent.handleKeyDown({ keyCode });
          expect(switchComponent.state.value).toBe(stateValue[index]);
        });
      } else {
        switchComponent.mouseup();
        expect(switchComponent.state.value).toBe(stateValue[0]);
      }

      if (props.loading || props.disabled) {
        expect(onChange.mock.calls.length).toBe(0);
        done();
      } else {
        expect(onChange.mock.calls.length).toBe(changeEventLength);
        if (changeEventLength === 0) {
          done();
        }
        onChange.mock.calls.forEach(([value], index) => {
          expect(Object.keys(value)).toEqual([
            'newValue',
            'oldValue',
            'newItem',
            'oldItem',
            'event',
          ]);
          delete value.event;
          expect(value).toEqual(changeEventValue[index]);
        });
      }
    });
  }

  testOnChange(
    'right right',
    {},
    [RIGHT_ARROW, RIGHT_ARROW],
    [true, true],
    [{ newValue: true, oldValue: false, newItem: { text: '' }, oldItem: { text: '' } }]
  );

  testOnChange('left left', {}, [LEFT_ARROW, LEFT_ARROW], [false, false]);

  testOnChange(
    'disabled,change',
    { disabled: true, autoFocus: true },
    [ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE],
    [false, false, false, false]
  );

  testOnChange(
    'loading,change',
    { loading: true, autoFocus: true },
    [ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE],
    [false, false, false, false]
  );
  testOnChange(
    'loading:{delay:3000},change',
    { loading: { delay: 3000 }, autoFocus: true },
    [ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE],
    [false, false, false, false]
  );

  testOnChange(
    'mouseUp onChange',
    { data: [{ text: '年' }, { text: '月' }] },
    null,
    [true],
    [{ newValue: true, oldValue: false, newItem: { text: '年' }, oldItem: { text: '月' } }]
  );
  testOnChange(
    'value onChange',
    { value: true, data: [{ text: '年' }, { text: '月' }] },
    null,
    [true],
    [{ newValue: false, oldValue: true, newItem: { text: '月' }, oldItem: { text: '年' } }]
  );

  testOnChange(
    'keyDown onChange',
    { data: [{ text: '年' }, { text: '月' }] },
    [ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE],
    [true, false, true, false],
    [
      { newValue: true, oldValue: false, newItem: { text: '年' }, oldItem: { text: '月' } },
      { newValue: false, oldValue: true, newItem: { text: '月' }, oldItem: { text: '年' } },
      { newValue: true, oldValue: false, newItem: { text: '年' }, oldItem: { text: '月' } },
      { newValue: false, oldValue: true, newItem: { text: '月' }, oldItem: { text: '年' } },
    ]
  );
});
