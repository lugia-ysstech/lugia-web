/**
 *
 * create by liangguodong
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { WrapperDemo } from '../demo';
import 'jest-styled-components';

describe('popover Demo', () => {
  it('Component JSON', () => {
    global.svtest = true;
    const render = renderer.create(<WrapperDemo />);
    expect(render.toJSON()).toMatchSnapshot();
    global.svtest = false;
  });
});
