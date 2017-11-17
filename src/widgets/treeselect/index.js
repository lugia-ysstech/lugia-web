/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Input from '../inputtag';
import Trigger from '../trigger';

type TreeSelectProps = {};
type TreeSelectState = {
  open: boolean,
};

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectState> {

  state: TreeSelectState;

  constructor (props: TreeSelectProps) {
    super(props);
    this.state = { open: false, };
  }

  render () {
    const tree = <div style={{ border: '1px solid red', padding: 10, background: 'white', }}>
      弹出来了
    </div>;
    return <Trigger popup={tree}
                    align="bottomLeft"
                    action={['click',]}
                    hideAction={['click',]}><Input></Input></Trigger>;
  }

}

export default TreeSelect;
