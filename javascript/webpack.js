//https://juejin.cn/post/6990869970385109005

/**
 * webpack4和webpack5的区别
 * 1.代码压缩
 *      webpack5自带压缩，设置mode=production会自动开启压缩
 * 2.缓存
 *      webpack5内置了cache缓存机制。在config.js里配置cache
 * 3.loader
 *      webpack5的资源模块类型替换loader
 * 4.模块联邦
 *      应用程序和应用程序之间的引用
 * 5.Tree Shaking
 *      配置config.js，可以支持tree-shaking
 *      webpack5的mode=production自动开启tree-shaking
 */

/**
 * webpack优化
 * 多进程/多实例构建
 *      1.thread-loader
 *      2.parallel-webpack
 *      3.HappyPack
 * DLL
 * Tree Shaking
 * CDN
 * esbuild
 * swc
 */