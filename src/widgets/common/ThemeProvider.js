/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import * as Widgets from '../consts/Widget';

type ProviderComponent = React.ComponentType<any> & { displayName: ?string };
const ThemeProvider = (Target: ProviderComponent, widgetName: string): Function => {

  class ThemeWrapWidget extends React.Component<any, any> {
    target: Object;

    render () {
      const getTheme = () => {
        const { config = {}, svThemeConfigTree = {}, } = this.context;
        const { viewClass = widgetName, } = this.props;
        let currConfig = config[ viewClass ];
        if (!currConfig) {
          currConfig = svThemeConfigTree[ viewClass ];
        }
        currConfig = currConfig ? currConfig : {};
        return Object.assign({}, currConfig, { svThemeConfigTree, });
      };
      return <Target {...this.props} getTheme={getTheme}
                     ref={cmp => this.target = cmp}></Target>;
    }
  }


  ThemeWrapWidget.contextTypes = {
    config: PropTypes.object,
    svThemeConfigTree: PropTypes.object,
  };
  ThemeWrapWidget.displayName = Widgets.ThemeWrapWidget;
  return ThemeWrapWidget;
};
export default ThemeProvider;
