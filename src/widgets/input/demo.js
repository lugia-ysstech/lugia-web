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
      margin :10,
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
      <br />formatter input<br />
      <Input placeholder={'请填写金额'} formatter={formatter} parser={parser} />
      <br />default input<br />
      <Input placeholder={'请填写内容'} />
      <br />禁用状态 <br />
      <Input size={'default'} disabled={true} />
      <Theme config={view}>
        <br />small size<br />
        <Input size={'small'} placeholder={'请填写内容'} />
        <br />default size<br />
        <Input validateStatus="success" placeholder={'请填写内容'} />
        <br />large size<br />
        <Input size={'large'} />
        <br />校验失败状态<br />
        <Input validateStatus="error" />
        <br />delete<br />
        <Input viewClass="register" suffix={<ClearIcon />} />
        <br />search<br />
        <Input viewClass="register" suffix={<SearchIcon />} />
        <br />pull<br />
        <Input viewClass="register" suffix={<PullIcon />} />
        <Theme config={{ register: { width: 100, margin: 5 } }}>
          <br />字体色值<br />
          <Input value="色值:&quot;#333333&quot;" />
          <br />受限Input<br />
          <LimitInput onChange={onChange('limit')} />
          <br />有默认值的 受限Input<br />
          <DefaultValueInput onChange={onChange('limit')} />
        </Theme>
      </Theme>
    </div>
  );
};
export default InputDemo;
