# 前端性能优化 
1. 性能指标
2. 测量标准
3. 测量方式
4. 优化方法
## 核心指标
* LCP：最大内容绘制，检测加载性能。
* FID：首次输入延迟，检测交互性。
* CLS：累计布局偏移，检测视觉稳定性。
* TTFB
* FCP
## 测量标准
* 百分数，75
    1. 确保对页面活网站对大多数访问都达到了目标性能水平
    2. 百分位数对值不应受到异常值对过度影响
* LCP
    * 体验质量。与环境交互引发对认知计算是以秒计的，响应延迟超过两秒，人们会感觉到及其发生严重的特征改变。目前FCP良好的阈值是1秒，LCP在FCP之后，所以LCP范围在1-3秒。
    * 可实现性。通过CrUX的“良好”的百分比数据，2.5秒是可以实现的；通过“欠佳”的百分比，4秒是可以接受的“欠佳”的阈值。
* FID
    * 体验质量。通过各种文献和实验得出，用户操作和视觉反馈，对于在100毫秒内的延迟，用户感知质量很高；100-150毫秒的延迟，有所下降；300毫秒的延迟，感知质量非常低。
    * 可实现性。通过CrUX的数据，把FID的“良好”阈值设为100毫秒，“欠佳”的阈值是300毫秒。
* CLS
    * 体验质量。在享受页面内容造成严重干扰之前，用户可接受的最大偏移量。0.15及以上的偏移水平始终被认为具有干扰性，而0.1及一下的偏移水平虽然可以被注意到，但不具有过度干扰性。
    * 可实现性。根据CrUX的数据，50%的CLS为0.05或更低，虽然0.05可能是合理的CLS的良好阈值，但是某些用例中还难以避免干扰性的布局偏移。例如嵌入的第三方内容。 所以把CLS的“良好”的阈值设置为0.1，“欠佳”的阈值设置为0.25。
## 测量方式
* web-vitals
## 优化方法
### [LCP](https://web.dev/lcp/)
* LCP主要四个因素影响
    * 缓慢的服务器响应速度
    * JavaScript 和 CSS 渲染阻塞
    * 资源加载时间
    * 客户端渲染
#### 使用PRPL模式做到即时加载
    * Push：预加载最重要的资源
        * preload
    * Render：尽快渲染初试路径
        * 优化css交付
        * 服务端渲染
    * Pre-cache：预缓存剩余资产
        * pwa/workbox
    * Lazy load：延迟加载其他路线和非关键资产
        * 异步加载js
    * preload和prefetch。
        * prefetch会重复请求。在页面加载后马上用到的资源，可以用preload。适用场景：字体
        * 在未来用到的资源，用prefetch，之后的资源从缓存里获取。适用场景：图片、单页应用的非首页资源
    * script async和defer
        * async和defer下载不会阻塞浏览器。
        * async尽快执行。
        * defer会在DomContentLoaded事件前执行。会阻止DomContentLoaded事件。
#### [优化关键路径](https://web.dev/critical-rendering-path/)
* [构建对象模型](https://web.dev/critical-rendering-path-constructing-the-object-model/)
* [构建渲染树](https://web.dev/critical-rendering-path-render-tree-construction/)
    1. 处理HTML并构建DOM树。
    2. 处理CSS并构建CSSOM树。
    3. 将DOM和CSSOM组合到一个渲染树中。
    4. 在渲染树上进行布局以计算每个节点的几何信息。
    5. 将各个节点绘制到屏幕上。
    * `visibility: hidden`和`display: none`的区别，前者在渲染树上，占空间，后者不在，不占空间。
* [渲染阻止CSS](https://web.dev/critical-rendering-path-render-blocking-css/)
    * 通过媒体查询，设置`link`上的`media`，将CSS设置成非渲染阻塞。
* [添加与JavaScript的交互](https://web.dev/critical-rendering-path-adding-interactivity-with-javascript/)
    * 给`script`添加`async`
* [测量关键的渲染路径](https://web.dev/critical-rendering-path-measure-crp/)
    * Lighthouse
    * Navigation Timing API
        * `domLoading`：这是整个过程的起始时间戳，浏览器即将开始解析第一个收到的HTML文档的字节。
        * `domInteractive`：标志着浏览器完成了对所有HTML的解析，DOM构建完成。
        * `domContentLoaded`：标志着DOM已经准备好了，而且没有样式表阻挡JavaScript的执行--这意味着我们现在可以（潜在地）构建渲染树。

        * 关键点：
        * `domInteractive`：DOM准备好
        * `domContentLoaded`：DOM和CSSOM准备好
            * 如果没有阻塞的JavaScript，`domContentLoaded`将在`domInteractive`之后立即触发。
        * `domComplete`：页面及所有子资源都已经准备就绪。