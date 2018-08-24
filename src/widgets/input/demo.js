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
import styled from 'styled-components';
import { fixControlledValue } from '../utils';

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
    const validateStatus = value.indexOf(',') === -1 ? 'success' : 'error';
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
    this.setState({ value });
    this.props.onChange({ newValue: value });
  };
  onBlur = (event: UIEvent) => {
    const validateStatus = this.state.value.indexOf(',') === -1 ? 'success' : 'error';
    this.setState({ validateStatus });
  };
  render() {
    const { validateType } = this.props;
    return (
      <Input
        onBlur={this.onBlur}
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
const Wrapper = styled.div`
  float: left;
  margin-left: 50px;
`;

const InputDemo = () => {
  const view = {
    [Widget.Input]: {
      width: 260,
      margin: 15,
    },
    [Widget.Tooltip]: {
      color: '#999999',
      fontColor: '#ffffff',
    },
    register: {
      width: 140,
      maigin: 10,
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
      <Wrapper>
        <Theme config={{ register: { width: 150, margin: 15 } }}>
          <p>字体色值</p>
          <Input viewClass="register" value="色值:#333333" />
          <p>default input</p>
          <Input placeholder={'请填写内容'} />
          <p>禁用状态 </p>
          <Input size={'default'} disabled={true} />
        </Theme>
      </Wrapper>
      <Theme config={view}>
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
          <Input viewClass="register" suffix={<ClearIcon />} />
          <p>search</p>
          <Input prefix={<SearchIcon />} viewClass="register" suffix={<ClearIcon />} />
          <p>pull</p>
          <Input viewClass="register" suffix={<PullIcon />} />
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
          <p>校验信息显示类型 top</p>
          <TopInput viewClass="register" validateType="top" onChange={onChange('limit')} />
          <p>校验信息显示类型 bottom</p>
          <ValidateInput viewClass="register" validateType="bottom" onChange={onChange('limit')} />
          <p>校验信息显示类型 inner</p>
          <ValidateInput viewClass="register" validateType="inner" onChange={onChange('limit')} />
        </Wrapper>
      </Theme>
    </div>
  );
};
export default InputDemo;
