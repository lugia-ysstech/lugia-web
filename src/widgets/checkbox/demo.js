/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import Theme from '../theme';
import Widget from '../consts';
import CheckBox from './';
import { getBorder, getBoxShadow } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';

const CheckBoxGroup = CheckBox.Group;
const CheckBoxButton = CheckBox.Button;
const Wrapper = styled.div`
  margin: 20px;
`;
const defaultValue = ['1', '2'];
const options = [
  { label: 'check1', value: '11', name: '1' },
  { label: 'check2', value: '22', name: '2' },
  { label: 'check3', value: '33', name: '3' },
];
const options2 = [
  { label: 'check1', value: '11', name: '1', disabled: true },
  { label: 'check2', value: '22', name: '2' },
  { label: 'check3', value: '33', name: '3' },
];
const handleChange = obj => {
  console.info(obj);
};
const view = {
  [Widget.Checkbox]: {
    color: 'red',
  },
  [Widget.CheckboxGroup]: {
    color: 'red',
    width: 100,
  },
  register: {
    width: 120,
    color: 'red',
    margin: 20,
  },
};
export class CheckboxDemo extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Checkbox]: {
        Container: {
          normal: {
            opacity: 1,
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
            opacity: 0.6,
          },
          disabled: {
            opacity: 0.4,
          },
          active: {
            opacity: 1,
          },
        },
        CheckboxText: {
          normal: {
            color: 'red',
            font: { fontSize: 16, fontWeight: 500 },
          },
          hover: { color: 'green', font: { fontSize: 16, fontWeight: 500 } },
          disabled: { color: 'yellow', font: { fontSize: 16, fontWeight: 500 } },
        },
        CheckboxEdgeChecked: {
          normal: {
            width: 40,
            height: 40,
            background: { color: '#56c22d' },
            border: getBorder({ color: 'yellow', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(2),
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
          },
          hover: {
            background: { color: 'red' },
            border: getBorder({ color: 'yellow', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(2),
          },
          disabled: {
            background: { color: 'red' },
            border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(2),
          },
        },
        CheckboxEdgeUnChecked: {
          normal: {
            width: 40,
            height: 40,
            background: { color: 'yellow' },
            border: getBorder({ color: '#56c22d', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(2),
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
          },
          hover: {
            background: { color: '#56c22d' },
            border: getBorder({ color: 'yellow', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(2),
          },
          disabled: {
            background: { color: 'orange' },
            border: getBorder({ color: 'red', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(2),
          },
        },
        CheckboxEdgeIndeterminate: {
          normal: {
            width: 40,
            height: 40,
            background: { color: 'yellow' },
            border: getBorder({ color: '#56c22d', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(2),
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
          },
          hover: {
            background: { color: '#56c22d' },
            borderRadius: getBorderRadius(2),
            border: getBorder({ color: 'yellow', width: 2, style: 'solid' }),
          },
          disabled: {
            background: { color: 'orange' },
            border: getBorder({ color: 'red', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(2),
          },
        },
        CheckboxEdgeCancel: {
          normal: {
            background: { color: 'pink' },
            borderRadius: getBorderRadius(2),
            border: getBorder({ color: '#56c22d', width: 2, style: 'solid' }),
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
          },
        },
        CheckboxInnerChecked: {
          normal: {
            color: 'red',
            width: 10,
            height: 20,
          },
          hover: { color: 'yellow' },
          disabled: {
            color: 'orange',
          },
        },
        CheckboxInnerIndeterminate: {
          normal: {
            color: 'red',
          },
          hover: { color: 'yellow' },
          disabled: {
            color: 'orange',
          },
        },
        CheckboxInnerCancel: {
          normal: {
            color: 'yellow',
          },
        },
      },
    };
    return (
      <div>
        <Wrapper>
          <Theme config={view}>
            <CheckBox>CheckBox</CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={view}>
            <CheckBox disabled>CheckBox</CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={view}>
            <CheckBox checked>CheckBox</CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={view}>
            <CheckBox checked disabled>
              CheckBox
            </CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={view}>
            <CheckBox indeterminate checked>
              CheckBox
            </CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={view}>
            <CheckBox indeterminate>CheckBox</CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={view}>
            <CheckBox cancel>CheckBox</CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <CheckBox>CheckBox</CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox disabled>CheckBox</CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox checked>CheckBox</CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox checked disabled>
            CheckBox
          </CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox indeterminate>CheckBox</CheckBox>
        </Wrapper>

        <Wrapper>
          <Theme config={view}>
            <CheckBox cancel checked handleCancelItemClick={() => {}}>
              CheckBox
            </CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <CheckBox cancel checked handleCancelItemClick={() => {}}>
            CheckBox
          </CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox defaultChecked>CheckBox</CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox defaultChecked disabled>
            CheckBox
          </CheckBox>
        </Wrapper>
        <Wrapper>
          <p>checkbox子元素为非字符串时，title不显示</p>
          <CheckBox>
            <div>CheckBox</div>
          </CheckBox>
        </Wrapper>
        <Wrapper>
          <p>checkbox内容很多时，自动换行。</p>
          <CheckBox>
            checkbox子元素为非字符串时，title不显示,checkbox子元素为非字符串时，title不显示,checkbox子元素为非字符串时
            ，title不显示checkbox子元素为非字符串时，title不显示checkbox子元素为非字符串时，title不显示checkbox子元素为非字符串时，title不显示
          </CheckBox>
        </Wrapper>
      </div>
    );
  }
}
export const CheckboxGroupDemo = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      newValue: ['11', '44'],
      newDisplayValue: ['check4', 'check5'],
    };
  }

  handleChange = ({ newValue, newDisplayValue }: any): any => {
    console.info(newValue, newDisplayValue);
    this.setState({ newValue, newDisplayValue });
  };

  render() {
    const checkboxView = {
      [Widget.CheckboxGroup]: {
        Container: {
          normal: {
            width: 400,
            height: 500,
            opacity: 1,
            border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(4),
            background: { color: 'orange' },
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
        Checkbox: {
          Container: {
            normal: {
              opacity: 1,
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
              opacity: 0.6,
            },
            disabled: {
              opacity: 0.4,
            },
            active: {
              opacity: 1,
            },
          },
          CheckboxText: {
            normal: {
              color: 'red',
              font: { fontSize: 16, fontWeight: 500 },
            },
            hover: { color: 'green', font: { fontSize: 16, fontWeight: 500 } },
            disabled: { color: 'yellow', font: { fontSize: 16, fontWeight: 500 } },
          },
          CheckboxEdgeChecked: {
            normal: {
              background: { color: '#56c22d' },
              border: getBorder({ color: 'yellow', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(2),
            },
            hover: {
              background: { color: 'red' },
              border: getBorder({ color: 'yellow', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(2),
            },
            disabled: {
              background: { color: 'red' },
              border: getBorder({ color: 'orange', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(2),
            },
          },
          CheckboxEdgeUnChecked: {
            normal: {
              background: { color: 'yellow' },
              borderRadius: getBorderRadius(2),
              border: getBorder({ color: '#56c22d', width: 2, style: 'solid' }),
            },
            hover: {
              background: { color: '#56c22d' },
              borderRadius: getBorderRadius(2),
              border: getBorder({ color: 'yellow', width: 2, style: 'solid' }),
            },
            disabled: {
              background: { color: 'orange' },
              borderRadius: getBorderRadius(2),
              border: getBorder({ color: 'red', width: 2, style: 'solid' }),
            },
          },
          CheckboxEdgeIndeterminate: {
            normal: {
              background: { color: 'yellow' },
              borderRadius: getBorderRadius(2),
              border: getBorder({ color: '#56c22d', width: 2, style: 'solid' }),
            },
            hover: {
              background: { color: '#56c22d' },
              borderRadius: getBorderRadius(2),
              border: getBorder({ color: 'yellow', width: 2, style: 'solid' }),
            },
            disabled: {
              background: { color: 'orange' },
              border: getBorder({ color: 'red', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(2),
            },
          },
          CheckboxEdgeCancel: {
            normal: {
              background: { color: 'pink' },
              border: getBorder({ color: '#56c22d', width: 2, style: 'solid' }),
              borderRadius: getBorderRadius(2),
            },
          },
          CheckboxInnerChecked: {
            normal: {
              color: 'red',
            },
            hover: { color: 'yellow' },
            disabled: {
              color: 'orange',
            },
          },
          CheckboxInnerIndeterminate: {
            normal: {
              color: 'red',
            },
            hover: { color: 'yellow' },
            disabled: {
              color: 'orange',
            },
          },
          CheckboxInnerCancel: {
            normal: {
              color: 'yellow',
            },
          },
        },
      },
    };
    const checkbuttonView = {
      [Widget.CheckboxGroup]: {
        Container: {},
        CheckButton: {
          CheckButtonChecked: {
            normal: {
              width: 100,
              height: 50,
              opacity: 1,
              border: {
                top: { color: 'pink', width: 1, style: 'solid' },
                right: { color: '#fff', width: 1, style: 'solid' },
                bottom: { color: 'pink', width: 1, style: 'solid' },
              },
              last: {
                border: {
                  top: { color: 'pink', width: 1, style: 'solid' },
                  right: { color: 'pink', width: 1, style: 'solid' },
                  bottom: { color: 'pink', width: 1, style: 'solid' },
                },
              },
              first: {
                border: {
                  top: { color: 'pink', width: 1, style: 'solid' },
                  bottom: { color: 'pink', width: 1, style: 'solid' },
                  left: { color: 'pink', width: 1, style: 'solid' },
                },
              },
              background: { color: 'yellow' },
              color: 'red',
              font: { fontSize: 16, fontWeight: 500 },
              padding: { top: 10, bottom: 10, left: 10, right: 10 },
            },
            hover: {
              background: { color: 'yellow' },
              opacity: 0.6,
              border: {
                top: { color: 'pink', width: 1, style: 'solid' },
                right: { color: '#fff', width: 1, style: 'solid' },
                bottom: { color: 'pink', width: 1, style: 'solid' },
              },
              color: 'green',
            },
            disabled: {
              background: { color: 'orange' },
              opacity: 0.6,
              border: {
                top: { color: 'red', width: 1, style: 'solid' },
                right: { color: '#fff', width: 1, style: 'solid' },
                bottom: { color: 'red', width: 1, style: 'solid' },
              },
              color: 'green',
            },
          },
          CheckButtonCancel: {
            normal: {
              width: 100,
              height: 50,
              opacity: 1,
              background: { color: 'yellow' },
              color: 'green',
              font: { fontSize: 16, fontWeight: 500 },
              padding: { top: 10, bottom: 10, left: 10, right: 10 },
            },
            hover: {
              background: { color: 'green' },
              opacity: 0.6,
              color: 'yellow',
            },
          },
          CheckButtonUnChecked: {
            normal: {
              width: 100,
              height: 50,
              opacity: 1,
              border: {
                top: { color: 'orange', width: 1, style: 'solid' },
                right: { color: '#fff', width: 1, style: 'solid' },
                bottom: { color: 'orange', width: 1, style: 'solid' },
              },
              last: {
                border: {
                  top: { color: 'red', width: 1, style: 'solid' },
                  right: { color: 'red', width: 1, style: 'solid' },
                  bottom: { color: 'red', width: 1, style: 'solid' },
                },
              },
              first: {
                border: {
                  top: { color: 'red', width: 1, style: 'solid' },
                  bottom: { color: 'red', width: 1, style: 'solid' },
                  left: { color: 'red', width: 1, style: 'solid' },
                },
              },
              background: { color: '#33f340' },
              color: 'red',
              font: { fontSize: 16, fontWeight: 500 },
              padding: { top: 10, bottom: 10, left: 10, right: 10 },
            },
            hover: {
              background: { color: 'yellow' },
              opacity: 0.6,
              border: {
                top: { color: 'red', width: 1, style: 'solid' },
                right: { color: 'yellow', width: 1, style: 'solid' },
                bottom: { color: 'red', width: 1, style: 'solid' },
              },
              color: 'green',
            },
            disabled: {
              background: { color: 'orange' },
              opacity: 0.6,
              border: {
                top: { color: 'green', width: 1, style: 'solid' },
                right: { color: 'orange', width: 1, style: 'solid' },
                bottom: { color: 'green', width: 1, style: 'solid' },
              },
              color: 'yellow',
            },
          },
        },
      },
    };
    return (
      <div>
        <Wrapper>
          <CheckBoxGroup onChange={this.handleChange} value={this.state.newValue}>
            <CheckBox value="11" disabled>
              CheckBox1
            </CheckBox>
            <CheckBox value="22">CheckBox2</CheckBox>
            <CheckBox value="33">CheckBox3</CheckBox>
          </CheckBoxGroup>
        </Wrapper>
        <Wrapper>
          <CheckBoxGroup onChange={this.handleChange}>
            <CheckBox value="11" disabled>
              CheckBox1
            </CheckBox>
            {123}
            <CheckBox value="22">CheckBox2</CheckBox>
            <CheckBox value="33">CheckBox3</CheckBox>
          </CheckBoxGroup>
        </Wrapper>
        <Wrapper>
          <p>themes</p>
          <Theme config={checkboxView}>
            <CheckBoxGroup
              onChange={handleChange}
              styles="vertical"
              data={options}
              defaultValue={['11']}
              displayField="label"
            />
          </Theme>
        </Wrapper>
        <Wrapper>
          <CheckBoxGroup
            onChange={this.handleChange}
            styles="vertical"
            data={options}
            value={['11', '44']}
            displayValue={['check4', 'check5']}
            displayField="label"
          />
        </Wrapper>
        <Wrapper>
          <CheckBoxGroup
            onChange={this.handleChange}
            styles="vertical"
            data={options}
            defaultValue={['11', '44']}
            displayValue={['check4', 'check5']}
            displayField="label"
          />
        </Wrapper>
        <Wrapper>
          <CheckBoxGroup childType="button" onChange={handleChange} defaultValue={defaultValue}>
            <CheckBoxButton value="1">CheckBox1</CheckBoxButton>
            <CheckBoxButton value="2">CheckBox2</CheckBoxButton>
            <CheckBoxButton value="3">CheckBox3</CheckBoxButton>
          </CheckBoxGroup>
        </Wrapper>
        <Wrapper>
          <Theme config={checkbuttonView}>
            <CheckBoxGroup childType="button" onChange={handleChange} defaultValue={defaultValue}>
              <CheckBoxButton value="1">CheckBox1</CheckBoxButton>
              <CheckBoxButton value="2">CheckBox2</CheckBoxButton>
              <CheckBoxButton value="3">CheckBox3</CheckBoxButton>
            </CheckBoxGroup>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={checkbuttonView}>
            <CheckBoxGroup
              onChange={this.handleChange}
              data={options}
              value={this.state.newValue}
              displayValue={['check4', 'check5']}
              displayField="label"
              childType="button"
            />
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={checkbuttonView}>
            <CheckBoxGroup
              onChange={this.handleChange}
              data={options2}
              value={this.state.newValue}
              displayValue={['check4', 'check5']}
              displayField="label"
              childType="button"
            />
          </Theme>
        </Wrapper>
        <Wrapper>
          <Theme config={checkbuttonView}>
            <CheckBoxGroup
              onChange={this.handleChange}
              data={options2}
              value={'22'}
              displayValue={['check4', 'check5']}
              displayField="label"
              childType="button"
            />
          </Theme>
        </Wrapper>
        <Wrapper>
          <CheckBoxGroup
            styles="vertical"
            data={options}
            childType={'button'}
            defaultValue={['11', '44']}
            defaultDisplayValue={['check4', 'check5']}
            displayField="label"
          />
        </Wrapper>
      </div>
    );
  }
};
