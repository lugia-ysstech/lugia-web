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
  matchTabPosition,
  matchTabType,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';

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
  padding: 0 ${em(15)};
  line-height: ${em(32)};
  background: ${props => (props.tabType === 'card' && props.isSelect ? 'white' : 'none')};
  border-top-left-radius: ${props => (props.tabType === 'card' && props.isSelect ? em(5) : 0)};
  border-top-right-radius: ${props => (props.tabType === 'card' && props.isSelect ? em(5) : 0)};
  ${getFocusShadow};
  bottom: ${props => (props.tabType === 'card' ? em(-6) : 0)};
  left: ${props => (props.tabType === 'card' ? em(6) : 0)};
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
  padding: 0 ${em(10)};
  padding-right: ${em(20)};
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
type TabsState = {|
  activityKey: string,
  tabs: Array<Object>,
|};

type TabsProps = {
  tab: string,
  onDelClick: Function,
  icon: string,
  tabType: TabType,
  tabPosition: TabPositionType,
  activityKey: number,
  isSelect: boolean,
  onClick: Function,
  handleWidth: Function,
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
    const { tab, tabType, tabPosition, isSelect } = this.props;

    if (
      matchTabType(tabType, 'line') &&
      (matchTabPosition(tabPosition, 'left') || matchTabPosition(tabPosition, 'right'))
    ) {
      return (
        <VTab tabPosition={tabPosition} onClick={this.handleClick} isSelect={isSelect}>
          <Title isSelect={isSelect}>{tab}</Title>
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
        <Title isSelect={isSelect}>{tab}</Title>
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
      return <TabIcon isSelect={isSelect} iconClass={icon} />;
    }
    return null;
  }
  onDelClick = () => {
    const { onDelClick, activityKey } = this.props;
    onDelClick && onDelClick(activityKey);
  };
  getClearButton() {
    const { tabType } = this.props;
    if (matchTabType(tabType, 'card')) {
      return <ClearButton iconClass="lugia-icon-reminder_close" onClick={this.onDelClick} />;
    }
  }

  componentDidMount() {
    this.getContainerWidth();
  }

  componentDidUpdate() {
    this.getContainerWidth();
  }

  getContainerWidth() {
    const { handleWidth } = this.props;
    if (this.ref) {
      this.offsetWidth = this.ref.offsetWidth;
    }
    handleWidth && handleWidth(this.offsetWidth);
  }
}

const TargetTabpano = ThemeProvider(KeyBoardEventAdaptor(Tabpane), Widget.Tabpano);
export default TargetTabpano;
