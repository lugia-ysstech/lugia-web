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
import { Wrap } from '../css/collapse';

function handleStateValue(value: string | string[], accordion?: boolean): string[] {
  if (Array.isArray(value)) {
    if (accordion) {
      const stateValue = value[0] ? [value[0]] : [];
      return stateValue;
    }
    return value;
  }
  return [value];
}
export default ThemeProvider(
  class extends React.Component<CollapseProps, CollapseState> {
    static getDerivedStateFromProps(props, state) {
      const { activeValue, defaultActiveValue, accordion } = props;
      const hasValue = 'activeValue' in props;
      const stateValue = hasValue ? activeValue : state ? state.value : defaultActiveValue;

      return {
        value: handleStateValue(stateValue, accordion),
      };
    }

    render() {
      const panelTheme = this.props.getTheme().svThemeConfigTree.sv_widget_Panel;
      return (
        <Wrap panelTheme={panelTheme || {}} theme={this.props.getTheme()}>
          {this.renderChildren()}
        </Wrap>
      );
    }
    renderChildren = () => {
      const { children, accordion } = this.props;
      return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onClick: this.handleClick,
            open: this.handleOpen(child.props.value),
            accordion,
          });
        }
      });
    };
    handleClick = (val: string) => {
      const hasValue = this.hasValueProps();
      const { onChange, accordion } = this.props;
      const { value } = this.state;
      let newValue = [...value];
      const index = value.indexOf(val);
      if (~index) {
        newValue.splice(index, 1);
      } else {
        if (accordion) {
          newValue = [val];
        } else {
          newValue.push(val);
        }
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
