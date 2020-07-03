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
import ReactDOM from 'react-dom';
Enzyme.configure({ adapter: new Adapter() });

describe('popconfirm Demo', () => {
  it('Component JSON', () => {
    ReactDOM.createPortal = node => node;
    global.svtest = true;
    const renders = renderer.create(<WrapperDemo />);
    expect(renders.toJSON()).toMatchSnapshot();
    global.svtest = false;
  });
});
