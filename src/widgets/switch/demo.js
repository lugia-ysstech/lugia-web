/**
 *
 * create by ZhangBoPing
 *
 * create date: 2018/04/09
 *
 * @flow
 */
import React, { Component } from 'react';
import Switch from './index';
import Icon from '../icon/index';
import Widgets from '../consts/index';
import Theme from '../theme/index';
import { getBorderRadius, getBorder } from '../theme/CSSProvider';

type TypeState = {
  load?: boolean,
  value: boolean,
};
export default class Sw extends Component<any, TypeState> {
  constructor() {
    super();
    this.state = {
      load: false,
      value: true,
      disabled: true,
    };
  }
  handleClick() {
    this.setState({
      load: !this.state.load,
    });
  }
  change = (item: Object) => {
    const { newValue } = item;
    this.setState({ value: newValue });
  };
  render() {
    return (
      <div className="demo-switch" style={{ margin: '20px' }}>
        <section style={{ marginBottom: '20px' }}>
          <h3>normal</h3>
          <Theme
            config={{
              [Widgets.Switch]: {
                Switch_SwitchOpen: {
                  normal: {
                    width: 150,
                    height: 40,
                    fontSize: 20,
                    color: '#fff',
                    background: {
                      color: 'red',
                    },
                    border: getBorder({ color: '#ddd', width: 1, style: 'solid' }),
                  },
                  disabled: {
                    background: {
                      color: 'blue',
                    },
                  },
                },
                Switch_SwitchClosed: {
                  normal: {
                    width: 150,
                    height: 40,
                    fontSize: 20,
                    color: '#000',
                    background: {
                      color: 'green',
                    },
                  },
                  disabled: {
                    background: {
                      color: 'pink',
                    },
                  },
                },
                SwitchButton: {
                  normal: {
                    width: 30,
                    height: 30,
                    background: {
                      color: 'blue',
                    },
                    borderRadius: getBorderRadius(40),
                    color: 'red',
                  },
                  active: {
                    width: 40,
                    height: 30,
                    background: {
                      color: 'yellow',
                    },
                    borderRadius: getBorderRadius(30),
                  },
                  disabled: {
                    background: {
                      color: 'yellow',
                    },
                  },
                },
                Container: {
                  normal: {
                    width: 200,
                    height: 60,
                    margin: {
                      top: 10,
                      right: 10,
                      bottom: 10,
                      left: 10,
                    },
                    padding: {
                      top: 10,
                      right: 10,
                      bottom: 10,
                      left: 10,
                    },
                    border: getBorder({ color: '#ddd', width: 1, style: 'solid' }),
                    //opacity: 0.5,
                  },
                },
              },
            }}
          >
            <Switch
              onChange={this.change}
              //disabled
              // autoFocus
              loading
              data={[
                { text: <Icon className={'lugia-icon-reminder_check'} /> },
                { text: '国' },
                { text: '日' },
              ]}
            />
          </Theme>
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>size=‘small’</h3>
          <Switch size={'small'} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data.length=3</h3>
          <Switch data={[{ text: '年' }, { text: '月' }, { text: '日' }]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data.length=2 isInverse defaultValue</h3>
          <Switch data={[{ text: '开' }, { text: '关' }]} isInverse defaultValue />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data `data.length=1 isInverse`</h3>
          <Switch data={[{ text: '开' }]} isInverse />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data `data.length=0`</h3>
          <Switch data={[]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data[0]=null</h3>
          <Switch data={[null]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data[0]=null,data[1]=null</h3>
          <Switch data={[null, null]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data[0]=undefined</h3>
          <Switch data={[undefined]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data[0]=undefined,data[1]=undefined</h3>
          <Switch data={[undefined, undefined]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data[0]=null,data[1]=undefined</h3>
          <Switch data={[null, undefined]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data[0]=null,data[1]={'text:月'}</h3>
          <Switch data={[null, { text: '月' }]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>displayFiled</h3>
          <Switch
            displayFiled={'left'}
            data={[{ left: '年', name: 'ppp' }, { left: '月', name: 'ww' }]}
          />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>no displayFiled, have text</h3>
          <Switch
            data={[{ text: '日', left: '年', name: 'ppp' }, { text: '时', left: '月', name: 'ww' }]}
          />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>no displayFiled no text</h3>
          <Switch data={[{ left: '年', name: 'ppp' }, { left: '月', name: 'ww' }]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>isInverse</h3>
          <Switch isInverse />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>data `value`</h3>
          <Switch value />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>defaultValue</h3>
          <Switch defaultValue />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>defaultValue && value</h3>
          <Switch defaultValue={false} value />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>autoFocus</h3>
          <Switch autoFocus onChange={this.change} data={[{ text: '年' }, { text: '月' }]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>autoFocus && value</h3>
          <Switch autoFocus onChange={this.change} value data={[{ text: '年' }, { text: '月' }]} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>onChange</h3>
          <Switch data={[{ text: '年' }, { text: '月' }]} onChange={this.change} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>onChange value false</h3>
          <Switch data={[{ text: '年' }, { text: '月' }]} value={false} onChange={this.change} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>onChange value false</h3>
          <Switch
            data={[
              { text: <Icon className={'lugia-icon-reminder_check'} /> },
              { text: <Icon className={'lugia-icon-reminder_close'} /> },
            ]}
            value={this.state.value}
            onChange={this.change}
          />
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3>loading</h3>
          <Switch loading />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>'loading=delay:3000'</h3>
          <Switch loading={{ delay: 3000 }} />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>disabled</h3>
          <Switch disabled />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>disabled loading</h3>
          <Switch disabled loading />
        </section>
        <section style={{ marginBottom: '20px' }}>
          <h3>disabled loading=delay:3000</h3>
          <Switch disabled loading={{ delay: 3000 }} />
        </section>
      </div>
    );
  }
}
