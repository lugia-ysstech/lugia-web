/**
 * create by szfeng
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import DropMenu from '../';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Menu from '../../menu';
import DropMenuButton from '../dropmenuButton';
import renderer from 'react-test-renderer';
import Widget from '../../consts/index';
import Theme from '../../theme';
import { QueryInputPadding } from '../../common/QueryInputContainer';
import { adjustValue } from '../../utils';
import { delay } from '@lugia/react-test-utils';
import { MenuItemHeight, DefaultHeight, Height } from '../../css/menu';
const { MenuItem } = Menu;

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;

describe('DropMenuButton', () => {
  it('default', () => {
    const target = renderer.create(<DropMenuButton />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('divided={false}', () => {
    const target = renderer.create(<DropMenuButton divided={false} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('type=primary,divided={true}', () => {
    const target = renderer.create(<DropMenuButton type={'primary'} divided={true} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('type=basic', () => {
    const target = renderer.create(<DropMenuButton type={'basic'} divided={false} />).toJSON();
    expect(target).toMatchSnapshot();
  });

  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push(
      <MenuItem key={i} onClick={rest => {}}>
        {i}
      </MenuItem>
    );
  }

  const getTarget = (action, divided, type) =>
    class DropMenuDemo extends React.Component<any, any> {
      constructor(props) {
        super(props);
        this.state = {
          clickedState: false,
          visible: false,
          menu: <Menu onClick={(...rest) => {}}>{items}</Menu>,
        };
      }

      render() {
        const { menu } = this.state;
        const view = {
          [Widget.DropMenuButton]: { width: 180 },
          [Widget.DropMenu]: { width: 160 },
        };

        return (
          <Theme config={view}>
            <DropMenu
              onPopupVisibleChange={this.onPopupVisibleChange}
              menus={menu}
              action={action}
              hideAction={action}
            >
              <DropMenuButton type={type} divided={divided} onClick={this.onClick}>
                参数设置
              </DropMenuButton>
            </DropMenu>
          </Theme>
        );
      }

      onPopupVisibleChange = visible => {
        this.setState({ visible });
      };

      onClick = () => {
        this.setState({ clickedState: true });
      };
    };

  it('type: default, divided={true}; action = hover , click MenuItem && hover LeftButton', async () => {
    const Demo = getTarget('hover', true, 'default');
    const cmp = mount(<Demo />);

    pullButtonMouseEnter(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    pullButtonMouseLeave(cmp);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);

    pullButtonMouseEnter(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    clickMenuItem(cmp, 1);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);

    hoverLeftButton(cmp);
    exp(cmp.state().visible).to.be.equal(false);
  });

  it('type: default, divided={true}, action = click , click MenuItem && click LeftButton', async () => {
    const Demo = getTarget('click', true, 'default');
    const cmp = mount(<Demo />);

    pullButtonClick(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    pullButtonClick(cmp);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);

    pullButtonClick(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    clickMenuItem(cmp, 1);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);

    clickLeftButton(cmp);
    exp(cmp.state().visible).to.be.equal(false);
    await delay(100);
    exp(cmp.state().clickedState).to.be.equal(true);
  });

  it('type: primary, divided={false}; action = hover , click MenuItem && hover LeftButton', async () => {
    const Demo = getTarget('hover', false, 'primary');
    const cmp = mount(<Demo />);

    NoDividedButtonMouseEnter(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    NoDividedButtonMouseLeave(cmp);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);

    NoDividedButtonMouseEnter(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    clickMenuItem(cmp, 1);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);
  });

  it('type: primary, divided={false}, action = click , click MenuItem', async () => {
    const Demo = getTarget('click', false, 'primary');
    const cmp = mount(<Demo />);

    NoDividedButtonClick(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    NoDividedButtonClick(cmp);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);

    NoDividedButtonClick(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    clickMenuItem(cmp, 1);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);
  });

  it('type: basic, action = hover , hover MenuItem', async () => {
    const Demo = getTarget('hover', false, 'basic');
    const cmp = mount(<Demo />);

    BasicButtonMouseEnter(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    BasicButtonMouseLeave(cmp);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);

    BasicButtonMouseEnter(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    clickMenuItem(cmp, 1);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);
  });

  it('type: basic, action = click , click MenuItem', async () => {
    const Demo = getTarget('click', false, 'basic');
    const cmp = mount(<Demo />);

    BasicButtonClick(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    BasicButtonClick(cmp);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);

    BasicButtonClick(cmp);
    exp(cmp.state().visible).to.be.equal(true);
    clickMenuItem(cmp, 1);
    await delay(100);
    exp(cmp.state().visible).to.be.equal(false);
  });

  function findPullButton(cmp: Object) {
    return cmp.find('DropMenuPullButton');
  }

  function pullButtonMouseEnter(cmp: Object) {
    return findPullButton(cmp).simulate('mouseEnter');
  }

  function pullButtonMouseLeave(cmp: Object) {
    return findPullButton(cmp).simulate('mouseLeave');
  }

  function pullButtonClick(cmp: Object) {
    return findPullButton(cmp).simulate('click');
  }

  function findMenuItem(cmp: Object) {
    return cmp
      .find(Widget.Menu)
      .at(0)
      .find(Widget.MenuItem);
  }

  function clickMenuItem(cmp: Object, index: number) {
    findMenuItem(cmp)
      .at(index)
      .simulate('click');
  }

  function findDevidedTextContainer(cmp: Object) {
    return cmp.find('DevidedTextContainer');
  }

  function hoverLeftButton(cmp: Object) {
    findDevidedTextContainer(cmp).simulate('mouseEnter');
  }

  function clickLeftButton(cmp: Object) {
    findDevidedTextContainer(cmp)
      .find('input')
      .at(0)
      .simulate('click');
  }

  function findNoDividedButton(cmp: Object) {
    return cmp.find(Widget.DropMenuButton).find('NoDividedContainer');
  }

  function NoDividedButtonMouseEnter(cmp) {
    findNoDividedButton(cmp).simulate('mouseEnter');
  }

  function NoDividedButtonMouseLeave(cmp) {
    findNoDividedButton(cmp).simulate('mouseLeave');
  }

  function NoDividedButtonClick(cmp) {
    findNoDividedButton(cmp).simulate('click');
  }

  function findBasicButton(cmp: Object) {
    return cmp.find(Widget.DropMenuButton).find('BasicWrap');
  }

  function BasicButtonMouseEnter(cmp) {
    findBasicButton(cmp).simulate('mouseEnter');
  }

  function BasicButtonMouseLeave(cmp) {
    findBasicButton(cmp).simulate('mouseLeave');
  }

  function BasicButtonClick(cmp) {
    findBasicButton(cmp).simulate('click');
  }
});
