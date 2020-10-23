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
      const { value, activeValue, defaultValue, defaultActiveValue, accordion } = props;
      if (activeValue || defaultActiveValue) {
        console.info('activeValue和defaultActiveValue即将废弃, 请使用value或defaultValue替代');
      }
      const hasValue = 'value' in props || 'activeValue' in props;
      const theActiveValue = value || activeValue;
      const theDefaultValue = defaultValue || defaultActiveValue;
      const stateValue = hasValue ? theActiveValue : state ? state.value : theDefaultValue;

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
      const {
        children,
        accordion,
        zebraStripe,
        showArrow,
        arrowIcon,
        data,
        getPartOfThemeHocProps,
      } = this.props;
      if ((!children && !data) || typeof children === 'string') {
        return (
          <Panel
            value="lugia-panel"
            title="Lugia Panel"
            onClick={this.handleClick}
            {...getPartOfThemeHocProps('Panel')}
            count={0}
            showArrow={showArrow}
            arrowIcon={arrowIcon}
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
            showArrow={showArrow}
            arrowIcon={arrowIcon}
            {...getPartOfThemeHocProps('Panel')}
            count={index}
          >
            {item.children}
          </Panel>
        ));
      }
      return React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const chosenIcon = child.props.arrowIcon || arrowIcon;
          return React.cloneElement(child, {
            onClick: this.handleClick,
            open: this.handleOpen(child.props.value),
            accordion,
            zebraStripe,
            showArrow,
            ...getPartOfThemeHocProps('Panel'),
            count: index,
            arrowIcon: chosenIcon,
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
      return 'value' in this.props || 'activeValue' in this.props;
    }
  },
  Widget.Collapse
);
