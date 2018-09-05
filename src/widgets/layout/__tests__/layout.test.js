/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LayoutDemo } from '../demo';
import renderer from 'react-test-renderer';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('row', () => {
  it('css', () => {
    const Target = <LayoutDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
});
