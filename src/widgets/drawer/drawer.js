/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { deepMerge } from '@lugia/object-utils';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import Icon from '../icon';
import type { DrawerProps, DrawerState } from '../css/drawer';
import {
  Drawer,
  DrawerMask,
  DrawerContentWrap,
  DrawerContent,
  DrawerContentHeader,
  DrawerContentMain,
  DrawerClose,
  CloseText,
  HandleWrap,
  getIconTransfrom,
} from '../css/drawer';

export const DrawerContext: Object = React.createContext();

DrawerMask.displayName = 'DrawerMask';
CloseText.displayName = 'CloseText';

export default ThemeProvider(
  class extends React.Component<DrawerProps, DrawerState> {
    static displayName = 'Drawer';
    node: any;
    isOpen: boolean;
    isClose: boolean;
    fatherLevel: number;

    constructor(props) {
      super(props);
      this.state = {
        open: false,
        opening: false,
        closing: false,
        transform: false,
      };
      this.isOpen = false;
      this.isClose = false;
      this.node = null;
      if (typeof window !== 'undefined') {
        const doc = window && window.document;
        if (doc) {
          this.node = doc.createElement('div');
          doc.body && doc.body.appendChild(this.node);
        }
      }
    }
    static getDerivedStateFromProps(props, state) {
      const { visible } = props;
      const { open: stateOpen } = state;
      const hasOpen = 'visible' in props;
      const theOpen = hasOpen ? visible : state ? stateOpen : false;
      const result: Object = {
        open: theOpen,
      };
      if (hasOpen) {
        result.closing = stateOpen === true && theOpen === false;
        result.opening = stateOpen === false && theOpen === true;
      }
      return result;
    }

    componentWillUnmount() {
      if (window.document) {
        window.document.body.removeChild(this.node);
      }
    }

    getIconTheme = () => {
      const { getPartOfThemeHocProps, visible, placement } = this.props;
      const { viewClass, theme } = getPartOfThemeHocProps('HandleIcon');
      const iconTheme = deepMerge(
        {
          [viewClass]: {
            Icon: {
              normal: {
                color: '#333',
                font: {
                  size: 12,
                },
                getCSS() {
                  return `
                  ${getIconTransfrom(visible, placement)}
                  `;
                },
              },
            },
          },
        },
        theme
      );
      return { viewClass, theme: iconTheme };
    };

    render() {
      if (!this.node) {
        return null;
      }
      const { open, closing, opening, transform } = this.state;
      const {
        visible,
        children,
        closable = false,
        title,
        mask = true,
        placement,
        maskClosable = true,
        getPartOfThemeProps,
        injectLugiad: { type } = {},
        __lugiad__header__absolute__,
        handle = false,
      } = this.props;
      const drawerWrapTheme = getPartOfThemeProps('Container');
      const handleWrapTheme = getPartOfThemeProps('handleWrap');
      const { themeConfig } = drawerWrapTheme;
      const defaultTheme =
        placement === 'top' || placement === 'bottom' ? { width: '100%' } : { height: '100%' };
      drawerWrapTheme.themeConfig.normal = deepMerge(themeConfig.normal, defaultTheme);
      const hasCloseIcon = closable || !maskClosable;
      const closeIcon = hasCloseIcon ? (
        <DrawerClose>
          <CloseText onClick={this.handleClose}>
            <Icon iconClass="lugia-icon-reminder_close" />
          </CloseText>
        </DrawerClose>
      ) : null;
      const drawerContent = (
        <DrawerContentWrap
          type={type}
          themeProps={drawerWrapTheme}
          placement={placement}
          open={open}
          opening={opening}
          closing={closing}
          transform={transform}
        >
          {handle ? (
            <HandleWrap
              themeProps={handleWrapTheme}
              placement={placement}
              visible={visible}
              onClick={this.changeVisibleState}
            >
              <Icon iconClass={'lugia-icon-direction_right'} {...this.getIconTheme()} />
            </HandleWrap>
          ) : null}
          <DrawerContent>
            <DrawerContentHeader
              __lugiad__header__absolute__={__lugiad__header__absolute__}
              type={type}
            >
              {title}
            </DrawerContentHeader>
            {closeIcon}
            {__lugiad__header__absolute__ ? (
              children
            ) : (
              <DrawerContentMain>{children}</DrawerContentMain>
            )}
          </DrawerContent>
        </DrawerContentWrap>
      );
      if (type === 'Drawer') {
        return drawerContent;
      }
      const maskElement = mask ? (
        <DrawerMask onClick={this.handleMaskClick} visible={visible} />
      ) : null;

      const drawer = (
        <Drawer visible={visible}>
          {maskElement}
          {drawerContent}
        </Drawer>
      );
      return createPortal(
        <DrawerContext.Consumer>
          {context => {
            if (!context) {
              return (
                <DrawerContext.Provider value={{ level: 0, clickLevel0: this.handleTransform }}>
                  {drawer}
                </DrawerContext.Provider>
              );
            }

            const { level: ctxLevel } = context;
            this.fatherLevel = ctxLevel;
            const selfLevel = ctxLevel + 1;
            context[this.getLevelSymbol(selfLevel)] = this.handleTransform;
            const transform = context[this.getLevelSymbol(this.fatherLevel)];
            if (open && !this.isOpen) {
              transform(true);
              this.isOpen = true;
              this.isClose = false;
            }
            if (closing && !this.isClose) {
              transform(false);
              this.isOpen = false;
              this.isClose = true;
            }
            context.level = selfLevel;
            return drawer;
          }}
        </DrawerContext.Consumer>,
        this.node
      );
    }

    getLevelSymbol(level: string | number): string {
      return 'clickLevel' + level;
    }
    handleTransform = (transform: boolean) => {
      this.setState({
        transform,
      });
    };

    handleMaskClick = () => {
      const { onClose, maskClosable = true } = this.props;
      if (maskClosable) {
        onClose && onClose();
      }
    };
    handleClose = () => {
      const { onClose } = this.props;
      onClose && onClose();
    };
    changeVisibleState = () => {
      const { onToggle } = this.props;
      onToggle && onToggle();
    };
  },
  Widget.Drawer
);
