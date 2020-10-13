/**
 * 漂浮弹出框
 * 参考rc-trigger
 * @author zenjava
 * @flow
 */
import '../common/shirm';

import * as React from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import contains from 'rc-util/lib/Dom/contains';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Popup from './Popup';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import { getIndex } from '../utils/widget-zindex';

function noop() {}

function returnDocument() {
  return window.document;
}

type EventName =
  | 'onClick'
  | 'onMouseDown'
  | 'onTouchStart'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onFocus'
  | 'onBlur'
  | '_onClick';
const ALL_HANDLERS: Array<EventName> = [
  'onClick',
  'onMouseDown',
  'onTouchStart',
  'onMouseEnter',
  'onMouseLeave',
  'onFocus',
  'onBlur',
  '_onClick',
];

type TriggerProps = {
  getTheme: Function,
  lazy?: boolean,
  onClick?: Function,
  _onClick?: Function,
  onMouseDown?: Function,
  onTouchStart?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onFocus?: Function,
  onBlur?: Function,
  getDocument: Function,
  onPopupVisibleChange: Function,
  onPopupAlign: Function,
  mouseEnterDelay: number,
  mouseLeaveDelay: number,
  focusDelay: number,
  createPortal: boolean,
  blurDelay: number,
  className: string,
  destroyPopupOnHide: boolean,
  defaultPopupVisible: boolean,
  mask: boolean,
  action: Array<string>,
  showAction: Array<string>,
  hideAction: Array<string>,
  getPopupContainer?: Function,
  zIndex?: number,
  popup: any,
  popupVisible?: boolean,
  children: React.Element<any>,
  align: string,
  offsetX?: number,
  offsetY?: number,
  liquidLayout?: boolean,
  onDocumentClick?: Function,
};
type TriggerState = {
  popupVisible: boolean,
};

class Trigger extends React.Component<TriggerProps, TriggerState> {
  static defaultProps = {
    getDocument: returnDocument,
    onPopupVisibleChange: noop,
    afterPopupVisibleChange: noop,
    onPopupAlign: noop,
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    focusDelay: 0,
    blurDelay: 0.15,
    destroyPopupOnHide: false,
    popupAlign: {},
    defaultPopupVisible: false,
    mask: false,
    action: [],
    className: '',
    showAction: [],
    hideAction: [],
    lazy: true,
    getTheme() {
      return {};
    },
  };

  handlers: {
    fireonClick?: Function,
    fireonMouseDown?: Function,
    fireonTouchStart?: Function,
    fireonMouseEnter?: Function,
    fireonMouseLeave?: Function,
    fireonFocus?: Function,
    fireonBlur?: Function,
  };

  component: any;
  clickOutsideHandler: ?Function;
  blurOutsideHandler: ?Function;
  touchOutsideHandler: ?Function;
  delayTimer: ?TimeoutID;
  focusTime: number;
  preClickTime: number;
  preTouchTime: number;

  constructor(props: TriggerProps) {
    super(props);
    let { popupVisible = false, defaultPopupVisible } = props;
    if ('popupVisible' in props) {
      popupVisible = !!popupVisible;
    } else {
      popupVisible = !!defaultPopupVisible;
    }
    this.handlers = {};
    this.state = {
      popupVisible,
    };
    this.index = popupVisible ? getIndex() : undefined;
  }

  popupContainer: ?Object;

  getContainer() {
    if (this.popupContainer) {
      return this.popupContainer;
    }
    const { getPopupContainer, getDocument } = this.props;
    const popupContainer = document.createElement('div');
    popupContainer.style.position = 'relative';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';
    const mountNode = getPopupContainer ? getPopupContainer(findDOMNode(this)) : getDocument().body;
    mountNode.appendChild(popupContainer);
    this.popupContainer = popupContainer;
    return popupContainer;
  }

  getComponent() {
    const { props, state } = this;
    const { onPopupAlign, popup, offsetX, offsetY, liquidLayout } = props;
    const { destroyPopupOnHide, mask, align, getTheme, className } = props;
    const mouseProps = {};
    if (this.isMouseEnterToShow()) {
      mouseProps.onMouseEnter = this.onPopupMouseEnter;
    }
    if (this.isMouseLeaveToHide()) {
      mouseProps.onMouseLeave = this.onPopupMouseLeave;
    }

    return (
      <Popup
        getTheme={getTheme}
        key="popup"
        offsetX={offsetX}
        offsetY={offsetY}
        className={className}
        ref={cmp => (this.component = cmp)}
        destroyPopupOnHide={destroyPopupOnHide}
        visible={state.popupVisible}
        align={align}
        onAlign={onPopupAlign}
        {...mouseProps}
        getRootDomNode={this.getRootDomNode}
        isMask={mask}
        zIndex={this.index}
        liquidLayout={liquidLayout}
      >
        {typeof popup === 'function' ? popup() : popup}
      </Popup>
    );
  }

  componentWillReceiveProps({ popupVisible }: TriggerProps, state: TriggerState) {
    if (popupVisible !== undefined) {
      this.setFirstShow(popupVisible);
      this.setState({
        popupVisible,
      });
    }
  }

  componentWillMount() {
    ALL_HANDLERS.forEach((h: EventName) => {
      this.handlers[`fire${h}`] = (e: Object) => {
        this.fireEvents(h, e);
      };
    });
  }

  componentDidMount() {
    const { popupContainerId } = this.props;
    if (popupContainerId) {
      setTimeout(() => {
        const triggerContainerDom = document.getElementById(popupContainerId);
        if (triggerContainerDom) {
          const targetPosition = window.getComputedStyle(triggerContainerDom).position;
          triggerContainerDom.style.position =
            targetPosition === 'static' ? 'relative' : targetPosition;
          this.popupContainer = triggerContainerDom;
        }
      }, 0);
    }
  }

  componentDidUpdate() {
    const { getDocument, closeBlur } = this.props;
    const { popupVisible } = this.state;
    if (popupVisible) {
      let currentDocument;
      if (!this.clickOutsideHandler && this.isClickToHide()) {
        currentDocument = getDocument();
        this.clickOutsideHandler = addEventListener(
          currentDocument,
          'mousedown',
          this.onDocumentClick
        );
        if (!this.blurOutsideHandler && closeBlur) {
          currentDocument = getDocument();
          this.blurOutsideHandler = addEventListener(currentDocument, 'blur', this.onDocumentClick);
        }
      }
      // always hide on mobile
      if (!this.touchOutsideHandler) {
        currentDocument = currentDocument || getDocument();
        this.touchOutsideHandler = addEventListener(
          currentDocument,
          'touchstart',
          this.onDocumentClick
        );
      }
      return;
    }

    this.clearOutsideHandler();
  }

  componentWillUnmount() {
    this.clearDelayTimer();
    this.clearOutsideHandler();
    const { popupContainerId } = this.props;
    if (!popupContainerId) {
      this.popupContainer && document.body && document.body.removeChild(this.popupContainer);
      this.popupContainer = undefined;
    }
  }

  getPopupDomNode() {
    if (this.component && this.component.getPopupDomNode) {
      return this.component.getPopupDomNode();
    }
    return null;
  }

  getRootDomNode = () => {
    const { getPopTargetDom } = this.props;
    const popTargetDomResult = getPopTargetDom();
    if (getPopTargetDom && popTargetDomResult) {
      return popTargetDomResult;
    }
    return findDOMNode(this);
  };
  isFirstShow: boolean;

  setPopupVisible(popupVisible: boolean, forcePopup?: boolean) {
    this.forcePopup = forcePopup;
    this.clearDelayTimer();
    this.setFirstShow(popupVisible);
    if (this.state.popupVisible !== popupVisible) {
      if (!('popupVisible' in this.props)) {
        this.setState(
          {
            popupVisible,
          },
          () => this.props.onPopupVisibleChange(popupVisible)
        );
      } else {
        this.props.onPopupVisibleChange(popupVisible);
      }
    }
  }

  setFirstShow(popupVisible: boolean) {
    if (!this.isFirstShow && popupVisible) {
      this.isFirstShow = popupVisible;
    }
  }

  delaySetPopupVisible(visible: boolean, delayS: number) {
    const delay = delayS * 1000;
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = setTimeout(() => {
        this.setPopupVisible(visible);
        this.clearDelayTimer();
      }, delay);
    } else {
      this.setPopupVisible(visible);
    }
  }

  clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  clearOutsideHandler() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }

    if (this.touchOutsideHandler) {
      this.touchOutsideHandler.remove();
      this.touchOutsideHandler = null;
    }

    if (this.blurOutsideHandler) {
      this.blurOutsideHandler.remove();
      this.blurOutsideHandler = null;
    }
  }

  createTwoChains(event: EventName) {
    const childPros = this.props.children.props;
    const props = this.props;
    if (childPros[event] && props[event]) {
      return this.handlers[`fire${event}`];
    }
    return childPros[event] || props[event];
  }

  render() {
    const { children } = this.props;

    const child = React.Children.only(children);
    const newChildProps = {};
    if (this.isClickToHide() || this.isClickToShow()) {
      if (child.type.displayName === `${Widget.ThemeWrapWidget}${Widget.DropMenuButton}`) {
        newChildProps._onClick = this.createOnClick('_onClick');
      } else {
        newChildProps.onClick = this.createOnClick('onClick');
      }
      newChildProps.onMouseDown = this.onMouseDown;
      newChildProps.onTouchStart = this.onTouchStart;
    } else {
      newChildProps.onClick = this.createTwoChains('onClick');
      newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
      newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.onMouseEnter = this.onMouseEnter;
    } else {
      newChildProps.onMouseEnter = this.createTwoChains('onMouseEnter');
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.onMouseLeave = this.onMouseLeave;
    } else {
      newChildProps.onMouseLeave = this.createTwoChains('onMouseLeave');
    }
    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains('onFocus');
      newChildProps.onBlur = this.createTwoChains('onBlur');
    }
    newChildProps.key = 'container';
    const { popupVisible } = this.state;
    if (!this.index && this.index !== 0 && popupVisible) {
      this.index = getIndex();
    }

    const { popupContainerId } = this.props;
    const portal =
      popupContainerId && this.popupContainer
        ? createPortal(this.getComponent(), this.popupContainer)
        : this.props.createPortal
        ? createPortal(this.getComponent(), this.getContainer())
        : this.getComponent();

    return (
      <React.Fragment>
        {React.cloneElement(child, newChildProps)}
        {this.props.lazy ? (this.isFirstShow ? portal : null) : portal}
      </React.Fragment>
    );
  }

  isClickToShow() {
    const { action, showAction } = this.props;
    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
  }

  isClickToHide() {
    const { action, hideAction } = this.props;
    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
  }

  isMouseEnterToShow() {
    const { action, showAction } = this.props;
    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
  }

  isMouseLeaveToHide() {
    const { action, hideAction } = this.props;
    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
  }

  isFocusToShow() {
    const { action, showAction } = this.props;
    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
  }

  isBlurToHide() {
    const { action, hideAction } = this.props;
    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
  }

  onMouseEnter = (e: Object) => {
    this.fireEvents('onMouseEnter', e);
    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
  };

  onMouseLeave = (e: Object) => {
    this.fireEvents('onMouseLeave', e);
    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
  };

  onPopupMouseEnter = () => {
    this.clearDelayTimer();
  };

  onPopupMouseLeave = (e: Object) => {
    if (
      e.relatedTarget &&
      !e.relatedTarget.setTimeout &&
      this.component &&
      contains(this.component.getPopupDomNode(), e.relatedTarget)
    ) {
      return;
    }
    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
  };

  onFocus = (e: Object) => {
    this.fireEvents('onFocus', e);
    // incase focusin and focusout
    this.clearDelayTimer();
    if (this.isFocusToShow()) {
      this.focusTime = Date.now();
      this.delaySetPopupVisible(true, this.props.focusDelay);
    }
  };

  onMouseDown = (e: Object) => {
    this.fireEvents('onMouseDown', e);
    this.preClickTime = Date.now();
  };

  onTouchStart = (e: Object) => {
    this.fireEvents('onTouchStart', e);
    this.preTouchTime = Date.now();
  };

  onBlur = (e: Object) => {
    this.fireEvents('onBlur', e);
    this.clearDelayTimer();
    if (this.isBlurToHide()) {
      this.delaySetPopupVisible(false, this.props.blurDelay);
    }
  };

  createOnClick = (eventName: EventName, targetEvent?: EventName = 'onClick') => (e: Object) => {
    this.fireChildrenEvents(eventName, e);
    this.fireSelfEvents(targetEvent, e);
    // focus will trigger click
    if (this.focusTime) {
      let preTime = 0;
      if (this.preClickTime && this.preTouchTime) {
        preTime = Math.min(this.preClickTime, this.preTouchTime);
      } else if (this.preClickTime) {
        preTime = this.preClickTime;
      } else if (this.preTouchTime) {
        preTime = this.preTouchTime;
      }
      if (Math.abs(preTime - this.focusTime) < 20) {
        return;
      }
      this.focusTime = 0;
    }
    this.preClickTime = 0;
    this.preTouchTime = 0;
    e.preventDefault && e.preventDefault();
    const nextVisible = !this.state.popupVisible;
    if ((this.isClickToHide() && !nextVisible) || (nextVisible && this.isClickToShow())) {
      this.setPopupVisible(!this.state.popupVisible);
    }
  };

  forcePopup: boolean;
  onDocumentClick = (e: Object) => {
    const { onDocumentClick } = this.props;
    const target = e.target;
    const root = findDOMNode(this);
    const popupNode = this.getPopupDomNode();
    if (!contains(root, target) && !contains(popupNode, target) && !this.forcePopup) {
      onDocumentClick && onDocumentClick(this.close.bind(this));
      !onDocumentClick && this.close();
    }
  };

  fireEvents(type: EventName, e: Object) {
    this.fireChildrenEvents(type, e);
    this.fireSelfEvents(type, e);
  }

  fireChildrenEvents(type: EventName, e: Object) {
    const childCallback = this.props.children.props[type];
    childCallback && childCallback(e);
  }

  fireSelfEvents(type: EventName, e: Object) {
    const callback = this.props[type];
    callback && callback(e);
  }

  forceAlign() {
    this.component.forceAlign();
  }

  close() {
    this.setPopupVisible(false);
  }
}

export default ThemeProvider(Trigger, Widget.Trigger);
