/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { PanelProps, PanelState } from '../css/panel';
import { IconWrap, PanelContent, PanelContentWrap, PanelHeader, PanelWrap } from '../css/panel';

PanelHeader.displayName = 'Panel';

export default ThemeProvider(
  class extends React.Component<PanelProps, PanelState> {
    panel: any;

    constructor(props) {
      super(props);
      this.state = {
        open: false,
        opening: false,
        closing: false,
        height: 0,
      };
    }

    static getDerivedStateFromProps(props, state) {
      const { open, defaultOpen } = props;
      const hasOpen = 'open' in props;
      const theOpen = hasOpen ? open : state ? state.open : defaultOpen;

      return {
        open: theOpen,
      };
    }

    render() {
      const { opening, closing, height, open } = this.state;
      const { disabled = false, header, children, getTheme } = this.props;
      return (
        <PanelWrap themes={getTheme()}>
          <PanelHeader disabled={disabled} onClick={this.handlePanelClick}>
            <IconWrap
              open={open}
              iconClass="lugia-icon-direction_caret_right"
              opening={opening}
              closing={closing}
            />
            {header}
          </PanelHeader>
          <PanelContentWrap
            innerRef={(node: any) => (this.panel = node)}
            open={open}
            opening={opening}
            closing={closing}
            height={height}
          >
            <PanelContent disabled={disabled}>{children}</PanelContent>
          </PanelContentWrap>
        </PanelWrap>
      );
    }

    handlePanelClick = () => {
      const { disabled = false, value, onClick } = this.props;
      if (!disabled) {
        const height = this.panel.scrollHeight;
        const { opening, closing, open } = this.state;
        if (opening || closing) {
          return;
        }
        const hasOpen = 'open' in this.props;
        const reset: Object = {
          closing: false,
          opening: false,
          height,
        };

        this.setState(this.setClickState(open, height));
        setTimeout(() => {
          if (!hasOpen) {
            reset.open = !open;
          }
          this.setState(reset);
          onClick && onClick(value);
        }, 300);
      }
    };
    setClickState = (open: boolean, height: number): Object => {
      if (open) {
        return { closing: true, height };
      }
      return { opening: true, height };
    };
  },
  Widget.Panel
);
