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
import { getBorder } from '@lugia/theme-css-hoc/lib/index';

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
        CheckboxWrap: {
          normal: {
            opacity: 1,
            color: 'blue',
            font: { fontWeight: 200, fontSize: 16 },
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
            color: 'red',
          },
          disabled: {
            opacity: 0.4,
            color: 'red',
          },
          active: {
            opacity: 1,
            color: 'green',
          },
        },
        CheckboxEdge: {
          normal: {
            background: { color: 'yellow' },
            border: getBorder({ color: '#56c22d', width: 2, style: 'solid' }, { radius: 2 }),
          },
          hover: {
            background: { color: '#56c22d' },
            border: getBorder({ color: 'yellow', width: 2, style: 'solid' }, { radius: 2 }),
          },
          disabled: {
            background: { color: 'orange' },
            border: getBorder({ color: 'red', width: 2, style: 'solid' }, { radius: 2 }),
          },
          active: {
            background: { color: '#3452c2' },
            border: getBorder({ color: 'red', width: 1, style: 'solid' }, { radius: 2 }),
          },
          cancel: {
            background: { color: 'pink' },
            border: getBorder({ color: 'red', width: 1, style: 'solid' }, { radius: 2 }),
          },
        },
        CheckboxChecked: {
          active: {
            background: { color: 'yellow' },
          },
          disabled: {
            background: { color: 'red' },
          },
          indeterminate: {
            background: { color: 'pink' },
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
          <Theme config={view}>
            <CheckBox indeterminate>CheckBox</CheckBox>
          </Theme>
        </Wrapper>
        <Wrapper>
          <CheckBox>CheckBox</CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox checked onChange={handleChange}>
            CheckBox
          </CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox defaultChecked>CheckBox</CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox disabled>CheckBox</CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox checked disabled>
            CheckBox
          </CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox defaultChecked disabled>
            CheckBox
          </CheckBox>
        </Wrapper>
        <Wrapper>
          <CheckBox indeterminate>CheckBox</CheckBox>
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
        Group: {
          normal: {
            width: 400,
            height: 100,
            opacity: 1,
            border: getBorder({ color: 'orange', width: 2, style: 'solid' }, { radius: 4 }),
            background: { color: 'red' },
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
          CheckboxWrap: {
            normal: {
              opacity: 1,
              color: 'blue',
              font: { fontWeight: 200, fontSize: 16 },
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
              color: 'red',
            },
            disabled: {
              opacity: 0.4,
              color: 'red',
            },
            active: {
              opacity: 1,
              color: 'green',
            },
          },
          CheckboxEdge: {
            normal: {
              background: { color: 'yellow' },
              border: getBorder({ color: '#56c22d', width: 2, style: 'solid' }, { radius: 2 }),
            },
            hover: {
              background: { color: '#56c22d' },
              border: getBorder({ color: 'yellow', width: 2, style: 'solid' }, { radius: 2 }),
            },
            disabled: {
              background: { color: 'orange' },
              border: getBorder({ color: 'red', width: 2, style: 'solid' }, { radius: 2 }),
            },
            active: {
              background: { color: '#3452c2' },
              border: getBorder({ color: 'red', width: 1, style: 'solid' }, { radius: 2 }),
            },
            cancel: {
              background: { color: 'pink' },
              border: getBorder({ color: 'red', width: 1, style: 'solid' }, { radius: 2 }),
            },
          },
          CheckboxChecked: {
            active: {
              background: { color: 'yellow' },
            },
            disabled: {
              background: { color: 'red' },
            },
            indeterminate: {
              background: { color: 'pink' },
            },
          },
        },
      },
    };
    const checkbuttonView = {
      [Widget.CheckboxGroup]: {
        Group: {},
        CheckButton: {
          CheckButtonWrap: {
            normal: {
              width: 100,
              height: 50,
              opacity: 1,
              border: getBorder({ color: 'green', width: 2, style: 'solid' }, { radius: 4 }),
              background: { color: '#33f340' },
            },
            hover: {
              background: { color: 'green' },
              opacity: 0.6,
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }, { radius: 4 }),
            },
            cancel: {
              border: getBorder({ color: 'green', width: 2, style: 'solid' }, { radius: 4 }),
              background: { color: '#8D13DE' },
            },
            active: {
              border: getBorder({ color: 'pink', width: 2, style: 'solid' }, { radius: 4 }),
              background: { color: 'red' },
            },
          },
          CheckButtonText: {
            normal: {
              color: 'blue',
              fontSize: 16,
              fontWeight: 400,
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              },
            },
            hover: {
              color: 'red',
              fontSize: 12,
              fontWeight: 600,
            },
            active: {
              color: '#fff',
              fontSize: 18,
            },
          },
          Checked: {
            disabled: {
              opacity: 0.8,
              background: { color: '#b2a8ef' },
              border: getBorder({ color: 'yellow', width: 2, style: 'solid' }, { radius: 4 }),
              color: 'red',
            },
          },
          UnChecked: {
            disabled: {
              opacity: 0.4,
              background: { color: '#ccc' },
              border: getBorder({ color: 'green', width: 2, style: 'solid' }, { radius: 4 }),
              color: 'green',
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
          <CheckBoxGroup childType="button" onChange={handleChange} value={defaultValue}>
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
