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

describe('popconfirm Demo', () => {
  it('Component JSON', () => {
    global.svtest = true;
    const renders = renderer.create(<WrapperDemo />);
    expect(renders.toJSON()).toMatchSnapshot();
    global.svtest = false;
  });
});
