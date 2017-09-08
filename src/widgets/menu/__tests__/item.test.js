//@flow

import * as React from 'react';
import chai from 'chai';
import MenuItem from '../item';
import 'jest-styled-components';

import renderer from 'react-test-renderer';

const { expect: exp, } = chai;

describe('Item', () => {

  it('children: null', () => {
    const target = renderer.create(<MenuItem></MenuItem>).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('Single MenuItem', () => {
    const defaultItem = renderer.create(<MenuItem>hello</MenuItem>).toJSON();
    const target = renderer.create(<MenuItem checked={false}>hello</MenuItem>).toJSON();
    expect(target).toMatchSnapshot();
    expect(target).toMatchObject(defaultItem);
  });

  it('Single MenuItem checked', () => {
    const target = renderer.create(<MenuItem checked><a>hello</a></MenuItem>);
    expect(target).toMatchSnapshot();
  });
  it('Mutliple MenuItem', () => {
    const defaultItem = renderer.create(<MenuItem mutliple><a>hello</a></MenuItem>).toJSON();
    const target = renderer.create(<MenuItem mutliple checked={false}><a>hello</a></MenuItem>).toJSON();
    expect(target).toMatchSnapshot();
    expect(target).toMatchObject(defaultItem);
  });

  it('Mutliple MenuItem checked', () => {
    const target = renderer.create(<MenuItem mutliple checked><a>hello</a></MenuItem>);
    expect(target).toMatchSnapshot();
  });


});
