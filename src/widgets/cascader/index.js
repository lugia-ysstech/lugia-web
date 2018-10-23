/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Menu from '../menu/test';
import Theme from '../theme';
import Widget from '../consts/index';
import styled from 'styled-components';
import Trigger from '../trigger';

const CascaderContainer = styled.div`
  border: 1px solid #ccc;
  display: inline-block;
`;

export default class Cascader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { selectedKeys: ['1', '2'] };
  }

  render() {
    const { data } = this.props;
    return (
      <CascaderContainer>
        <Theme config={{ [Widget.Menu]: { width: 168 } }}>
          <Menu
            mutliple={false}
            data={data}
            onClick={this.onClick}
            handleItemWrap={this.handleItemWrap}
          />
        </Theme>
      </CascaderContainer>
    );
  }

  onClick = (e, keys) => {
    const { selectedKeys } = keys;
    this.setState({ selectedKeys });
  };

  handleItemWrap = (target: Object, childrenData: Object[]) => {
    if (childrenData && childrenData.length > 0) {
      return (
        <Trigger
          ref={cmp => (this.trigger = cmp)}
          align={'rightTop'}
          action={'hover'}
          hideAction={'hover'}
          popup={this.getPopupMenu(childrenData)}
        >
          {target}
        </Trigger>
      );
    }
    return target;
  };

  getPopupMenu(childrenData: Object[]) {
    return (
      <Theme config={{ [Widget.Menu]: { width: 168 } }}>
        <Menu
          mutliple={false}
          data={childrenData}
          onClick={this.onClick}
          handleItemWrap={this.handleItemWrap}
        />
      </Theme>
    );
  }
}
