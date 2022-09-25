module.exports = {
  // -----------------应用配置-----------------
  title: '非知名切图仔',
  description: '吼吼！ 你也网上冲浪🏄',
  head: [
    ["link", { rel: "icon", type: "image/gif", href: "/img/header-logo.svg" }]],
  // 最近更新时间
  lastUpdated: true,

   // 站点项目的输出位置
   outDir: '../dist',
  base: '/blog/',
  // 语言
  lang: 'zh-CN',
  // 副标题 生成格式 “非著名切图仔 | 社畜自救指北💊“”
  titleTemplate: '社畜自救指北💊',
  ignoreDeadLinks: true,
  // 黑化模式
  appearance: true,
   // 启动页面丝滑滚动
   smoothScroll: true,
 

  // -----------------主题配置-----------------
  themeConfig: {
    // 站点的title  不设置就取应用配置的title
    siteTitle: '社畜自救指北💊',
    logo: '/img/logo.gif',
    docFooter: {
      prev: 'Pagina prior1',
      next: 'Proxima pagina2'
    },
    // lastUpdated: '上次更新',
    lastUpdatedText: '上次更新',
    // 编辑仓库 TODO:
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: '是兄弟就来砍我！'
    // },
    // ----------------导航菜单---------------
    nav: [
      // activeMatch: 正则表达式定义为字符串值。 自定义选中
      { text: '首页', link: '/' , },
      { text: '👻404', link:"/project/404"},
      { text: '前端工程化', link:"/project/cicd/git-flow"},
      { text: '设计模式', link: "/designMode/about"},
      { text: '杂七杂八', link: "/other/dataView"},
      { 
          text: '林暗草惊风', 
          items: [
          
              { text: 'Github', link: 'https://github.com/L1248708823' },
              { text: '掘金', link: 'https://juejin.cn/user/3667626522851624' }
          ]
      }
   ],
     // ----------------侧边栏---------------
     sidebar: {
      "/project/": [
        {
          text: 'CICD自动部署流程',
          collapsible: true,
          items: [
            { text: "提交规范与约束", link: "/project/cicd/git-flow" },
            // { text: "社会", link: "/life/" },
            // { text: "2022-06年中总结", link: "/life/2022-06" },
            // { text: "2021-12年终总结", link: "/life/2021-12" },
          ]
        },
        {
          text: 'webpack打包',
          collapsible: true,
          items: [
            { text: "webpack介绍", link: "/project/webpack/webpack-about" },
            // { text: "社会", link: "/life/" },
            // { text: "2022-06年中总结", link: "/life/2022-06" },
            // { text: "2021-12年终总结", link: "/life/2021-12" },
          ]
        },
        {
          text: '脚手架',
          collapsible: true,
          items: [
            { text: "脚手架介绍", link: "/project/cli/cli-about" },
            // { text: "社会", link: "/life/" },
            // { text: "2022-06年中总结", link: "/life/2022-06" },
            // { text: "2021-12年终总结", link: "/life/2021-12" },
          ]
        }
      ],


      "/designMode/": [
        {
          text: '概览',
          collapsible: true,
          items: [
            { text: "设计模式理念", link: "/designMode/about" },
            // { text: "社会", link: "/life/" },
            // { text: "2022-06年中总结", link: "/life/2022-06" },
            // { text: "2021-12年终总结", link: "/life/2021-12" },
          ]
        },
        {
          text: '创造型',
          collapsible: true,
          items: [
            { text: "介绍", link: "" },
            // { text: "社会", link: "/life/" },
            // { text: "2022-06年中总结", link: "/life/2022-06" },
            // { text: "2021-12年终总结", link: "/life/2021-12" },
          ]
        },
        {
          text: '结构型',
          collapsible: true,
          items: [
            { text: "介绍", link: "" },
            // { text: "社会", link: "/life/" },
            // { text: "2022-06年中总结", link: "/life/2022-06" },
            // { text: "2021-12年终总结", link: "/life/2021-12" },
          ]
        },
        {
          text: '行为型',
          collapsible: true,
          items: [
            { text: "介绍", link: "" },
            // { text: "社会", link: "/life/" },
            // { text: "2022-06年中总结", link: "/life/2022-06" },
            // { text: "2021-12年终总结", link: "/life/2021-12" },
          ]
        }
      ],
      
      "/other/": [
        {
          text: '概览',
          collapsible: true,
          items: [
            { text: "数据大屏开发总结", link: "/other/dataView" },
          ]
        },
      ],
    }

  },
}

