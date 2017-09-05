//@flow
import React from 'react';
import chai from 'chai';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Trigger from '../';

const { expect: exp, } = chai;

describe('trigger', () => {

  it('render', () => {
    expect(renderer.create(<Trigger><span>hello world!</span></Trigger>).toJSON()).toMatchSnapshot();
  });


});
