//@flow
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';

import Tooltip from '../';
import { createTestComponent, } from 'sv-test-utils';


import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;
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
    let target: Object = {};
    const Target = createTestComponent(Tooltip, the => {
      target = the;
    });
    mount(<Target>
      <button></button>
    </Target>);
    exp(target.getFx('left')).to.be.equal('right');
    exp(target.getFx('leftTop')).to.be.equal('right');
    exp(target.getFx('leftBottom')).to.be.equal('right');


    exp(target.getFx('right')).to.be.equal('left');
    exp(target.getFx('rightTop')).to.be.equal('left');
    exp(target.getFx('rightBottom')).to.be.equal('left');

    exp(target.getFx('top')).to.be.equal('bottom');
    exp(target.getFx('topLeft')).to.be.equal('bottom');
    exp(target.getFx('topRight')).to.be.equal('bottom');

    exp(target.getFx('bottom')).to.be.equal('top');
    exp(target.getFx('bottomLeft')).to.be.equal('top');
    exp(target.getFx('bottomRight')).to.be.equal('top');
  });


});
