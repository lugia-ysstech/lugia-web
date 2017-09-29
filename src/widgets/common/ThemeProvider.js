/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';

type ProviderComponent = React.ComponentType<any> & { displayName: ?string };
const ThemeProvider = (Target: ProviderComponent, widgetName: string): Function => {
  const ThemeWrapWidget = (props: Object, context: Object): React.Element<any> => {

    const getTheme = function () {
      const { config = {}, } = context;
      const { viewClass = widgetName, } = props;
      const result = config[ viewClass ];
      return result ? result : {};
    };
    Target.displayName = `ThemeWrapWidget[${widgetName}]`;
    return <Target {...props} getTheme={getTheme}></Target>;

  };

  ThemeWrapWidget.contextTypes = {
    config: PropTypes.object,
  };
  ThemeWrapWidget.displayName = 'ThemeWrapWidget';
  return ThemeWrapWidget;
};
export default ThemeProvider;
