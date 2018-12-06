export default {
  disableCSSModules: true,
  cssModulesWithAffix: true,
  applyWebpack(webpackConfig, { webpack, merge }) {
    return webpackConfig;
  },
};
