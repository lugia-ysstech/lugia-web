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
import { RowDemo } from '../demo';
import renderer from 'react-test-renderer';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('css', () => {
    const Target = <RowDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
});
