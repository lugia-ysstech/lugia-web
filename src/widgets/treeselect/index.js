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
  value?: string,
  displayValue?: string,
  defaultValue?: string,
  mutliple: boolean,
  onlySelectLeaf: boolean,
  defaultDisplayValue?: string,
};
type TreeSelectState = {
  open: boolean,
  value: string,
  displayValue: string,
  query: string,
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
    mutliple: false,
    onlySelectLeaf: false,
  };
  state: TreeSelectState;

  constructor (props: TreeSelectProps) {
    super(props);
    this.state = {
      open: false,
      query: '',
      value: '',
      displayValue: '',
    };
  }

  shouldComponentUpdate (nexProps: TreeSelectProps, nextState: TreeSelectState) {
    const { props, } = this;
    const dataChanged = props.data !== nexProps.data;
    if (dataChanged === true) {
      return true;
    }
    const { state, } = this;
    return state.query !== nextState.query
      || state.value !== nextState.value;
  }

  render () {
    const { props, state, } = this;
    const { data, } = props;
    const { query, value, displayValue, } = state;
    const tree = [<QueryInput onChange={this.onQueryTree}><Input/></QueryInput>,
      <Tree data={data} onChange={this.onTreeChange} {...props} className="sv" query={query} value={value}>
      </Tree>,];
    return <Theme config={this.getTheme()}>
      <Trigger popup={tree}
               align="bottomLeft"
               action={['click',]}
               hideAction={['click',]}>
        <InputTag value={value} displayValue={displayValue} onChange={this.onInputTagChange}/>
      </Trigger>
    </Theme>;
  }

  onQueryTree = (event: Object) => {
    const { target, } = event;
    const { value, } = target;
    this.setState({ query: value, });
  };

  onInputTagChange = ({ value, displayValue, }: Object) => {
    this.setState({ value, displayValue, });
  };

  onTreeChange = (value: Array<string>, displayValue: Array<string>) => {
    this.setState({ value: value.join(','), displayValue: displayValue.join(','), });
  };

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
