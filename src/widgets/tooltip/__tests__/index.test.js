//@flow
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';

import Tooltip from '../';
import { createTestComponent } from '@lugia/react-test-utils';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;
/*
  left: ['cr', 'cl',],
  leftTop: ['tr', 'tl',],
  leftBottom: ['br', 'bl',],
  right: ['cl', 'cr',],
  rightTop: ['tl', 'tr',],
  rightBottom: ['bl', 'br',],
  top: ['bc', 'tc',],
  bottom: ['tc', 'bc',],
  topLeft: ['bl', 'tl',],
  topRight: ['br', 'tr',],
  bottomRight: ['tr', 'br',],
  bottomLeft: ['tl', 'bl',],
 */

describe('Tooltip', () => {
  it('getFx', () => {
    const Target = createTestComponent(Tooltip, target => {
      exp(target.getThemeTarget().getFx('left')).to.be.equal('right');
      exp(target.getThemeTarget().getFx('leftTop')).to.be.equal('right');
      exp(target.getThemeTarget().getFx('leftBottom')).to.be.equal('right');

      exp(target.getThemeTarget().getFx('right')).to.be.equal('left');
      exp(target.getThemeTarget().getFx('rightTop')).to.be.equal('left');
      exp(target.getThemeTarget().getFx('rightBottom')).to.be.equal('left');

      exp(target.getThemeTarget().getFx('top')).to.be.equal('bottom');
      exp(target.getThemeTarget().getFx('topLeft')).to.be.equal('bottom');
      exp(target.getThemeTarget().getFx('topRight')).to.be.equal('bottom');

      exp(target.getThemeTarget().getFx('bottom')).to.be.equal('top');
      exp(target.getThemeTarget().getFx('bottomLeft')).to.be.equal('top');
      exp(target.getThemeTarget().getFx('bottomRight')).to.be.equal('top');
    });
    mount(
      <Target>
        <button />
      </Target>
    );
  });
});
