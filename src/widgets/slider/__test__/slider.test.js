import * as React from 'react';
import Slider from '../slider';
import Wrapper from '../demo';

import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import 'jest-styled-components';
const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  it('Wrapper', () => {
    const Target = <Slider />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
  it('defaultValue :8', () => {
    const target = mount(<Slider maxValue={30} defaultValue={8} />);
    expect(target.state().value).toBe(8);
  });
  it('value :2', () => {
    const Target = mount(<Slider maxValue={30} defaultValue={8} value={2} />);
    Target.find('Button')
      .at(0)
      .simulate('mousedown');
    expect(Target.state().value).toBe(2);
  });
  it('disabled', () => {
    const target = mount(<Slider value={2} maxValue={30} disabled />);
    target
      .find('Button')
      .at(0)
      .simulate('mousedown');
    expect(target.state().value).toBe(2);
  });
  it('btnWidth', () => {
    const target = mount(
      <Slider maxValue={30} defaultValue={8} value={2} disabled btnWidth={'14px'} />
    );
    expect(target.state().value).toBe(2);
  });
  it('onchange', async () => {
    const target = mount(<Slider value={2} maxValue={30} />);
    target
      .find('Button')
      .at(0)
      .simulate('mousedown');
    target.instance().setState({ offsetLeft: 50 });
    target.instance().publicmove(180);
    expect(target.state().value).toBe('13.00');
    target.instance().publicmove(255);
    expect(target.state().value).toBe('20.50');
  });
});
