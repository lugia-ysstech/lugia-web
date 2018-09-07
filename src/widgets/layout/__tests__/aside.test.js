/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AsideDemo } from '../demo';
import Aside from '../aside';
import renderer from 'react-test-renderer';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Aside', () => {
  it('css', () => {
    const Target = <AsideDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
  const getState = (target: any) => {
    return target
      .children()
      .at(0)
      .instance().state;
  };
  it('Aside props: collapsed to state: collapsed ', () => {
    const target = mount(<Aside collapsible collapsed />);
    const trigger = target.find('trigger');
    const state = getState(target);
    expect(state.collapsed).toBe(true);

    trigger.at(0).simulate('click');
    const newState = getState(target);
    expect(newState.collapsed).toBe(true);

    target.setProps({ collapsed: false });
    const newState1 = getState(target);
    expect(newState1.collapsed).toBe(false);
  });

  it('Aside props: defaultCollapsed to state: collapsed ', () => {
    const target = mount(<Aside defaultCollapsed collapsible />);
    const trigger = target.find('trigger');
    const state = getState(target);
    expect(state.collapsed).toBe(true);

    trigger.at(0).simulate('click');
    const newState = getState(target);
    expect(newState.collapsed).toBe(false);

    target.setProps({ defaultCollapsed: true });
    const newState1 = getState(target);
    expect(newState1.collapsed).toBe(false);
  });

  it('Aside props: collapsible onCollapsed to onCollapsed() ', () => {
    let collapse = false;
    const handleCollapsed = (collapsed: boolean) => {
      console.info(collapsed);
      collapse = collapsed;
    };
    const target = mount(<Aside onCollapse={handleCollapsed} collapsible />);
    const trigger = target.find('trigger');
    const state = getState(target);
    expect(state.collapsed).toBe(false);

    trigger.at(0).simulate('click');
    const newState = getState(target);
    expect(newState.collapsed).toBe(true);
    expect(collapse).toBe(true);
  });

  it('Aside props: collapsed collapsible onCollapsed to onCollapsed() ', () => {
    let collapse = false;
    const handleCollapsed = (collapsed: boolean) => {
      collapse = collapsed;
    };
    const target = mount(<Aside onCollapse={handleCollapsed} collapsed collapsible />);
    const trigger = target.find('trigger');
    const state = getState(target);
    expect(state.collapsed).toBe(true);

    trigger.at(0).simulate('click');
    const newState = getState(target);
    expect(newState.collapsed).toBe(true);
    expect(collapse).toBe(false);

    trigger.at(0).simulate('click');
    const newState1 = getState(target);
    expect(newState1.collapsed).toBe(true);
    expect(collapse).toBe(false);
  });
});
