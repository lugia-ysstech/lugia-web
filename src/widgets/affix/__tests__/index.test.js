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
import AffixDemo from '../demo';
import renderer from 'react-test-renderer';
import Affix from '../affix';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Affix', () => {
  it('css', () => {
    const Target = <AffixDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });

  const getState = (target: any) => {
    return target.instance().state;
  };
  it('Affix props: offsetTop setFixedForWin ', () => {
    const target = mount(<Affix offsetTop={50} />);
    const affixElement = target.instance();

    expect(getState(target).fixed).toBe(false);

    affixElement.setFixedForWin({
      offsetTop: 50,
      offsetBottom: 0,
      winHeight: 900,
      scrollTop: 100,
      affixTop: 150,
      defaultTop: 100,
    });
    expect(getState(target).fixed).toBe(true);

    affixElement.setFixedForWin({
      offsetTop: 50,
      offsetBottom: 0,
      winHeight: 900,
      scrollTop: 100,
      affixTop: 150,
      defaultTop: 200,
    });
    expect(getState(target).fixed).toBe(false);
  });

  it('Affix props: offsetBottom setFixedForWin ', () => {
    const target = mount(<Affix offsetBottom={50} />);
    const affixElement = target.instance();

    expect(getState(target).fixed).toBe(false);

    affixElement.affix.getBoundingClientRect = () => {
      return {
        top: 100,
        bottom: 850,
      };
    };

    affixElement.setFixedForWin({
      offsetTop: 50,
      offsetBottom: 0,
      winHeight: 900,
      scrollTop: 100,
      affixTop: 150,
      defaultTop: 200,
    });
    expect(getState(target).fixed).toBe(false);
  });

  it('Affix props: targt offsetTop setFixedForTarget ', () => {
    const target = mount(<Affix target={() => {}} offsetTop={50} />);
    const affixElement = target.instance();

    expect(getState(target).fixed).toBe(false);
    affixElement.defaultOffsetTop = 10;
    affixElement.targetDefaultOffsetTop = 10;
    affixElement.setFixedForTarget({
      affixTop: 250,
      targetTop: 100,
      targetScroll: 100,
      offsetTop: 50,
      winHeight: 900,
      offsetBottom: 0,
      targetRect: {
        top: 200,
        bottom: 300,
      },
      targetHeight: 200,
    });
    expect(getState(target).fixed).toBe(true);

    affixElement.defaultOffsetTop = 250;
    affixElement.targetDefaultOffsetTop = 100;
    affixElement.setFixedForTarget({
      affixTop: 250,
      targetTop: 150,
      targetScroll: 100,
      offsetTop: 50,
      winHeight: 900,
      offsetBottom: 0,
      targetRect: {
        top: 200,
        bottom: 300,
      },
      targetHeight: 200,
    });
    expect(getState(target).fixed).toBe(false);
  });

  it('Affix props: targt offsetBottom setFixedForTarget ', () => {
    const target = mount(<Affix target={() => {}} offsetBottom={50} />);
    const affixElement = target.instance();

    expect(getState(target).fixed).toBe(false);
    affixElement.defaultOffsetTop = 500;
    affixElement.targetDefaultOffsetTop = 100;
    affixElement.setFixedForTarget({
      affixTop: 500,
      targetTop: 150,
      targetScroll: 100,
      offsetTop: 0,
      winHeight: 900,
      offsetBottom: 50,
      targetRect: {
        top: 200,
        bottom: 300,
      },
      targetHeight: 200,
    });
    expect(getState(target).fixed).toBe(true);

    affixElement.defaultOffsetTop = 500;
    affixElement.targetDefaultOffsetTop = 100;
    affixElement.setFixedForTarget({
      affixTop: 250,
      targetTop: 150,
      targetScroll: 500,
      offsetTop: 0,
      winHeight: 900,
      offsetBottom: 50,
      targetRect: {
        top: 100,
        bottom: 300,
      },
      targetHeight: 200,
    });
    expect(getState(target).fixed).toBe(false);
  });
});
