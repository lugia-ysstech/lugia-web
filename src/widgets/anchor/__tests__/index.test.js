/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';
import AnchorDemo from '../demo';
import Anchor from '../anchor';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Anchor', () => {
  it('css', () => {
    const Target = <AnchorDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });

  const getComponent = (target: any) => {
    return target
      .find('Anchor')
      .at(0)
      .instance();
  };

  it('Anchor: setScrollActiveLink ', () => {
    const target = mount(<Anchor />);
    const component = getComponent(target);

    component.setScrollActiveLink([]);
    const { activeLink: newActiveLink } = component.state;
    expect(newActiveLink).toBe('');

    component.setScrollActiveLink([
      { link: 'a', top: 20 },
      { link: 'b', top: -20 },
      { link: 'c', top: 0 },
    ]);
    const { activeLink } = component.state;
    expect(activeLink).toBe('a');
  });

  it('Anchor: handleLinkClick ', async () => {
    const target = mount(<Anchor />);
    const component = getComponent(target);
    const { isClick } = component;
    expect(isClick).toBe(false);

    component.handleLinkClick('', '#a');
    const { activeLink } = component.state;
    expect(component.isClick).toBe(true);
    expect(activeLink).toBe('#a');
    await delay(50);
    expect(component.isClick).toBe(false);
  });

  it('Anchor: getId ', () => {
    const target = mount(<Anchor />);
    const component = getComponent(target);

    expect(component.getId('#a')).toBe('a');
    expect(component.getId('##a')).toBe('a');
    expect(component.getId()).toBeUndefined();
  });

  it('Anchor: getLinks ', () => {
    const target = mount(<Anchor />);
    const component = getComponent(target);
    component.getLinks([1, 2]);
    const { links } = component;
    expect(links).toEqual([1, 2]);

    component.getLinks([3, 4]);
    const { links: newLink } = component;
    expect(newLink).toEqual([3, 4]);
  });
});
