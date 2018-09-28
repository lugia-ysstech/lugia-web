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
  getClearButtonHoverColor,
  getHoverColor,
  getColor,
  getFocusShadow,
  matchTabType,
  getTitlePadding,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import { isVertical } from './utils';

const em = px2emcss(1.2);

const BaseTab = styled.div`
  position: relative;
  cursor: pointer;
  white-space: nowrap;
`;
const VTab = BaseTab.extend`
  text-align: ${props => (props.tabPosition === 'left' ? 'right' : 'left')};
  padding: 0 ${em(10)};
  display: block;
`;
const HTab = BaseTab.extend`
  display: inline-block;
  height: ${em(32)};
  padding: 0 ${em(20)};
  line-height: ${em(32)};
  background: ${props =>
    (matchTabType(props.tabType, 'card') && props.isSelect ? 'white' : 'none')};
  border-top-left-radius: ${props =>
    (matchTabType(props.tabType, 'card') && props.isSelect ? em(5) : 0)};
  border-top-right-radius: ${props =>
    (matchTabType(props.tabType, 'card') && props.isSelect ? em(5) : 0)};
  ${getFocusShadow};
  bottom: ${props => (matchTabType(props.tabType, 'card') ? em(-6) : 0)};
  left: ${props => (matchTabType(props.tabType, 'card') ? em(6) : 0)};
  z-index: 3;
`;
const Title = styled.span`
  ${getColor};
  &:hover {
    ${getHoverColor};
  }

  position: relative;
  box-sizing: border-box;
  user-select: none;
  text-align: left;
  ${getTitlePadding};
  height: ${em(32)};
  line-height: ${em(32)};
`;

const TabIcon: Object = styled(Icon)`
  ${getColor};
  display: inline-block;
  &:hover {
    ${getHoverColor};
  }
`;

const ClearButton: Object = styled(Icon)`
  z-index: 2;
  font-size: 1rem;
  ${getClearButtonColor};
  &:hover {
    ${getClearButtonHoverColor};
  }

  display: inline-block;
`;
type TabsState = {};

type TabsProps = {
  title: string,
  onDeleteClick: Function,
  icon: string,
  tabType: TabType,
  tabPosition: TabPositionType,
  activityKey: number,
  isSelect: boolean,
  onClick: Function,
  getTabpaneWidth: Function,
};

class Tabpane extends Component<TabsProps, TabsState> {
  static defaultProps = {};
  static displayName = Widget.Tabpano;
  ref: any;
  offsetWidth: number;

  constructor(props: TabsProps) {
    super(props);
    this.ref = React.createRef();
    this.offsetWidth = 0;
  }

  static getDerivedStateFromProps(nextProps: TabsProps, state: TabsState) {}

  render() {
    const { title, tabType, tabPosition, isSelect } = this.props;

    if (matchTabType(tabType, 'line') && isVertical(tabPosition)) {
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
        innerRef={cmp => (this.ref = cmp)}
      >
        {this.getTabIcon()}
        <Title icon={this.getTabIcon()} tabType={tabType} isSelect={isSelect}>
          {title}
        </Title>
        {this.getClearButton()}
      </HTab>
    );
  }
  handleClick = () => {
    const { activityKey, onClick } = this.props;
    onClick && onClick(activityKey);
  };
  getTabIcon() {
    const { icon, isSelect } = this.props;
    if (icon) {
      return (
        <span style={{ display: 'inline-block', height: '12px', width: '12px' }}>
          <TabIcon isSelect={isSelect} iconClass={icon} />
        </span>
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
    if (matchTabType(tabType, 'card')) {
      return <ClearButton iconClass="lugia-icon-reminder_close" onClick={this.onDeleteClick} />;
    }
  }

  componentDidMount() {
    this.getContainerWidth();
  }

  getContainerWidth() {
    const { getTabpaneWidth } = this.props;
    if (this.ref) {
      this.offsetWidth = this.ref.offsetWidth;
    }
    getTabpaneWidth && getTabpaneWidth(this.offsetWidth);
  }
}

const TargetTabpano = ThemeProvider(KeyBoardEventAdaptor(Tabpane), Widget.Tabpano);
export default TargetTabpano;
