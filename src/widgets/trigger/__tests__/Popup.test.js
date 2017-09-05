//@flow
import React from 'react';
import chai from 'chai';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Popup from '../Popup';
import { mount, } from 'enzyme';

const { expect: exp, } = chai;

describe('ContentBox', () => {

  it('default visible: false, children: 1', () => {
    const contentBox = renderer.create(<Popup><span>a</span></Popup>).toJSON();
    expect(contentBox).toMatchSnapshot();
  });
});

