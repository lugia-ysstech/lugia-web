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
import Theme from '../theme';
import type { ModalProps, ModalState } from '../css/modal';
import {
  getIconColor,
  IconInfo,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalMask,
  ModalTitle,
  ModalWrap,
  Wrap,
} from '../css/modal';
import Button from '../button';
import Icon from '../icon';
import { px2remcss } from '../css/units';
import { deepMerge } from '@lugia/object-utils';
import get from '../css/theme-common-dict';
import { getIndex } from '../utils/widget-zindex';
import { createPortal } from 'react-dom';

const BtnType = {
  confirm: 'warning',
  info: 'primary',
  success: 'success',
  error: 'danger',
  warning: 'warning',
};

export default ThemeProvider(
  class extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
      super(props);
      const { visible = false, zIndex } = props;
      if (!zIndex && zIndex !== 0) {
        this.index = visible ? getIndex() : undefined;
      }
      this.node = null;
    }

    static getDerivedStateFromProps(props, state) {
      const { visible = false } = props;
      const { visible: stateVisible } = state || {};
      const theClose = stateVisible === true && visible === false;
      const closing = state ? theClose : false;

      return {
        visible,
        closing,
        opening: visible,
      };
    }
    saveModalDom = el => {
      this.modalEle = el;
    };
    componentDidMount() {
      window.addEventListener('keydown', this.hideWindowPopUp, false);
    }
    componentWillUnmount() {
      window.removeEventListener('keydown', this.hideWindowPopUp, false);
    }
    hideWindowPopUp = e => {
      const { onCancel } = this.props;
      if (this.modalEle === document.activeElement && e.keyCode === 27) {
        if ('visible' in this.props) {
          onCancel && onCancel();
        } else {
          this.setState({
            visible: false,
            closing: true,
          });
        }
      }
    };

    componentDidUpdate() {
      const { closing } = this.state;
      if (closing === true) {
        setTimeout(() => {
          this.setState({
            closing: false,
          });
        }, 300);
      }
    }

    getCloseIconTheme = () => {
      const { getPartOfThemeHocProps } = this.props;
      const { viewClass, theme } = getPartOfThemeHocProps('ModalCloseIcon');
      const iconTheme = deepMerge(
        {
          [viewClass]: {
            normal: {
              fontSize: get('sFontSize'),
              color: get('mediumGreyColor'),
            },
            hover: {
              color: get('darkGreyColor'),
            },
            disabled: {
              color: get('disableTextColor'),
            },
          },
        },
        theme
      );

      return {
        viewClass,
        theme: iconTheme,
      };
    };

    getIconTheme = () => {
      const { getPartOfThemeHocProps, iconType = 'info' } = this.props;
      const { viewClass, theme } = getPartOfThemeHocProps('ModalIcon');
      const iconTheme = deepMerge(
        {
          [viewClass]: {
            normal: {
              fontSize: get('mFontSize'),
              color: getIconColor({ iconType }),
              getCSS() {
                return `
                  position: absolute;
                  left: ${px2remcss(22)};
                  top: ${px2remcss(28)};
                `;
              },
            },
          },
        },
        theme
      );

      return {
        viewClass,
        theme: iconTheme,
      };
    };

    render() {
      const {
        title,
        children,
        confirmLoading = false,
        cancelText = '取消',
        okText = '确定',
        footer = true,
        showIcon = false,
        iconType = 'info',
        mask = true,
        okButtonProps = {},
        cancelButtonProps = {},
        getPartOfThemeProps,
        getPartOfThemeHocProps,
        iconClass,
        injectLugiad: { type } = {},
        __lugiad__header__absolute__ = false,
        closable = true,
        closeIconClass,
        zIndex,
        mountBody = false,
      } = this.props;
      const { visible = false, closing, opening } = this.state;
      if (!zIndex && zIndex !== 0 && !this.index && this.index !== 0 && visible) {
        this.index = getIndex();
      }
      const view = {
        [Widget.Button]: {
          width: 80,
        },
      };
      const footerBtnProps = { type: 'primary' };
      if (showIcon) {
        footerBtnProps.type = BtnType[iconType];
      }

      const modalWrapTheme = getPartOfThemeProps('Container');
      modalWrapTheme.propsConfig = {
        showIcon,
        __lugiad__header__absolute__,
        type,
      };
      const modalTitleTheme = getPartOfThemeProps('ModalTitle');
      const modalBodyTextTheme = getPartOfThemeProps('ModalContentText');
      const modalMaskTheme = getPartOfThemeProps('ModalMask');
      const modalContent = (
        <ModalContent showIcon={showIcon} themeProps={modalWrapTheme}>
          {showIcon ? (
            <Icon
              iconClass={iconClass || IconInfo[iconType].class}
              singleTheme
              {...this.getIconTheme()}
            />
          ) : closable ? (
            <ModalClose
              onClick={this.handleCancel}
              __lugiad__header__absolute__={__lugiad__header__absolute__}
              type={type}
            >
              <Icon
                {...this.getCloseIconTheme()}
                iconClass={closeIconClass || 'lugia-icon-reminder_close'}
                singleTheme
              />
            </ModalClose>
          ) : null}
          {title !== null && (
            <ModalTitle
              __lugiad__header__absolute__={__lugiad__header__absolute__}
              type={type}
              themeProps={modalTitleTheme}
              title
            >
              {title}
            </ModalTitle>
          )}
          {__lugiad__header__absolute__ ? (
            children
          ) : (
            <ModalBody themeProps={modalBodyTextTheme}>{children}</ModalBody>
          )}
          {this.isInprops('footer') && typeof footer !== 'boolean' ? (
            footer
          ) : footer === true ? (
            <ModalFooter __lugiad__header__absolute__={__lugiad__header__absolute__} type={type}>
              <Theme config={view}>
                <Button
                  onClick={this.handleOk}
                  loading={confirmLoading}
                  {...footerBtnProps}
                  {...getPartOfThemeHocProps('ModalOkButton')}
                  {...okButtonProps}
                >
                  {okText}
                </Button>
              </Theme>
              <Theme config={view}>
                <Button
                  onClick={this.handleCancel}
                  {...getPartOfThemeHocProps('ModalCancelButton')}
                  {...cancelButtonProps}
                >
                  {cancelText}
                </Button>
              </Theme>
            </ModalFooter>
          ) : null}
        </ModalContent>
      );
      if (type === 'Modal') {
        return modalContent;
      }

      const integrateModal = (
        <Wrap visible={closing ? true : visible} zIndex={zIndex || this.index}>
          {mask ? (
            <ModalMask
              onClick={this.handleMaskClick}
              closing={closing}
              opening={opening}
              themeProps={modalMaskTheme}
              zIndex={zIndex || this.index}
            />
          ) : null}
          <ModalWrap>
            <Modal
              tabIndex="1"
              ref={this.saveModalDom}
              closing={closing}
              opening={opening}
              themeProps={modalWrapTheme}
              zIndex={zIndex || this.index}
            >
              {modalContent}
            </Modal>
          </ModalWrap>
        </Wrap>
      );
      if (mountBody) {
        if (typeof window !== 'undefined') {
          const doc = window && window.document;
          if (doc) {
            this.node = doc.createElement('div');
            doc.body && doc.body.appendChild(this.node);
          }
        }
        if (!this.node) {
          return null;
        }
        return createPortal(integrateModal, this.node);
      }
      return integrateModal;
    }
    handleMaskClick = () => {
      const { maskClosable = true } = this.props;
      maskClosable && this.handleCancel();
    };
    handleOk = () => {
      const { onOk } = this.props;
      const isLoading = this.isInprops('confirmLoading');
      const hasVisible = this.isInprops('visible');
      if (!isLoading && !hasVisible) {
        this.setState({
          closing: true,
        });
        setTimeout(() => {
          this.setState({
            closing: false,
          });
          onOk && onOk();
        }, 300);
        return;
      }
      onOk && onOk();
    };
    handleCancel = () => {
      const { onCancel } = this.props;
      onCancel && onCancel();
    };
    isInprops(target: string) {
      return target in this.props;
    }
  },
  Widget.Modal
);
