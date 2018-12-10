/**
 *
 * create by liangguodong on 2018/12/5
 *
 * @flow
 */
import * as React from 'react';
import Tooltip from '../tooltip/index';
import Icon from '../icon/index';
import Widget from '../consts/index';
import styled from 'styled-components';
import { getDescripitionColor, getTitleColor } from '../css/card';
import { px2emcss } from '../css/units';
import { DirectionType } from '../css/tooltip';
import ThemeProvider from '../theme-provider';
import { ObjectUtils } from '@lugia/type-utils';

const em = px2emcss(1.2);

type PopoverProps = {
  description: React.Node,
  title: React.Node,
  content?: React.Node,
  operation: React.Node,
  getTheme?: Function,
  arrowPosition: DirectionType,
  action: 'hover' | 'click' | 'focus',
  children: React.Node,
  visible?: boolean,
  clear?: React.Node,
  defaultVisible: boolean,
};
type PopoverState = {
  visible: boolean,
};
const ClearContainer = styled.div`
  position: absolute;
  right: ${em(-2)};
  top: ${em(0)};
  width: ${em(15)};
  height: ${em(15)};
`;
const Clear = styled(Icon)`
  font-size: 12px;
`;
const Basetext = styled.div`
  text-align: inherit;
  white-space: nowrap;
  overflow: hidden;
`;
const Title = Basetext.extend`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  ${getTitleColor};
  margin-bottom: ${em(12)};
`;
const Descripition = Basetext.extend`
  font-size: 1.4rem;
  ${getDescripitionColor};
`;
const Content = styled.div`
  font-size: 1.2rem;
  display: inline-block;
  padding: ${em(6)} ${em(8)};
`;
const TooltipWrapper = styled(Tooltip)`
  font-size: 1.2rem;
  display: inline-block;
  position: relative;
`;
class Popover extends React.Component<PopoverProps, PopoverState> {
  static defaultProps = {
    defaultVisible: false,
    action: 'click',
  };
  target: Object;
  constructor(props: PopoverProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: PopoverProps, state: PopoverState) {
    const hasVisibleInprops = 'visible' in props;
    const hasDefaultVisibleInprops = 'defaultVisible' in props;
    if (!state) {
      const theVisible = hasVisibleInprops
        ? props.visible
        : hasDefaultVisibleInprops
        ? props.defaultVisible
        : state.visible
        ? state.visible
        : false;
      return { visible: theVisible };
    }
    if (hasVisibleInprops) {
      return { visible: props.visible };
    }
    return { visible: state.visible };
  }
  getTitle(): React.Node | null {
    const { title } = this.props;
    return title ? <Title>{title} </Title> : null;
  }
  getDescripition(): React.Node | null {
    const { description } = this.props;
    return description ? <Descripition>{description} </Descripition> : null;
  }
  getClose(): React.Node | null {
    const { clear } = this.props;
    if (ObjectUtils.isString(clear))
      return (
        <ClearContainer>
          <Clear iconClass={clear}> </Clear>
        </ClearContainer>
      );
    return clear;
  }
  getContent() {
    const { content, title, description } = this.props;
    if (content || title || description) {
      return (
        <Content>
          {content}
          {this.getClose()}
          {this.getTitle()}
          {this.getDescripition()}
        </Content>
      );
    }
    return null;
  }
  render() {
    const { children, action, arrowPosition, getTheme } = this.props;
    const getTarget: Function = cmp => (this.target = cmp);
    return (
      <TooltipWrapper
        visible={this.state.visible}
        action={action}
        onVisibleChange={this.onVisibleChange}
        theme={getTheme()}
        isPop={true}
        placement={arrowPosition}
        title={this.getContent()}
        ref={getTarget}
      >
        {children}
      </TooltipWrapper>
    );
  }
  onVisibleChange = (visible: boolean) => {
    const { onVisibleChange } = this.props;
    const hasVisibleInprops = 'visible' in this.props;
    const theVisible = hasVisibleInprops ? this.props.visible : visible;
    if (!hasVisibleInprops) {
      this.setState({ visible: theVisible });
    }
    onVisibleChange && onVisibleChange(visible);
  };
}
export default ThemeProvider(Popover, Widget.Popover);
