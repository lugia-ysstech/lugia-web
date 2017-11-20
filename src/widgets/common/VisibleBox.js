/*
 * 可通过visible属性控制是否可见的盒子
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';

type VisibleBoxProps = {
  visible: boolean
}
export default styled.div`
   ${(props: VisibleBoxProps) => (props.visible ? '' : 'display: none;')}
`;
