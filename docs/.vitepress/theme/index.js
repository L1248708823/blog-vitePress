/*
 * @Author: lpj 1248708823@qq.com
 * @Date: 2022-08-15 17:56:23
 * @LastEditors: lpj 1248708823@qq.com
 * @LastEditTime: 2022-08-16 23:24:17
 * @FilePath: \vite\docs\.vitepress\layouts\index.js
 * @Description: 主题
 */
import DefaultTheme from 'vitepress/theme'
import Layout from './layouts/layout.vue'
import NotFound from './layouts/404.vue'
export default {
  ...DefaultTheme,
  // Layout,
  NotFound: NotFound, // <- this is a Vue 3 functional component
  enhanceApp({ app }) {
    // register global components
    // app.component('MyGlobalComponent' /* ... */)
  }
}