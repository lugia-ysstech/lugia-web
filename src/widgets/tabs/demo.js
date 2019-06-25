/**
 *
 * create by liangguodong
 *
 * @flow
 */
import * as React from 'react';
import Tabs from './tabs';
import Button from '../button';
import Tabpane from './tabpane';
import Widget from '../consts/index';
import Icon from '../icon';
import Theme from '../theme/';
import type { TabPositionType, TabType } from '../css/tabs';
import colorsFunc from '../css/stateColor';

import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';

const { themeColor, mediumGreyColor, superLightColor, disableColor } = colorsFunc();

const onPreClick = e => {};
const onNextClick = e => {};
export class Tabsdemo extends React.Component<any, any> {
  state = {
    data: hasActivityValueData,
    activeValue: '0',
  };
  onAddClick = () => {
    const activityValue = `newTab${this.state.data.length++}`;
    const item = {
      title: 'New Tab',
      content: 'Content of new Tab',
      activityValue,
    };
    return item;
  };
  onDeleteClick = (activityValue: string) => {};
  render() {
    return (
      <div>
        <Tabs
          tabType={'card'}
          pagedType={'single'}
          onPreClick={onPreClick}
          onNextClick={onNextClick}
          onAddClick={this.onAddClick}
          onDeleteClick={this.onDeleteClick}
        />
      </div>
    );
  }
}

export class TabsLimitdemo extends React.Component<any, any> {
  state = {
    data: hasActivityValueData,
    activeValue: '0',
  };
  change = (e: Object) => {
    hasActivityValueData[0] = {
      title: ' changed Tab1',
      content: 'Content of changed Tab1',
      activityValue: '-1',
    };
    this.setState({ data: hasActivityValueData });
  };
  onAddClick = () => {
    const data = this.state.data;
    const activityValue = `newTab${this.state.data.length++}`;
    data.push({
      title: 'New Tab',
      content: 'Content of new Tab',
      activityValue,
    });
    this.setState({ data });
  };

  onDeleteClick = (activityValue: string) => {
    const { data } = this.state;
    let newdata = [];
    if (data.length > 1) {
      newdata = data.filter(child => {
        return child.activityValue !== activityValue;
      });
    }
    this.setState({ data: newdata });
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <Button style={{ width: 200 }} onClick={this.change} type="primary">
          {'点击修改data内容'}
        </Button>
        <Tabs
          tabType={'card'}
          pagedType={'single'}
          data={data}
          onPreClick={onPreClick}
          onNextClick={onNextClick}
          onAddClick={this.onAddClick}
          onDeleteClick={this.onDeleteClick}
        />
      </div>
    );
  }
}

const Title = CSSComponent({
  tag: 'div',
  className: 'YscrollerContainer',
  css: css`
    border: 1px solid red;
    margin: 10px 0;
  `,
});
const titleStyle = { border: '1px solid red', margin: '10px' };
const RightWrapper = CSSComponent({
  tag: 'div',
  className: 'YscrollerContainer',
  css: css`
    margin: 50px;
    text-align: right;
  `,
});
const themeProps = {
  themeProps: {},
  themeState: {},
  propsConfig: {},
};
export const defaultData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
  },
  {
    title: 'Tab2',
    content: 'content of Tab2',
  },
  {
    title: 'Tab3',
    content: 'content of Tab3',
  },
];
export const suffixData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
    suffixIcon: <Icon iconClass={'lugia-icon-reminder_close_circle_o'} />,
  },
  {
    title: 'Tab2',
    content: 'content of Tab2',
  },
  {
    title: 'Tab3',
    content: 'content of Tab3',
  },
];
export const disabledData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
  },
  {
    title: 'Tab2',
    content: 'content of Tab2',
    disabled: true,
  },
  {
    title: 'Tab3',
    content: 'content of Tab3',
  },
];
export const hasActivityValueData = [
  {
    title: 'Tab1',
    content: <div>1111111111</div>,
    activityValue: '0',
  },
  {
    title: 'Tab2',
    content: (
      <div>
        <div>222222</div>
      </div>
    ),
    activityValue: '1',
  },
  {
    activityValue: '2',
    title: 'Tab3',
    content: (
      <div>
        <div>
          <div>33333</div>
        </div>
      </div>
    ),
  },
  {
    activityValue: '3',
    title: 'Tab4',
    disabled: true,
    content: (
      <div>
        <div>
          <div>44444</div>
          <div>44444</div>
        </div>
      </div>
    ),
  },
  {
    activityValue: '4',
    title: 'Tab5',
    content: 55555,
  },
  {
    activityValue: '5',
    title: 'Tab6',
    content: 66666,
  },
  {
    activityValue: '6',
    title: 'Tab7',
    content: 77777,
  },
  {
    activityValue: '7',
    title: 'Tab8',
    content: 888888,
  },
];
export const children = [
  <Tabpane title={'1111'} content={'11111'} activityValue={'0'} />,
  <Tabpane title={'2222'} content={<div>2222</div>} activityValue={'1'} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>3333</div>
        </div>
      </div>
    }
    activityValue={'2'}
  />,
  <Tabpane
    title={'4444'}
    content={
      <div>
        <div>
          <div>44444</div>
        </div>
      </div>
    }
    activityValue={'3'}
  />,
  <Tabpane
    title={'555555'}
    content={
      <div>
        <div>
          <div>55555</div>
        </div>
      </div>
    }
    activityValue={'4'}
  />,
  <Tabpane
    title={'666666'}
    content={
      <div>
        <div>
          <div>66666</div>
        </div>
      </div>
    }
    activityValue={'5'}
  />,
];
export const longChildren = [
  <Tabpane title={'11111'} content={'11111111111111111111111111'} />,
  <Tabpane title={'2222'} content={<div>22222222222222</div>} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>33333333</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'4444'}
    content={
      <div>
        <div>
          <div>44444</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'555555'}
    content={
      <div>
        <div>
          <div>55555</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'666666'}
    content={
      <div>
        <div>
          <div>66666</div>
        </div>
      </div>
    }
  />,
];
export const shortChildren = [
  <Tabpane
    title={'11111'}
    content={'11111111111111111111111111'}
    icon={'lugia-icon-financial_archive'}
  />,
  <Tabpane title={'2222'} content={<div>22222222222222</div>} activityValue={'1'} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>33333333</div>
        </div>
      </div>
    }
    activityValue={'2'}
  />,
];
const hasActivityValueChildren = [
  <Tabpane title={'11111'} content={'1111'} activityValue={'0'} />,
  <Tabpane title={'2222'} content={<div>2222</div>} activityValue={'1'} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>33333333</div>
        </div>
      </div>
    }
    activityValue={'2'}
  />,
  <Tabpane
    title={'44444'}
    content={
      <div>
        <div>
          <div>444444444</div>
        </div>
      </div>
    }
    activityValue={'3'}
  />,
  <Tabpane
    title={'55555'}
    content={
      <div>
        <div>
          <div>55555555555</div>
        </div>
      </div>
    }
    activityValue={'4'}
  />,
  <Tabpane
    title={'66666'}
    content={
      <div>
        <div>
          <div>66666666666</div>
        </div>
      </div>
    }
    activityValue={'5'}
  />,
  <Tabpane
    title={'7777777'}
    content={
      <div>
        <div>
          <div>77777777777</div>
        </div>
      </div>
    }
    activityValue={'6'}
  />,
  <Tabpane
    title={'8888888'}
    content={
      <div>
        <div>
          <div>88888888888</div>
        </div>
      </div>
    }
    activityValue={'7'}
  />,
  <Tabpane
    title={'999999'}
    content={
      <div>
        <div>
          <div>9999999999</div>
        </div>
      </div>
    }
    activityValue={'8'}
  />,
  <Tabpane
    title={'10101010'}
    content={
      <div>
        <div>
          <div>10101101010</div>
        </div>
      </div>
    }
    activityValue={'9'}
  />,
  <Tabpane
    title={'1111111'}
    content={
      <div>
        <div>
          <div>111111111111</div>
        </div>
      </div>
    }
    activityValue={'10'}
  />,
  <Tabpane
    title={'12121212'}
    content={
      <div>
        <div>
          <div>121212</div>
        </div>
      </div>
    }
    activityValue={'11'}
  />,
  <Tabpane
    title={'131313'}
    content={
      <div>
        <div>
          <div>131313131313</div>
        </div>
      </div>
    }
    activityValue={'12'}
  />,
];

export default () => {
  const lineView = {
    [Widget.Tabs]: {
      SelectTabPan: {
        normal: {
          color: 'red',
        },
        disabled: {
          color: '#ccc',
        },
      },
      DefaultTabPan: {
        normal: {},
        hover: {
          color: 'orange',
        },
        disabled: {
          color: '#ccc',
        },
      },
      AddButton: {},
      BorderStyle: {
        normal: {
          color: '#FFCCFF',
          width: 1,
        },
      },
      ContentBlock: {
        normal: {
          padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
          },
        },
      },
      TabsContainer: {
        normal: {
          width: 300,
          height: 300,
        },
      },
    },
  };
  const cardView = {
    [Widget.Tabs]: {
      width: 500,
      SelectTabPan: {
        normal: {
          color: themeColor,
          background: {
            color: '#',
          },
        },
        disabled: {
          color: '#ccc',
        },
      },
      CardTabPan: {
        normal: {
          // background: {
          //   color: 'pink',
          // },
        },
        hover: {
          color: 'orange',
        },
        disabled: {
          color: '#ccc',
        },
      },
      DefaultTabPan: {
        normal: {
          color: 'purple',
        },
        hover: {
          color: 'orange',
        },
        disabled: {
          color: '#ccc',
        },
      },
      TabsContainer: {
        normal: {
          width: 300,
          height: 300,
        },
      },
    },
  };
  const defaultCardView = {
    [Widget.Tabs]: {},
  };

  const windowView = {
    [Widget.Tabs]: {
      width: 500,
      SelectTabPan: {
        normal: {
          color: themeColor,
        },
        disabled: {
          color: '#ccc',
        },
      },
      WindowTabPan: {
        normal: {
          // background: {
          //   color: 'pink',
          // },
        },
        hover: {
          color: 'orange',
        },
        disabled: {
          color: '#ccc',
        },
      },
      TabsContainer: {
        normal: {
          width: 316,
        },
      },
      WindowContainer: {
        normal: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
          },
          background: {
            color: 'orange',
          },
        },
      },
    },
  };
  const vStyle = {
    [Widget.Tabs]: {
      height: 200,
    },
  };
  return (
    <div>
      <Theme config={lineView}>
        <div>
          <p style={{ titleStyle }}>defaultData pagedType=single </p>
          <Tabs
            tabType={'line'}
            tabPosition={'top'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            children={hasActivityValueChildren}
            pagedType={'single'}
          />
        </div>
        <div>
          <p style={{ titleStyle }}>defaultData pagedType=page</p>
          <Tabs
            tabType={'line'}
            tabPosition={'top'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            children={hasActivityValueChildren}
            pagedType={'page'}
          />
        </div>
        <div>
          <p style={{ titleStyle }}>height 60 </p>
          <Tabs
            tabType={'line'}
            tabPosition={'top'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            defaultData={defaultData}
            pagedType={'single'}
          />
        </div>
        <div>
          <p style={{ titleStyle }}>suffixIcon </p>
          <Tabs tabType={'line'} tabPosition={'top'} data={suffixData} />
        </div>
        <div>
          <p style={{ titleStyle }}>disabled </p>
          <Tabs tabType={'line'} tabPosition={'top'} data={disabledData} />
        </div>
        <div>
          <p style={{ titleStyle }}>data tabPosition=top</p>
          <Tabs
            tabType={'line'}
            tabPosition={'top'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            children={children}
            data={defaultData}
          />
        </div>
      </Theme>

      <Theme config={lineView}>
        <div>
          <p style={{ titleStyle }}>children tabPosition=left pagedType = page</p>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            pagedType={'page'}
            children={hasActivityValueChildren}
          />
        </div>
        <div>
          <p style={{ titleStyle }}>children tabPosition=left pagedType = single</p>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            pagedType={'single'}
            children={hasActivityValueChildren}
          />
        </div>
        <p style={{ titleStyle }}>children tabPosition=right</p>
        <div>
          <Tabs
            tabType={'line'}
            tabPosition={'right'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            pagedType={'single'}
            children={shortChildren}
          />
        </div>
        <p style={{ titleStyle }}>children tabPosition=bottom</p>
        <div>
          <Tabs
            tabType={'line'}
            tabPosition={'bottom'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            pagedType={'single'}
            children={longChildren}
          />
        </div>
        <div>
          <p style={{ titleStyle }}>data tabPosition=top</p>
          <Tabs
            tabType={'line'}
            data={defaultData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </div>
        <br />
        <div>
          <p style={{ titleStyle }}>data tabPosition=left </p>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            data={hasActivityValueData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </div>
        <br />
        <p style={{ titleStyle }}>data tabPosition=right && pagedType=single</p>
        <div>
          <Tabs
            tabType={'line'}
            tabPosition={'right'}
            data={hasActivityValueData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            defaultActivityValue={'2'}
          />
        </div>
        <br />
        <p style={{ titleStyle }}>children tabPosition=bottom</p>
        <div>
          <Tabs
            tabType={'line'}
            data={defaultData}
            tabPosition={'bottom'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </div>
        <br />
      </Theme>

      <Theme config={cardView}>
        <div>
          <p style={{ titleStyle }}>tabType=card pagedType=single</p>
          <Tabs
            tabType={'card'}
            pagedType={'single'}
            data={hasActivityValueData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </div>
        <br />
        <br />
      </Theme>
      <Theme config={windowView}>
        <div>
          <p style={{ titleStyle }}>tabType=window pagedType=page</p>
          <Tabs
            tabType={'window'}
            pagedType={'page'}
            data={hasActivityValueData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </div>
        <p style={{ titleStyle }}>非受限 不传data 展示数据由state 控制</p>
        <Tabsdemo />
      </Theme>
      <Theme config={defaultCardView}>
        <p style={{ titleStyle }}>受限 展示数据 由props控制</p>
        <TabsLimitdemo />
        <br />
      </Theme>
    </div>
  );
};
