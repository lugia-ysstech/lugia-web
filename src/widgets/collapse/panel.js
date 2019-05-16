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
  HoverIconWrap,
  IconWrap,
  PanelContent,
  PanelContentWrap,
  PanelHeader,
  PanelWrap,
  Wrap,
} from '../css/panel';

PanelHeader.displayName = 'Panel';

export default ThemeProvider(
  class extends React.Component<PanelProps, PanelState> {
    panel: any;
    header: any;
    height: number;

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
      this.height = 0;
    }

    static getDerivedStateFromProps(props, state) {
      const { open, defaultOpen } = props;
      const hasOpen = 'open' in props;
      const { open: stateOpen } = state;
      const theOpen = hasOpen ? open : state ? stateOpen : defaultOpen;
      const result: Object = {
        open: theOpen,
      };
      if (hasOpen) {
        result.closing = stateOpen === true && theOpen === false;
        result.opening = stateOpen === false && theOpen === true;
      }
      return result;
    }

    componentDidMount() {
      this.height = this.panel && this.panel.scrollHeight;
      const headerHeight = this.header && this.header.scrollHeight;
      this.setState({
        headerHeight,
      });
    }

    render() {
      const { opening, closing, open, hover, headerHeight } = this.state;
      const { disabled = false, title, children, getTheme, showArrow = true } = this.props;
      const config = {};
      if (!showArrow) {
        config.onMouseMove = this.changeHover(true);
        config.onMouseLeave = this.changeHover(false);
      }
      return (
        <Wrap hover={hover} theme={getTheme()} {...config}>
          <PanelWrap hover={hover} theme={getTheme()} {...config}>
            <PanelHeader
              disabled={disabled}
              showArrow={showArrow}
              theme={getTheme()}
              onClick={this.handlePanelClick}
              ref={(node: any) => (this.header = node)}
            >
              {showArrow ? (
                <IconWrap
                  open={open}
                  iconClass="lugia-icon-direction_caret_right"
                  opening={opening}
                  closing={closing}
                />
              ) : null}
              {title}
              <HoverIconWrap
                theme={getTheme()}
                hover={hover}
                open={open}
                headerHeight={headerHeight}
                height={this.height}
                opening={opening}
                closing={closing}
              >
                <IconWrap
                  open={open}
                  iconClass="lugia-icon-direction_caret_right"
                  opening={opening}
                  closing={closing}
                />
              </HoverIconWrap>
            </PanelHeader>
            <PanelContentWrap
              ref={(node: any) => (this.panel = node)}
              open={open}
              opening={opening}
              closing={closing}
              height={this.height}
              disabled={disabled}
              theme={getTheme()}
              hover={hover}
            >
              <PanelContent showArrow={showArrow} hover={hover} hasChildren={!!children}>
                {children}
              </PanelContent>
            </PanelContentWrap>
          </PanelWrap>
        </Wrap>
      );
    }

    changeHover = hover => () => {
      this.setState({
        hover,
      });
    };

    handlePanelClick = (e: Event) => {
      const { disabled = false, value, onClick } = this.props;
      if (!disabled) {
        const height = this.panel.scrollHeight;
        const { opening, closing, open } = this.state;
        if (!this.hasOpen() && (opening || closing)) {
          return;
        }
        this.height = height;
        const reset: Object = {
          closing: false,
          opening: false,
        };

        if (!this.hasOpen()) {
          this.setState(this.getClickState(open));
          setTimeout(() => {
            reset.open = !open;
            this.setState(reset);
            onClick && onClick(value);
          }, 300);
        } else {
          onClick && onClick(value);
        }
      }
      e.preventDefault();
    };
    hasOpen = () => 'open' in this.props;

    componentDidUpdate() {
      const { opening, closing } = this.state;
      this.height = this.panel && this.panel.scrollHeight;
      if (this.hasOpen() && (opening === true || closing === true)) {
        setTimeout(() => {
          this.setState({
            opening: false,
            closing: false,
          });
        }, 300);
      }
    }

    getClickState = (open: boolean): Object => {
      if (open) {
        return { closing: true };
      }
      return { opening: true };
    };
  },
  Widget.Panel
);
