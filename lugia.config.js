export default {
  disableCSSModules: true,
  cssModulesWithAffix: true,
  applyWebpack (webpackConfig, { webpack, merge }) {
    return webpackConfig;
  },
  dllDependenciesExcludes: ['rc-util'],
  dllDependenciesIncludes:['jsoneditor', 'react', 'react-dom']
};
