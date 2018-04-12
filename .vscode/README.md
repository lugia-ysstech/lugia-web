# 使用 VSCode 开发调试 sv-widget 项目

* 下载代码到本地，安装依赖

```bash
git clone xxx && npm install
```

* 安装最新版本的 [VSCode](https://code.visualstudio.com/)

## Debugging

> 在 `VSCode` 中编写代码，设置断点，更改代码并调试新修改的代码。

需要安装 VSCode 扩展 [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)。

然后将下面的代码块添加到 `.vscode/launch.json` 文件中，`.vscode` 文件夹在项目根目录。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceRoot}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

> 注意：如果你更改了 [HOST 或 PORT 环境变量](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#advanced-configuration)，则 url 可能需要修改。

启动应用 `npm start`，然后按 `F5` 或单击绿色的调试图标开始在 `VSCode` 中进行调试。

[Debugger for Chrome 调试故障指南](https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md#troubleshooting)

## ESLint

> 在 `VSCode` 中，修改 `js(包括flow)` 代码时， `ESLint` 会智能感知，并且在保存时自动修复代码，规则依照项目下的 `.eslintrc` 配置文件。

需要安装 VSCode 扩展 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。

配置文件 `.vscode/setting.json` 参考

```json
{
  "javascript.validate.enable": false,
  "files.autoSave": "off",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    "vue"
  ]
}
```

## Flow

> 在 `VSCode` 中，对于 Flow

* 智能感知
* 转到 定义 / Peek 定义
* 诊断（错误，警告）
* 悬停类型信息
* 可切换代码覆盖率报告

需要安装 VSCode 扩展 [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)。

配置文件 `.vscode/setting.json` 参考

```json
{
  "flow.pathToFlow": "${workspaceRoot}/node_modules/.bin/flow",
  "flow.useNPMPackagedFlow": true,
  // false 性能，true 速度，这个扩展很吃内存
  "flow.runOnEdit": false
}
```

> 注意: 需要在项目中禁用 TypeScript 内置扩展，上面链接有说明，否则两者会重复。这个扩展很慢，如果修改了代码没有报问题，可能是**它还没反应过来**，不是你的代码没问题。

## Jest

> 好用，下面链接有介绍

需要安装 VSCode 扩展 [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)。

### Debugging Tests

点击 it 上面的附属代码块 `debug` 即可开始调试单个测试，也可以在侧边栏 `Debug` 中通过启动 `vscode-jest-tests` 调试所有测试。

#### 添加 `vscode-jest-tests`：

将下面的代码块添加到 `.vscode/launch.json` 文件中，`.vscode` 文件夹在项目根目录。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "program": "${workspaceFolder}/scripts/test",
      "args": ["--env=jsdom", "--runInBand"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "protocol": "inspector",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## 完整的配置

### `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "program": "${workspaceFolder}/scripts/test",
      "args": ["--env=jsdom", "--runInBand"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "protocol": "inspector",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceRoot}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### `.vscode/setting.json`

```json
{
  "javascript.validate.enable": false,
  "files.autoSave": "off",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    "vue"
  ],
  "flow.pathToFlow": "${workspaceRoot}/node_modules/.bin/flow",
  "flow.useNPMPackagedFlow": true,
  "flow.runOnEdit": false
}
```
