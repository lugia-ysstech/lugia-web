/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Trigger from '../trigger';
import styled from 'styled-components';

const getTriggerByArrow = props => {
  const { fx, } = props;
  switch (fx) {
    case 'up':
      return 'padding-top: 8px;';
    case 'down':
      return 'padding-bottom: 8px;';
    case 'left':
      return 'padding-left: 8px;';
    case 'right':
    default:
      return 'padding-right: 8px;';
  }
};
const ToolTrigger = styled(Trigger)`
  ${getTriggerByArrow}
  box-shadow: none;`;


const color = 'rgba(0, 0, 0, 0.75)';
const Content = styled.div`
    font-size: 14px;
    line-height: 1;
    color: ${color};
    box-sizing: border-box;
`;
const down = '5px 5px 0';
const up = '';
const getArrow = props => {
  const { fx, } = props;
  switch (fx) {
    case 'up':
      return `
        left: 16px;
        top: 3px;
        border-width: 0 5px 5px;
        border-bottom-color: ${color};
      `;
    case 'down':
      return `
        left: 16px;
        bottom: 3px;
        border-width: 5px 5px 0;
        border-top-color: ${color};
      `;
    case 'left':
      return `
        top: 8px;
        left: 3px;
        border-width: 5px 5px 5px 0;
        border-right-color: ${color};
      `;
    case 'right':
      return `
        top: 8px;
        right: 3px;
        border-width: 5px 0 5px 5px;
        border-left-color: ${color};
      `;
    default:
      return '';
  }
};
const Arrow = styled.div`
    border-color: transparent;
    ${getArrow}
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    font-size: 14px;
    line-height: 1;
    color: ${color};
`;

const Message = styled.div`
    box-sizing: border-box;
    user-select: none;
    font-size: 14px;
    line-height: 1.5;
    max-width: 250px;
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    background-color:  ${color};
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    min-height: 32px;
`;

type StateType = {
  align: string,
};

export default class  extends React.Component<any, StateType> {
  getTargetDom () {
    return document.getElementById('root');
  }

  render () {
    const fx = 'right';
    return <ToolTrigger action="click"
                        fx={fx}
                        align="bottomLeft"
                        popup={
                          <Content>
                            <Arrow fx={fx}/>
                            <Message>hello</Message>
                          </Content>
                        }>
      {this.props.children}
    </ToolTrigger>;
  }

  onSelectAlign = (align: string) => () => {
    this.setState({ align, });
  };
}
