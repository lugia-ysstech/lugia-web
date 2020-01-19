/**
 *
 * create by liangguodong
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { WrapperDemo } from '../demo';
import Popover from '../popover';
import Icon from '../../icon';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('popover Demo', () => {
  it('Component JSON', () => {
    global.svtest = true;
    const render = renderer.create(<WrapperDemo />);
    expect(render.toJSON()).toMatchSnapshot();
    global.svtest = false;
  });
  it('props: title', () => {
    const title = 'this is  title!';
    const component = mount(
      <Popover title={title}>
        <div />
      </Popover>
    );
    expect(component.props().title).toBe(title);
  });
  it('props: description ', () => {
    const description = 'this is  description!';
    const component = mount(
      <Popover description={description}>
        <div />
      </Popover>
    );
    expect(component.props().description).toBe(description);
  });
  it('props: description div', () => {
    const description = <div>{'this is description!'}</div>;
    const component = mount(
      <Popover description={description}>
        <div />
      </Popover>
    );
    expect(component.props().description).toBe(description);
  });
  it('props: content ', () => {
    const content = <div>{'this is content!'}</div>;
    const component = mount(
      <Popover content={content}>
        <div />
      </Popover>
    );
    expect(component.props().content).toBe(content);
  });
  it('props: content div', () => {
    const content = [<div>{'this is content!'}</div>, <div>{'this is content!'}</div>];
    const component = mount(
      <Popover content={content}>
        <div />
      </Popover>
    );
    expect(component.props().content).toBe(content);
  });
  it('props: clear = iconClass ', () => {
    const clear = 'lugia-icon-reminder_close';
    const component = mount(
      <Popover clear={clear}>
        <div />
      </Popover>
    );
    expect(component.props().clear).toBe(clear);
  });
  it('props: clear = icon ', () => {
    const clear = (
      <div>
        <Icon iconClass={'lugia-icon-reminder_close'} />
      </div>
    );
    const component = mount(
      <Popover clear={clear}>
        <div />
      </Popover>
    );
    expect(component.props().clear).toBe(clear);
  });
  const getCmp = (target: any): Object => {
    return target
      .children()
      .at(0)
      .instance();
  };
  it('props: visible ', () => {
    const component = mount(
      <Popover visible={true}>
        <div />
      </Popover>
    );
    expect(getCmp(component).state.visible).toBe(true);
  });

  it('props: defaultVisible ', () => {
    const component = mount(
      <Popover defaultVisible={true}>
        <div />
      </Popover>
    );
    expect(getCmp(component).state.visible).toBe(true);
  });

  it('props: defaultVisible && visible ', () => {
    const component = mount(
      <Popover defaultVisible={true} visible={false}>
        <div />
      </Popover>
    );
    expect(getCmp(component).state.visible).toBe(false);
  });
  const onVisibleChange = (visible: boolean) => {
    onVisibleChange && onVisibleChange(visible);
  };

  it('state: visible', () => {
    const component = mount(
      <Popover>
        <div />
      </Popover>
    );
    expect(getCmp(component).state.visible).toBe(false);
  });

  it('state: visible && onVisibleChange', () => {
    const component = mount(
      <Popover onVisibleChange={onVisibleChange}>
        <div />
      </Popover>
    );
    component.setProps({ visible: true });
    expect(getCmp(component).state.visible).toBe(true);
    component.setProps({ visible: false });
    expect(getCmp(component).state.visible).toBe(false);
    component.setProps({ visible: true });
    expect(getCmp(component).state.visible).toBe(true);
  });

  it('props: limit visible && onVisibleChange', () => {
    const component = mount(
      <Popover onVisibleChange={onVisibleChange} visible={true}>
        <div />
      </Popover>
    );
    getCmp(component).setState({ visible: false });
    expect(getCmp(component).state.visible).toBe(true);
  });

  it('props: limit visible && onVisibleChange', () => {
    const component = mount(
      <Popover onVisibleChange={onVisibleChange} visible={false}>
        <div />
      </Popover>
    );
    getCmp(component).setState({ visible: true });
    expect(getCmp(component).state.visible).toBe(false);
  });

  it('props: onVisibleChange event', async () => {
    let onVisibleChange = () => true;
    const result = [];
    const onVisibleChangePromise = new Promise(res => {
      onVisibleChange = visbile => {
        result.push(visbile);
        if (result.length === 2) {
          res(result);
        }
      };
    });
    const component = mount(
      <Popover onVisibleChange={onVisibleChange}>
        <input className={'input'} />
      </Popover>
    );
    const input = component.find('.input');
    input.simulate('click', {});
    input.simulate('click', {});
    expect(await onVisibleChangePromise).toEqual([true, false]);
  });
});
