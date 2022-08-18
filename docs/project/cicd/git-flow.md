<!--
 * @Author: lpj 1248708823@qq.com
 * @Date: 2022-08-14 20:59:07
 * @LastEditors: lpj 1248708823@qq.com
 * @LastEditTime: 2022-08-14 21:01:26
 * @FilePath: \vite\docs\基建篇01：统一成员git提交规范以及代码提交检测.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 背景

再用git作为代码版本管理的时候，同学们可能会遇到这么一种情况，就是提交记录千奇百怪，什么格式的都有，如果很不幸，你是个接盘侠，或者需要对项目进行管理复盘，想必把其他程序猿祭天的心思都有了。

可能有这么几个场景：

-   提交信息模糊，比如写了个【解决bug】，就很让人迷惑（黑人问号脸）。
-   后期需要定位某个bug的修复记录，基本找不到。茫茫提交记录里面去捞吧，这个也可以视为和`issue`的联动。



![接手的时候看到这种是不是血压上来了](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ff908f9b43641388b4c7c595b3cd2a5~tplv-k3u1fbpfcp-watermark.image?)

**简而言之** ：不规范的提交说明无法让其他的同学快速得知项目的变化，也获取不到任何有效信息，这对接手或者项目管理的同学打击很大ORZ。

## **Angular提交规范**

### 示例

我们可以直接利用已有的**Angular提交规范**。 先来看下正面例子并简单分析下。

```

fix(types): support string type for style in VNode data (#9728)
----------------以这条为例-----------------
fix 说明是修复bug
(types) 作用域
support string type for style in VNode data： 文件描述
(#9728) 对应的issue。 可以直接跳转到本项目的特定issue下面
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88c35a5dee604cb4bca434d8f5d18314~tplv-k3u1fbpfcp-zoom-1.image)

### 语法

我们先来看下基本的语法规则：

```
<type>(<scope>): <subject>
# 空一行
<body>
# 空一行
<footer>
```

#### Header

-   **type**：用于说明`commit`的提交类型，必选
-   **scope**：用于说明`commit`的影响范围，可选
-   **subject**：用于说明`commit`的细节描述，可选

**type**必选：`commit`的提交类型。倒也不用特定的去记忆，后续我们会使用vscode自带的插件来辅助我们提交。

| 类型           | 功能 | 描述                |
| ------------ | -- | ----------------- |
| **feat**     | 功能 | 新增功能              |
| **fix**      | 修复 | 修复缺陷，修复上一版本存在问题   |
| **docs**     | 文档 | 更新文档，仅修改文档不修改代码   |
| **style**    | 样式 | 变动格式，不影响代码逻辑      |
| **refactor** | 重构 | 重构代码，非新增功能也非修改缺陷  |
| **perf**     | 性能 | 优化性能，提高代码执行性能     |
| **test**     | 测试 | 新增测试，追加测试用例验证代码   |
| **build**    | 构建 | 更新构建，修改构建工具或外部依赖  |
| **ci**       | 脚本 | 更新脚本，修改CI或执行脚本配置  |
| **chore**    | 事务 | 变动事务，修改其他不影响代码的事务 |
| **revert**   | 回滚 | 回滚版本，撤销某次代码提交     |
| **merge**    | 合并 | 合并分支，合并分支代码到其他分支  |
| **sync**     | 同步 | 同步分支，同步分支代码到其他分支  |
| **impr**     | 改进 | 改进功能，升级当前功能模块     |

**scope**可选：`  commit `的影响范围。举个栗子可以按架构类型来分，比如业务层代码，视图层代码。这个需要根据同学们的项目特色来制定，可以按架构，也可以按照交互行为，或者是功能。虽然是可选，还是建议大家写上。

**subject**可选：`commit`的细节描述。简单的概述，尽量一句话能说明你的意图。具体的小作文可以放在`body`之中。尽量以动词开头，即声明了【我】做了写什么事情。 同时不以符号结尾。

例如：【feat(api): 新增日活埋点接口xxx】

#### Body（正文）

这个部分就是能写多详细就写多详细。可以尽量阐述的你的意图和代码需要注意的点。

例如：修改了一个记录用户日活失败的bug。这边就可以阐述bug的产生原因和解决办法。

#### Footer（脚注）

该部分只适用两种情况，分别是`不兼容变动`与`问题关闭`。

-   **不兼容变动**：当前代码与上一版本不兼容，则以`BREAKING CHANGE`开头，关联`变动描述`、`变动理由`和`迁移方法`
-   **问题关闭**：当前代码已修复某些`Issue`，则以`Closes`开头，关联目标`Issue`

例如： Close #9527

## 解决方案

### Commitlint

安装插件

```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

在项目的根目录创建`.commitlintrc.js`文件

```
module.exports = {
  extends: [
    "@commitlint/config-conventional"
  ]
};
```

接下来为 git 配置 ` husky  `，对 git 的 **` commit  `**操作进行**校验**。`husky`继承了Git下所有的钩子，在触发钩子的时候，`husky`可以阻止不合法的`commit`，`push`等

```
npm install husky --save-dev
```

在 `package.json` 中引入 `husky`

```

// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }  
  }
```

提交代码的时候触发钩子，执行 commitlint -E HUSKY_GIT_PARAMS命令，然后读取`commitlint.config.js`的配置，如果检测不通过的话会中止提交并报错。

以上就是关于**提交信息**规范的配置，除此之外呢，我们还可以借助`husky`这个钩子对要提交的**代码文件**进行校验等操作。

### lint-staged

安装

```
npm i --D lint-staged
```

在 `package.json` 中引入 `husky`的其他配置

```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "**/*.{js,jsx,vue,ts,tsx}": [
      "cross-env NODE_ENV=development vue-cli-service lint"
    ]
  }
```

**说明：** 这里 `lint-staged` 的配置是：在 git 的待提交的文件中，在【开发环境】，项目目录下的所有 js,jsx,vue,ts,tsx 都要执行`vue-cli-service lint`,命令

**`vue-cli-service lint`**是vue-cli3.0在构建项目的时候自动生成的。检验规则

`.eslintrc.js，.eslintignore，.editorconfig`

### VsCode插件 Conventional Commits

使用这个工具可以帮助快速生成提交信息。

首先在VsCode 中安装该插件，然后`ctrl + shift + p` 并输入Conventional Commits。根据提示一步步点击就可以快速生成啦~

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f499187cafea43999b9666d749071876~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da8cb3651d0946a48623552f7293dcd0~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a0a31fdc0da44dea1bb8e799b47a2c0~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6d64de7480142d5b8893ddba0cccbab~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2eb55b9b41946c08c2683b04cd1bc11~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1ef90ace2c94a01bebe6be88b242f92~tplv-k3u1fbpfcp-watermark.image?)