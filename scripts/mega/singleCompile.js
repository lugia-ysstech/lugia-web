/**
 * Created Date: Thursday, January 17th 2019, 8:16:22 am
 * Author: hanjingbo@ysstech.com | jingboup@gmail.com
 * -----
 * Last Modified: Monday, August 19th 2019, 10:03:05 am
 * Modified By: hanjingbo <hanjingbo@ysstech.com | jingboup@gmail.com>
 * -----
 * Copyright (c) 2019-present, #Lugia#.
 * ------------------------------------
 * Javascript will save your soul!
 */

const build = require('@lugia/mega-scripts/lib/utils/buildApp');
const registerBabel = require('@lugia/mega-scripts/lib/utils/registerBabel');
const getUserConfig = require('@lugia/mega-config').default;
const { join, dirname } = require('path');
const { writeFileSync, ensureFileSync } = require('fs-extra');

// 此函数执行时需要设置环境变量
// 无论是在父进程还是子进程
// 必须 process.env.NODE_ENV = 'production' / 'development';
// process.env.COMPRESS = 'none';
// process.env.ESLINT = 'none';
// process.env.TSLINT = 'none';
// process.env.__FROM_TEST = true;
function singleCompile(
  {
    cwd,
    entry,
    name = '__SINGLE_COMPILED__',
    watch,
    configFile,
    publicPath,
    disableCssExtract
  },
  cb
) {
  let userConfig = {};
  if (configFile) {
    // register babel for config files
    registerBabel(require.resolve('@lugia/mega-scripts/lib/utils/babel.js'), {
      cwd: dirname(configFile),
      configOnly: true
    });

    // get user config
    userConfig = getUserConfig({
      cwd,
      configFileName: configFile
    }).config;

    userConfig.babel = userConfig.babel || {
      presets: [
        [
          require.resolve('@lugia/mega-scripts/lib/utils/babel.js'),
          {
            browsers: ['chrome 70'],
            autoInstall: true,
            engine: 'webpackApp'
          }
        ],
        ...(userConfig.extraBabelPresets || [])
      ],
      plugins: userConfig.extraBabelPlugins || []
    };

    delete userConfig.entry;
  }

  const applyConfig = config => ({
    ...config,
    ...userConfig,
    commons: [],
    html: null,
    hash: null,
    manifest: null,
    browserslist: ['chrome 70'],
    extraBabelIncludes: [
      /react-app-polyfill/,
      /decamelize/,
      ...(userConfig.extraBabelIncludes || [])
    ],
    publicPath,
    disableCssExtract
  });

  const applyWebpack = (webpackConfig, { merge }) =>
    merge(webpackConfig, {
      output: {
        path: join(cwd, './.lugia/temp'),
        library: name,
        libraryTarget: 'window'
        // filename: '[name].js'
      },
      externals: {
        react: 'React',
        'react-dom': 'ReactDom',
        '@lugia/lugiax': 'lugiax',
        '@lugia/theme-config': 'lugiatheme',
        '@lugia/theme-core': 'lugiadthemecore',
        '@lugia/dict': 'lugiadict',
        'styled-components': 'styled',
        '@lugia/theme-hoc-devtools': 'LugiaThemeDevTools'
      }
    });

  build(
    {
      cwd,
      entry,
      watch,
      // configFile,
      useMemoryFS: true,
      applyConfig,
      applyWebpack
    },
    cb
  );
}

module.export = singleCompile;

process
  .on('message', m => {
    if (m && m.SINGLE_COMPILE) {
      singleCompile(m, (error, { warnings, assets } = {}) => {
        if (error) {
          send({
            error: error.message
          });
        } else {
          const { outputDir } = m;
          const jsAssets = assets
            .filter(asset => {
              const {
                content,
                originalAsset: { name }
              } = asset;

              if (/\.js$/.test(name)) {
                return true;
              }

              if (outputDir) {
                const outputPath = join(outputDir, name);
                ensureFileSync(outputPath);
                writeFileSync(outputPath, Buffer.from(content));
              }

              return false;
            })
            .map(asset => ({
              ...asset,
              content: asset.content.toString()
            }));

          send({
            warnings,
            assets: jsAssets
          });
        }
      });
    }
  })
  .on('exit', code => {
    // 退出事件
    if (code === 0) {
      send({ info: 'exit' });
    } else {
      send({ error: `exit code ${code}` });
    }
  })
  .on('error', error => {
    // 报错事件
    send({ error: `onError: ${error.message}` });
  })
  .on('SIGHUP', () => {
    // 程序停止信号
    send({ info: 'SIGHUP' });
  })
  .on('SIGTERM', () => {
    // kill 默认参数信号
    send({ info: 'SIGTERM' });
  })
  .on('SIGINT', () => {
    // Ctrl + c 信号
    send({ info: 'SIGINT' });
  })
  .on('uncaughtException', error => {
    // 未捕获异常
    send({ error: `onUncaughtException: ${error.message}` });
  });

function send(msg) {
  process.send({ SINGLE_COMPILED: true, ...msg });
}
