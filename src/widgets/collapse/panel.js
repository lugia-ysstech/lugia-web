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
import {
  IconWrap,
  PanelContent,
  PanelContentWrap,
  PanelHeader,
  PanelWrap,
  HoverIconWrap,
} from '../css/panel';

PanelHeader.displayName = 'Panel';

export default ThemeProvider(
  class extends React.Component<PanelProps, PanelState> {
    panel: any;
    header: any;
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        opening: false,
        closing: false,
        height: 0,
        hover: false,
        headerHeight: 0,
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

    componentDidMount() {
      const headerHeight = this.header.scrollHeight;
      this.setState({
        headerHeight,
      });
    }

    render() {
      const { opening, closing, height, open, hover, headerHeight } = this.state;
      const { disabled = false, header, children, getTheme, showArrow = true } = this.props;
      const config = {};
      if (!showArrow) {
        config.onMouseEnter = this.iconMouseEnter;
        config.onMouseLeave = this.iconMouseLeave;
      }
      return (
        <PanelWrap themes={getTheme()}>
          <PanelHeader
            disabled={disabled}
            showArrow={showArrow}
            onClick={this.handlePanelClick}
            {...config}
            innerRef={(node: any) => (this.header = node)}
          >
            {showArrow ? (
              <IconWrap
                open={open}
                iconClass="lugia-icon-direction_caret_right"
                opening={opening}
                closing={closing}
              />
            ) : null}
            {header}
            <HoverIconWrap headerHeight={headerHeight} hover={hover}>
              <IconWrap
                open={open}
                iconClass="lugia-icon-direction_caret_right"
                opening={opening}
                closing={closing}
              />
            </HoverIconWrap>
          </PanelHeader>
          <PanelContentWrap
            innerRef={(node: any) => (this.panel = node)}
            open={open}
            opening={opening}
            closing={closing}
            height={height}
            disabled={disabled}
            themes={getTheme()}
            hover={hover}
          >
            <PanelContent>{children}</PanelContent>
          </PanelContentWrap>
        </PanelWrap>
      );
    }

    iconMouseEnter = () => {
      this.setState({
        hover: true,
      });
    };

    iconMouseLeave = () => {
      this.setState({
        hover: false,
      });
    };

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
