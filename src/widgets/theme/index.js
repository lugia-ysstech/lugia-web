/**
 * 用于进行原始配置的组件
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Widget from '../consts/index';
import '../common/shirm';

type PropsType = {
  children: React.Node,
  config: Object,
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

  //TODO: 需要单元测试
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
    this.svThemeConfigTree = Object.assign({}, svThemeConfigTree, config, props.config);
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
    const { children, className } = this.props;
    return <span className={className}>{children}</span>;
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
