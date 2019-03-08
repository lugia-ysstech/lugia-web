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
const DirectionTopWrapper = styled.div`
  margin-left: ${buttonWidth}px;
  white-space: nowrap;
  display: inline-block;
`;
const DirectionLeftWrapper = styled.div`
  width: ${buttonWidth}px;
  position: absolute;
`;
const DirectionRightWrapper = styled.div`
  width: ${buttonWidth}px;
  margin-left: ${buttonWidth * 4 + 24}px;
`;
const DirectionBottomWrapper = styled.div`
  margin-left: ${buttonWidth}px;
  white-space: nowrap;
  display: inline-block;
`;
const ToolTipHWrapper = ToolTipBaseWrapper.extend`
  margin-right: 10px;
`;
const ToolTipVWrapper = ToolTipBaseWrapper.extend`
  margin-top: 10px;
`;
export default () => {
  const config = {
    [Widget.Tooltip]: {
      color: '#fef0ef',
      fontColor: '#000',
    },
    [Widget.Button]: {
      width: buttonWidth,
    },
  };
  return (
    <Theme config={config}>
      <Tooltip />
      <DirectionTopWrapper>
        <ToolTipHWrapper>
          <Tooltip placement="topLeft" title={text}>
            <ButtonDemo type="primary">TL</ButtonDemo>
          </Tooltip>
        </ToolTipHWrapper>
        <ToolTipHWrapper>
          <Tooltip placement="top" title={text}>
            <ButtonDemo type="primary">Top</ButtonDemo>
          </Tooltip>
        </ToolTipHWrapper>
        <ToolTipHWrapper>
          <Tooltip placement="topRight" title={text}>
            <ButtonDemo type="primary">TR</ButtonDemo>
          </Tooltip>
        </ToolTipHWrapper>
      </DirectionTopWrapper>
      <DirectionLeftWrapper>
        <ToolTipVWrapper>
          <Tooltip placement="leftTop" title={text}>
            <ButtonDemo type="primary">LT</ButtonDemo>
          </Tooltip>
        </ToolTipVWrapper>
        <ToolTipVWrapper>
          <Tooltip placement="left" title={text}>
            <ButtonDemo type="primary">Left</ButtonDemo>
          </Tooltip>
        </ToolTipVWrapper>
        <ToolTipVWrapper>
          <Tooltip placement="leftBottom" title={text}>
            <ButtonDemo type="primary">LB</ButtonDemo>
          </Tooltip>
        </ToolTipVWrapper>
      </DirectionLeftWrapper>
      <DirectionRightWrapper>
        <ToolTipVWrapper>
          <Tooltip placement="rightTop" title={text}>
            <ButtonDemo type="primary">RT</ButtonDemo>
          </Tooltip>
        </ToolTipVWrapper>
        <ToolTipVWrapper>
          <Tooltip placement="right" title={text}>
            <ButtonDemo type="primary">Right</ButtonDemo>
          </Tooltip>
        </ToolTipVWrapper>
        <ToolTipVWrapper>
          <Tooltip placement="rightBottom" title={text}>
            <ButtonDemo type="primary">RB</ButtonDemo>
          </Tooltip>
        </ToolTipVWrapper>
      </DirectionRightWrapper>
      <DirectionBottomWrapper>
        <ToolTipHWrapper>
          <Tooltip placement="bottomLeft" title={text}>
            <ButtonDemo type="primary">BL</ButtonDemo>
          </Tooltip>
        </ToolTipHWrapper>
        <ToolTipHWrapper>
          <Tooltip placement="bottom" title={text}>
            <ButtonDemo type="primary">Bottom</ButtonDemo>
          </Tooltip>
        </ToolTipHWrapper>
        <ToolTipHWrapper>
          <Tooltip placement="bottomRight" title={text}>
            <ButtonDemo type="primary">BR</ButtonDemo>
          </Tooltip>
        </ToolTipHWrapper>
      </DirectionBottomWrapper>
    </Theme>
  );
};
