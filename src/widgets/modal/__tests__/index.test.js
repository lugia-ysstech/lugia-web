/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { delay } from '@lugia/react-test-utils';

import ModalDemo from '../demo';
import Modal from '../index';

const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });

describe('Modal', () => {
  const getState = (target: any): Object => {
    const state = target
      .children()
      .at(0)
      .instance().state;
    return state;
  };
  it('css', () => {
    const Target = <ModalDemo visible={true} mountBody={false} />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
  it('Modal state: visible and opening and closing', async () => {
    const target = mount(<Modal visible={true} title="这是标题！" />);
    const state = getState(target);
    expect(state.visible).toBe(true);
    expect(state.opening).toBe(true);
    target
      .find('ButtonWrap')
      .at(0)
      .simulate('click');
    expect(getState(target).closing).toBe(false);
    await delay(500);
    expect(getState(target).closing).toBe(false);
    expect(getState(target).visible).toBe(true);
    target.setProps({ visible: false });
    expect(getState(target).opening).toBe(false);
  });
  it('Modal isInprops', () => {
    const target = mount(<Modal visible={true} title="这是标题！" />);
    const com = target
      .children()
      .at(0)
      .instance();
    expect(com.isInprops('visible')).toBe(true);
    expect(com.isInprops('footer')).toBe(false);
  });
});
