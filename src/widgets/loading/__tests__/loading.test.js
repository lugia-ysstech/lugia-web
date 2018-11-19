import * as React from 'react';
import Loading from '../demo';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
const { expect: exp } = chai;
Enzyme.configure({
  adapter: new Adapter(),
});
describe('Loading', () => {
  it('demo', () => {
    const target = mount(<Loading />);
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
});
