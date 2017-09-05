/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import VisibleBox from '../common/VisibleBox';
import RcAlign from 'rc-align';


const builtinPlacements = {
  left: ['cr', 'cl',],
  right: ['cl', 'cr',],
  top: ['bc', 'tc',],
  bottom: ['tc', 'bc',],
  topLeft: ['bl', 'tl',],
  topRight: ['br', 'tr',],
  bottomRight: ['tr', 'br',],
  bottomLeft: ['tl', 'bl',],
};
type PropsType = {

  align: string,
  getTargetDom: Function,
  children: React.Node,
  onAlign: Function,
  autoResize: boolean,
  visible: boolean,
};
const defaultAligh = 'bottom';
export default class Align extends React.Component<PropsType> {
  static defaultProps = {
    visible: true,
    autoResize: false,
    align: defaultAligh,
  };

  render () {
    const { visible, autoResize, align, getTargetDom, children, } = this.props;
    const config = builtinPlacements[ align ];
    const rcAlignArg = {
      points: config ? config : builtinPlacements[ defaultAligh ],
    };
    return <VisibleBox visible={visible}>
      <RcAlign
        target={getTargetDom}
        align={rcAlignArg}
        monitorWindowResize={autoResize}>
        {children}
      </RcAlign>
    </VisibleBox>;
  }
}
