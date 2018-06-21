/**
 * 组件样式处理增强
 * @flow
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Widgets from '../consts/index';

type ProviderComponent = React.ComponentType<any> & { displayName: ?string };
const ThemeProvider = (Target: ProviderComponent, widgetName: string): Function => {

  class ThemeWrapWidget extends React.Component<any, any> {
    svtarget: Object;


    constructor (props: any) {
      super(props);
      this.state = { svThemVersion: 0 };
    }
    //TODO: 需要单元测试
    componentWillReceiveProps (props: any, context: any) {
      const nowContext = this.context;
      if (nowContext.config !== context.config
        || nowContext.svThemeConfigTree !== context.svThemeConfigTree) {
        this.setState({
          svThemVersion: this.state.svThemVersion + 1,
        });
      }
    }

    render () {
      const getTheme = () => {
        const { config = {}, svThemeConfigTree = {} } = this.context;
        const { viewClass = widgetName } = this.props;
        let currConfig = config[ viewClass ];
        if (!currConfig) {
          currConfig = svThemeConfigTree[ viewClass ];
        }
        currConfig = currConfig ? currConfig : {};
        return Object.assign({}, { ...currConfig }, { svThemeConfigTree });
      };
      return <Target {...this.props} getTheme={getTheme}
                     svThemVersion={this.state.svThemVersion}
                     ref={cmp => this.svtarget = cmp}></Target>;
    }

    getThemeTarget = () => {
      let target = this.svtarget;
      while ( target && target.svtarget ) {
        target = target.svtarget;
      }
      return target;
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
