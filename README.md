# @lugia/lugia-web

一套基于 `Lugia Design Language` 的高品质 React 组件，适用于 Web 端

> [文档](http://lugia.tech/#/component/lugia)

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

### 1、安装 yarn

```bash
# 安装 yarn
npm install -g yarn

# 查看版本
yarn --version
```
### 2 、在项目根目录进行依赖包安装 

```bash
# 安装依赖包
yarn
```

## 启动项目

 ```bash
yarn start
 ```

