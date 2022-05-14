# 进程架构
## 进程和线程
* 进程：当程序启动时，操作系统会为该程序分配内存，用来存放代码、执行过程中的数据
* 线程：一个进程可以启动和管理多个线程，线程之间可以共享数据，任何一个线程出错都可能导致进程崩溃
## Chrome进程架构
* 浏览器主进程：负责界面显示、用户交互和子进程管理
* 渲染进程：排版引擎和V8引擎运行在该进程中，负责把HTML、CSS、JavaScript变成网页
* 网络进程：用来加载网络资源
* GPU进程：用来实现CSS3和3D效果
# 加载HTML
```
<html>
    <body>
        <div>hello</div>
        <div>world</div>
    </body>
</html>
```
# 渲染流水线
## HTML转DOM树
* HTML解析器把接收到的HTML字符串转化成DOM结构
* HTML解析器边接收网络数据边解析HTML
* 解析DOM
    * HTML字符串转成Token
    * Token栈维护节点之间的父子关系，Token依次入栈
    * 如果是开始标签，Token入栈并创建新的DOM节点并添加到父节点的children中
    * 如果是文本Token，添加到栈顶元素的children中，不需要入栈
    * 如果是结束标签，此标签开始出栈

## CSS转stylesheet
* 渲染进程把CSS文本转为浏览器中的`stylesheet`
* 渲染引擎把CSS转化为`document.styleSheets`
## 计算出DOM节点的样式
* 根据CSS的继承和层叠样式规则计算DOM节点的样式
* DOM节点的样式保存在`ComputedStyle`中
## 创建布局树
* 创建一颗只有可见元素的布局树
## 计算布局
* 计算每个元素的布局
## 生成分层树
* 渲染引擎需要为某些节点生成单独的图层，并组合成图层树
    * z-index
    * 绝对定位和固定定位
    * 滤镜
    * 透明
    * 裁剪
* 这些图层合成最终的页面
## 绘制
* 根据分层树合成绘制步骤复合图层
* 每个图层拆分成多个绘制指令，这些指令组合在一起成为绘制列表
## 合成线程
### 图块
### 栅格化
## 资源加载
* CSS加载不会影响DOM解析
* CSS加载不会阻塞JS加载，但是会影响JS的执行
* JS会依赖CSS加载，JS会阻塞DOM解析

* [渲染页面：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)