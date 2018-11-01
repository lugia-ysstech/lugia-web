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
import ThemeProvider from '../theme-provider';

const CascaderContainer = styled.div`
  display: inline-block;
  position: relative;
`;

class Cascader extends React.Component<any, any> {
  static defaultProps = {
    getTheme: () => {
      return {};
    },
  };
  constructor(props: any) {
    super(props);
    this.state = { popupVisible: false, checked: false, mouseInTarget: false };
  }

  render() {
    const { props, state } = this;
    const { popupVisible } = state;
    const { getTheme } = props;
    const theme = getTheme();
    const { width = 200, offsetY = 0 } = theme;
    return (
      <CascaderContainer
        onMouseEnter={this.onMouseEnterContainer}
        onMouseLeave={this.onMouseLeaveContainer}
      >
        <Theme config={{ [Widget.InputTag]: { width } }}>
          <Trigger
            ref={cmp => (this.trigger = cmp)}
            align={'bottomLeft'}
            offsetY={offsetY}
            popupVisible={popupVisible}
            popup={this.getMenu(theme)}
          >
            <InputTag onClick={this.handleClickInputTag} mutliple={false} />
          </Trigger>
        </Theme>
      </CascaderContainer>
    );
  }

  handleClickInputTag = () => {
    const { checked, mouseInTarget } = this.state;

    if (checked) {
      this.setState({ checked: false });
      return;
    }

    this.setState({ popupVisible: true, checked: true });
  };

  getMenu = (theme: Object) => {
    const { data, action } = this.props;
    const { popupVisible } = this.state;
    const { menuWidth = 150, offsetX } = theme;
    console.log('offsetX', offsetX);
    return (
      <Theme config={{ [Widget.Menu]: { width: menuWidth } }}>
        <Menu
          mutliple={false}
          onClick={this.handleClickMenu}
          action={action}
          popupVisible={popupVisible}
          handleIsInMenu={this.handleIsInMenu}
          data={data}
          offsetX={offsetX}
          offsetY={0}
          handleItemWrap={this.handleItemWrap}
        />
      </Theme>
    );
  };

  handleIsInMenu = popupVisible => {
    const { checked, mouseInTarget } = this.state;
    if (!popupVisible) {
      if (checked && !mouseInTarget) {
        this.setState({ popupVisible, checked: false });
      }
      this.setState({ popupVisible });
    }
  };

  onMouseEnterContainer = () => {
    this.setState({ mouseInTarget: true });
  };

  onMouseLeaveContainer = () => {
    this.setState({ mouseInTarget: false });
  };
}

export default ThemeProvider(Cascader, Widget.Cascader);
