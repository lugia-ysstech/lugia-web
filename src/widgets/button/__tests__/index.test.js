/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../';
import Wrapper from '../demo';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('css', () => {
    const Target = <Wrapper />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });

  it('button: click', async () => {
    const target = mount(<Button type="success">hello</Button>);
    const button = target.find('button').at(0);
    const cmpButton = target
      .find('Button')
      .at(0)
      .instance();
    expect(cmpButton.state.clicked).toBe(false);
    button.simulate('click');
    expect(cmpButton.state.clicked).toBe(true);
    await delay(500);
    expect(cmpButton.state.clicked).toBe(false);
    button.simulate('click');
    expect(cmpButton.state.clicked).toBe(true);
  });

  it('button: loading', async () => {
    const target = mount(
      <Button type="success" loading={true}>
        hello
      </Button>
    );
    const cmpButton = target
      .find('Button')
      .at(0)
      .instance();
    expect(cmpButton.props.loading).toBe(true);
  });

  it('button: loading delay', async () => {
    const target = mount(
      <Button type="success" loading={{ delay: 3000 }}>
        hello
      </Button>
    );
    const cmpButton = target
      .find('Button')
      .at(0)
      .instance();
    expect(cmpButton.props.loading).toBe(true);
    await delay(3000);
    expect(cmpButton.props.loading).toBe(false);
  });

  it('props: click', async () => {
    let onClick;
    const promise = new Promise(resolve => {
      onClick = e => {
        resolve(e.target);
      };
    });
    const cmp = mount(
      <Button type="danger" onClick={onClick}>
        hello
      </Button>
    );
    const target = { px: 'hello' };
    cmp
      .find('hello')
      .at(0)
      .simulate('click', { target });

    exp(await promise).to.be.eql(target);
  });
  function mountCom(config: Object) {
    let value = 1;
    const onClick = () => {
      value = 2;
    };
    const cmp = mount(
      <Button type="danger" onClick={onClick} {...config}>
        hello
      </Button>
    );
    cmp
      .find('button')
      .at(0)
      .simulate('click');
    expect(value).toBe(1);
  }
  it('props: click, loading: true', async () => {
    const config = { loading: true };
    mountCom(config);
  });

  it('props: click, disabled: true', async () => {
    const config = { disabled: true };
    mountCom(config);
  });
});
