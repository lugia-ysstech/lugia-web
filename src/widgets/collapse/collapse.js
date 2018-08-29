/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { CollapseProps, CollapseState } from '../css/collapse';

function handleStateValue(value: string | string[]): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}
export default ThemeProvider(
  class extends React.Component<CollapseProps, CollapseState> {
    constructor(props) {
      super(props);
    }
    static getDerivedStateFromProps(props, state) {
      const { activeValue, defaultActiveValue } = props;
      const hasValue = 'activeValue' in props;
      const stateValue = hasValue ? activeValue : state ? state.value : defaultActiveValue;

      return {
        value: handleStateValue(stateValue),
      };
    }

    render() {
      const { children, getTheme } = this.props;
      return <div>{this.renderChildren()}</div>;
    }
    renderChildren = () => {
      const { children } = this.props;
      return React.Children.map(children, child => {
        return React.cloneElement(child, {
          onClick: this.handleChange,
          open: this.handleOpen(child.props.value),
        });
      });
    };
    handleChange = (val: string) => {
      const hasValue = this.hasValueProps();
      const { onChange } = this.props;
      const { value } = this.state;
      const newValue = [...value];
      const index = value.indexOf(val);
      if (~index) {
        newValue.splice(index, 1);
      } else {
        newValue.push(val);
      }
      const params = {
        newValue,
        oldValue: value,
      };
      onChange && onChange(params);
      if (!hasValue) {
        this.setState({
          value: newValue,
        });
      }
    };
    handleOpen = (panelValue: string) => {
      const { value } = this.state;
      if (Array.isArray(value)) {
        return !!~value.indexOf(panelValue);
      }
      return value === panelValue;
    };
    hasValueProps() {
      return 'activeValue' in this.props;
    }
  },
  Widget.Collapse
);
