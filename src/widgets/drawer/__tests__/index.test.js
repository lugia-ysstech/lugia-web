/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DrawerDemo from '../demo';
import renderer from 'react-test-renderer';
import Drawer from '../drawer';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Drawer', () => {
  it('css', () => {
    const Target = <DrawerDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });

  const getComponent = (target: any) => {
    return target
      .find('Drawer')
      .at(0)
      .instance();
  };
  it('Drawer -> utils/getTruthValue', () => {
    const target = mount(
      <Drawer title="Basic Drawer" visible={false}>
        <p>Basic Drawer</p>
      </Drawer>
    );
    const component = getComponent(target);
    const { open, opening, closing } = component.state;
    expect(open).toBe(false);
    expect(opening).toBe(false);
    expect(closing).toBe(false);
  });
});
