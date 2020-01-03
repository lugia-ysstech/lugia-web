/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import InputTag from './widgets/inputtag';
import Theme from './widgets/theme';
import Widget from './widgets/consts/index';
import { getBorder } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';

const Box = styled.div`
  border: 1px solid #000;
`;
const valArr = [],
  dispArr = [];
for (let i = 0; i < 10; i++) {
  valArr.push('k' + i);
  dispArr.push('v' + i);
}
const val = valArr.join(',');
const disp = dispArr.join(',');

class InputDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: val, displayValue: disp };
  }

  render() {
    const config = {
      [Widget.InputTag]: {
        InputTagWrap: {
          normal: {
            width: 340,
            height: 60,
            color: '#ddd',
            boxShadow: '2px 2px 5px #000',
            // background: { color: '#eee' },
            borderRadius: getBorderRadius(20),
            margin: {
              top: 40,
              left: 100,
            },
            // padding: {
            //   left: '20',
            //   right: '30',
            // },
          },
          hover: {
            boxShadow: '2px 2px 5px #4d63ff',
            color: '#4d63ff',
            borderRadius: getBorderRadius(10),
          },
        },
        TagWrap: {
          normal: {
            //  width: 100,
            height: 20,
            margin: {
              left: 50,
              right: 5,
            },
            padding: {
              left: 10,
              right: 10,
            },
            font: { fontSize: 20 },
            // border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }, { radius: 10 }),
          },
          hover: {
            background: { color: 'orange' },
            // border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }, { radius: 30 }),
          },
        },
        TagIcon: {
          normal: {
            font: { fontSize: 14, color: '#999' },
          },
          hover: {
            color: '#4d63ff',
          },
        },
        Icon: {
          normal: {
            color: '#ddd',
            font: { fontSize: 30 },
            // margin: {
            //   right: 20,
            // },
          },
          hover: { color: '#4d63ff' },
        },
        Menu: {
          Container: {
            normal: {
              width: 200,
              height: 200,
              opacity: 0.6,
              boxShadow: '2px 2px 5px #4d63ff',
              background: { color: '#000' },
              border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
              borderRadius: getBorderRadius(20),
            },
            hover: {
              opacity: 1,
            },
          },
          MenuItem: {
            normal: { color: '#ccc', fontSize: 14, font: { fontWeight: 900 } },
            hover: {
              color: '#fff',
              fontSize: 20,
              background: { color: 'green' },
              font: { fontWeight: 400 },
            },
            active: {
              color: 'blue',
              fontSize: 14,
              background: { color: 'pink' },
              font: { fontWeight: 900 },
            },
            disabled: { color: 'red', background: { color: '#000' } },
          },
        },
      },
    };
    const SingleConfig = {
      [Widget.InputTag]: {
        width: 200,
      },
    };
    // const { value, displayValue, } = this.state;
    return (
      <Theme config={config}>
        <Box>
          <InputTag
            validateStatus="error"
            // mutliple={false}
            // defaultValue={'aaa'}
            // defaultDisplayValue={'AAA'}
            defaultValue={val.split(',')}
            defaultDisplayValue={disp.split(',')}
          />
        </Box>
      </Theme>
    );
  }
}

export default InputDemo;
