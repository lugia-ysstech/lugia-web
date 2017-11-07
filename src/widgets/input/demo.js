/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme';
import Input from './';
import * as Widget from '../consts/Widget';

class LimitInput extends React.Component<any, any> {
  constructor (props) {
    super(props);
    this.state = { value: props.value, };
  }

  onChange = value => {
    this.setState({ value, });
    this.props.onChange(value);
  };

  render () {
    return <Input value={this.state.value} onChange={this.onChange}/>;
  }
}

class DefaultValueInput extends React.Component<any, any> {

  render () {
    return <Input defaultValue="hello world" onChange={this.props.onChange}/>;
  }
}

const InputDemo = () => {
  const view = {
    [Widget.Input]: {
      width: 20,
    },
    register: {
      width: 30,
    },
  };
  const onChange = (cmpName: string) => (value: string) => {
    console.info(`${cmpName} changeTo ${value}`);
  };
  return <Theme config={view}>
    <Input/>
    <Input viewClass="register"/>
    <Theme config={{ register: { width: 40, }, }}>
      <Input viewClass="register"/>
      <LimitInput onChange={onChange('limit')}/>
      <DefaultValueInput onChange={onChange('limit')}/>
    </Theme>
  </Theme>;
};
export default InputDemo;
