export default {
  disableCSSModules: true,
  cssModulesWithAffix: true,
  applyWebpack(webpackConfig, { webpack, merge }) {
    return webpackConfig;
  },
  dllDependenciesExcludes: ['rc-util', '@babel/runtime-corejs3'],
  dllDependenciesIncludes: ['jsoneditor', 'react', 'react-dom'],
};
