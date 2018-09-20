/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import type { QueryType } from '@lugia/lugia-web';
import Menu from '../menu';
import Input from '../input';
import Trigger from '../trigger';
import Theme from '../theme';
import Widget from '../consts/index';
import { DisplayField, ValueField } from '../consts/props';
import { MenuItemHeight, DefaultWidth } from '../css/menu';

import { px2emcss } from '../css/units';

const em = px2emcss(1.2);

const emailData = [
  { value: '@gmail.com' },
  { value: '@sina.com' },
  { value: '@163.com' },
  { value: '@qq.com' },
];

export default class AotuComplete extends React.Component<any, any> {
  static defaultProps = {
    getTheme() {
      return {};
    },
    displayField: DisplayField,
    valueField: ValueField,
    data: emailData,
  };

  constructor(props) {
    super(props);
    const { data, valueField } = props;
    data.forEach(item => (item[DisplayField] = item[valueField]));
    this.cacheData = data;
  }

  static getDerivedStateFromProps(props, state) {
    const { validateStatus = 'success' } = props;

    if (!state) {
      return {
        query: '',
        validateStatus,
        isCheckedAll: false,
        menuData: [],
        value: '',
      };
    }
  }

  render() {
    const { props, state } = this;
    const { query, menuData, value } = state;
    const { valueField } = props;

    const { width = DefaultWidth } = props.getTheme();
    const menuHeight = menuData.length * MenuItemHeight;

    const menuConfig = {
      [Widget.Menu]: { width, height: menuHeight },
      [Widget.Input]: { width },
      [Widget.Trigger]: { width, height: menuHeight },
    };
    const menu = (
      <Menu
        valueField={valueField}
        data={menuData}
        mutliple={false}
        selectedKeys={[value]}
        onClick={this.menuItemClickHandler}
      />
    );

    return (
      <Theme config={menuConfig}>
        <Trigger
          ref={cmp => (this.trigger = cmp)}
          align="bottomLeft"
          action={['focus']}
          hideAction={['focus']}
          popup={menu}
        >
          <Input type="text" value={query} onChange={this.changeValue} />
        </Trigger>
      </Theme>
    );
  }

  changeValue = nextValue => {
    const { newValue } = nextValue;
    const menuData = [];
    const { valueField } = this.props;
    if (newValue.indexOf('@') === -1 && newValue !== '') {
      this.cacheData.forEach(item => {
        const newItem = {};
        newItem[valueField] = '' + newValue + item[valueField];
        newItem[DisplayField] = '' + newValue + item[DisplayField];
        menuData.push(newItem);
      });
    }

    const query = newValue ? newValue : '';
    this.setState({ query, menuData });
  };

  menuItemClickHandler = (event: Object, selectedValue: Object) => {
    const { menuData } = this.state;
    const { selectedKeys } = selectedValue;
    const newValue = selectedKeys[0];
    this.setValue(newValue, menuData);
  };

  setValue(value: string, menuData: Object[]) {
    this.setState({
      value,
      query: value,
      menuData,
    });
  }
}
