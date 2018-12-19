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
  getButtonShow,
  getClearButtonOpacity,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import { isVertical, matchType } from './utils';

const em = px2emcss(1.2);

const BaseTab = styled.div`
  position: relative;
  cursor: pointer;
  white-space: nowrap;
`;
const VTab = BaseTab.extend`
  text-align: ${props => (matchType(props.tabPosition, 'left') ? 'right' : 'left')};
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

  &:hover > span {
    ${getButtonShow};
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
  transition: all 0.3s linear 0.1s;
  z-index: 2;
  display: inline-block;
  ${getClearButtonOpacity};
`;
const ClearIcon: Object = styled(Icon)`
  font-size: 1rem;
  &:hover {
    ${getClearButtonColor};
  }
`;
ClearIcon.displayName = 'deleteIcon';
type TabpaneState = {
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
        iconClass: 'lugia-icon-reminder_close',
      };
    }
  }

  render() {
    const { title, tabType, tabPosition, isSelect } = this.props;
    if (matchType(tabType, 'line') && isVertical(tabPosition)) {
      return (
        <VTab tabPosition={tabPosition} onClick={this.handleClick} isSelect={isSelect}>
          <Title isSelect={isSelect}>{title}</Title>
        </VTab>
      );
    }
    return this.getHTabpane();
  }

  getHTabpane() {
    const { title, tabType, isSelect } = this.props;
    const Target = (
      <HTab
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        innerRef={cmp => (this.tabpane = cmp)}
      >
        {this.getTabIcon()}
        <Title isHasIcon={this.getTabIcon() !== null} tabType={tabType} isSelect={isSelect}>
          {title}
        </Title>
        {this.getClearButton()}
      </HTab>
    );
    return Target;
  }

  componentDidMount() {
    this.getContainerWidth();
  }

  handleClick = () => {
    const { activityKey, onClick } = this.props;
    onClick && onClick(activityKey);
  };
  getTabIcon() {
    const { icon, isSelect } = this.props;
    return icon ? (
      <IconContainer>
        <TabIcon isSelect={isSelect} iconClass={icon} />
      </IconContainer>
    ) : null;
  }
  onDeleteClick = (e: Event) => {
    const { onDeleteClick, activityKey } = this.props;
    onDeleteClick && onDeleteClick(e, activityKey);
  };
  getClearButton() {
    const { tabType } = this.props;
    const { iconClass } = this.state;
    if (!matchType(tabType, 'line')) {
      return (
        <ClearButtonContainer
          onMouseEnter={this.clearButtonMouseEnter}
          onMouseLeave={this.clearButtonMouseLeave}
          onClick={this.onDeleteClick}
          tabType={tabType}
        >
          <ClearIcon iconClass={iconClass} />
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
    if (this.tabpane) {
      this.offsetWidth = this.tabpane.offsetWidth;
    }
    const { getTabpaneWidth } = this.props;
    getTabpaneWidth && getTabpaneWidth(this.offsetWidth);
  }
}

const TargetTabpano = ThemeProvider(KeyBoardEventAdaptor(Tabpane), Widget.Tabpane);
export default TargetTabpano;
