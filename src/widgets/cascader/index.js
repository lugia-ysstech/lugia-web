/**
 *
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Menu from '../menu';
import Theme from '../theme';
import Widget from '../consts/index';
import styled from 'styled-components';
import Trigger from '../trigger';
import InputTag from '../inputtag';
import { createTrue } from 'typescript';
import { TypedRule } from 'tslint/lib/rules';

const CascaderContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const CheckedButton = styled.input`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 300px;
`;

export default class Cascader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { popupVisible: false, isInMenu: false };
  }

  render() {
    const { props, state } = this;
    const { popupVisible } = state;
    return (
      <div>
        <CascaderContainer onClick={this.handleClickContainer}>
          <Theme config={{ [Widget.InputTag]: { width: 200 } }}>
            <Trigger
              ref={cmp => (this.trigger = cmp)}
              align={'bottomLeft'}
              // action={'click'}
              // hideAction={'click'}
              popupVisible={popupVisible}
              popup={this.getMenu()}
            >
              <InputTag
                onClick={this.onClick}
                mutliple={false}
                defaultValue={['1']}
                defaultDisplayValue={['1']}
              />
            </Trigger>
          </Theme>
        </CascaderContainer>
        <CheckedButton
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          innerRef={cmp => (this.input = cmp)}
        />
      </div>
    );
  }

  handleClickMenu = e => {};

  _onMouseEnterContainer = () => {
    const { isInMenu } = this.state;
    this.input.focus();
    if (isInMenu) {
      return;
    }
    this.setState({ isInMenu: true });
  };

  _onMouseLeaveContainer = () => {
    const { isInMenu } = this.state;

    this.setState({ isInMenu: false }, () => {});
  };

  _onMouseDownContainer = (e: Object) => {};

  _onMouseMouveContainer = (e: Object) => {
    const { isInMenu } = this.state;
    this.input.focus();
    if (isInMenu) {
      return;
    }
    this.setState({ isInMenu: true });
  };

  onBlur = () => {
    const { isInMenu } = this.state;
    if (!isInMenu) {
      this.setState({ popupVisible: false });
    }
    document.body.click;
  };
  onFocus = () => {
    this.setState({ popupVisible: true });
  };
  handleClickContainer = (e: Object) => {
    const { popupVisible, isInMenu } = this.state;

    this.setState({ popupVisible: true });

    this.input.focus();
  };

  getMenu = () => {
    const { data } = this.props;
    const { popupVisible } = this.state;
    return (
      <Theme config={{ [Widget.Menu]: { width: 168 } }}>
        <Menu
          mutliple={false}
          onClick={this.handleClickMenu}
          popupVisible={popupVisible}
          onMouseEnter={this._onMouseEnterContainer}
          onMouseMove={this._onMouseMouveContainer}
          onMouseLeave={this._onMouseLeaveContainer}
          onMouseDown={this._onMouseDownContainer}
          data={data}
          offsetX={1}
          offsetY={0}
          handleItemWrap={this.handleItemWrap}
        />
      </Theme>
    );
  };
}
