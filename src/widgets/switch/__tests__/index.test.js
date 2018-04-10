/**
 *
 * create by ZhangBoPing
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount, shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import Switch from '../';
import Switch from '../switch';
import renderer from 'react-test-renderer';
import Widget from '../../consts/index';

const { expect: exp, } = chai;

Enzyme.configure({ adapter: new Adapter(), });

describe('Switch', () => {
  it('snapshot', () => {
    const Target = <Switch />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();

  });

  it('API: defaultChecked', () => {
    const Wrapper = shallow(<Switch defaultChecked />);
    exp(Wrapper.state('checked')).to.eql(true);
  });

  it('API: checked', () => {
    const Wrapper = shallow(<Switch checked />);
    exp(Wrapper.state('checked')).to.eql(true);
    Wrapper.setState({checked: false,});
    exp(Wrapper.state('checked')).to.eql(false);
  });

  it('API: disabled', () => {
    const Wrapper = shallow(<Switch disabled />);
    exp(Wrapper.state('disabled')).to.eql(true);
    Wrapper.setState({disabled: false,});
    exp(Wrapper.state('disabled')).to.eql(false);
  });

  it('API: checkedChildren', () => {
    const Wrapper = shallow(<Switch checkedChildren={'on'} />);
    Wrapper.setState({checked: true,});
    exp(Wrapper.html().indexOf('on') > -1).to.eql(true);
  });

  it('API: unCheckedChildren', () => {
    const Wrapper = shallow(<Switch unCheckedChildren={'off'} />);
    Wrapper.setState({checked: false,});
    exp(Wrapper.html().indexOf('off') > -1).to.eql(true);
  });

  /* has problem => autoFocus is not work. */
  it('API: autoFocus', () => {
    const Wrapper = mount(<Switch autoFocus />);
    const checkedState = Wrapper.state('checked');
    Wrapper.find('span').at(0).simulate('keyDown', {keyCode: 13,});
    exp(Wrapper.state('checked')).to.eql(!checkedState);
  });
  
  // it('normal type: danger', () => {
  //   const Target = <Button type="danger">hello</Button>;
  //   expect(renderer.create(Target).toJSON()).toMatchSnapshot();

  // });
  // it('props: click', async () => {
  //   let onClick;
  //   const promise = new Promise(resolve => {
  //     onClick = e => {
  //       resolve(e.target);
  //     };
  //   });
  //   const cmp = mount(<Button type="danger" onClick={onClick}>hello</Button>);
  //   let target = { px: 'hello', };
  //   cmp.find('hello').at(0).simulate('click', { target, });

  //   exp(await  promise).to.be.eql(target);
  // });

});
