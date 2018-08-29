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

  it('Collapse CSS', () => {
    const Target = <CollapseDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });

  it('Collapse props:{activeValue} toTest state: value', () => {
    const props = {
      activeValue: '1',
    };
    const target = mount(createTarget(props));
    const state = target
      .children()
      .at(0)
      .instance().state;
    expect(state.value).toEqual(['1']);

    target.setProps({ activeValue: '2' });
    const newState = target
      .children()
      .at(0)
      .instance().state;
    expect(newState.value).toEqual(['2']);
  });

  it('Collapse props:{defaultActiveValue} toTest state: value', () => {
    const props = {
      defaultActiveValue: '1',
    };
    const target = mount(createTarget(props));
    const state = target
      .children()
      .at(0)
      .instance().state;
    expect(state.value).toEqual(['1']);

    target.setProps({ defaultActiveValue: '2' });
    const newState = target
      .children()
      .at(0)
      .instance().state;
    expect(newState.value).toEqual(['1']);
  });

  it('Collapse props:{defaultActiveValue} toTest onChange -> state: value', () => {
    const props = {
      defaultActiveValue: '1',
    };
    const target = mount(createTarget(props));
    const state = target
      .children()
      .at(0)
      .instance().state;
    expect(state.value).toEqual(['1']);

    const panel = target.find('Panel');
    panel.at(1).simulate('click');
    const newState = target
      .children()
      .at(0)
      .instance().state;
    expect(newState.value).toEqual(['1', '2']);
  });
});
