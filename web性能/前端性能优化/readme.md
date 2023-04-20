# 前端性能优化 
1. 性能指标
2. 测量标准
3. 测量方式
4. 优化方法
## 指标
* [LCP](https://web.dev/lcp/)：最大内容绘制，检测加载性能。（核心）
* [FID](https://web.dev/fid/)：首次输入延迟，检测交互性。（核心）
* [CLS](https://web.dev/cls/)：累计布局偏移，检测视觉稳定性。（核心）
* [TTFB](https://web.dev/ttfb/)：是一个衡量对资源的请求和响应的第一个字节开始和到达之间时间的指标
* [FCP](https://web.dev/fcp/)：首次内容绘制
* [TTI](https://web.dev/tti/)：可交互时间
* [TBT](https://web.dev/tbt/)：总阻塞时间
* [以用户为中心的性能指标](https://web.dev/user-centric-performance-metrics/)
* [Web 指标](https://web.dev/vitals/)
* [使用 RAIL 模型衡量性能](https://web.dev/rail/)
## 测量标准
* [定义核心 Web 指标阈值](https://web.dev/defining-core-web-vitals-thresholds/)
* 百分数，75
    1. 确保对页面活网站对大多数访问都达到了目标性能水平
    2. 百分位数对值不应受到异常值对过度影响
* LCP
    * 体验质量。与环境交互引发对认知计算是以秒计的，响应延迟超过两秒，人们会感觉到及其发生严重的特征改变。目前FCP良好的阈值是1秒，LCP在FCP之后，所以LCP范围在1-3秒。
    * 可实现性。通过CrUX的“良好”的百分比数据，2.5秒是可以实现的；通过“欠佳”的百分比，4秒是可以接受的“欠佳”的阈值。
* FCP
    * 良好：1.8s
    * 欠佳：大于3s
* FID
    * 体验质量。通过各种文献和实验得出，用户操作和视觉反馈，对于在100毫秒内的延迟，用户感知质量很高；100-150毫秒的延迟，有所下降；300毫秒的延迟，感知质量非常低。
    * 可实现性。通过CrUX的数据，把FID的“良好”阈值设为100毫秒，“欠佳”的阈值是300毫秒。
* CLS
    * 体验质量。在享受页面内容造成严重干扰之前，用户可接受的最大偏移量。0.15及以上的偏移水平始终被认为具有干扰性，而0.1及一下的偏移水平虽然可以被注意到，但不具有过度干扰性。
    * 可实现性。根据CrUX的数据，50%的CLS为0.05或更低，虽然0.05可能是合理的CLS的良好阈值，但是某些用例中还难以避免干扰性的布局偏移。例如嵌入的第三方内容。 所以把CLS的“良好”的阈值设置为0.1，“欠佳”的阈值设置为0.25。
* TTFB
    * 少于0.8s是良好的体验，大于1.8s是欠佳的体验。
## 测量方式
* [web-vitals](https://github.com/GoogleChrome/web-vitals)
## 优化方法
### [LCP](https://web.dev/lcp/)
#### [优化LCP](https://web.dev/optimize-lcp/)
* LCP主要四个因素影响
    * 缓慢的服务器响应速度
        * 优化服务器
        * 将用户路由到附近的CDN
        * 缓存资产
            * 配置反向代理
            * 云提供商
            * 提供边缘服务器的 CDN
        * 优先使用缓存提供HTML页面
            * Service Worker
        * [尽早建立第三方连接](https://web.dev/preconnect-and-dns-prefetch/)
            * 使用`rel="preconnect"`来告知浏览器您的页面尽快建立连接。
            * 使用`rel="dns-prefetch"`更快完成DNS查找。
            * `dns-prefetch`仅执行DNS查找。`preconnect`预先完成全部握手，和服务器建立连接。 
        * 使用签名交换
    * JavaScript 和 CSS 渲染阻塞
        * 削减 CSS
        * 延迟加载非关键 CSS
        * 内联关键 CSS
        * 削减和压缩 JavaScript 文件
        * 延迟加载未使用的 JavaScript
    * 资源加载时间
        * 优化和压缩图像
        * 预加载重要资源
        * 压缩文本文件
        * [基于网络连接交付不同资产（自适应服务）](https://web.dev/adaptive-serving-based-on-network-quality/)
            * 根据不同的网络加载不同的资源
        * 使用 Service Worker 缓存资产
    * 客户端渲染
        * 最小化关键 JavaScript
        * [使用服务端渲染](https://web.dev/rendering-on-the-web/)
        * 使用预渲染
            * 用服务器提前渲染好
#### [使用PRPL模式做到即时加载](https://web.dev/apply-instant-loading-with-prpl/)
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
        * `domComplete`：顾名思义，所有的处理已经完成，页面上的所有资源（图片等）已经完成下载--换句话说，加载旋钮已经停止旋转。
        * `loadEvent`：作为每个页面加载的最后一步，浏览器会触发一个onload事件，该事件可以触发额外的应用逻辑。
        * 关键点：
            * `domInteractive`：DOM准备好
            * `domContentLoaded`：DOM和CSSOM准备好
                * 如果没有阻塞的JavaScript，`domContentLoaded`将在`domInteractive`之后立即触发。
            * `domComplete`：页面及所有子资源都已经准备就绪。
* [分析关键的渲染路径性能](https://web.dev/critical-rendering-path-analyzing-crp/)
* [优化关键渲染路径](https://web.dev/critical-rendering-path-optimizing-critical-rendering-path/)
    * 为了提供最快的第一次渲染，需要最小化下面三个变量：
        * 关键资源的数量
        * 关键路径的长度
        * 关键字节数
* [PageSpeed规则和建议](https://web.dev/critical-rendering-path-page-speed-rules-and-recommendations/)
    * 排除渲染阻塞的JavaScript和CSS
    * 优化JavaScript的使用
    * 首选异步JavaScript资源
    * 避免同步服务器调用
    * 推迟解析JavaScript
    * 避免长时间运行的JavaScript
    * 优化CSS的使用
    * 把CSS放在文档的头部
    * 避免CSS imports
    * 内联渲染阻塞 CSS
### CLS
#### [优化CLS](https://web.dev/optimize-cls/)
* 指定图片的宽高
* 无尺寸的广告、嵌入和 iframe
    * 预留空间
* 动画
### FID
#### [优化FID](https://web.dev/optimize-fid/)
* 分割长任务
    * 任何阻塞主线程50毫秒或以上的代码都被称为长任务。
* 优化您的页面，做好交互准备
    * 移除关键路径的消耗较大的非必要组件加载和执行的脚本。
    * 数据获取会影响交互的方面
        * 等待一连串的级联获取。
        * 大型内联数据存储会延长HTML解析时间并影响绘制和交互指标。请尽量最大限度地减少需要在客户端进行后处理的数据量。
* 使用 Web Worker
* 减少 JavaScript 执行时间
#### [减少第三方代码的影响](https://developer.chrome.com/docs/lighthouse/performance/third-party-summary/)
#### [减少 JavaScript 执行时间](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/)
#### [最小化主线程工作](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)
#### [保持较低的请求数和较小的传输大小](https://developer.chrome.com/docs/lighthouse/performance/resource-summary/)
### FCP
#### 消除阻塞渲染的资源
#### 缩小 CSS
#### 移除未使用的 CSS
#### 预连接到所需的来源
#### 减少服务器响应时间 (TTFB)
#### 避免多个页面重定向
#### 预加载关键请求
#### 避免巨大的网络负载
#### 使用高效的缓存策略服务静态资产
#### 避免 DOM 过大
#### 最小化关键请求深度
#### 确保文本在网页字体加载期间保持可见
#### 保持较低的请求数和较小的传输大小
### TTFB