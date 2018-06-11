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
import {ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE,} from '../../consts/KeyCode';

const { mockFunction, VerifyOrder, VerifyOrderConfig, } = require('@lugia/jverify');
const { expect: exp, } = chai;

Enzyme.configure({ adapter: new Adapter(), });

function checkState(propsArr, expectFun, equal, model='shallow'){
  const handler = model === 'shallow'? shallow: mount;
  const Origin = <Switch {...propsArr} />;

  const Wrapper = handler(Origin);
  const result = typeof equal !== 'function'?
    equal:
    equal(Wrapper);

  exp(expectFun(Wrapper)).to.be.eql(result);
}

const config = {
  defaultCheckedTrue: {
    defaultChecked: true,
  },
  defaultCheckedFalse: {
    defaultChecked: false,
  },
  checkedTrue: {
    checked: true,
  },
  checkedFalse: {
    checked: false,
  },
  disabledTrue: {
    disabled: true,
  },
  disabledFalse:{
    disabled: false,
  },
  checkedChildren: {
    checkedChildren: 'on',
  },
  unCheckedChildren: {
    unCheckedChildren: 'off',
  },
  autoFocusTrue: {
    autoFocus: true,
  },
  autoFocusFalse: {
    autoFocus: false,
  },
  sizeSmall: {
    size: 'small',
  },
  sizeNormal: {
    size: 'normal',
  },
};

describe('Switch', () => {
  it('snapshot', () => {
    const Target = <Switch />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();

  });

  it('props: defaultChecked = true', () => {
    checkState(config.defaultCheckedTrue, wrapper => {
      return wrapper.state('checked');
    }, true);
  });

  it('props: defaultChecked = false', () => {
    checkState(config.defaultCheckedFalse, wrapper => {
      return wrapper.state('checked');
    }, false);
  });

  it('props: checked = true', () => {
    checkState(config.checkedTrue, wrapper => {
      return wrapper.state('checked');
    }, true);
  });

  it('props: checked = false', () => {
    checkState(config.checkedFalse, wrapper => {
      return wrapper.state('checked');
    }, false);
  });

  it('props: disabled = true', () => {
    checkState(config.disabledTrue, wrapper => {
      return wrapper.state('disabled');
    }, true);
  });

  it('props: disabled = false', () => {
    checkState(config.disabledFalse, wrapper => {
      return wrapper.state('disabled');
    }, false);
  });

  it('props: checkedChildren = “on”', () => {
    checkState(config.checkedChildren, wrapper => {
      wrapper.setState({checked: true,});
      return wrapper.html().indexOf(config.checkedChildren.checkedChildren) > -1;
    }, true);
  });

  it('props: unCheckedChildren = "off"', () => {
    checkState(config.unCheckedChildren, wrapper => {
      wrapper.setState({checked: false,});
      return wrapper.html().indexOf(config.unCheckedChildren.unCheckedChildren) > -1;
    }, true);
  });

  it('props: onChange => checked: false to checked: true', () => {
    const Target = shallow(<Switch checked={false} onChange={result => {
      exp(result).to.eql(true);
    }} />);

    Target.setState({
      checked: true,
    });
  });

  it('Switch onClick', () => {
    checkState({}, wrapper => {
      wrapper.find('span').at(0).simulate('click');
      
      return wrapper.state('checked');
    }, true, 'mount');
  });

  it('keyboard onKeyDown: "ENTER","SPACE","RIGHT_ARROW","LEFT_ARROW" ', () => {
    const Target = mount(<Switch autoFocus />);
    const SwitchEl = Target.find('span').at(0);

    SwitchEl.simulate('keyDown', {keyCode: ENTER,});
    exp(Target.state('checked')).to.eql(true);
    SwitchEl.simulate('keyDown', {keyCode: SPACE,});
    exp(Target.state('checked')).to.eql(false);
    SwitchEl.simulate('keyDown', {keyCode: RIGHT_ARROW,});
    exp(Target.state('checked')).to.eql(true);
    SwitchEl.simulate('keyDown', {keyCode: LEFT_ARROW,});
    exp(Target.state('checked')).to.eql(false);
  });

  /* 
  

  it('iconClass: sv-icon-close', () => {
    const order = VerifyOrder.create();
    const mockClick = mockFunction.create(VerifyOrderConfig.create('eventHandle', order));
    const onClick = mockClick.getFunction();
    const target = mount(<Icon iconClass="sv-icon-close" onClick={onClick}></Icon>);
    target.find('i').simulate('click', {});
    order.verify(obj => {
      const { eventHandle, } = obj;
      eventHandle(VerifyOrder.Object);
    });
  });
   */
});
