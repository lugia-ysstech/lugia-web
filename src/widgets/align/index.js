/**
 *
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import VisibleBox from '../common/VisibleBox';
import Widget from '../consts/index';
import RcAlign from 'rc-align';

export const builtinPlacements = {
  left: ['cr', 'cl'],
  leftTop: ['tr', 'tl'],
  leftBottom: ['br', 'bl'],
  right: ['cl', 'cr'],
  rightTop: ['tl', 'tr'],
  rightBottom: ['bl', 'br'],
  top: ['bc', 'tc'],
  bottom: ['tc', 'bc'],
  topLeft: ['bl', 'tl'],
  topRight: ['br', 'tr'],
  bottomRight: ['tr', 'br'],
  bottomLeft: ['tl', 'bl'],
};
type PropsType = {
  offsetX: number,
  offsetY: number,
  align: string,
  getTargetDom: Function,
  children: React.Node,
  onAlign?: Function,
  autoResize: boolean,
  visible: boolean,
};
const defaultAligh = 'bottom';
export default class Align extends React.Component<PropsType> {
  static defaultProps = {
    visible: true,
    offsetX: 0,
    offsetY: 0,
    autoResize: false,
    align: defaultAligh,
  };

  static displayName = Widget.Align;
  rcAlign: Object;

  constructor(props: PropsType) {
    super(props);
    this.rcAlign = React.createRef();
  }

  render() {
    const {
      visible,
      autoResize,
      align,
      getTargetDom,
      children,
      offsetX,
      offsetY,
      onAlign,
    } = this.props;
    const config = builtinPlacements[align];
    const rcAlignArg = {
      points: config ? config : builtinPlacements[defaultAligh],
      offset: [offsetX, offsetY],
      overflow: { adjustX: true, adjustY: true },
    };

    if (typeof global !== 'undefined' && global.svtest === true) {
      return <VisibleBox visible={visible}>{children}</VisibleBox>;
    }

    return (
      <VisibleBox visible={visible}>
        <RcAlign
          target={getTargetDom}
          align={rcAlignArg}
          monitorWindowResize={autoResize}
          ref={this.rcAlign}
          onAlign={onAlign}
        >
          {children}
        </RcAlign>
      </VisibleBox>
    );
  }

  componentDidUpdate(prevProps: PropsType) {
    const { align, offsetX, offsetY } = this.props;
    const { align: pAlign, offsetX: pX, offsetY: pY } = prevProps;
    if (
      this.rcAlign &&
      this.rcAlign.current &&
      (pY !== offsetY || pX !== offsetX || align !== pAlign)
    ) {
      this.forceAlign();
    }
  }
  forceAlign() {
    this.rcAlign.current.forceAlign();
  }
}
