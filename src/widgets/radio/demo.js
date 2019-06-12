/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import { getBorder } from '@lugia/theme-css-hoc';
import Theme from '../theme';
import Widget from '../consts';
import Radio from './';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const Wrapper = styled.div`
  margin-left: 50px;
  width: 50%;
`;
const data = [
  { text: 'radio1', value: 'Apple' },
  { text: 'radio2', value: 'Pear' },
  { text: 'radio3', value: 'Orange', disabled: true },
];
const view = {
  [Widget.RadioGroup]: {
    width: 100,
  },
  register: {
    width: 120,
    color: 'red',
    margin: 20,
  },
};
const radioView = {
  [Widget.RadioGroup]: {
    width: 100,
    color: 'red',
  },
};
const onChange = obj => {
  console.info('obj-demo', obj);
};
export class RadioDemo extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Radio]: {
        RadioWrap: {
          normal: {
            color: 'red',
            fontSize: 16,
            font: { fontWeight: 200, fontSize: 16 },
            opacity: 0.6,
            width: 100,
            height: 50,
            margin: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            },
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            },
          },
          hover: {
            opacity: 0.4,
          },
        },
        RadioEdge: {
          normal: {
            background: { backgroundColor: 'orange' },
            border: getBorder({ color: 'red', width: 2, style: 'solid' }, { radius: 100 }),
            width: 20,
            height: 20,
          },
          hover: {
            background: { backgroundColor: 'green' },
            border: getBorder({ color: 'orange', width: 2, style: 'solid' }, { radius: 100 }),
          },
          active: {
            background: { backgroundColor: 'yellow' },
            border: getBorder({ color: 'pink', width: 2, style: 'solid' }, { radius: 100 }),
            width: 26,
            height: 26,
          },
        },
        RadioChecked: {
          active: {
            background: { backgroundColor: 'red' },
            width: 18,
            height: 18,
          },
          disabled: {
            background: { backgroundColor: 'red' },
            width: 15,
            height: 15,
          },
          cancel: {
            background: { backgroundColor: 'green' },
            width: 12,
            height: 12,
          },
        },
      },
    };
    const newView = {
      [Widget.Radio]: {
        RadioWrap: {
          hover: {
            opacity: 0.4,
          },
        },
        RadioEdge: {
          disabled: {
            background: { backgroundColor: 'orange' },
            border: getBorder({ color: 'red', width: 2, style: 'solid' }, { radius: 100 }),
          },
        },
        RadioChecked: {
          disabled: {
            background: { backgroundColor: 'red' },
            width: 8,
            height: 8,
          },
          cancel: {
            background: { backgroundColor: 'green' },
            width: 12,
            height: 12,
          },
        },
      },
    };
    return (
      <div>
        <Wrapper>
          <p>theme normal margin padding</p>
          <Theme config={view}>
            <Radio value="1">Radio</Radio>
          </Theme>
        </Wrapper>
        <Wrapper>
          <p>theme checked cancel</p>
          <Theme config={view}>
            <Radio value="1" checked cancel>
              Radio
            </Radio>
          </Theme>
        </Wrapper>
        <Wrapper>
          <p>theme checked disabled</p>
          <Theme config={newView}>
            <Radio value="1" checked disabled>
              Radio
            </Radio>
          </Theme>
        </Wrapper>
        <Wrapper>
          <p>theme disabled</p>
          <Theme config={newView}>
            <Radio value="1" disabled>
              Radio
            </Radio>
          </Theme>
        </Wrapper>
        <Wrapper>
          <p>theme cancel</p>
          <Theme config={newView}>
            <Radio value="1" checked cancel>
              Radio
            </Radio>
          </Theme>
        </Wrapper>
        <Wrapper>
          <p>checked</p>
          <Radio checked>Radio</Radio>
        </Wrapper>
        <Wrapper>
          <p>defaultChecked</p>
          <Radio defaultChecked>Radio</Radio>
        </Wrapper>
        <Wrapper>
          <p>normal</p>
          <Radio>Radio</Radio>
        </Wrapper>
        <Wrapper>
          <p>disabled</p>
          <Radio value="1" disabled>
            Radio
          </Radio>
          <Radio value="1" checked disabled>
            Radio
          </Radio>
        </Wrapper>
        <Wrapper>
          <p>cancel</p>
          <Radio defaultChecked cancel>
            Radio
          </Radio>
        </Wrapper>
        <Wrapper>
          <p>style default</p>
          <Radio value="1">Radio</Radio>
          <Radio value="2">Radio</Radio>
          <p>style vertical</p>
          <Radio value="1" checked styles="vertical">
            Radio
          </Radio>
          <Radio value="1" styles="vertical">
            Radio
          </Radio>
        </Wrapper>
      </div>
    );
  }
}
export class RadioGroupDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      value: 'apple',
      displayValue: 'hello',
    };
  }
  handleChange = (obj: Object) => {
    this.setState({
      value: obj.newValue,
      displayValue: obj.newDisplayValue,
    });
  };
  render() {
    return (
      <div>
        <Wrapper>
          <p>RadioGroup 正常</p>
          <RadioGroup defaultValue="1">
            <Radio value="1">Radio</Radio>
            <Radio value="2">Radio2</Radio>
          </RadioGroup>
          <p>RadioGroup</p>
          <RadioGroup value="1">
            <Radio value="1">Radio</Radio>
            <Radio value="2">Radio2</Radio>
          </RadioGroup>
          <p>vertical</p>
          <RadioGroup defaultValue="1">
            <Radio value="1" styles="vertical">
              Radio
            </Radio>
            <Radio value="2" styles="vertical">
              Radio
            </Radio>
          </RadioGroup>
          <p>data</p>
          <RadioGroup displayFiled="text" defaultValue="Apple" data={data} />
          <p>styled vertical</p>
          <RadioGroup
            onChange={onChange}
            styles="vertical"
            displayFiled="text"
            valueField="value"
            defaultValue="Apple"
            data={data}
          />
        </Wrapper>
        <Wrapper>
          <p>themes</p>
          <Theme config={view}>
            <RadioGroup defaultValue="1" onChange={onChange}>
              <Radio viewClass="register" value="1" styles="vertical">
                Radio
              </Radio>

              <Radio viewClass="register" value="2" styles="vertical">
                Radio
              </Radio>
            </RadioGroup>
          </Theme>
          <p>data theme</p>
          <Theme config={view}>
            <RadioGroup defaultValue="Apple" valueField="value" data={data} />
          </Theme>
        </Wrapper>

        <Wrapper>
          <p>data displayValue</p>
          <RadioGroup
            onChange={onChange}
            displayFiled="text"
            valueField="value"
            value="apples"
            styles="vertical"
            displayValue="DisplayValue"
            data={data}
          />
        </Wrapper>
        <Wrapper>
          <p>data displayValue</p>
          <RadioGroup
            onChange={onChange}
            displayFiled="text"
            valueField="value"
            defaultValue="apples"
            styles="vertical"
            displayValue="DisplayValue"
            data={data}
          />
        </Wrapper>

        <Wrapper>
          <RadioGroup childType="button" onChange={onChange} defaultValue="1">
            <RadioButton value="1">CheckBox1</RadioButton>
            <RadioButton value="2">CheckBox2</RadioButton>
            <RadioButton value="3">CheckBox3</RadioButton>
          </RadioGroup>
        </Wrapper>
        <br />
        <Wrapper>
          <Theme config={radioView}>
            <RadioGroup childType="button" onChange={onChange} defaultValue="1">
              <RadioButton value="1">CheckBox1</RadioButton>
              <RadioButton value="2">CheckBox2</RadioButton>
              <RadioButton value="3">CheckBox3</RadioButton>
            </RadioGroup>
          </Theme>
        </Wrapper>
        <br />
        <Wrapper>
          <RadioGroup
            onChange={onChange}
            data={data}
            defaultValue="apple"
            displayValue="check"
            childType="button"
          />
        </Wrapper>
        <br />
        <Wrapper>
          <RadioGroup
            onChange={this.handleChange}
            data={data}
            value={this.state.value}
            displayValue={this.state.displayValue}
            childType="button"
          />
        </Wrapper>
      </div>
    );
  }
}
