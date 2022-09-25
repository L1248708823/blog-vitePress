<!--
 * @Author: lpj 1248708823@qq.com
 * @Date: 2022-09-25 20:39:17
 * @LastEditors: lpj 1248708823@qq.com
 * @LastEditTime: 2022-09-25 20:50:53
 * @FilePath: \vite\docs\other\dataView.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
---
## 碎碎念

最近一段时间刚好公司需要开发数据大屏，用$Echarts$做完发现走了不少的弯路，趁今天有空把开发流程重新梳理了下。老规矩先放图：

![动画.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d58f7c356618464a8929f007c0f046a0~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/882c1673ea9d43e59d8663c82100fbce~tplv-k3u1fbpfcp-watermark.image?)

ps:具体实践请直接拉到最下面

## 事前沟通准备

数据大屏我个人认为最大的难点不在于[Echarts](https://echarts.apache.org/zh/api.html#echarts)的配置项多，而是来自于产品和UI天马行空的想象力。因此在开发前墙裂建议拉上产品和UI开个小会，避免后期的返工。

### 产品方面

1. 和产品确认好数据的来源和约束，根据展示空间的大小和服务器的性能来预判合理的数据量。
2. 以柱状图为例，X轴的数据点如果太过于密集，就会缩小以至于重叠，需要让产品给出数据点的最小/大数量来判断需不要开启**缩放拖拽**等(这部分也会影响ui设计的版面大小和交互)。
3. Y轴的数据的来源是通过业务数据推算，还是手动控制，如果出现异常数据（极小值或者极大值）了之后需不需要过滤。还有一直比较极端的情况就是Y轴数据到达了千万以上级别（只是举个栗子），可能会出现数据被遮挡的情况，需不需要改用科学计数法（影响UI）
4. **图表的选择**，严格来说这部分确实不属于开发的活，不过考虑到产品同学或者甲方爸爸可能对前端现有的图表不太熟悉，可以参考以下这张图：

![](https://secure2.wostatic.cn/static/33fyHSLYWkjyBmn6c9d6vd/image.png)

### UI

1. 如果可以的话，在出图之前可以让UI同学先去看下[Echarts](https://echarts.apache.org/examples/zh/index.html)或者[antV](http://antv.antfin.com/zh-cn/g2/3.x/demo/index.html)的示例项目，统一好风格和要使用的技术栈，加上产品给的数据约束范围，在对应出图。这应该是最完美的情况了。
2. 最坏的情况就是究极融合怪了，这个时候如果有些奇奇怪怪的图表比如3d环图（可以做，但确实费时间）这种，尽量拉上产品一起沟通，统统无效后最后杀招就是**这个需求做不了**。

### 总结

1. 最常出现的问题就是，产品只考虑了最完美的情况，无视了一些异常或者极端情况。同时UI同学也只是对着原型设计出图，这个时候开发最好还是能提前识别到这些风险项，然后把问题抛出来（甩锅什么的，一定要赶早）。
2. UI考虑的美观和信息展示程度冲突也是比较常见的。比如图例如果是竖向排序，只有两个数据源的情况下没有问题，但是数据源一多样式就崩了，这种情况下如果UI一开始给的版面没有考虑到这种情况，那也只能把图例信息去掉。

## 设计阶段

### 大屏设计稿的尺寸

市面上常见的屏幕比例是16：9，分辨率1920 * 1080。当然最好还是问下产品和UI主要是针对哪方面的人群。以他们的意见为准。有几个小细节可能需要提前注意和产品Ui沟通（其余的见上面）

- 整个数据大屏允不允许出现滚动条，即是不是铺满整个屏幕。（按理来说是不该出现的）
- 如果是铺满整个屏幕。还需要确认下是不是默认全屏（F11）。这也关系到UI的出图尺寸，如果不是默认全屏又需要铺满屏幕，就还要扣掉浏览器上面的部分。高度就是可视区域的高度。
- 一些笔记本的默认缩放比是125的，如果业务场景是放在电视或者其他显示器设备上固定展示的影响不大，事先调整就行。

### 自适应分辨率

当用户的屏幕分辨率不符合我们的设计稿时，就需要动态适配。目前市面的解决方案有使用rem，transform缩放，vh/vw等。

笔者这边使用的是rem。

主要思路是动态修改根节点的fontSize值，然后通过px转rem的函数完成自适应，

```js
// 在数据大屏的页面，初始化调用这个方法

created() {
   // 根据屏幕大小设置样式。
   this.setFontSize()
   const that = this
   //窗口变化后重新设置
   window.onresize = function () {
   that.setFontSize()
  }
}
/** 
  * @description: 设置基准字体值
  * @return {*}
  */
 setFontSize() {
   let designWidth = 1920 //设计稿的宽度
   let designHeight = 1080 //设计稿的高度
   // 这边是以宽度为优先级进行设置的
   const fontSize = (document.documentElement.clientWidth / designWidth) * 12
   document.querySelector('html').style.fontSize = fontSize + 'px'
 }
```

less写法

```js
@width: 1920;//设计稿的宽度
@height: 1080;//设计稿的高度
@design_font_size: 12;

.px2rem(@key, @px) {
   @{key}:(@px/@design_font_size) * 1rem;
}

//-----------------使用分割线-------------
  .icon {
    .px2rem(height,24);
    .px2rem(width,24);
  ｝
```

sass写法

```js
@function px2rem($px) { 
    $design_font_size: 12; 
    @return ($px/$design_font_size) + rem;
}
```

## 地图开发

### 地图数据来源

[http://datav.aliyun.com/portal/school/atlas/area_selector](http://datav.aliyun.com/portal/school/atlas/area_selector) \

通过`adcode`的不同请求对应的接口，比如中国地图数据 【10000】[https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json](https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json) \

河北【130000】\

[https://geo.datav.aliyun.com/areas_v3/bound/130000_full.json](https://geo.datav.aliyun.com/areas_v3/bound/130000_full.json)

### 地图的绘制【Echarts】

使用Echarts的地图绘制有两种方式  

1. 配置type为`map3d`，**好处**因为是3d可以支持旋转和倾斜角，比较有层次感，缺点也很明显，如果需要在地图上面的某个城市上配置图片是比较困难的，对应的 `series-scatterGL` 标记[symbol](https://echarts.apache.org/zh/option-gl.html#series-scatterGL.symbol)只支持单path SVG和内置图标。如果需要做标记效果是比较差的，如果想要用`series-effectScatter`带有涟漪特效动画的散点，会因为角度问题坐标有出入。
2. 第二种方案就是利用 `geo` 设置`map`绘制，缺点是方向角度不能调节，但是搭配`series-effectScatter`可以实现高亮效果。大概如下图。如果想要有层次感，也可以通过配置`series`多设几个map，然后调整对应大小实现。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44546104026f48628d7edf5b5a86d543~tplv-k3u1fbpfcp-watermark.image?)

### 开发事项

1. 如果使用3d地图记得引入` import echartsGL from 'echarts-gl'` 

最后附上代码

```js
// 地图初始化
 mapInit() {
   // 地图的点位信息也在上面的JSON中，这个需要自己对JSON数据过滤后和后端想要展示的城市拼接组合。这边假数据写死
   const  mapData =  [
     {
       name: '福州市',
       value: ['119.2', '26'],
       itemStyle: { color: '#FF7043' }
     }, {
       name: '厦门市',
       value: ['118.11022', '24.490474'],
          itemStyle: { color: '#FFAB91' }
     }, {
          name: '龙岩市',
       value: ['117.02978', '25.091603'],
          itemStyle: { color: '#FFB74D' }
     }
   ]
   echarts.registerMap('diyMap', {
     geoJSON: geoJson //这个数据来源就是上面所说的
   })
   const that = this
   const viewControl =
     this.getViewControl()
   const option = {
     //提示框组件(可以设置在多种地方)
     tooltip: {
       show: true, //是否显示提示框组件，包括提示框浮层和 axisPointer。
       trigger: 'item', //触发类型。item,axis,none
       enterable: true, //鼠标是否可进入提示框浮层中，默认为false，
       // showContent: true,          //是否显示提示框浮层
       triggerOn: 'mousemove', //提示框触发的条件(mousemove|click|none)
       showDelay: 0, //浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
       textStyle: {
         color: '#fff',
         fontSize: 12
       },
       padding: 10,
       hideDelay: 10, //浮层隐藏的延迟
       formatter: (o) => {
         return (
         o.data.name +'<br/>' +'根据自己需要来: ' + 500) 
         )
       },
       backgroundColor: '#0C0D1F', //提示框浮层的背景颜色。
       borderColor: 'white', //图形的描边颜色
       borderWidth: 0.5,
       alwaysShowContent: false,
       transitionDuration: 1 //提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
     },
     series: [
       {
         type: 'map3D',
         map: 'diyMap',

         // 颜色
         itemStyle: {
           normal: {
             //静态模式下显示的默认样式
             borderWidth: 2.3,
             borderColor: '#2ED8F7',
             color: '#4287E9'
           }, //阴影效果
           emphasis: {
             // 鼠标移上去的样式
             borderWidth: 1.6,
             borderColor: '#2ED8F7',
             color: '#2ED8F7'
           }
         },
         regionHeight: 3, //地图高度
         viewControl: viewControl,
         label: {
           show: true, //是否显示市
           textStyle: {
             color: 'white', //文字颜色
             fontSize: 18 //文字大小
           }
         },
         // // 高亮
         emphasis: {
           label: {
             show: true, //是否显示高亮
             textStyle: {
               color: '#fff' //高亮文字颜色
             }
           },
         },
         top: '-15%',
         data: mapData
         
       },
     ]
   }
   const mapEchart = echarts.init(
     document.getElementById('map')
   )
   mapEchart.setOption(option)
 },

 getViewControl() {
   return {
     //用于鼠标的旋转，缩放等视角控制。
     autoRotate: false, //是否开启视角绕物体的自动旋转查看
     damping: 0,
     //  旋转操作的灵敏度为0后无法旋转。
     rotateSensitivity: 0,
     //  不能缩放
     zoomSensitivity: 0,
     animation: true,

     // ----视角-------
     // 倾斜角
     alpha: 44,
     //  顺时针旋的角度。 
     beta: 9,
     distance: 135, //默认视角距离主体的距离. 变相理解成缩放比。 越大越远。
     center: [0, 0, 0],
     //-----------------
     // 动画
     animation: true,
     animationDurationUpdate: 500,
     animationEasingUpdate:
       'cubicInOut'
   }
 }
```

## 开发插件

- 数据跳动 `CountUp`
- 列表无缝滚动 `vue-seamless-scroll`

## 可以参考的网站

[EchartsDemo集合](https://www.isqqw.com/) \

[100套数据大屏demo合集](https://github.com/iGaoWei/BigDataView)

