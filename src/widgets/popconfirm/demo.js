/**
 *
 * create by liangguodong on 2018/12/5
 *
 * @flow
 */
import * as React from 'react';
import Direction from '../button';
import styled from 'styled-components';
import Popconfirm from './popconfirm';

const Wrapper = styled.div`
  margin: 100px;
`;

export default () => {
  const text = 'this is title ';
  const description = 'this is description';
  return (
    <Wrapper>
      <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
        <Popconfirm arrowPosition="topLeft" title={text} action={'click'}>
          <Direction>TL</Direction>
        </Popconfirm>
        <Popconfirm
          arrowPosition="top"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Top</Direction>
        </Popconfirm>
        <Popconfirm
          arrowPosition="topRight"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>TR</Direction>
        </Popconfirm>
      </div>
      <div style={{ width: 70, float: 'left' }}>
        <Popconfirm
          arrowPosition="leftTop"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>LT</Direction>
        </Popconfirm>
        <Popconfirm
          arrowPosition="left"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Left</Direction>
        </Popconfirm>
        <Popconfirm
          arrowPosition="leftBottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>LB</Direction>
        </Popconfirm>
      </div>
      <div style={{ width: 70, marginLeft: 200 }}>
        <Popconfirm
          arrowPosition="rightTop"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>RT</Direction>
        </Popconfirm>
        <Popconfirm arrowPosition="right" title={text}>
          <Direction>Right</Direction>
        </Popconfirm>
        <Popconfirm
          arrowPosition="rightBottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>RB</Direction>
        </Popconfirm>
      </div>
      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popconfirm
          arrowPosition="bottomLeft"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>BL</Direction>
        </Popconfirm>
        <Popconfirm
          arrowPosition="bottom"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>Bottom</Direction>
        </Popconfirm>
        <Popconfirm
          arrowPosition="bottomRight"
          title={text}
          description={[<div>{description}</div>, <div>{description}</div>]}
        >
          <Direction>BR</Direction>
        </Popconfirm>
      </div>
      <br />
      <Popconfirm
        arrowPosition="bottom"
        title={text}
        action={'focus'}
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction>聚焦</Direction>
      </Popconfirm>
      <Popconfirm
        arrowPosition="bottom"
        title={text}
        action={'hover'}
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction> 悬停</Direction>
      </Popconfirm>
      <Popconfirm
        arrowPosition="bottom"
        title={text}
        action={'click'}
        description={[<div>{description}</div>, <div>{description}</div>]}
      >
        <Direction>点击</Direction>
      </Popconfirm>
      <br />
    </Wrapper>
  );
};
