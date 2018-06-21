/*
 * 可通过visible属性控制是否可见的盒子
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';

type VisibleBoxProps = {
  visible: boolean,
  visibleCSS?: string,
};
export default styled.div`
  ${(props: VisibleBoxProps) => {
    let { visibleCSS = '' } = props;
    if (visibleCSS) {
      visibleCSS = `display: ${visibleCSS};`;
    }
    return props.visible ? visibleCSS : 'display: none;';
  }};
`;
