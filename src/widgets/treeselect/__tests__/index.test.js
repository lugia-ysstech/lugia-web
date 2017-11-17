/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createTestComponent, } from 'sv-test-utils';
import TreeSelect from '../';
import Trigger from '../../trigger';

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;

describe('TreeSelect', () => {
  it('输入框点击后，弹出面板', () => {
    const cmp = mount(<TreeSelect/>);
    cmp.children().at(0).simulate('click');
    cmp.instance().forceUpdate();
    cmp.update();
    exp(cmp.find(Trigger).length).to.be.equal(1);
  });
});



