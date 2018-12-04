# @lugia/lugia-web

一套基于 `Lugia Design Language` 的高品质 React 组件，适用于 Web 端

> ~~[文档](http://doc.gointech.net/sv-widget/)~~

## 开发方式

[Fork 工作流](https://github.com/geeeeeeeeek/git-recipes/wiki/3.5-%E5%B8%B8%E8%A7%81%E5%B7%A5%E4%BD%9C%E6%B5%81%E6%AF%94%E8%BE%83#fork-%E5%B7%A5%E4%BD%9C%E6%B5%81)

### 补充：

在 gitlab 中，当中央仓库合并了你的开发分支请求后（Merge Request !X was merged），怎样与中央仓库同步并删除开发分支：

```bash
git checkout <本地主分支>
git pull <中央仓库名字> <中央仓库主分支>
git push
git branch -d <本地开发分支>
git push <自己仓库名字> -d <自己仓库开发分支>
```

查看本地连接到的仓库

```bash
git remote -v
```

> [在 VSCode 中开发调试](./.vscode/README.md)

## 安装新的包

### 1、切换 npm 源到 taobao

```bash
# 安装 nrm
npm i nrm -g

# 查看是否安装成功
nrm ls

# 切换源
nrm use taobao
```

### 2、设置 @lugia/xxx 走私服源

```bash
npm config set @lugia:registry http://192.168.102.79:5001/

# 查看是否设置成功
$ npm config get @lugia:registry
# http://192.168.102.79:5001/
```

## 其他

为什么不使用 `lugia-scripts test -w`

> 和以前用的 create-react-app 的 jest 的配置不同，以前写的许多测试用例过不了
