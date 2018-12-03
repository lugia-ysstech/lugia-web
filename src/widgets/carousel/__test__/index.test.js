/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Carousel from '../carousel';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

Enzyme.configure({ adapter: new Adapter() });

describe('Carousel', () => {
  it('getItemWrap', () => {
    const item = 'hello world';
    const result = Carousel.prototype.getItemWrap({
      switchType: 'horizontal',
      start: 0,
      index: 1,
      width: 50,
      height: 50,
      item,
    });

    expect(renderer.create(<div>{result}</div>).toJSON()).toMatchSnapshot();
  });
});
