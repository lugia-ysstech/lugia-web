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

class LimitInput extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  onChange = value => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    return <Input value={this.state.value} onChange={this.onChange} />;
  }
}

class DefaultValueInput extends React.Component<any, any> {
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
    register: {
      width: 100,
    },
  };
  const onChange = (cmpName: string) => (value: string) => {
    console.info(`${cmpName} changeTo ${value}`);
  };
  return (
    <div>
      <br />small size<br />
      <Input size={'small'} placeholder={'请填写内容'} />
      <Theme config={view}>
        <br />small size<br />
        <Input size={'small'} placeholder={'请填写内容'} disabled={true} />
        <br />default size<br />
        <Input validateStatus="success" placeholder={'请填写内容'} disabled={false} />
        <br />large size<br />
        <Input size={'large'} validateStatus="error" />
        <br />delete<br />
        <Input viewClass="register" suffix={<ClearIcon />} validateStatus="error" />
        <br />search<br />
        <Input viewClass="register" suffix={<SearchIcon />} />
        <br />pull<br />
        <Input viewClass="register" suffix={<PullIcon />} />
        <Theme config={{ register: { width: 100, margin: 5 } }}>
          <br />字体色值<br />
          <Input value="色值:'#333333'" />
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
