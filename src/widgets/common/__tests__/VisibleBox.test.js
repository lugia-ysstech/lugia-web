//@flow
import React from 'react';
import chai from 'chai';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import VisibleBox from '../VisibleBox';

const { expect: exp } = chai;

describe('VisibleBox', () => {

  it('visible  is true', () => {
    const visibleBox = renderer.create(<VisibleBox visible></VisibleBox>).toJSON();
    expect(visibleBox).toMatchSnapshot();

  });

  it('visible is false', () => {
    const visibleBox = renderer.create(<VisibleBox visible={false}></VisibleBox>).toJSON();
    expect(visibleBox).toMatchSnapshot();
    expect(visibleBox).toHaveStyleRule('display', 'none');
  });
  it('default visible default is false', () => {
    const visibleBox = renderer.create(<VisibleBox></VisibleBox>).toJSON();
    expect(visibleBox).toMatchSnapshot();
    expect(visibleBox).toHaveStyleRule('display', 'none');
  });

});
