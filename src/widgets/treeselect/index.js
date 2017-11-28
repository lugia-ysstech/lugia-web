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
import Support from '../common/FormFieldWidgetSupport';

type TreeSelectProps = {
  data: Array<Object>,
  getTheme?: Function,
  value?: string,
  displayValue?: string,
  displayField?: string,
  defaultValue?: string,
  mutliple: boolean,
  onlySelectLeaf: boolean,
  igronSelectField?: string,
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

  treeTriger: Object;

  constructor (props: TreeSelectProps) {
    super(props);
    const { value, displayValue, } = this.getInitValue(props);
    this.state = {
      open: false,
      query: '',
      value,
      displayValue,
    };
  }

  getInitValue (props: TreeSelectProps) {
    return Support.getCodeItem(props);

  }

  isNotLimit (props: TreeSelectProps) {
    return Support.isNotLimit(props);
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
      <Tree data={data} onChange={this.onTreeChange} {...props} className="sv" query={query} value={value}
            displayValue={displayValue}>
      </Tree>,];
    const getTreeTriger: Function = (cmp: Object) => {
      this.treeTriger = cmp;
    };
    return <Theme config={this.getTheme()}>
      <Trigger popup={tree}
               onPopupVisibleChange={this.onTreePopupVisibleChange}
               align="bottomLeft"
               ref={getTreeTriger}
               action={['click',]}
               hideAction={['click',]}>
        <InputTag value={value} displayValue={displayValue} onChange={this.onInputTagChange}
                  onPopupVisibleChange={this.onInputTagPopupVisibleChange}/>
      </Trigger>
    </Theme>;
  }

  onQueryTree = (event: Object) => {
    const { target, } = event;
    const { value, } = target;
    this.setState({ query: value, });
  };

  onInputTagPopupVisibleChange = (visible: boolean) => {
    this.setTreePopupVisible(!visible);
  };

  onTreePopupVisibleChange = (visible: boolean) => {

  };

  onInputTagChange = ({ value, displayValue, }: Object) => {
    this.setState({ value, displayValue, });
  };

  onTreeChange = (value: Array<string>, displayValue: Array<string>) => {
    console.info(value, displayValue);
    this.setState({ value: value.join(','), displayValue: displayValue.join(','), });
  };


  setTreePopupVisible (visible: boolean) {
    if (this.treeTriger && this.treeTriger.target) {
      this.treeTriger.target.setPopupVisible(visible);
    }
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
