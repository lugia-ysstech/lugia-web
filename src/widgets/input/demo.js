/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Input from './index';
import Widget from '../consts/index';
import ClearIcon from '../icon/ClearIcon';
import SearchIcon from '../icon/SearchIcon';
import PullIcon from '../icon/PullIcon';
import styled from 'styled-components';
import { fixControlledValue } from '../utils';
import Theme from '../theme';
const Textarea = Input.Textarea;

export class LimitInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: props.value };
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };

  render() {
    return <Input value={this.state.value} onChange={this.onChange} />;
  }
}
export class LimitTextarea extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: props.value };
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };

  render() {
    return <Textarea value={this.state.value} onChange={this.onChange} />;
  }
}
export class ValidateInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps: Object, preState: Object) {
    let { value } = nextProps;
    const hasValueInprops = 'value' in nextProps;
    value = fixControlledValue(value);
    if (!preState) {
      return {
        value: hasValueInprops ? value : '',
      };
    }
    if (hasValueInprops) {
      return { value };
    }
  }
  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };

  render() {
    const { validateType } = this.props;
    const value = this.state.value;
    const validateStatus = value.indexOf('a') === -1 ? 'success' : 'error';

    return (
      <Input onChange={this.onChange} validateType={validateType} validateStatus={validateStatus} />
    );
  }
}
export class TopInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps: Object, preState: Object) {
    let { value } = nextProps;
    const hasValueInprops = 'value' in nextProps;
    value = fixControlledValue(value);
    if (!preState) {
      return {
        value: hasValueInprops ? value : '',
        validateStatus: 'success',
      };
    }
    if (hasValueInprops) {
      return { value };
    }
  }
  onChange = (param: any) => {
    const { newValue: value } = param;
    this.props.onChange({ newValue: value });
    const validateStatus = value.indexOf('a') === -1 ? 'success' : 'error';
    this.setState({ value, validateStatus });
  };
  render() {
    const { validateType } = this.props;
    const topConfig = {
      [Widget.Input]: {
        validateTopTip: {
          Container: {
            normal: {
              background: { color: 'gray' },
            },
          },
          TooltipTitle: {
            normal: { color: 'red' },
          },
        },
      },
    };

    return (
      <Theme config={topConfig}>
        <Input
          onChange={this.onChange}
          validateType={validateType}
          validateStatus={this.state.validateStatus}
        />
      </Theme>
    );
  }
}

export class DefaultValueInput extends React.Component<any, any> {
  render() {
    return <Input defaultValue="hello world" onChange={this.props.onChange} />;
  }
}
export class DefaultValueTextarea extends React.Component<any, any> {
  render() {
    return <Textarea defaultValue="hello world" onChange={this.props.onChange} />;
  }
}
const Wrapper = styled.div`
  float: left;
  margin-left: 50px;
  margin-top: 20px;
`;

const InputDemo = () => {
  const register = {
    [Widget.Input]: {
      Container: { normal: { width: 500, height: 40 } },
      Input: { normal: { width: 300, height: 40 }, disabled: { background: { color: 'gray' } } },
      Placeholder: {
        normal: { font: { color: 'red', weight: 900, size: 16 }, color: 'blue', fontSize: 20 },
      },
      InputSuffix: { normal: { color: 'red', fontSize: 12 } },
      InputPrefix: { normal: { color: 'pink', fontSize: 16 } },
      ClearButton: { normal: { color: 'red', fontSize: 14 } },
    },
  };
  const textarea = {
    [Widget.Textarea]: {
      Container: { normal: { width: 500, height: 40 } },
      Textarea: { normal: { width: 300, height: 40 }, disabled: { background: { color: 'gray' } } },
      Placeholder: {
        normal: { font: { color: 'red', weight: 900, size: 16 }, color: 'blue', fontSize: 20 },
      },
      ClearButton: { normal: { color: 'red', fontSize: 14 } },
    },
  };
  const onChange = (cmpName: string) => (value: any) => {};
  const formatter = value => {
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const parser = value => {
    return value.replace(/\$\s?|(,*)/g, '');
  };
  return (
    <div>
      <Theme config={register}>
        <Wrapper>
          <p>字体色值</p>
          <Input value="色值:#333333" />
          <p>default input</p>
          <Input placeholder={'请填写内容'} />
          <p>autoFocus</p>
          <Input placeholder={'请填写内容'} autoFoucs />
          <p>isShowClearButton : false</p>
          <Input isShowClearButton={false} />
          <p>禁用状态 </p>
          <Input theme={register} size={'default'} disabled={true} />
        </Wrapper>
      </Theme>
      <Wrapper>
        <p>small size</p>
        <Input size={'small'} placeholder={'small Input'} />
        <p>default size</p>
        <Input placeholder={'default Input'} />
        <p>large size</p>
        <Input size={'large'} placeholder={'large Input'} />
      </Wrapper>
      <Wrapper>
        <p>delete</p>
        <Input suffix={<ClearIcon />} />
        <p>search</p>
        <Input prefix={<SearchIcon />} theme={register} suffix={<ClearIcon />} />
        <p>pull</p>
        <Input suffix={<PullIcon />} />
      </Wrapper>
      <Wrapper>
        <p>受限Input</p>
        <LimitInput onChange={onChange('limit')} />
        <p>有默认值的 受限Input</p>
        <DefaultValueInput onChange={onChange('limit')} />
        <p>formatter input</p>
        <Input placeholder={'请填写金额'} formatter={formatter} parser={parser} />
      </Wrapper>
      <Wrapper>
        <p>校验信息显示类型 top 输入值 是否含有a</p>
        <TopInput validateType="top" onChange={onChange('limit')} />
        <p>校验信息显示类型 bottom 输入值 是否含有a</p>
        <ValidateInput validateType="bottom" onChange={onChange('limit')} />
        <p>校验信息显示类型 inner 输入值 是否含有a </p>
        <ValidateInput validateType="inner" onChange={onChange('limit')} />
      </Wrapper>

      <Theme config={textarea}>
        <Wrapper>
          <p>段落文本输入框</p>
          <Textarea value="我是受限内容" />
          <p>段落文本输入框 提示信息 placeholder</p>
          <Textarea placeholder={'请填写内容'} />
          <p>段落文本输入框 autoFocus</p>
          <Textarea placeholder={'请填写内容'} autoFoucs />
          <p>段落文本输入框 禁用状态 </p>
          <Textarea disabled={true} />
        </Wrapper>
      </Theme>
      <Wrapper>
        <p>受限 段落文本输入框 </p>
        <LimitTextarea onChange={onChange('limit')} />
        <p>有默认值的 受限段落文本输入框</p>
        <DefaultValueTextarea onChange={onChange('limit')} />
      </Wrapper>
    </div>
  );
};
export default InputDemo;
