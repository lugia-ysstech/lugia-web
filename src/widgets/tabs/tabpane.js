/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import type { TabType, TabPositionType } from '../css/tabs';
import {
  getClearButtonColor,
  getTabpaneHoverColor,
  getTabpaneIconHoverColor,
  getSelectColor,
  getTabpaneFocusShadow,
  getTitlePadding,
  getTabpanePadding,
  getTabpaneBackground,
  getTabpaneBorder,
  getTabpaneMarginRight,
  getTabpaneBorderTopRadius,
  getTabpaneHoverTransform,
  getTabpaneBottom,
  getTabpaneLeft,
  getClearButtonShow,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import { isVertical, matchTab } from './utils';

const em = px2emcss(1.2);

const BaseTab = styled.div`
  position: relative;
  cursor: pointer;
  white-space: nowrap;
`;
const VTab = BaseTab.extend`
  text-align: ${props => (matchTab(props.tabPosition, 'left') ? 'right' : 'left')};
  padding: 0 ${em(10)};
  display: block;
  &:hover > div {
    ${getTabpaneHoverColor};
  }
`;
VTab.displayName = 'yTabpane';
const HTab = BaseTab.extend`
  display: inline-block;
  ${getTabpanePadding};
  line-height: ${em(30)};
  ${getTabpaneFocusShadow};
  ${getTabpaneBorderTopRadius};
  ${getTabpaneBottom};
  ${getTabpaneLeft};
  ${getTabpaneBackground};
  ${getTabpaneBorder};
  ${getTabpaneMarginRight};
  z-index: 5;
  box-sizing: border-box;
  &:hover > div {
    ${getTabpaneHoverTransform};
    ${getTabpaneHoverColor};
  }

  &:hover > span > i:first-child {
    ${getTabpaneIconHoverColor};
  }
`;
HTab.displayName = 'hTabpane';
const Title = styled.div`
  ${getSelectColor};
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  user-select: none;
  text-align: left;
  ${getTitlePadding};
  height: ${em(32)};
  line-height: ${em(32)};
  &:focus {
    ${getTabpaneHoverColor};
  }
`;

const TabIcon: Object = styled(Icon)`
  ${getSelectColor};
  display: inline-block;
`;
const IconContainer = styled.span`
  display: inline-block;
  height: ${em(12)};
  width: ${em(12)};
`;
const ClearButtonContainer = styled.span`
  ${getClearButtonShow};
  transition: all 0.3s linear 0.1s;
  z-index: 2;
  display: inline-block;
`;

const ClearButton: Object = styled(Icon)`
  font-size: 1rem;
  &:hover {
    ${getClearButtonColor};
  }
`;
type TabpaneState = {
  clearButtonShow: boolean,
  iconClass: string,
};

type TabpaneProps = {
  title: string,
  onDeleteClick: Function,
  icon: string,
  tabType: TabType,
  tabPosition: TabPositionType,
  activityKey: string,
  isSelect: boolean,
  onClick: Function,
  getTabpaneWidth: Function,
};

class Tabpane extends Component<TabpaneProps, TabpaneState> {
  static defaultProps = {};
  static displayName = Widget.Tabpane;
  tabpane: any;
  offsetWidth: number;

  constructor(props: TabpaneProps) {
    super(props);
    this.tabpane = React.createRef();
    this.offsetWidth = 0;
  }

  static getDerivedStateFromProps(nextProps: TabpaneProps, state: TabpaneState) {
    if (!state) {
      return {
        clearButtonShow: false,
        iconClass: 'lugia-icon-reminder_close',
      };
    }
  }

  render() {
    const { title, tabType, tabPosition, isSelect } = this.props;
    if (matchTab(tabType, 'line') && isVertical(tabPosition)) {
      return (
        <VTab tabPosition={tabPosition} onClick={this.handleClick} isSelect={isSelect}>
          <Title isSelect={isSelect}>{title}</Title>
        </VTab>
      );
    }
    return (
      <HTab
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        innerRef={cmp => (this.tabpane = cmp)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.getTabIcon()}
        <Title isHasIcon={this.getTabIcon() !== null} tabType={tabType} isSelect={isSelect}>
          {title}
        </Title>
        {this.getClearButton()}
      </HTab>
    );
  }
  componentDidMount() {
    this.getContainerWidth();
  }

  onMouseEnter = () => {
    this.setState({ clearButtonShow: true });
  };

  onMouseLeave = () => {
    this.setState({ clearButtonShow: false });
  };

  handleClick = () => {
    const { activityKey, onClick } = this.props;
    onClick && onClick(activityKey);
  };
  getTabIcon() {
    const { icon, isSelect } = this.props;
    if (icon) {
      return (
        <IconContainer>
          <TabIcon isSelect={isSelect} iconClass={icon} />
        </IconContainer>
      );
    }
    return null;
  }
  onDeleteClick = (e: Event) => {
    const { onDeleteClick, activityKey } = this.props;
    onDeleteClick && onDeleteClick(e, activityKey);
  };
  getClearButton() {
    const { tabType } = this.props;
    const { clearButtonShow, iconClass } = this.state;
    if (!matchTab(tabType, 'line')) {
      return (
        <ClearButtonContainer
          onMouseEnter={this.clearButtonMouseEnter}
          onMouseLeave={this.clearButtonMouseLeave}
          onClick={this.onDeleteClick}
          tabType={tabType}
          show={clearButtonShow}
        >
          <ClearButton iconClass={iconClass} />
        </ClearButtonContainer>
      );
    }
    return null;
  }
  clearButtonMouseEnter = () => {
    this.setState({ iconClass: 'lugia-icon-reminder_close_circle' });
  };
  clearButtonMouseLeave = () => {
    this.setState({ iconClass: 'lugia-icon-reminder_close' });
  };

  getContainerWidth() {
    const { getTabpaneWidth } = this.props;
    if (this.tabpane) {
      this.offsetWidth = this.tabpane.offsetWidth;
    }
    getTabpaneWidth && getTabpaneWidth(this.offsetWidth);
  }
}

const TargetTabpano = ThemeProvider(KeyBoardEventAdaptor(Tabpane), Widget.Tabpane);
export default TargetTabpano;
