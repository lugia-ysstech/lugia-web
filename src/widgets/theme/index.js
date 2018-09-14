/**
 * 用于进行原始配置的组件
 * create by ligx
 *
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';

import * as React from 'react';
import PropTypes from 'prop-types';
import Widget from '../consts/index';
import getConfig from './utils';

import '../common/shirm';

type PropsType = {
  children: React.Node,
  config: { [key: string]: ThemeType },
  className?: string,
};
type StateType = {};

class Theme extends React.Component<PropsType, StateType> {
  static defaultProps = {
    config: {},
  };
  static displayName = Widget.Theme;
  svThemeConfigTree: Object;

  constructor(props: PropsType, context: Object) {
    super(props);
    this.updateTreeConfig(props, context);
  }

  componentWillReceiveProps(nextProps: PropsType, context: Object) {
    const nowContext = this.context;
    if (
      nextProps.config !== this.props.config ||
      nowContext.config !== context.config ||
      nowContext.svThemeConfigTree !== context.svThemeConfigTree
    ) {
      this.updateTreeConfig(nextProps, context);
    }
  }

  updateTreeConfig(props: PropsType, context: Object) {
    const { config, svThemeConfigTree } = context;
    this.svThemeConfigTree = getConfig(svThemeConfigTree, config, props.config);
  }

  getChildContext(): Object {
    const { props } = this;
    const { config } = props;
    return {
      config,
      svThemeConfigTree: this.svThemeConfigTree,
    };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

Theme.childContextTypes = {
  config: PropTypes.object,
  svThemeConfigTree: PropTypes.object,
};
Theme.contextTypes = {
  config: PropTypes.object,
  svThemeConfigTree: PropTypes.object,
};

export default Theme;
