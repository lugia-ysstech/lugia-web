/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CollapseDemo } from '../demo';
import Collapse from '../collapse';
import Panel from '../panel';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Collapse', () => {
  const createTarget = (props: Object): any => {
    return (
      <Collapse {...props}>
        <Panel value="1">
          <div>PanelContent...</div>
          <div>PanelContent...</div>
        </Panel>
        <Panel value="2">
          <div>PanelContent...</div>
          <div>PanelContent...</div>
        </Panel>
      </Collapse>
    );
  };
  const getState = (target: Object): Object => {
    return target
      .children()
      .at(0)
      .instance().state;
  };

  it('Collapse CSS', () => {
    const Target = <CollapseDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });

  it('Collapse props:{activeValue} toTest state: value', () => {
    const props = {
      activeValue: '1',
    };
    const target = mount(createTarget(props));
    const state = getState(target);
    expect(state.value).toEqual(['1']);

    target.setProps({ activeValue: '2' });
    const newState = getState(target);
    expect(newState.value).toEqual(['2']);
  });

  it('Collapse props:{defaultActiveValue} toTest state: value', () => {
    const props = {
      defaultActiveValue: '1',
    };
    const target = mount(createTarget(props));
    const state = getState(target);
    expect(state.value).toEqual(['1']);

    target.setProps({ defaultActiveValue: '2' });
    const newState = getState(target);
    expect(newState.value).toEqual(['1']);
  });

  it('Collapse props:{defaultActiveValue} toTest onChange -> state: value', async () => {
    const props = {
      defaultActiveValue: '1',
    };
    const target = mount(createTarget(props));
    const state = getState(target);
    expect(state.value).toEqual(['1']);

    const panel = target.find('Panel');
    panel.at(1).simulate('click');
    await delay(1000);
    const newState = getState(target);
    expect(newState.value).toEqual(['1', '2']);
  });
  it('Collapse props:{defaultActiveValue} toTest onChange params(newValue,oldValue) ', async () => {
    let newValues, oldValues;
    const handleChange = ({ newValue, oldValue }: Object) => {
      newValues = newValue;
      oldValues = oldValue;
    };
    const props = {
      defaultActiveValue: '1',
      onChange: handleChange,
    };
    const target = mount(createTarget(props));
    const panel = target.find('Panel');

    panel.at(1).simulate('click');
    await delay(1000);
    expect(newValues).toEqual(['1', '2']);
    expect(oldValues).toEqual(['1']);

    panel.at(0).simulate('click');
    await delay(1000);
    expect(newValues).toEqual(['2']);
    expect(oldValues).toEqual(['1', '2']);
  });

  it('Collapse props:{accordion} toTest onChange state(value) ', async () => {
    const props = {
      defaultActiveValue: '1',
      accordion: true,
    };
    const target = mount(createTarget(props));
    const state = getState(target);
    expect(state.value).toEqual(['1']);

    const panel = target.find('Panel');

    panel.at(0).simulate('click');
    await delay(1000);
    const states = getState(target);
    expect(states.value).toEqual([]);

    panel.at(1).simulate('click');
    await delay(1000);
    const newState = getState(target);
    expect(newState.value).toEqual(['2']);

    panel.at(1).simulate('click');
    await delay(1000);
    const newState2 = getState(target);
    expect(newState2.value).toEqual([]);
  });

  it('Collapse props:{accordion} toTest onChange params(newValue,oldValue) ', async () => {
    let newValues, oldValues;
    const handleChange = ({ newValue, oldValue }: Object) => {
      newValues = newValue;
      oldValues = oldValue;
    };
    const props = {
      defaultActiveValue: '1',
      accordion: true,
      onChange: handleChange,
    };
    const target = mount(createTarget(props));
    const state = getState(target);
    expect(state.value).toEqual(['1']);

    const panel = target.find('Panel');

    panel.at(0).simulate('click');
    await delay(1000);
    expect(newValues).toEqual([]);
    expect(oldValues).toEqual(['1']);

    panel.at(0).simulate('click');
    await delay(1000);
    expect(newValues).toEqual(['1']);
    expect(oldValues).toEqual([]);

    panel.at(1).simulate('click');
    await delay(1000);
    expect(newValues).toEqual(['2']);
    expect(oldValues).toEqual(['1']);
  });
});
