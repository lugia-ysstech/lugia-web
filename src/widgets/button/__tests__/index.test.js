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
import renderer from 'react-test-renderer';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  beforeEach(() => {});

  it('normal', () => {
    const Target = <Button>你好吗</Button>;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
  it('normal type: danger', () => {
    const Target = <Button type="danger">hello</Button>;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
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
});
