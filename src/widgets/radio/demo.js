/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import { getBorder, getBoxShadow } from '@lugia/theme-utils';
import Theme from '../theme';
import Widget from '../consts';
import Radio from './';
import { getBorderRadius } from '../theme/CSSProvider';

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
const data2 = [
  { text: 'radio1', value: 'Apple', disabled: true },
  { text: 'radio2', value: 'Pear' },
  { text: 'radio3', value: 'Orange' },
];
const onChange = obj => {
  console.info('obj-demo', obj);
};
export class RadioDemo extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Radio]: {
        Container: {
          normal: {
            // opacity: 0.6,
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
          // hover: {
          //   opacity: 0.4,
          // },
        },
        RadioText: {
          normal: {
            color: 'red',
            font: { fontSize: 16 },
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            },
          },
          hover: {
            normal: {
              color: 'green',
            },
          },
        },
        RadioEdgeChecked: {
          normal: {
            background: { color: 'orange' },
            border: getBorder({ color: 'red', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(100),
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
            width: 40,
            height: 40,
          },
          // hover: {
          //   background: { color: 'green' },
          //   border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
          //   borderRadius: getBorderRadius(100),
          // },
          disabled: {
            background: { color: '#ccc' },
            borderRadius: getBorderRadius(100),
            border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
          },
        },
        RadioEdgeCancel: {
          normal: {
            background: { color: 'orange' },
            border: getBorder({ color: 'red', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(100),
            width: 20,
            height: 20,
          },
          // hover: {
          //   background: { color: 'green' },
          //   borderRadius: getBorderRadius(100),
          //   border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
          // },
        },
        RadioEdgeUnChecked: {
          normal: {
            background: { color: 'yellow' },
            borderRadius: getBorderRadius(100),
            border: getBorder({ color: 'green', width: 2, style: 'solid' }),
            width: 20,
            height: 20,
          },
          hover: {
            borderRadius: getBorderRadius(100),
            background: { color: 'pink' },
            border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
          },
          disabled: {
            borderRadius: getBorderRadius(100),
            background: { color: 'yellow' },
            border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
          },
        },
        RadioInnerChecked: {
          normal: {
            background: { color: 'green' },
            width: 20,
            height: 20,
          },
          disabled: {
            background: { color: 'red' },
          },
          // hover: {
          //   background: { color: 'blue' },
          // },
        },
        RadioInnerCancel: {
          normal: {
            background: { color: 'green' },
            width: 8,
            height: 8,
          },
          // hover: {
          //   background: { color: 'blue' },
          // },
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
          <p>theme disabled</p>
          <Theme config={view}>
            <Radio value="1" disabled>
              Radio
            </Radio>
          </Theme>
        </Wrapper>
        <Wrapper>
          <p>theme checked</p>
          <Theme config={view}>
            <Radio value="1" checked>
              Radio
            </Radio>
          </Theme>
        </Wrapper>
        <Wrapper>
          <p>theme checked disabled</p>
          <Theme config={view}>
            <Radio value="1" checked disabled>
              Radio
            </Radio>
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
    const radioView = {
      [Widget.RadioGroup]: {
        Radio: {
          Container: {
            normal: {
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
          RadioText: {
            normal: {
              color: 'red',
              font: { fontSize: 16 },
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              },
            },
            hover: {
              normal: {
                color: 'green',
              },
            },
          },
          RadioEdgeChecked: {
            normal: {
              background: { color: 'orange' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'red', width: 2, style: 'solid' }),
              width: 20,
              height: 20,
            },
            hover: {
              background: { color: 'green' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
            },
            disabled: {
              background: { color: '#ccc' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
            },
          },
          RadioEdgeUnChecked: {
            normal: {
              background: { color: 'yellow' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'green', width: 2, style: 'solid' }),
              width: 20,
              height: 20,
            },
            hover: {
              background: { color: 'pink' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
            },
            disabled: {
              background: { color: 'yellow' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
            },
          },
          RadioInnerChecked: {
            normal: {
              background: { color: 'green' },
              width: 12,
              height: 12,
            },
            disabled: {
              background: { color: 'red' },
            },
            hover: {
              background: { color: 'blue' },
            },
            cancel: {
              background: { color: 'black' },
            },
          },
        },
      },
    };
    const view = {
      [Widget.RadioGroup]: {
        Container: {
          normal: {
            width: 500,
            height: 200,
            opacity: 1,
            border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(4),
            background: { color: '#ccc' },
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            },
            margin: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            },
          },
        },
        Radio: {
          Container: {
            normal: {
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
          RadioText: {
            normal: {
              color: 'red',
              font: { fontSize: 16 },
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              },
            },
            hover: {
              normal: {
                color: 'green',
              },
            },
          },
          RadioEdgeChecked: {
            normal: {
              background: { color: 'orange' },
              border: getBorder({ color: 'red', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(100),
              width: 20,
              height: 20,
            },
            hover: {
              background: { color: 'green' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
            },
            disabled: {
              background: { color: '#ccc' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
            },
          },
          RadioEdgeCancel: {
            normal: {
              background: { color: 'orange' },
              border: getBorder({ color: 'red', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(100),
              width: 20,
              height: 20,
            },
            hover: {
              background: { color: 'green' },
              border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(100),
            },
          },
          RadioEdgeUnChecked: {
            normal: {
              background: { color: 'yellow' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'green', width: 2, style: 'solid' }),
              width: 20,
              height: 20,
            },
            hover: {
              background: { color: 'pink' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
            },
            disabled: {
              background: { color: 'yellow' },
              borderRadius: getBorderRadius(100),
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
            },
          },
          RadioInnerChecked: {
            normal: {
              background: { color: 'green' },
              width: 12,
              height: 12,
            },
            disabled: {
              background: { color: 'red' },
            },
            hover: {
              background: { color: 'blue' },
            },
          },
          RadioInnerCancel: {
            normal: {
              background: { color: 'green' },
              width: 8,
              height: 8,
            },
            hover: {
              background: { color: 'blue' },
            },
          },
        },
        CheckButton: {
          CheckButtonChecked: {
            normal: {
              width: 100,
              height: 50,
              opacity: 1,
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(4),
              background: { color: 'yellow' },
              color: 'red',
              font: { fontSize: 16, fontWeight: 500 },
              padding: { top: 10, bottom: 10, left: 10, right: 10 },
            },
            hover: {
              background: { color: 'yellow' },
              opacity: 0.6,
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(4),
              color: 'green',
            },
            disabled: {
              background: { color: 'orange' },
              opacity: 0.6,
              border: getBorder({ color: 'red', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(4),
              color: 'green',
            },
          },
          CheckButtonCancel: {
            normal: {
              width: 100,
              height: 50,
              opacity: 1,
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(4),
              background: { color: 'yellow' },
              color: 'green',
              font: { fontSize: 16, fontWeight: 500 },
              padding: { top: 10, bottom: 10, left: 10, right: 10 },
            },
            hover: {
              background: { color: 'green' },
              opacity: 0.6,
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(4),
              color: 'yellow',
            },
          },
          CheckButtonUnChecked: {
            normal: {
              width: 100,
              height: 50,
              opacity: 1,
              border: getBorder({ color: 'green', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(4),
              background: { color: '#33f340' },
              color: 'red',
              font: { fontSize: 16, fontWeight: 500 },
              padding: { top: 10, bottom: 10, left: 10, right: 10 },
            },
            hover: {
              background: { color: 'yellow' },
              opacity: 0.6,
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(4),
              color: 'green',
            },
            disabled: {
              background: { color: 'orange' },
              opacity: 0.6,
              border: getBorder({ color: 'red', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(4),
              color: 'yellow',
            },
          },
        },
      },
    };
    return (
      <div>
        <p>RadioGroup Theme</p>
        <Theme config={radioView}>
          <RadioGroup defaultValue="1">
            <Radio value="1">Radio</Radio>
            <Radio value="2">Radio2</Radio>
            <Radio value="3" disabled>
              Radio3
            </Radio>
          </RadioGroup>
        </Theme>
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
          <Theme config={radioView}>
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
          <Theme config={view}>
            <RadioGroup childType="button" onChange={onChange} defaultValue="1">
              <RadioButton value="1">CheckBox1</RadioButton>
              <RadioButton value="2" disabled>
                CheckBox2
              </RadioButton>
              <RadioButton value="3">CheckBox3</RadioButton>
            </RadioGroup>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={view}>
            <RadioGroup childType="button" onChange={onChange} defaultValue="1">
              <RadioButton value="1" disabled>
                CheckBox1
              </RadioButton>
              <RadioButton value="2">CheckBox2</RadioButton>
              <RadioButton value="3">CheckBox3</RadioButton>
            </RadioGroup>
          </Theme>
        </Wrapper>
        <Wrapper>
          <RadioGroup childType="button" onChange={onChange} defaultValue="1">
            <RadioButton value="1" disabled>
              CheckBox1
            </RadioButton>
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
        <br />
        <Wrapper>
          <p>theme cancel</p>
          <Theme config={view}>
            <RadioGroup
              onChange={this.handleChange}
              data={data}
              value={this.state.value}
              displayValue={this.state.displayValue}
              childType="button"
            />
          </Theme>
        </Wrapper>
        <Wrapper>
          <p>theme checked</p>
          <Theme config={view}>
            <RadioGroup
              onChange={this.handleChange}
              data={data2}
              defaultValue={'Apple'}
              childType="button"
            />
          </Theme>
        </Wrapper>
      </div>
    );
  }
}
