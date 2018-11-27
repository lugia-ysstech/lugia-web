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
  // it('css', () => {
  //   const Target = <DrawerDemo />;
  //   expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  // });

  const getComponent = (target: any) => {
    return target
      .find('Drawer')
      .at(0)
      .instance();
  };
  it('Drawer -> props: visible  to state', () => {
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

    target.setProps({
      visible: true,
    });
    const { open: nowOpen, opening: nowOpening, closing: nowClosing } = getComponent(target).state;
    expect(nowOpen).toBe(true);
    expect(nowOpening).toBe(true);
    expect(nowClosing).toBe(false);

    target.setProps({
      visible: false,
    });
    const { open: nowOpens, opening: nowOpenings, closing: nowClosings } = getComponent(
      target
    ).state;
    expect(nowOpens).toBe(false);
    expect(nowOpenings).toBe(false);
    expect(nowClosings).toBe(true);
  });

  it('Drawer -> props: maskClosable: true | false  to onClose', () => {
    let result = 0;
    const handleClose = () => {
      result += 1;
    };
    const target = mount(
      <Drawer title="Basic Drawer" visible={false} onClose={handleClose}>
        <p>Basic Drawer</p>
      </Drawer>
    );
    expect(result).toBe(0);

    const mask = target.find('DrawerMask').at(0);
    mask.simulate('click');
    expect(result).toBe(1);

    const newTarget = mount(
      <Drawer title="Basic Drawer" visible={false} maskClosable={false} onClose={handleClose}>
        <p>Basic Drawer</p>
      </Drawer>
    );
    expect(result).toBe(1);
    const newMask = newTarget.find('DrawerMask').at(0);
    newMask.simulate('click');
    expect(result).toBe(1);
  });

  it('Drawer -> props: maskClosable: false | closable: true  to onClose', () => {
    let result = 0;
    const handleClose = () => {
      result += 1;
    };
    const target = mount(
      <Drawer title="Basic Drawer" visible={false} maskClosable={false} onClose={handleClose}>
        <p>Basic Drawer</p>
      </Drawer>
    );
    expect(result).toBe(0);

    const closeText = target.find('CloseText').at(0);
    closeText.simulate('click');
    expect(result).toBe(1);

    const newTarget = mount(
      <Drawer title="Basic Drawer" visible={false} closable={true} onClose={handleClose}>
        <p>Basic Drawer</p>
      </Drawer>
    );
    expect(result).toBe(1);

    const newCloseText = newTarget.find('CloseText').at(0);
    newCloseText.simulate('click');
    expect(result).toBe(2);
  });
});
