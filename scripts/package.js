const Compile = require('@lugia/lugia-package-demo').default;
const { join } = require('path');
const projectPath = join(__dirname, '../');
const templateToCopyPath = join(__dirname, '../', 'createDemo');

// publicPath: 'http://192.168.102.79:9000/component-project/1/'

const demoCompile = new Compile({
  npmRegistry: 'https://registry.npmjs.org/',
  templateToCopyPath,
  projectPath,
  demoProjectOutputPath: 'demo-site',
  entryFile: 'createDemo/src/index.js',
  extraBabelIncludes: [
    /decamelize/,
    /debug/,
    /d3-regression/,
    /d3-array/,
    /d3-sankey/,
    /d3-hierarchy/,
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@lugia/lugia-web',
        libraryDirectory: 'dist',
      },
      '@lugia/lugia-web',
    ],
  ],
  alias: {
    '@': './src',
  },
  isRemoveTemporaryFiles: false,
});
demoCompile.compile().then(data => {
  console.log('成功', data);
});
