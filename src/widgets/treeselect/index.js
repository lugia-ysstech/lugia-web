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
  onTrigger?: Function,
  onChange?: Function,
  splitQuery?: string,
  limitCount: number,
  canInput: boolean,
  placeholder?: string,
  defaultDisplayValue?: string,
};
type TreeSelectState = {
  open: boolean,
  value: string,
  displayValue: string,
  query: string,
  selectAll: boolean,
  selectCount: number,
};
const QueryInputPadding = 3;
const QueryInput = styled.div`
  padding: ${QueryInputPadding}px;
`;
const UnCheck = 'sv-icon-android-checkbox-out1';
const Checked = 'sv-icon-android-checkbox';
const SelectedIcon = 'SelectedIcon';
const Text = styled.span`
  color: white;
  font-size: 12px;
  width: 100%;
  background: #108ee9;
  padding: 0.1rem;
  position: absolute;
  border-radius: 3px;
`;

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectState> {
  static defaultProps = {
    getTheme () {
      return {};
    },
    mutliple: false,
    onlySelectLeaf: false,
    canInput: false,
    displayField: 'title',
  };

  state: TreeSelectState;
  inputTag: Object;
  treeTriger: Object;
  oldValue: string;
  treeVisible: boolean;

  constructor (props: TreeSelectProps) {
    super(props);
    const { value, displayValue, } = this.getInitValue(props);
    this.state = {
      open: false,
      query: '',
      value,
      displayValue,
      selectCount: 0,
      selectAll: false,
    };
    this.oldValue = value;
    this.treeVisible = false;
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
      || state.selectCount !== nextState.selectCount
      || state.value !== nextState.value;
  }

  render () {
    const { props, state, } = this;
    const { data, placeholder, } = props;
    const { query, value, displayValue, selectCount, } = state;
    const tree = [<QueryInput><Input value={this.state.query} onChange={this.onQueryTree} suffix={this.getSuffix()}
                                      onKeyDown={this.onQueryKeyDown}/></QueryInput>,
      <Tree data={data}
            {...props}
            className="sv"
            query={query}
            value={value}
            onChange={this.onTreeChange}
            displayValue={displayValue}>
      </Tree>,];

    if (this.isMutliple()) {
      let str = `已选择${selectCount}个结点`;
      const { limitCount, } = props;
      if (limitCount != undefined) {
        str += `,最多可选${limitCount}个结点`;
      }
      tree.push(<Text>{str}.</Text>);
    }

    const getTreeTriger: Function = (cmp: Object) => {
      this.treeTriger = cmp;
    };
    const getInputTag: Function = (cmp: Object) => {
      this.inputTag = cmp;
    };
    return <Theme config={this.getTheme()}>
      <Trigger popup={tree}
               onPopupVisibleChange={this.onTreePopupVisibleChange}
               align="bottomLeft"
               ref={getTreeTriger}
               action={['click',]}
               hideAction={['click',]}>
        <InputTag value={value} displayValue={displayValue} onChange={this.onInputTagChange}
                  mutliple={this.isMutliple()}
                  placeholder={placeholder}
                  ref={getInputTag}
                  onPopupVisibleChange={this.onInputTagPopupVisibleChange}/>
      </Trigger>
    </Theme>;
  }

  getSuffix = () => {
    const result = [];
    if (this.isCanInput()) {
      result.push(<Icon iconClass="sv-icon-plus" key="add" onClick={this.onAdd}
                        viewClass={SelectedIcon}></Icon>);
    }
    if (this.isMutliple()) {
      const iconClass = this.state.selectAll ? Checked : UnCheck;
      result.push(<Icon iconClass={iconClass} key="selAll" onClick={this.onSelectAll} viewClass={SelectedIcon}></Icon>);
    }

    return result;
  };

  isMutliple () {
    const { mutliple, } = this.props;
    return mutliple;
  }

  isCanInput () {
    const { canInput, } = this.props;
    return canInput;
  }

  onQueryKeyDown = (e: Object) => {
    if (e.keyCode === 13) {
      this.appendValue();
    }
  };

  onAdd = () => {
    this.appendValue();
  };

  appendValue () {
    const inputValue = this.state.query;
    if (inputValue && inputValue.trim() && this.isCanInput()) {
      if (this.isMutliple()) {
        const { value = '', displayValue = '', } = this.state;


        function joinValue (value: string) {
          return value ? value + `,${inputValue}` : inputValue;
        }

        // TODO:存在问题
        this.setState({
          query: '',
          value: joinValue(value),
          displayValue: joinValue(displayValue),
        });
      } else {
        this.setState({
          query: '',
          value: inputValue,
          displayValue: inputValue,
        });
      }
    }
  }


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
      this.setValue(value, displayValue, { selectAll: true, }, () => {
        this.oldValue = this.state.value;
      });
    } else {

      this.setValue([], [], { selectAll: false, }, () => {
        this.oldValue = this.state.value;
      });
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
      let { value, selectCount, } = this.state;
      this.oldValue = value;
      if (this.isMutliple()) {
        selectCount = this.inputTag.target.getCount();
      }
      this.setState({ query: '', selectCount, });
    } else {
      this.onChange();
    }
    this.treeVisible = visible;
  };

  onInputTagChange = ({ value, displayValue, }: Object) => {
    this.setValue(value, displayValue, {}, () => {
      if (this.treeVisible === false) {
        this.onChange();
      }
    });
  };

  onTreeChange = (value: Array<string>, displayValue: Array<string>) => {
    this.setValue(value, displayValue, {});
  };

  setValue (value: Array<string>, displayValue: Array<string>, other: Object, callback = () => {}) {
    let valStr = '', dispStr = '';
    if (!value || value.length === 0) {
      other.selectAll = false;
    } else {
      valStr = value.join(',');
      dispStr = displayValue.join(',');
    }
    this.setState({ value: valStr, displayValue: dispStr, ...other, selectCount: value.length, }, callback);
  }

  setTreePopupVisible (visible: boolean) {
    if (this.treeTriger && this.treeTriger.target) {
      this.treeTriger.target.setPopupVisible(visible);
    }
  }

  onChange = () => {

    if (this.oldValue !== this.state.value) {
      const { onChange, } = this.props;
      const { value, displayValue, } = this.state;
      onChange && onChange({ value, displayValue, });
    }
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
      [SelectedIcon]: { color: '#d9d9d9', hoverColor: '#108ee9', },
      [Widget.Input]: Object.assign({}, theme, queryInputConfig),
    };
  }

}

export default ThemeProvider(TreeSelect, Widget.TreeSelect);
