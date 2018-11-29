/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { createPortal } from 'react-dom';
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
} from '../css/drawer';

export const DrawerContext = React.createContext();

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
        getTheme,
        maskClosable = true,
      } = this.props;
      const Doms = (
        <Drawer visible={visible}>
          {mask ? <DrawerMask onClick={this.handleMaskClick} visible={visible} /> : null}
          <DrawerContentWrap
            theme={getTheme()}
            placement={placement}
            open={open}
            opening={opening}
            closing={closing}
            transform={transform}
          >
            <DrawerContent>
              <DrawerContentHeader>{title}</DrawerContentHeader>
              {closable || !maskClosable ? (
                <DrawerClose>
                  <CloseText onClick={this.handleClose}>
                    <Icon iconClass="lugia-icon-reminder_close" />
                  </CloseText>
                </DrawerClose>
              ) : null}
              <DrawerContentMain>{children}</DrawerContentMain>
            </DrawerContent>
          </DrawerContentWrap>
        </Drawer>
      );
      return createPortal(
        <DrawerContext.Consumer>
          {context => {
            if (!context) {
              return (
                <DrawerContext.Provider value={{ level: 0, clickLevel0: this.handleTransform }}>
                  {Doms}
                </DrawerContext.Provider>
              );
            }
            this.fatherLevel = context.level;
            context.level += 1;
            context[this.getLevelSymbol(context.level)] = this.handleTransform;

            if (open && !this.isOpen) {
              context[this.getLevelSymbol(this.fatherLevel)](true);
              this.isOpen = true;
              this.isClose = false;
            }
            if (closing && !this.isClose) {
              context[this.getLevelSymbol(this.fatherLevel)](false);
              this.isOpen = false;
              this.isClose = true;
            }
            return Doms;
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
  },
  Widget.Drawer
);
