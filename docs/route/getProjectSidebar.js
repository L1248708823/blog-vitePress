/*
 * @Author: lpj 1248708823@qq.com
 * @Date: 2022-08-14 23:16:31
 * @LastEditors: lpj 1248708823@qq.com
 * @LastEditTime: 2022-08-14 23:21:03
 * @FilePath: \vite\docs\route\getProjectSidebar.js
 * @Description: 工程化模块路由
 */
function getProjectSidebar() {
  return [
      {
          text:'HTML',
          children: [
              { text: '基础', link: '/interview/HTML/' },
              { text: '进阶', link: '/interview/HTML/advanced' },
          ],
          sidebarDepth:3
      },
      {
          text:'CSS',
          children:[
              { text: '基础', link: '/CSS/' },
              { text: '进阶', link: '/CSS/advanced' },
          ]
      },
      {
        text:'Javascript',
        children:[
          { text: '基础', link: '/Javascript/' },
          { text: '进阶', link: '/Javascript/advanced' },
        ]
      },
      {
        text:'Vue',
        children:[
          { text: '基础', link: '/Vue/' },
          { text: '进阶', link: '/Vue/advanced' },
        ]
      },
      {
        text:'浏览器',
        children:[
          { text: '基础', link: '/Vue/' },
          { text: '进阶', link: '/Vue/advanced' },
        ]
      },
      {
        text:'网络',
        children:[
          { text: '基础', link: '/Network/' },
          { text: '进阶', link: '/Network/advanced' },
        ]
      },
      {
        text:'安全',
        children:[
          { text: '基础', link: '/Security/' },
          { text: '进阶', link: '/Security/advanced' },
        ]
      },
      {
        text:'面经',
        children:[
          { text: '基础', link: '/Experience/' },
          { text: '进阶', link: '/Experience/advanced' },
        ]
      },
  ]
}
module.exports = {
  getProjectSidebar
}