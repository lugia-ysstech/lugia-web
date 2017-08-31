/**
 * 弹出面板
 *@flow
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import Align from 'rc-align';
import Animate from 'rc-animate';
import PopupInner from './PopupInner';
import ContentBox from './ContentBox';

type PopupProps = {
  visible: boolean,
  style: Object,
  getClassNameFromAlign: Function,
  onAlign: Function,
  getRootDomNode: Function,
  onMouseEnter: Function,
  children: React.Node,
  maskTransitionName: string,
  maskAnimation: string,
  align: any,
  animation: string,
  destroyPopupOnHide: boolean,
  prefixCls: string,
  transitionName: string,
  onMouseLeave: Function,
};

class Popup extends React.Component<PopupProps> {

  savePopupRef: Function;
  saveAlignRef: Function;
  currentAlignClassName: string;
  popupInstance: Element | React.Component<any> | null;
  alignInstance: ?React.Element<any>;

  constructor (props: PopupProps) {
    super(props);
    this.savePopupRef = cmp => this.popupInstance = cmp;
    this.saveAlignRef = cmp => this.alignInstance = cmp;
  }

  getPopupDomNode () {
    if (this.popupInstance) {
      return ReactDOM.findDOMNode(this.popupInstance);
    }
    return null;
  }

  render () {
    return (
      <div>
        {this.getMaskElement()}
        {this.getPopupElement()}
      </div>
    );
  }

  onAlign = (popupDomNode: HTMLElement, align: string) => {
    const props = this.props;
    const currentAlignClassName = props.getClassNameFromAlign(align);
    if (this.currentAlignClassName !== currentAlignClassName) {
      this.currentAlignClassName = currentAlignClassName;
    }
    props.onAlign(popupDomNode, align);
  };


  getTarget = () => {
    return this.props.getRootDomNode();
  };


  getPopupElement () {
    const { savePopupRef, props, } = this;
    const {
      align,
      style,
      visible,
      destroyPopupOnHide,
      onMouseEnter,
      onMouseLeave,
      children,
    } = props;

    const hidden = !visible;

    if (hidden) {
      this.currentAlignClassName = '';
    }

    const newStyle = {
      ...style,
      ...this.getZIndexStyle(),
    };

    const popupInnerProps = {
      ref: savePopupRef,
      onMouseEnter,
      onMouseLeave,
      style: newStyle,
    };

    const inner = destroyPopupOnHide && hidden ? null : <Align
      target={this.getTarget}
      key="popup"
      ref={this.saveAlignRef}
      monitorWindowResize
      xVisible={visible}
      childrenProps={{ visible: 'xVisible', }}
      disabled={hidden}
      align={align}
      onAlign={this.onAlign}
    >
      <PopupInner
        {...popupInnerProps}
      >
        {children}
      </PopupInner>
    </Align>;
    return <Animate
      component=""
      exclusive
      transitionAppear
      transitionName={this.getTransitionName()}
      showProp="xVisible">
      {inner}
    </Animate>;
  }

  getTransitionName () {
    const props = this.props;
    let transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${props.prefixCls}-${props.animation}`;
    }
    return transitionName;
  }

  getMaskElement () {
    const props = this.props;
    let maskElement;
    if (props.mask) {
      const maskTransition = this.getMaskTransitionName();
      maskElement = (
        <ContentBox
          style={this.getZIndexStyle()}
          key="mask"
          isMask
          visible={props.visible}
        />
      );
      if (maskTransition) {
        maskElement = (
          <Animate
            key="mask"
            showProp="visible"
            transitionAppear
            component=""
            transitionName={maskTransition}
          >
            {maskElement}
          </Animate>
        );
      }
    }
    return maskElement;
  }

  getZIndexStyle () {
    const style = {};
    const props = this.props;
    if (props.zIndex !== undefined) {
      style.zIndex = props.zIndex;
    }
    return style;
  }

  getMaskTransitionName () {
    const props = this.props;
    let transitionName = props.maskTransitionName;
    const animation = props.maskAnimation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }
    return transitionName;
  }
}

export default Popup;
