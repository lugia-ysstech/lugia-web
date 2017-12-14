//@flow
import React from 'react';
import chai from 'chai';

import DropMenu from '../';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Menu from '../../menu';
import * as Widgets from '../../consts/Widget';
import { Height, } from '../../css/input';
import { QueryInputPadding, } from '../../common/QueryInputContainer';

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;

const defaultHeight = 250;
const inputHeight = 50;
describe('DropMenu', () => {

  it('菜单的高度需扣除input的默认高度', () => {
    const cmp = mount(<DropMenu menus={<Menu data={[{ key: '1', value: 'hello', },]}/>}><input/></DropMenu>);
    exp(getMenuHeight(cmp)).to.be.equal(defaultHeight - (Height + 2 * QueryInputPadding));
  });

  function getMenuHeight (cmp) {
    return getMenuTheme(cmp).height;
  }

  function getMenuTheme (cmp) {
    return findMenu(cmp).props().getTheme();
  }

  function findMenu (cmp: Object) {
    return cmp.find(Widgets.Menu);
  }

  function getDropMenuHeight (cmp) {
    return getDropMenuTheme(cmp).height;
  }

  function getDropMenuTheme (cmp) {
    return findDropMenu(cmp).props().getTheme();
  }

  function findDropMenu (cmp: Object) {
    return cmp.find(Widgets.DropMenu);
  }
});
