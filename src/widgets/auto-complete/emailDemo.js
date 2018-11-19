import * as React from 'react';
import AutoComplete from './';

const data = ['@gmail.com', '@sina.com', '@163.com', '@qq.com'];

export default class Demo extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      menuData: [],
    };
  }
  render() {
    const { menuData } = this.state;
    return <AutoComplete data={menuData} onChange={this.onChange} />;
  }

  onChange = value => {
    this.getMenuData(value);
  };

  getMenuData = (value: string) => {
    const newData = [];
    data.forEach(item => {
      if (value.indexOf('@') === -1) {
        item = '' + value + item;
        newData.push(item);
      }
    });

    this.setState({ menuData: newData });
  };
}
