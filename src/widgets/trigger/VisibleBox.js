/*
 * 可通过visible属性控制是否可见的盒子
 */
import React from 'react';
import styled from 'styled-components';

export default styled.div`
  display: ${props => (props.visible ? '' : 'none')};
`;
