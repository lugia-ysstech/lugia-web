/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import InputTag from '../inputtag';
import Input from '../input';
import Trigger from '../trigger';
import Tree from '../tree';
import Theme from '../theme';
import '../css/sv.css';
import 'babel-polyfill';
import * as Widget from '../consts/Widget';
import ThemeProvider from '../common/ThemeProvider';
import styled from 'styled-components';

type TreeSelectProps = {
  data: Array<Object>,
  getTheme?: Function,
};
type TreeSelectState = {
  open: boolean,
};
const QueryInputPadding = 3;
const QueryInput = styled.div`
  padding: ${QueryInputPadding}px;
`;

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectState> {
  static defaultProps = {
    getTheme () {
      return {};
    },
  };
  state: TreeSelectState;

  constructor (props: TreeSelectProps) {
    super(props);
    this.state = { open: false, };
  }

  render () {
    const { props, } = this;
    const { data, } = props;

    const tree = [<QueryInput><Input/></QueryInput>, <Tree data={data} {...props} className="sv">
    </Tree>,];
    return <Theme config={this.getTheme()}>
      <Trigger popup={tree}
               align="bottomLeft"
               action={['click',]}
               hideAction={['click',]}>
        <InputTag/>
      </Trigger>
    </Theme>;
  }

  getTheme (): Object {
    const { getTheme = () => ({}), } = this.props;
    const theme = getTheme();
    const { width, } = theme;
    const queryInputConfig = {};
    if (width) {
      queryInputConfig.width = width - 2 * QueryInputPadding;
    }
    return {
      [Widget.Tree]: theme,
      [Widget.Trigger]: theme,
      [Widget.InputTag]: theme,
      [Widget.Input]: Object.assign({}, theme, queryInputConfig),
    };
  }

}

export default ThemeProvider(TreeSelect, Widget.TreeSelect);
