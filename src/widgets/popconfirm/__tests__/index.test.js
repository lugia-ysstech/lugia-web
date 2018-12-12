/**
 *
 * create by liangguodong
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { WrapperDemo } from '../demo';
import Enzyme, { mount } from 'enzyme';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('popconfirm Demo', () => {
  it('Component JSON', () => {
    global.svtest = true;
    const renders = renderer.create(<WrapperDemo />);
    expect(renders.toJSON()).toMatchSnapshot();
    global.svtest = false;
  });
});
