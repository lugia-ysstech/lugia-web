/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Widgets from '../consts/index';
import getConfig from '../theme/utils';
import { getAttributeFromObject } from '../common/ObjectUtils';

type ProviderComponent = React.ComponentType<any>;
const ThemeProvider = (Target: ProviderComponent, widgetName: string): Function => {
  class ThemeWrapWidget extends React.Component<any, any> {
    svtarget: Object;

    constructor(props: any) {
      super(props);
      this.state = {
        svThemVersion: 0,
        themeState: {
          click: false,
          disabled: false,
          hover: false,
        },
      };
    }

    componentWillReceiveProps(props: any, context: any) {
      const nowContext = this.context;
      if (
        nowContext.config !== context.config ||
        nowContext.svThemeConfigTree !== context.svThemeConfigTree
      ) {
        this.setState({
          svThemVersion: this.state.svThemVersion + 1,
        });
      }
    }

    render() {
      const getTheme = () => {
        const { config = {}, svThemeConfigTree = {} } = this.context;
        const { viewClass } = this.props;

        const result = getConfig({}, svThemeConfigTree, config);
        const viewClassResult = result[viewClass];
        const widgetNameResult = result[widgetName];
        const currConfig = { ...widgetNameResult, ...viewClassResult };
        return Object.assign({}, { ...currConfig }, { svThemeConfigTree });
      };

      const getThemeByDisplayName = (displayName: string) => {
        return getAttributeFromObject(
          getAttributeFromObject(getTheme(), 'svThemeConfigTree', {}),
          displayName,
          {}
        );
      };
      const { disabled } = this.props;
      return (
        <span
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onClick}
        >
          <Target
            {...this.props}
            themeState={{ ...this.state.themeState, disabled }}
            getTheme={getTheme}
            getWidgetThemeName={() => widgetName}
            getThemeByDisplayName={getThemeByDisplayName}
            svThemVersion={this.state.svThemVersion}
            ref={cmp => (this.svtarget = cmp)}
          />
        </span>
      );
    }

    onClick = () => {
      if (this.state.themeState.click === true) {
        return;
      }
      this.setState({
        themeState: { ...this.state.themeState, click: true },
      });
    };

    onMouseEnter = () => {
      if (this.state.themeState.hover === true) {
        return;
      }
      this.setState({
        themeState: { ...this.state.themeState, hover: true },
      });
    };

    onMouseLeave = () => {
      if (this.state.themeState.hover === false) {
        return;
      }
      this.setState({
        themeState: { ...this.state.themeState, hover: false },
      });
    };

    getThemeTarget = () => {
      let target = this.svtarget;
      while (target && target.svtarget) {
        target = target.svtarget;
      }
      return target;
    };
  }

  ThemeWrapWidget.contextTypes = {
    config: PropTypes.object,
    svThemeConfigTree: PropTypes.object,
  };
  ThemeWrapWidget.displayName = Widgets.ThemeWrapWidget + widgetName;
  return ThemeWrapWidget;
};
export default ThemeProvider;
