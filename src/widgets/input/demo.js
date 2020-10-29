/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Input from './index';
import Widget from '../consts/index';
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
  state = { value: '' };
  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };

  render() {
    const { validateType } = this.props;
    const value = this.state.value;
    const validateStatus = value.indexOf('a') !== -1 ? 'error' : 'default';

    return (
      <Input
        value={value}
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}
export class TopInput extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: Object, preState: Object) {
    const { value } = nextProps;
    if (!preState) {
      return {
        value,
        validateStatus: 'default',
      };
    }
  }
  onChange = (param: any) => {
    const { newValue: value } = param;
    this.props.onChange({ newValue: value });
    const validateStatus = value.indexOf('a') === -1 ? 'default' : 'error';
    this.setState({ value, validateStatus });
  };
  render() {
    const { validateType } = this.props;
    const { value } = this.state;
    return (
      <Input
        size={'small'}
        value={value}
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={this.state.validateStatus}
      />
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
export class ValidateTextarea extends React.Component<any, any> {
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
    const validateStatus = value.indexOf('a') === -1 ? 'default' : 'error';

    return (
      <Textarea
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={validateStatus}
      />
    );
  }
}
export class TopTextarea extends React.Component<any, any> {
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
        validateStatus: 'default',
      };
    }
    if (hasValueInprops) {
      return { value };
    }
  }
  onChange = (param: any) => {
    const { newValue: value } = param;
    this.props.onChange({ newValue: value });
    const validateStatus = value.indexOf('a') === -1 ? 'default' : 'error';
    this.setState({ value, validateStatus });
  };
  render() {
    const { validateType } = this.props;
    return (
      <Textarea
        onChange={this.onChange}
        validateType={validateType}
        validateStatus={this.state.validateStatus}
      />
    );
  }
}

const Wrapper = styled.div`
  margin-left: 50px;
  margin-top: 20px;
`;

const InputDemo = () => {
  const register = {
    [Widget.Input]: {
      InputPrefix: { normal: { fontSize: 14 } },
      InputSuffix: { normal: { fontSize: 14 } },
    },
  };
  const innerValidateConfig = {
    [Widget.Input]: {
      ValidateErrorText: {
        normal: {
          margin: {
            right: 20,
          },
        },
      },
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
          <p>默认 Input</p>
          <Input />
          <p>placeholder input</p>
          <Input placeholder={'请填写内容'} />
          <p>autoFocus</p>
          <Input placeholder={'请填写内容'} autoFoucs />
          <p>isShowClearButton : false</p>
          <Input isShowClearButton={false} />
          <p>禁用状态 </p>
          <Input size={'default'} disabled={true} />
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
        <Input suffix={<SearchIcon />} />
        <p>search</p>
        <Input prefix={<SearchIcon />} />
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
        <p>主动聚焦的 input</p>
        <button
          onClick={() => {
            this.inputFocus();
          }}
        >
          点击主动聚焦
        </button>
        <Input
          getFocus={focus => {
            this.inputFocus = focus;
          }}
        />
      </Wrapper>
      <Wrapper>
        <p>校验信息显示类型 top 输入值 是否含有a</p>
        <TopInput validateType="top" onChange={onChange('limit')} />
        <p>校验信息显示类型 bottom 输入值 是否含有a</p>
        <ValidateInput validateType="bottom" onChange={onChange('limit')} />
        <p>校验信息显示类型 inner 输入值 是否含有a </p>
        <ValidateInput validateType="inner" onChange={onChange('limit')} />
        <p>校验信息显示类型 top 输入值 受限校验</p>
        <Input validateType="top" validateStatus="error" />
        <p>校验信息显示类型 bottom 输入值 受限校验</p>
        <Input validateType="bottom" validateStatus="error" />
        <p>校验信息显示类型 inner 输入值 受限校验 </p>
        <Input validateType="inner" validateStatus="error" />
        <p>校验信息显示类型 inner 展示提示信息 配置margin</p>
        <Input theme={innerValidateConfig} validateType="inner" validateStatus="error" />
      </Wrapper>
      <Wrapper>
        <p>段落文本输入框 resizeType="horizontal" </p>
        <Textarea resizeType={'horizontal'} />
        <p>段落文本输入框 resizeType="vertical" </p>
        <Textarea resizeType={'vertical'} />
        <p>段落文本输入框 resizeType="none" </p>
        <Textarea resizeType={'none'} />
      </Wrapper>
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
      <Wrapper>
        <p>受限 段落文本输入框 </p>
        <LimitTextarea onChange={onChange('limit')} />
        <p>有默认值的 受限段落文本输入框</p>
        <DefaultValueTextarea onChange={onChange('limit')} />
        <p>主动聚焦的 段落文本输入框</p>
        <button
          onClick={() => {
            this.textareaFocus();
          }}
        >
          点击主动聚焦
        </button>
        <Textarea
          getFocus={focus => {
            this.textareaFocus = focus;
          }}
        />
        <br /> <br />
        <p>验证textArea 100%没生效问题</p>
        <Theme
          config={{
            [Widget.Textarea]: {
              Container: { normal: { width: '100%', height: 100 } },
            },
          }}
        >
          <Textarea placeholder={'请填写内容'} />
        </Theme>
      </Wrapper>
      <Wrapper>
        <p>校验信息显示类型 top 输入值 是否含有a</p>
        <TopTextarea validateType="top" onChange={onChange('limit')} />
        <p>校验信息显示类型 bottom 输入值 是否含有a</p>
        <ValidateTextarea validateType="bottom" onChange={onChange('limit')} />
        <p>校验信息显示类型 inner 输入值 是否含有a </p>
        <ValidateTextarea validateType="inner" onChange={onChange('limit')} />
        <p>校验信息显示类型 top 输入值 受限校验</p>
        <Textarea validateType="top" validateStatus="error" />
        <p>校验信息显示类型 bottom 输入值 受限校验</p>
        <Textarea validateType="bottom" validateStatus="error" />
        <p>校验信息显示类型 inner 输入值 受限校验 </p>
        <Textarea validateType="inner" validateStatus="error" />
      </Wrapper>
    </div>
  );
};
export default InputDemo;
