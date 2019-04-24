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
  getTabpaneCursor,
  getTabpaneHeight,
} from '../css/tabs';

import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import { isVertical, matchType } from './utils';
import { ObjectUtils } from '@lugia/type-utils';

const em = px2emcss(1.2);

const BaseTab = styled.div`
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  ${getTabpaneCursor};
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
  line-height: ${getTabpaneHeight};
  height: ${getTabpaneHeight};
  ${getTabpanePadding};
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
  height: ${getTabpaneHeight};
  line-height: ${getTabpaneHeight};
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
  suffixIcon: string,
  tabType: TabType,
  tabPosition: TabPositionType,
  activityValue: string,
  isSelect: boolean,
  disabled: boolean,
  onClick: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  getTabpaneWidth: Function,
  getTheme: Function,
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
    const { title, tabType, tabPosition, isSelect, disabled } = this.props;
    if (matchType(tabType, 'line') && isVertical(tabPosition)) {
      return (
        <VTab
          tabPosition={tabPosition}
          onClick={this.handleClick}
          isSelect={isSelect}
          disabled={disabled}
        >
          <Title isSelect={isSelect} disabled={disabled}>
            {title}
          </Title>
        </VTab>
      );
    }
    return this.getHTabpane();
  }

  getHTabpane() {
    const { title, tabType, isSelect, icon, suffixIcon, disabled, getTheme } = this.props;
    const Target = (
      <HTab
        disabled={disabled}
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        innerRef={cmp => (this.tabpane = cmp)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        theme={getTheme()}
      >
        {this.getTabIconContainer(icon)}
        <Title
          hasPreIcon={this.getTabIconContainer(icon) !== null}
          hasSuffixIcon={this.getTabIconContainer(suffixIcon) !== null}
          tabType={tabType}
          isSelect={isSelect}
          disabled={disabled}
          theme={getTheme()}
        >
          {title}
        </Title>
        {this.getTabIconContainer(suffixIcon, 'suffix')}
        {this.getClearButton()}
      </HTab>
    );
    return Target;
  }

  componentDidMount() {
    this.getContainerWidth();
  }

  handleClick = () => {
    const { activityValue, onClick, disabled } = this.props;
    if (!disabled) onClick && onClick(activityValue);
  };

  getTabIconContainer(icon, type) {
    return icon ? <IconContainer>{this.getIcon(icon)}</IconContainer> : null;
  }
  getIcon(icon) {
    const { isSelect, disabled } = this.props;
    if (ObjectUtils.isString(icon)) {
      return <TabIcon isSelect={isSelect} iconClass={icon} disabled={disabled} />;
    }
    return icon;
  }
  onDeleteClick = (e: Event) => {
    const { onDeleteClick, activityValue } = this.props;
    onDeleteClick && onDeleteClick(e, activityValue);
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
  onMouseEnter = (e: Object) => {
    const { onMouseEnter, activityValue } = this.props;
    onMouseEnter && onMouseEnter(activityValue);
  };
  onMouseLeave = (e: Object) => {
    const { onMouseLeave, activityValue } = this.props;
    onMouseLeave && onMouseLeave(activityValue);
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
