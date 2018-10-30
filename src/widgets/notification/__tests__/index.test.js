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
    const state = target.instance().state;
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
  it('Notification handleDuration', async () => {
    const target = mount(
      <Notification
        create={false}
        duration={4.5}
        title="今天天气很好！"
        description="因为今天的太阳很大。"
      />
    );
    const cmp = target.instance();
    const result = cmp.handleDuration(4.5);
    expect(result).toBe(4.5);

    const res = cmp.handleDuration(0);
    expect(res).toBe('no');
    const res2 = cmp.handleDuration(null);
    expect(res2).toBe('no');
    const res3 = cmp.handleDuration();
    expect(res3).toBe(4.5);
  });
});
