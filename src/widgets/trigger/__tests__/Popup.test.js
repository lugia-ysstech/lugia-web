//@flow
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Popup from '../Popup';

const ReactShallowRenderer = require('react-test-renderer/shallow');

const renderer = new ReactShallowRenderer();
const { expect: exp } = chai;

describe('Popup', () => {

  it('Popup snapshot', () => {
    const contentBox = renderer.render(<Popup getRootDomNode={() => ''}> </Popup>);
    expect(contentBox).toMatchSnapshot();
  });
});

