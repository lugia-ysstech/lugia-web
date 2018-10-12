/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Progress from './progress';
import Widget from '../consts/index';
import Button from '../button';
import Theme from '../theme';

export default class ProgressDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      percent: 30,
    };
  }
  handleClick = (type: 'add' | 'sub') => {
    let res = this.state.percent;
    if (type === 'add') {
      res += 10;
    } else {
      res -= 10;
    }
    this.setState({
      percent: res,
    });
  };
  render() {
    const view = {
      [Widget.Progress]: {
        color: 'red',
        width: 100,
        height: 18,
      },
    };
    return (
      <div>
        <div style={{ width: '300px', margin: '50px' }}>
          <h1>line</h1>
          <p>props: percent={30}</p>
          <br />
          <Progress percent={30} />
          <br />
          <p>props: percent={30} status="active"</p>
          <br />
          <Progress percent={30} status="active" />
          <br />
          <p>props: percent={30} status="success" format= percent => percent + '--'</p>
          <br />
          <Progress percent={30} status="success" format={percent => percent + '--'} />
          <br />
          <p>props: percent={30} status="success"</p>
          <br />
          <Progress percent={30} status="success" />
          <br />
          <p>props: percent={30} status="error"</p>
          <br />
          <Progress percent={30} status="error" />
          <br />
          <p>props: percent=this.state.percent status="active"</p>
          <br />
          <Progress percent={this.state.percent} status="active" />
          <Button onClick={() => this.handleClick('add')}>+10</Button>&nbsp;
          <Button onClick={() => this.handleClick('sub')}>-10</Button>
          <br />
          <p>props: percent={30} showInfo=false</p>
          <br />
          <Progress percent={30} showInfo={false} />
          <br />
          <p>Theme===>>> props: percent={30}</p>
          <br />
          <Theme config={view}>
            <Progress percent={30} />
          </Theme>
          <div style={{ width: '200px', margin: '50px 0' }}>
            <p>props: size=small percent={30}</p>
            <br />
            <Progress size="small" percent={30} />
            <br />
            <p>props: size=small percent={30} status="active"</p>
            <br />
            <Progress size="small" percent={30} status="active" />
            <br />
            <p>props: size=small percent={30} status="success"</p>
            <br />
            <Progress size="small" percent={30} status="success" />
            <br />
            <p>props: size=small percent={30} status="error"</p>
            <br />
            <Progress size="small" percent={30} status="error" />
          </div>
          <div style={{ width: '300px', margin: '50px 0' }}>
            <p>percent={0} showType="inside"</p>
            <br />
            <Progress percent={0} showType="inside" />
            <p>percent={30} showType="inside" status="active"</p>
            <br />
            <Progress percent={30} showType="inside" status="active" />
            <p>percent={30} showType="inside"</p>
            <br />
            <Progress percent={30} showType="inside" />
            <p>percent={30} showType="inside" status="success"</p>
            <br />
            <Progress percent={130} showType="inside" />
            <p>percent={30} showType="inside" status="error"</p>
            <br />
            <Progress percent={30} showType="inside" status="error" />
            <br />
            <p>Theme===>>> props: percent={30}</p>
            <br />
            <Theme config={view}>
              <Progress percent={130} showType="inside" />
            </Theme>
          </div>
        </div>

        <div style={{ margin: '50px' }}>
          <h1>circle</h1>
          <p>type="circle" props: percent={0}</p>
          <br />
          <Progress type="circle" percent={0} />
          <br />
          <p>type="circle" props: percent={30}</p>
          <br />
          <Progress type="circle" percent={this.state.percent} />
          <Button onClick={() => this.handleClick('add')}>+10</Button>&nbsp;
          <Button onClick={() => this.handleClick('sub')}>-10</Button>
          <br />
        </div>
      </div>
    );
  }
}
