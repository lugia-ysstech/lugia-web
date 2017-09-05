/**
 * 弹出面板
 *@flow
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import Align from '../align';
import PopupInner from './PopupInner';
import ContentBox from './ContentBox';

type PopupProps = {
  offsetX: number,
  offsetY: number,
  visible: boolean,
  onAlign?: Function,
  getRootDomNode: Function,
  onMouseEnter?: Function,
  children?: React.Node,
  isMask: boolean,
  align?: string,
  destroyPopupOnHide?: boolean,
  transitionName?: string,
  onMouseLeave?: Function,
};

class Popup extends React.Component<PopupProps> {

  static defaultProps = {
  offsetX: 0,
    offsetY: 0,
    visible: true,
    isMask: false,
    align: 'bottom',
  };
  savePopupRef: Function;
  saveAlignRef: Function;
  popupInstance: Element | null;
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
    const { onAlign, } = this.props;
    onAlign && onAlign(popupDomNode, align);
  };


  getTarget = () => {
    return this.props.getRootDomNode();
  };


  getPopupElement () {
    const { savePopupRef, props, } = this;
    const {
      align,
      visible,
      destroyPopupOnHide,
      onMouseEnter,
      onMouseLeave,
      children,
      offsetX,
      offsetY,
    } = props;

    const hidden = !visible;
    const newStyle = {
      ...this.getZIndexStyle(),
    };

    const popupInnerProps = {
      ref: savePopupRef,
      onMouseEnter,
      onMouseLeave,
      style: newStyle,
    };

    const inner = destroyPopupOnHide && hidden ? null : <Align
      offsetX={offsetX}
      offsetY={offsetY}
      autoResize
      getTargetDom={this.getTarget}
      key="popup"
      ref={this.saveAlignRef}
      align={align}
      visible={visible}
      onAlign={this.onAlign}
    >
      <PopupInner
        {...popupInnerProps}
      >
        {children}
      </PopupInner>
    </Align>;
    return inner;
  }

  getMaskElement () {
    const { isMask, visible, } = this.props;
    let maskElement;
    if (isMask) {
      maskElement = (
        <ContentBox
          style={this.getZIndexStyle()}
          key="mask"
          isMask
          visible={visible}
        />
      );
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
}

export default Popup;
