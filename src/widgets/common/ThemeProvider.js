/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';

const ThemeProvider = (Target: React.ComponentType<any> & { displayName: string }, widgetName: string) => {
  const ThemeWrapWidget = (props: Object, context: Object): React.Element<any> => {

    const getTheme = function () {
      const { config = {}, } = context;
      const { viewClass = widgetName, } = props;
      const result = config[ viewClass ];
      return result ? result : {};
    };
    Target.displayName = `ThemeWrapWidget[${widgetName}]`;
    return <Target {...props} getTheme={getTheme}/>;

  };

  ThemeWrapWidget.contextTypes = {
    config: PropTypes.object,
  };
  ThemeWrapWidget.displayName = 'ThemeWrapWidget';
  return ThemeWrapWidget;
};
export default ThemeProvider;
