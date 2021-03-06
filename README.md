# Ant Design Tabs

项目地址[Ant Design Tabs](https://github.com/gamemock/ant-design-tabs) 。 基于 Ant Design Pro v5 版本改造。

1. 支持多页签；
2. 支持服务动态路由；
3. 支持 iframe 嵌入...

## 环境准备

安装 `node_modules`:

```bash
npm install
```

或

```bash
yarn
```

## 已经提供的脚本

Ant Design Tabs 提供了一些功能强大的脚本，帮助你启动、调试、测试项目。

脚本都在 `package.json`里。 可以自行添加或修改脚本:

### 启动项目

```bash
npm start
```

### 构建项目

```bash
npm run build
```

### 检查代码质量

```bash
npm run lint
```

### 检查代码质量并自动修正

```bash
npm run lint:fix
```

### 测试代码

```bash
npm test
```

## 更多

更多的文档可以查看 [AntDesignPro 官网](https://pro.ant.design)。

# 遗留问题

1. 模拟的菜单接口存在数据冗余；(fixed:2021-11-01)
2. 刷新后导致已打开的 tab 页信息丢失；(fixed:2021-11-03)
3. 无法根据路由正确的激活当前 tab；
4. iframe 嵌入的 content 高度异常；(fixed:2022-02-20)
5. 面包屑功能暂时缺失；
6. 样式紊乱，无法根据主题一键切换对应样式；
7. 首次刷新未能正确跳转到登录页；
8. 准备搞个域名用于展示；
9. 待补充...
