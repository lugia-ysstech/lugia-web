//@flow
import React from 'react';
import chai from 'chai';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import VisibleBox from '../VisibleBox';
import MaskBox from '../MaskBox';

const { expect: exp } = chai;

describe('VisibleBox', () => {

  it('visible  is true', () => {
    const maskBox = renderer.create(<MaskBox visible></MaskBox>).toJSON();
    expect(maskBox).toMatchSnapshot();
  });


});
