/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';

export default (Target: React.ComponentType<any>, widgetName: string) => {
  const result = (props: Object, context: Object): React.Element<any> => {

    const getTheme = function () {
      const { config, } = context;
      const { viewClass = widgetName, } = props;
      const result = config[ viewClass ];
      return result ? result : {};
    };
    return <Target {...props} getTheme={getTheme}/>;

  };

  result.contextTypes = {
    config: PropTypes.object,
  };
  return result;
};
