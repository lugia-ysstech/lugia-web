/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Skeleton from './index';
import styled from 'styled-components';
import Theme from '../theme';
import Widget from '../consts/index';

const Button = styled.button`
  width: 200px;
  height: 50px;
  background: cornflowerblue;
  margin: 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
`;

const Box = styled.div`
  height: 136px;
  width: 732px;
  background: pink;
  display: inline-block;
  font-size: 18px;
  font-weight: 900;
`;

// config={{ [Widget.Menu]: { width: 200 } }}
const config = { [Widget.Skeleton]: { width: 200 } };

export default class SkeletonDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { loading: true };
  }
  render() {
    return (
      <div>
        <div>
          <Button onClick={this.handleClickButton}>点击切换</Button>
        </div>
        <Theme config={config}>
          <Skeleton
            paragraphWidth={[111]}
            // paragraphWidth={'100'}
            // titleWidth={100}
            avatar={true}
            picture={true}
            // title={false}
            // pictureWidth={400}
            // pictureHeight={600}
            paragraph={{ rows: 8 }}
            animation={true}
            loading={this.state.loading}
          >
            <Box>我是被Skeleton组件包裹的项</Box>
          </Skeleton>
        </Theme>
      </div>
    );
  }

  handleClickButton = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  };
}
