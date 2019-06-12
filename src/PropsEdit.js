import React, { Component } from 'react';
import Table from './widgets/table';

import Input from './widgets/input';
import Select from './widgets/select';
import Switch from './widgets/switch';
import NumberInput from './widgets/number-input';
import JSONEditorReact from './JSONEditorReact.js';

const type2Component = {
  number: NumberInput,
  string: Input,
  array: Select,
  object: JSONEditorReact,
  boolean: Switch,
};

const always = v => v;
const type2GetValue = {
  number: value => value - 0,
  string: always,
  array: always,
  object: v => {
    try {
      const res = JSON.parse(v);
      return res;
    } catch (err) {
      return {};
    }
  },
  boolean: always,
};
export default class extends Component<any, any> {
  constructor() {
    super();
  }

  render() {
    const columns = [
      {
        title: '属性名称',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
      },
      {
        title: '说明',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
      },
      {
        title: '值',
        dataIndex: 'value',
        key: 'value',
        render: (text, record) => {
          const { type, name } = record;
          return this.createElement(type, {
            onChange: e => {
              const { onChange } = this.props;
              const value = this.getChangeValue(type, e);
              onChange && onChange(name, value);
            },
          });
        },
      },
    ];

    const { info: { props = {} } = { props: {} } } = this.props;

    const data = Object.keys(props).map((key: string) => {
      const { type, desc } = props[key];
      return {
        name: key,
        type,
        desc,
      };
    });
    return <Table columns={columns} data={data} />;
  }

  getChangeValue(type: string, e: Object) {
    let value = e;

    if (typeof e === 'object') {
      if ('newValue' in e) {
        value = e.newValue;
      }
      const target = e.target;
      if (target && target.value) {
        value = target.value;
      }
    }

    const gettor = type2GetValue[type];
    return gettor ? gettor(value) : value;
  }

  createElement = (type: string, config: Object) => {
    const map = type2Component[type];
    const Target = map ? map : props => <textarea {...props} />;
    return <Target {...config} />;
  };
}
