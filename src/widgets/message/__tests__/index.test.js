/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Message from '../demo';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
  it('css', () => {
    const Target = <Message />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
});
