/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import { deepMerge } from '@lugia/object-utils';
import { addMouseEvent } from '@lugia/theme-hoc';
import Widget from '../consts/index';
import type { PanelProps, PanelState } from '../css/panel';
import {
  PanelHeaderText,
  IconWrap,
  PanelContent,
  PanelContentWrap,
  PanelHeader,
  PanelWrap,
  Wrap,
  getIconTransform,
} from '../css/panel';
import { px2remcss } from '../css/units';
import Icon from '../icon';

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

    getIconTheme = () => {
      const { getPartOfThemeHocProps } = this.props;
      const { opening, closing, open } = this.state;
      const { viewClass, theme } = getPartOfThemeHocProps('PanelHeaderIcon');
      const iconTheme = deepMerge(
        {
          [viewClass]: {
            normal: {
              color: '#666',
              fontSize: 14,
              getCSS() {
                return `position: absolute;
                  top: 50%;
                  left: ${px2remcss(10)};
                  transition: all 0.3s;
                  ${getIconTransform({ opening, open, closing })}
                `;
              },
            },
          },
        },
        theme
      );

      return { viewClass, theme: iconTheme };
    };

    render() {
      const { opening, closing, open, hover, headerHeight } = this.state;
      const {
        disabled = false,
        title,
        children,
        getTheme,
        showArrow = true,
        getPartOfThemeProps,
      } = this.props;
      const config = {};
      if (!showArrow) {
        config.enter = this.changeHover(true);
        config.leave = this.changeHover(false);
      }
      const PanelHeaderTheme = getPartOfThemeProps('PanelHeader', { props: { hover, showArrow } });
      const PanelHeaderTextTheme = getPartOfThemeProps('PanelHeaderText');
      const PanelContentTheme = getPartOfThemeProps('PanelContent');
      return (
        <Wrap hover={hover} theme={getTheme()} {...addMouseEvent(this, config)}>
          <PanelWrap hover={hover} theme={getTheme()} {...config}>
            <PanelHeader
              disabled={disabled}
              showArrow={showArrow}
              theme={getTheme()}
              hover={hover}
              themeProps={PanelHeaderTheme}
              onClick={this.handlePanelClick}
              z
              ref={(node: any) => (this.header = node)}
            >
              {showArrow || hover ? (
                <Icon iconClass="lugia-icon-direction_caret_right" {...this.getIconTheme()} />
              ) : null}
              <PanelHeaderText themeProps={PanelHeaderTextTheme}>{title}</PanelHeaderText>
            </PanelHeader>
            <PanelContentWrap
              ref={(node: any) => (this.panel = node)}
              open={open}
              opening={opening}
              closing={closing}
              height={this.height}
              disabled={disabled}
              hover={hover}
              headerHeight={headerHeight}
            >
              <PanelContent
                disabled={disabled}
                showArrow={showArrow}
                hover={hover}
                hasChildren={!!children}
                themeProps={PanelContentTheme}
              >
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
  Widget.Panel,
  { hover: true }
);
