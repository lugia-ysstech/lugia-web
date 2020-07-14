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

import NotificationDemo from '../demo';
import Notification from '../notification';

const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });

describe('Notification', () => {
  const getState = (target: any): Object => {
    const state = target
      .children()
      .at(0)
      .instance().state;
    return state;
  };
  it('css', () => {
    const Target = <NotificationDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
  it('Notification state', async () => {
    const target = mount(
      <Notification
        create={false}
        duration={4.5}
        title="今天天气很好！"
        description="因为今天的太阳很大。"
      />
    );
    const state = getState(target);
    expect(state.opening).toBe(true);
    await delay(1000);
    expect(getState(target).opening).toBe(true);
    await delay(3500);
    expect(getState(target).closing).toBe(true);
    await delay(400);
    expect(getState(target).closing).toBe(false);
    expect(getState(target).visible).toBe(false);
  });
});
