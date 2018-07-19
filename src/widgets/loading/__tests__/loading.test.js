import * as React from 'react';
import Loading from '../loading';

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
  it('没有设置属性', () => {
    const target = mount(<Loading />);
    expect(target.state().width).toBe(200);
    expect(target.state().color).toBe('#13bef7');
    expect(renderer.create(<Loading />).toJSON()).toMatchSnapshot();
  });
  it('width', () => {
    const target = mount(<Loading width={14} />);
    expect(target.state().width).toBe(14);
    expect(renderer.create(<Loading width={14} />).toJSON()).toMatchSnapshot();
  });
  it('color', () => {
    const target = mount(<Loading color={'red'} />);
    expect(target.state().color).toBe('red');
    expect(renderer.create(<Loading color={'red'} />).toJSON()).toMatchSnapshot();
  });
});
