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
import Icon from '../icon';

type TreeSelectProps = {
  data: Array<Object>,
  getTheme?: Function,
  value?: string,
  displayValue?: string,
  displayField: string,
  defaultValue?: string,
  mutliple: boolean,
  onlySelectLeaf: boolean,
  igronSelectField?: string,
  onTrigger: Function,
  defaultDisplayValue?: string,
};
type TreeSelectState = {
  open: boolean,
  value: string,
  displayValue: string,
  query: string,
  selectAll: boolean,
};
const QueryInputPadding = 3;
const QueryInput = styled.div`
  padding: ${QueryInputPadding}px;
`;
const UnCheck = 'sv-icon-android-checkbox-out1';
const Checked = 'sv-icon-android-checkbox';

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectState> {
  static defaultProps = {
    getTheme () {
      return {};
    },
    mutliple: false,
    onlySelectLeaf: false,
    displayField: 'title',
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
      selectAll: false,
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
      || state.selectAll !== nextState.selectAll
      || state.value !== nextState.value;
  }

  render () {
    const { props, state, } = this;
    const { data, } = props;
    const { query, value, displayValue, } = state;
    const tree = [<QueryInput><Input onChange={this.onQueryTree} suffix={this.getSuffix()}/></QueryInput>,
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

  getSuffix = () => {
    const { mutliple, } = this.props;
    if (mutliple) {
      const iconClass = this.state.selectAll ? Checked : UnCheck;
      return <Icon iconClass={iconClass} onClick={this.onSelectAll}></Icon>;
    }
    return null;
  };

  onSelectAll = () => {

    const selectAll = !this.state.selectAll;
    if (selectAll === true) {
      const { data, displayField, } = this.props;
      const value = [];
      const displayValue = [];
      for (let i = 0; i < data.length; i++) {
        const { key, [displayField]: title, } = data[ i ];
        value.push(key);
        displayValue.push(title);
      }
      this.setState({ value: value.join(','), displayValue: displayValue.join(','), selectAll: true, });
    } else {
      this.setState({ value: '', displayValue: '', selectAll: false, });
    }
  };

  onQueryTree = value => {
    this.setState({ query: value, });
  };

  onInputTagPopupVisibleChange = (visible: boolean) => {
    this.setTreePopupVisible(!visible);
  };

  onTreePopupVisibleChange = (visible: boolean) => {
    if (visible) {
      const { onTrigger, } = this.props;
      onTrigger && onTrigger();
    }
  };

  onInputTagChange = ({ value, displayValue, }: Object) => {
    this.setState({ value, displayValue, });
  };

  onTreeChange = (value: Array<string>, displayValue: Array<string>) => {
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
