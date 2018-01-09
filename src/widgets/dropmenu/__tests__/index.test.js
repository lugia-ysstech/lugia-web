//@flow
import React from 'react';
import chai from 'chai';

import DropMenu from '../';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Menu from '../../menu';
import Widgets from '../../consts/index';
import { Height, } from '../../css/input';
import { QueryInputPadding, } from '../../common/QueryInputContainer';
import { adjustValue, } from '../../utils';
import { MenuItemHeight, DefaultHeight,} from '../../css/menu';

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;

describe('DropMenu', () => {

  it('菜单的高度需扣除input的默认高度', () => {
    const cmp = mount(<DropMenu menus={<Menu data={[{ key: '1', value: 'hello', },]}/>}><input/></DropMenu>);
    exp(getMenuHeight(cmp)).to.be.equal(adjustValue(DefaultHeight - (Height + 2 * QueryInputPadding), MenuItemHeight));
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
