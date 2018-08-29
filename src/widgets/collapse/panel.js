/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { PanelProps, PanelState } from '../css/panel';
import { PanelWrap, PanelHeader, PanelContentWrap, PanelContent, IconWrap } from '../css/panel';

PanelHeader.displayName = 'Panel';

export default ThemeProvider(
  class extends React.Component<PanelProps, PanelState> {
    panel: any;
    static getDerivedStateFromProps(props, state) {
      return {
        open: !!props.open,
      };
    }
    // shouldComponentUpdate(nextProps,nextState){
    //   if(nextState.open !== this.state.open){
    //     console.info('aaa');
    //     this.handlePanelClick();
    //   }
    //   return true;
    // }
    render() {
      const { open } = this.state;
      const { disabled = false, header, children, getTheme } = this.props;
      return (
        <PanelWrap style={this.props.style} themes={getTheme()}>
          <PanelHeader disabled={disabled} onClick={this.handlePanelClick}>
            <IconWrap open={open} iconClass="lugia-icon-direction_caret_right" />
            {header}
          </PanelHeader>
          <PanelContentWrap ref={(node: any) => (this.panel = node)} open={open}>
            <PanelContent disabled={disabled}>{children}</PanelContent>
          </PanelContentWrap>
        </PanelWrap>
      );
    }
    handlePanelClick = () => {
      const { disabled = false, hasValue = false, value, onChange } = this.props;
      if (!disabled) {
        onChange && onChange(value);
        if (!hasValue) {
          const panelRef: any = ReactDOM.findDOMNode(this.panel);
          const panelStyle = panelRef.style;
          const panelDom = document.defaultView.getComputedStyle(panelRef, null);
          const height = panelDom.height;
          panelStyle.transition = 'none';
          panelStyle.height = 'auto';
          const targetHeight = document.defaultView.getComputedStyle(panelRef, null).height;
          panelStyle.transition = 'height 300ms';
          panelStyle.height = height === '0px' ? '0px' : targetHeight;
          panelRef.offsetWidth; //触发浏览器重排
          panelStyle.height = height === '0px' ? targetHeight : '0px';
          this.setState({
            open: !this.state.open,
          });
        }
      }
    };
  },
  Widget.Panel
);
