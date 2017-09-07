/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';

type MenuProps = {
  children: React.Node
};

const ItemContainer = styled.div`
   background-color: #fff;
   box-shadow: 0 1px 6px rgba(0,0,0,.2);
   border-radius: 4px;
   box-sizing: border-box;
`;

class MenuItem extends React.Component<MenuProps> {

  render () {
    const { children, } = this.props;
    return <ItemContainer>{children}</ItemContainer>;
  }
}

export default MenuItem;
