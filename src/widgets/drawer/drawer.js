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

export default ThemeProvider(
  class extends React.Component<DrawerProps, DrawerState> {
    static displayName = 'Drawer';
    node: any;
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        opening: false,
        closing: false,
      };
      const doc = window && window.document;
      if (doc) {
        this.node = doc.createElement('div');
        doc.body && doc.body.appendChild(this.node);
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
      const { open, closing, opening } = this.state;
      const {
        visible,
        children,
        closable = false,
        title,
        mask = true,
        placement,
        getTheme,
      } = this.props;
      return createPortal(
        <Drawer visible={visible}>
          {mask ? <DrawerMask onClick={this.handleMaskClick} visible={visible} /> : null}
          <DrawerContentWrap
            theme={getTheme()}
            placement={placement}
            open={open}
            opening={opening}
            closing={closing}
          >
            <DrawerContent>
              <DrawerContentHeader>{title}</DrawerContentHeader>
              {closable ? (
                <DrawerClose>
                  <CloseText onClick={this.handleClose}>
                    <Icon iconClass="lugia-icon-reminder_close" />
                  </CloseText>
                </DrawerClose>
              ) : null}
              <DrawerContentMain>{children}</DrawerContentMain>
            </DrawerContent>
          </DrawerContentWrap>
        </Drawer>,
        this.node
      );
    }

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
