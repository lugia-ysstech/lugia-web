/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';

export default (Target: React.ComponentType<any>) => (props: Object): React.Element<any> => {

  const getTheme = function (self : Object) {
    const { config, } = self.context;
    const { viewClass, } = self.props;
    const result = config[ viewClass ];
    return result ? result : {};
  };
  return <Target {...props} getTheme={getTheme}/>;

};
