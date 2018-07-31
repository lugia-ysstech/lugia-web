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
  it('defaultValue,maxValue,minValue', () => {
    const target = mount(<Slider maxValue={30}  tips  minValue={0} defaultValue={10} />);
    expect(target.state().value).toEqual([10]);
    expect(target.state().maxValue).toBe(30);
    expect(target.state().minValue).toBe(0);
  });
  it('value={23}', () => {
    const Target = mount(<Slider maxValue={30} defaultValue={10} value={23} tips />);
    Target.find('Button')
      .at(0)
      .simulate('mousedown');
    expect(Target.state().value).toEqual([23]);
  });
  it('disabled', () => {
    const target = mount(<Slider value={2} maxValue={30} disabled />);
    target
      .find('Button')
      .at(0)
      .simulate('mousedown');
    expect(target.state().value).toEqual([2]);
  });
  // it('btnWidth', () => {
  //   const target = mount(
  //     <Slider maxValue={30} defaultValue={8} value={2} disabled btnWidth={'14px'} />
  //   );
  //   expect(target.state().value).toBe(2);
  // });
  // it('onchange', async () => {
  //   const target = mount(<Slider value={2} maxValue={30} />);
  //   target
  //     .find('Button')
  //     .at(0)
  //     .simulate('mousedown');
  //   target.instance().setState({ offsetLeft: 50 });
  //   target.instance().publicmove(180);
  //   expect(target.state().value).toBe('13.00');
  //   target.instance().publicmove(255);
  //   expect(target.state().value).toBe('20.50');
  // });
});
