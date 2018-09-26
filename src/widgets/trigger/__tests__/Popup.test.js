//@flow
import React from 'react';
import 'jest-styled-components';
import Popup from '../Popup';

import renderer from 'react-test-renderer';

describe('Popup', () => {
  it('Popup snapshot', () => {
    const contentBox = renderer.create(
      <Popup getRootDomNode={() => ''}>
        {' '}
        <div>hello</div>
      </Popup>
    );
    expect(contentBox).toMatchSnapshot();
  });
});
