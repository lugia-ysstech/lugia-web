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
import Panel from './panel';

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
      const { getPartOfThemeProps } = this.props;
      const wrapTheme = getPartOfThemeProps('Container');
      return <Wrap themeProps={wrapTheme}>{this.renderChildren()}</Wrap>;
    }
    renderChildren = () => {
      const { children, accordion, zebraStripe, data, getPartOfThemeHocProps } = this.props;
      if ((!children && !data) || typeof children === 'string') {
        return (
          <Panel
            value="lugia-panel"
            title="Lugia Panel"
            onClick={this.handleClick}
            {...getPartOfThemeHocProps('Panel')}
            count={0}
          >
            Default Panel
          </Panel>
        );
      }
      if (data && data.length > 0) {
        return data.map((item, index) => (
          <Panel
            {...item}
            onClick={this.handleClick}
            open={this.handleOpen(item.value)}
            accordion={accordion}
            zebraStripe={zebraStripe}
            {...getPartOfThemeHocProps('Panel')}
            count={index}
          >
            {item.children}
          </Panel>
        ));
      }
      return React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onClick: this.handleClick,
            open: this.handleOpen(child.props.value),
            accordion,
            zebraStripe,
            ...getPartOfThemeHocProps('Panel'),
            count: index,
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
