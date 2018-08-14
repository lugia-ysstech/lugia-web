/**
 * Radio 单元测试
 * create by guorg
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Radio from '../radio';
import { RadioDemo } from '../demo';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Radio', () => {
  const createMount = (config: Object) => {
    return <Radio {...config}>Radio</Radio>;
  };

  it('Radio css', () => {
    const target = <RadioDemo />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });

  it('Radio checked', () => {
    const target = mount(createMount({ checked: true }));
    const cmpRadio = target
      .children()
      .at(0)
      .instance();
    expect(cmpRadio.props.checked).toBe(true);
  });

  // it('Radio defaultChecked',() => {
  //   const target =mount(<Radio defaultChecked>Radio</Radio>);
  //   const cmpRadio = target
  //     .children()
  //     .at(0)
  //     .instance();
  //   expect(cmpRadio.state.checked).toBe(true);
  // });

  // it('Radio click',() => {
  //   const target =mount(<Radio checked>Radio</Radio>);
  //   const cmpRadio = target
  //     .children()
  //     .at(0)
  //     .instance();
  //   expect(cmpRadio.state.checked).toBe(true);
  // });

  it('Radio onClick: disabled checked defaultChecked', () => {
    let value = 1;
    const handleClick = () => {
      value = 2;
    };
    function onClick(target: any, result: number) {
      target
        .find('label')
        .at(0)
        .simulate('click');
      expect(value).toBe(result);
    }
    const target = mount(
      createMount({ onChange: handleClick, disabled: true, defaultChecked: true })
    );
    onClick(target, 1);
    const newTarget = mount(createMount({ onChange: handleClick, checked: true }));
    onClick(newTarget, 2);
    const defaultCheckTarget = mount(createMount({ onChange: handleClick, defaultChecked: true }));
    onClick(defaultCheckTarget, 2);
  });
});
