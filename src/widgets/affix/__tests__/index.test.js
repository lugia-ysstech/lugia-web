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
      affixOffsetTop: 150,
      defaultOffsetTop: 100,
    });
    expect(getState(target).fixed).toBe(true);

    affixElement.setFixedForWin({
      offsetTop: 50,
      offsetBottom: 0,
      winHeight: 900,
      scrollTop: 100,
      affixOffsetTop: 150,
      defaultOffsetTop: 200,
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
      offsetTop: 0,
      offsetBottom: 50,
      winHeight: 900,
      scrollTop: 100,
      affixOffsetTop: 150,
      defaultOffsetTop: 200,
    });
    expect(getState(target).fixed).toBe(true);

    affixElement.setFixedForWin({
      offsetTop: 50,
      offsetBottom: 0,
      winHeight: 900,
      scrollTop: 100,
      affixOffsetTop: 150,
      defaultOffsetTop: 200,
    });
    expect(getState(target).fixed).toBe(false);
  });

  it('Affix props: targt offsetTop setFixedForTarget ', () => {
    const target = mount(<Affix target={() => {}} offsetTop={50} />);
    const affixElement = target.instance();

    expect(getState(target).fixed).toBe(false);

    affixElement.setFixedForTarget({
      affixRect: {
        top: 350,
        bottom: 400,
      },
      targetRect: {
        top: 200,
        bottom: 300,
      },
      targetScroll: 100,
      offsetTop: 50,
      winHeight: 900,
      offsetBottom: 0,
    });
    expect(getState(target).fixed).toBe(true);

    affixElement.setFixedForTarget({
      affixRect: {
        top: 350,
        bottom: 400,
      },
      targetRect: {
        top: 100,
        bottom: 400,
      },
      targetScroll: 100,
      offsetTop: 50,
      winHeight: 900,
      offsetBottom: 0,
    });
    expect(getState(target).fixed).toBe(true);
  });

  it('Affix props: targt offsetBottom setFixedForTarget ', () => {
    const target = mount(<Affix target={() => {}} offsetBottom={50} />);
    const affixElement = target.instance();

    expect(getState(target).fixed).toBe(false);
    // targetRect.bottom - affixRect.bottom - targetScroll <= offsetBottom ||
    // affixRect.top <= targetRect.top
    affixElement.setFixedForTarget({
      affixRect: {
        top: 350,
        bottom: 550,
      },
      targetRect: {
        top: 200,
        bottom: 300,
      },
      targetScroll: 100,
      offsetTop: 0,
      winHeight: 900,
      offsetBottom: 50,
    });
    expect(getState(target).fixed).toBe(true);

    affixElement.setFixedForTarget({
      affixRect: {
        top: 100,
        bottom: 600,
      },
      targetRect: {
        top: 150,
        bottom: 400,
      },
      targetScroll: 100,
      offsetTop: 50,
      winHeight: 900,
      offsetBottom: 0,
    });
    expect(getState(target).fixed).toBe(true);
  });
});
