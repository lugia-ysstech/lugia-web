/*
 *@flow
 *
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Image from '../index';

import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

Enzyme.configure({ adapter: new Adapter() });
describe('Image', () => {
  it('image: isBackground = false', () => {
    const target = renderer
      .create(
        <Image
          src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
          alt="我是可爱的西柚"
          title="I am lovely grapefruit"
          height="200"
          width="250"
        />
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('background: isBackground = true', () => {
    const target = renderer
      .create(
        <Image
          src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
          alt="我是可爱的西柚"
          title="I am lovely grapefruit"
          height="200"
          width="250"
          isBackground={true}
        />
      )
      .toJSON();
    expect(target).toMatchSnapshot();
  });
});
