/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Theme from '../theme/index';
import TreeSelect from './index';
import * as Widget from '../consts/Widget';
import styled from 'styled-components';

const bigTree = [];

getNumberKey();

function getNumberKey () {

  let key = 0;
  for (let a = 0; a < 5; a++) {
    const keyA = key++;
    bigTree.push({
      key: `${keyA}`,
      title: `${a}`,
    });
    for (let b = 0; b < 5; b++) {
      const titleB = `${a}.${b}`;
      const keyb = key++;
      bigTree.push({
        key: keyb,
        title: titleB,
        pid: `${keyA}`,
        path: `${keyA}`,
      });
      for (let c = 0; c < 5; c++) {
        const titleC = `${a}.${b}.${c}`;
        const keyc = key++;
        bigTree.push({
          key: keyc,
          title: titleC,
          pid: `${keyb}`,
          path: `${keyA}/${keyb}`,
        });
        for (let d = 0; d < 400; d++) {
          const title = `${a}.${b}.${c}.${d}`;
          const keyD = key++;
          bigTree.push({
            key: keyD,
            title,
            pid: `${keyc}`,
            isLeaf: true,
            path: `${keyA}/${keyb}/${keyc}`,
          });
        }
      }
    }
  }
}

const rowData: Array<Object> = [
  { key: '1', title: '1', },
  { key: '1.1', title: '1.1', pid: '1', path: '1', isLeaf: true, },
  { key: '1.2', title: '1.2', pid: '1', path: '1', },
  { key: '1.2.1', title: '1.2.1', pid: '1.2', path: '1/1.2', isLeaf: true, },
  { key: '1.2.2', title: '1.2.2', pid: '1.2', path: '1/1.2', },
  { key: '1.2.2.1', title: '1.2.2.1', pid: '1.2.2', path: '1/1.2/1.2.2', },
  { key: '1.2.2.1.1', title: '1.2.2.1.1', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
  { key: '1.2.2.1.2', title: '1.2.2.1.2', pid: '1.2.2.1', path: '1/1.2/1.2.2/1.2.2.1', isLeaf: true, },
  { key: '1.2.2.2', title: '1.2.2.2', pid: '1.2.2', path: '1/1.2/1.2.2', isLeaf: true, },

  { key: '1.3', title: '1.3', pid: '1', path: '1', },
  { key: '1.3.1', title: '1.3.1', pid: '1.3', path: '1/1.3', },
  { key: '1.3.1.1', title: '1.3.1.1', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
  { key: '1.3.1.2', title: '1.3.1.2', pid: '1.3.1', path: '1/1.3/1.3.1', isLeaf: true, },
  { key: '1.3.2', title: '1.3.2', pid: '1.3', path: '1/1.3', },
  { key: '1.3.2.1', title: '1.3.2.1', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
  { key: '1.3.2.2', title: '1.3.2.2', pid: '1.3.2', path: '1/1.3/1.3.2', isLeaf: true, },
  { key: '1.3.3', title: '1.3.3', pid: '1.3', path: '1/1.3', isLeaf: true, },

  { key: '2', title: '2', },
  { key: '2.1', title: '2.1', pid: '2', path: '2', },
  { key: '2.1.1', title: '2.1.1', pid: '2.1', path: '2/2.1', isLeaf: true, },
  { key: '2.1.2', title: '2.1.2', pid: '2.1', path: '2/2.1', },
  { key: '2.1.2.1', title: '2.1.2.1', pid: '2.1.2', path: '2/2.1/2.1.2', isLeaf: true, },
  { key: '2.2', title: '2.2', pid: '2', path: '2', },
  { key: '2.2.1', title: '2.2.1', pid: '2.2', path: '2/2.2', },
  { key: '2.2.1.1', title: '2.2.1.1', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
  { key: '2.2.1.2', title: '2.2.1.2', pid: '2.2.1', path: '2/2.2/2.2.1', isLeaf: true, },
  { key: '2.2.2', title: '2.2.2', pid: '2.2', path: '2/2.2', isLeaf: true, },

  { key: '3', title: '3', },
  { key: '3.1', title: '3.1', pid: '3', path: '3', isLeaf: true, },
  { key: '3.2', title: '3.2', pid: '3', path: '3', isLeaf: true, },
  { key: '4', title: '4', isLeaf: true, },

];
console.info(rowData.length);
const Data = styled.div`
 height: ${props => props.height}px;
`;
export default class extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    this.state = {
      data: [],
      width: 300,
      height: 250,
    };
  }

  shouldComponentUpdate (nexProps: any, nextState: any) {
    return this.state.data !== nextState.data ||
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height;
  }

  render () {
    const { height, width, } = this.state;
    console.info(height, width);
    const config = { [ Widget.TreeSelect ]: { height, width, }, };
    console.info('demo');
    return <Theme config={config}>
      <TreeSelect data={this.state.data}
                  onTrigger={this.onTrigger}
                  onRefresh={this.onRefresh}
        //onlySelectLeaf
        //           igronSelectField="isLeaf"
                  canInput
                  throttle={500}
                  // limitCount={5}
                  expandAll
                  defaultValue="a"
                  defaultDisplayValue={'我么啊啊'}
                  mutliple
                  placeholder="请输入xxx"
        // disabled
                  splitQuery="\"
                  onChange={this.onChange}/>
      w <input value={width} onChange={this.onWidthChange}/>
      h<input value={height} onChange={this.onHeightChange}/>
    </Theme>;
  }

  onHeightChange = (e:Object) => {
    this.setState({ height: e.target.value, });
  };
  onWidthChange = (e:Object) => {
    this.setState({ width: e.target.value, });

  };
  onRefresh = () => {
    console.info('refresh');
  };
  onChange = (obj: Object) => {
    console.info(obj);
  };
  onTrigger = () => {
    this.setState({ data: rowData, });
  };
}
