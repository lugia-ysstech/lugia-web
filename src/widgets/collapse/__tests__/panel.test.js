/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import 'jest-styled-components';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PanelDemo } from '../demo';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('Panel', () => {
  it('Panel CSS', () => {
    const Target = <PanelDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
});
