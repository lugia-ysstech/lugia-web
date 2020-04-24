/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Tooltip from './';
import Button from '../button';
import Widget from '../consts/index';
import Theme from '../theme';
import styled from 'styled-components';

const buttonWidth = 80;
const text = <span>prompt text</span>;
const ButtonDemo = styled(Button)`
  width: ${buttonWidth}px;
`;
const ToolTipBaseWrapper = styled.div`
  display: inline-block;
`;
const OuterWarpper = styled.div`
  margin-left: 100px;
`;
const DirectionTopWrapper = styled.div`
  margin-left: 120px;
  white-space: nowrap;
  display: inline-block;
`;
const DirectionLeftWrapper = styled.div`
  width: ${buttonWidth}px;
  position: absolute;
`;
const DirectionRightWrapper = styled.div`
  width: ${buttonWidth}px;
  margin-left: ${buttonWidth * 4 + 64}px;
`;
const DirectionBottomWrapper = styled.div`
  margin-left: 120px;
  white-space: nowrap;
  display: inline-block;
`;
const BottomWrapper = styled.div`
  margin-top: 100px;
`;
const ToolTipBHWrapper = styled(ToolTipBaseWrapper)`
  margin-bottom: 50px;
  margin-left: 10px;
  margin-top: 10px;
`;
const ToolTipTHWrapper = styled(ToolTipBaseWrapper)`
  margin-top: 50px;
  margin-left: 10px;
`;
const ToolTipLVWrapper = styled(ToolTipBaseWrapper)`
  margin-top: 10px;
  margin-left: 50px;
`;
const ToolTipRVWrapper = styled(ToolTipBaseWrapper)`
  margin-top: 10px;
  margin-right: 50px;
  margin-left: 10px;
`;
export default () => {
  const config = {
    [Widget.Button]: {
      Container: {
        normal: {
          width: buttonWidth,
        },
      },
    },
  };
  return (
    <OuterWarpper>
      <Theme config={config}>
        <DirectionTopWrapper>
          <ToolTipTHWrapper>
            <Tooltip placement="topLeft" title={text}>
              <ButtonDemo type="primary">TL</ButtonDemo>
            </Tooltip>
          </ToolTipTHWrapper>
          <ToolTipTHWrapper>
            <Tooltip placement="top" title={text}>
              <ButtonDemo type="primary">Top</ButtonDemo>
            </Tooltip>
          </ToolTipTHWrapper>
          <ToolTipTHWrapper>
            <Tooltip placement="topRight" title={text}>
              <ButtonDemo type="primary">TR</ButtonDemo>
            </Tooltip>
          </ToolTipTHWrapper>
        </DirectionTopWrapper>
        <DirectionLeftWrapper>
          <ToolTipLVWrapper>
            <Tooltip placement="leftTop" title={text}>
              <ButtonDemo type="primary">LT</ButtonDemo>
            </Tooltip>
          </ToolTipLVWrapper>
          <ToolTipLVWrapper>
            <Tooltip placement="left" title={text}>
              <ButtonDemo type="primary">Left</ButtonDemo>
            </Tooltip>
          </ToolTipLVWrapper>
          <ToolTipLVWrapper>
            <Tooltip placement="leftBottom" title={text}>
              <ButtonDemo type="primary">LB</ButtonDemo>
            </Tooltip>
          </ToolTipLVWrapper>
        </DirectionLeftWrapper>
        <DirectionRightWrapper>
          <ToolTipRVWrapper>
            <Tooltip placement="rightTop" title={text}>
              <ButtonDemo type="primary">RT</ButtonDemo>
            </Tooltip>
          </ToolTipRVWrapper>
          <ToolTipRVWrapper>
            <Tooltip placement="right" title={text}>
              <ButtonDemo type="primary">Right</ButtonDemo>
            </Tooltip>
          </ToolTipRVWrapper>
          <ToolTipRVWrapper>
            <Tooltip placement="rightBottom" title={text}>
              <ButtonDemo type="primary">RB</ButtonDemo>
            </Tooltip>
          </ToolTipRVWrapper>
        </DirectionRightWrapper>
        <DirectionBottomWrapper>
          <ToolTipBHWrapper>
            <Tooltip placement="bottomLeft" title={text}>
              <ButtonDemo type="primary">BL</ButtonDemo>
            </Tooltip>
          </ToolTipBHWrapper>
          <ToolTipBHWrapper>
            <Tooltip placement="bottom" title={text}>
              <ButtonDemo type="primary">Bottom</ButtonDemo>
            </Tooltip>
          </ToolTipBHWrapper>
          <ToolTipBHWrapper>
            <Tooltip placement="bottomRight" title={text}>
              <ButtonDemo type="primary">BR</ButtonDemo>
            </Tooltip>
          </ToolTipBHWrapper>
        </DirectionBottomWrapper>
        <BottomWrapper />
      </Theme>
      <div>
        <Tooltip placement="top" title={text} description={'This is description'}>
          <ButtonDemo type="primary">带有描述文本的提示</ButtonDemo>
        </Tooltip>
      </div>
    </OuterWarpper>
  );
};
