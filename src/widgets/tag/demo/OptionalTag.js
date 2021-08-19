import React from 'react';
import styled from 'styled-components';
import Tag from '../index';

const TagWrap = styled.div`
  display: inline-block;
  margin: 5px;
`;

class MyTag extends React.Component<any, any> {
  constructor(props: TagProps) {
    super(props);

    this.state = {
      checked: false,
    };
  }
  render() {
    return (
      <TagWrap>
        <Tag checked={this.state.checked} type={'optional'} onClick={this.onClick}>
          Click me
        </Tag>
      </TagWrap>
    );
  }

  onClick = (e, checked) => {
    this.setState({ checked });
  };
}

export default () => [<MyTag />, <MyTag />, <MyTag />, <MyTag />];
