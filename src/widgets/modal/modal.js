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

const BtnType = {
  confirm: 'warning',
  info: 'primary',
  success: 'success',
  error: 'danger',
  warning: 'warning',
};

export default ThemeProvider(
  class extends React.Component<ModalProps, ModalState> {
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
              fontSize: 16,
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
              fontSize: 20,
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
        footer,
        showIcon = false,
        iconType = 'info',
        getTheme,
        mask = true,
        okButtonProps = {},
        cancelButtonProps = {},
        getPartOfThemeProps,
        getPartOfThemeHocProps,
      } = this.props;
      const { visible = false, closing, opening } = this.state;
      const view = {
        [Widget.Button]: {
          width: 80,
        },
      };
      const footerBtnProps = { type: 'primary' };
      if (showIcon) {
        footerBtnProps.type = BtnType[iconType];
      }

      const modalWrapTheme = getPartOfThemeProps('ModalWrap');
      modalWrapTheme.propsConfig = {
        showIcon,
      };
      const modalTitleTheme = getPartOfThemeProps('ModalTitle');
      const modalBodyTextTheme = getPartOfThemeProps('ModalContentText');
      return (
        <Wrap visible={closing ? true : visible}>
          {mask ? (
            <ModalMask onClick={this.handleMaskClick} closing={closing} opening={opening} />
          ) : null}
          <ModalWrap>
            <Modal closing={closing} opening={opening} themeProps={modalWrapTheme}>
              <ModalContent showIcon={showIcon} theme={getTheme()} themeProps={modalWrapTheme}>
                {showIcon ? (
                  <Icon iconClass={IconInfo[iconType].class} singleTheme {...this.getIconTheme()} />
                ) : (
                  <ModalClose onClick={this.handleCancel}>
                    <Icon
                      {...this.getCloseIconTheme()}
                      iconClass="lugia-icon-reminder_close"
                      singleTheme
                    />
                  </ModalClose>
                )}
                {title !== null && <ModalTitle themeProps={modalTitleTheme}>{title}</ModalTitle>}
                <ModalBody themeProps={modalBodyTextTheme}>{children}</ModalBody>

                {this.isInprops('footer') ? (
                  footer
                ) : (
                  <ModalFooter>
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
                )}
              </ModalContent>
            </Modal>
          </ModalWrap>
        </Wrap>
      );
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
