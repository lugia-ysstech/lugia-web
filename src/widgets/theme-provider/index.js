/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Widgets from '../consts/index';
import getConfig from '../theme/utils';

type ProviderComponent = React.ComponentType<any>;
const ThemeProvider = (Target: ProviderComponent, widgetName: string): Function => {
  class ThemeWrapWidget extends React.Component<any, any> {
    svtarget: Object;

    constructor(props: any) {
      super(props);
      this.state = { svThemVersion: 0 };
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
      return (
        <Target
          {...this.props}
          getTheme={getTheme}
          svThemVersion={this.state.svThemVersion}
          ref={cmp => (this.svtarget = cmp)}
        />
      );
    }

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
  ThemeWrapWidget.displayName = Widgets.ThemeWrapWidget;
  return ThemeWrapWidget;
};
export default ThemeProvider;
