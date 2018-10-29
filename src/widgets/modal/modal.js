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
import {
  Wrap,
  ModalMask,
  ModalWrap,
  Modal,
  ModalContent,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
  Icons,
  BigIcons,
  IconInfo,
} from '../css/modal';
import type { ModalProps, ModalState } from '../css/modal';
import Button from '../button';

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
      const closing = state ? state.closing : false;

      return {
        visible,
        closing,
        opening: visible,
      };
    }

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
      return (
        <Wrap visible={visible}>
          <ModalMask onClick={this.handleMaskClick} closing={closing} opening={opening} />
          <ModalWrap>
            <Modal closing={closing} opening={opening}>
              <ModalContent showIcon={showIcon}>
                {showIcon ? (
                  <BigIcons iconClass={IconInfo[iconType].class} iconType={iconType} />
                ) : (
                  <ModalClose onClick={this.handleCancel}>
                    <Icons iconClass="lugia-icon-reminder_close" />
                  </ModalClose>
                )}
                <ModalTitle>{title}</ModalTitle>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  {this.isInprops('footer')
                    ? footer
                    : [
                        <Theme config={view}>
                          <Button
                            onClick={this.handleOk}
                            loading={confirmLoading}
                            {...footerBtnProps}
                          >
                            {okText}
                          </Button>
                        </Theme>,
                        <Theme config={view}>
                          <Button onClick={this.handleCancel}>{cancelText}</Button>
                        </Theme>,
                      ]}
                </ModalFooter>
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
      if (!isLoading) {
        this.setState({
          closing: true,
        });
      }
      setTimeout(() => {
        this.setState({
          closing: false,
        });
        onOk && onOk();
      }, 300);
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
