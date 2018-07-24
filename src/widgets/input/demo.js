/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';
import Input from './';
import Widget from '../consts/index';
import ClearIcon from '../icon/ClearIcon';
import SearchIcon from '../icon/SearchIcon';
import PullIcon from '../icon/PullIcon';

export class LimitInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: props.value };
  }

  onChange = (value: any) => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    return <Input value={this.state.value} onChange={this.onChange} />;
  }
}

export class DefaultValueInput extends React.Component<any, any> {
  render() {
    return <Input defaultValue="hello world" onChange={this.props.onChange} />;
  }
}

const InputDemo = () => {
  const view = {
    [Widget.Input]: {
      width: 300,
      margin: 10,
    },
    [Widget.Tooltip]: {
      color: '#999999',
      fontColor: '#ffffff',
    },
    register: {
      width: 100,
    },
  };
  const onChange = (cmpName: string) => (value: string) => {
    console.info(`${cmpName} changeTo ${value}`);
  };
  const formatter = value => {
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const parser = value => {
    return value.replace(/\$\s?|(,*)/g, '');
  };
  return (
    <div>
      <p>formatter input</p>
      <Input placeholder={'请填写金额'} formatter={formatter} parser={parser} />
      <p>default input</p>
      <Input placeholder={'请填写内容'} />
      <p>禁用状态 </p>
      <Input size={'default'} disabled={true} />
      <Theme config={view}>
        <p>small size</p>
        <Input
          size={'small'}
          placeholder={'请填写内容'}
          validateStatus="error"
          validateType="inner"
        />
        <p>default size</p>
        <Input validateStatus="error" placeholder={'请填写内容'} validateType="top" />
        <p>large size</p>
        <Input size={'large'} validateStatus="error" validateType="bottom" />
        <p>校验失败状态</p>
        <Input validateStatus="error" />
        <p>delete</p>
        <Input viewClass="register" suffix={<ClearIcon />} />
        <p>search</p>
        <Input viewClass="register" suffix={<SearchIcon />} />
        <p>pull</p>
        <Input viewClass="register" suffix={<PullIcon />} />
        <Theme config={{ register: { width: 100, margin: 5 } }}>
          <p>字体色值</p>
          <Input value="色值:&quot;#333333&quot;" />
          <p>受限Input</p>
          <LimitInput onChange={onChange('limit')} />
            <p>有默认值的 受限Input</p>
          <DefaultValueInput onChange={onChange('limit')} />
        </Theme>
      </Theme>
    </div>
  );
};
export default InputDemo;
