> 昨天着实被同事给上了一课。事情是这样的，项目中之前打包用到了老式打包工具 (相对编译时间很长那种)，于是就要把项目升级成编译速度更快的 esbuild. 特么的就我负责的模块出了问题⋯⋯

## 背景

在我们的项目从 `gulp` 编译切换到 `esbuild` 的过程中，其他同学负责的代码都是使用的非常常规的三方库。而我的代码中用到了 `crypto`. 在 `gulp` 中可以使用 `browserify` 插件。直接给把 `node` 模块给 shim 进来了。但是 `esbuild` 负责处理 node 模块的 `@esbuild-plugins/node-modules-polyfill` 木有这个逻辑⋯⋯

## 定位问题

首先，发现 `crypto` 缺失之后肯定是看病用药。先观察 `@esbuild-plugins/node-modules-polyfill` 的源码 [github](https://github.com/remorses/esbuild-plugins/tree/master/node-modules-polyfill/src), 说实话看到这种两个 years 没有动过的只有 203 star 的开源项目心里实在是打鼓。顺手一个 star 当然是少不了的。

![20220929145340](http://handle-note-img.niubishanshan.top/20220929145340.png)

下一步打开 [polyfills.ts](https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts) 源码发现原来这就是 `rollup-plugin-node-polyfills` 的套壳呀。那不就好办了。直接把 crypto 模块也放出来就完事儿。而且官方也曾经规划过要干这个事儿的 ~

![20220929150349](http://handle-note-img.niubishanshan.top/20220929150349.png)

## 解决方案

面对这种已经给出答案的题目，我最喜欢了：
1. clone 这个项目。
2. 本地硬改代码。
3. 引用包改成本地
4. 完事

然后，我的同事淡淡地说：要不打个 patch 试试呢？

![20220929153204](http://handle-note-img.niubishanshan.top/20220929153204.png)

patch 又是什么鬼？

网上搜了一把才发现，打开了新世界。

### 方案一：用 patch-package 给 npm 包打补丁

#### 第一步，生成补丁文件

- 首先，安装 patch-package `npm i patch-package -D`
- 修改 node_modules 里边的包内容并验证
- 执行 `npx patch-package @esbuild-plugins/node-modules-polyfill` 生成补丁文件

执行上述步骤之后就会生成 `patches/@esbuild-plugins+node-modules-polyfill+0.1.4.patch` 这个文件。文件内容为：

```diff
diff --git a/node_modules/@esbuild-plugins/node-modules-polyfill/dist/polyfills.js b/node_modules/@esbuild-plugins/node-modules-polyfill/dist/polyfills.js
index 4f4f953..6f6263e 100644
--- a/node_modules/@esbuild-plugins/node-modules-polyfill/dist/polyfills.js
+++ b/node_modules/@esbuild-plugins/node-modules-polyfill/dist/polyfills.js
@@ -43,18 +43,18 @@ function builtinsPolyfills() {
     libs.set('repl', EMPTY_PATH);
     libs.set('tls', EMPTY_PATH);
     libs.set('fs', EMPTY_PATH);
-    libs.set('crypto', EMPTY_PATH);
+    // libs.set('crypto', EMPTY_PATH);
     // libs.set(
     //     'fs',
     //     require.resolve('rollup-plugin-node-polyfills/polyfills/browserify-fs'),
     // )
     // TODO enable crypto and fs https://github.com/ionic-team/rollup-plugin-node-polyfills/issues/20
-    // libs.set(
-    //     'crypto',
-    //     require.resolve(
-    //         'rollup-plugin-node-polyfills/polyfills/crypto-browserify',
-    //     ),
-    // )
+    libs.set(
+        'crypto',
+        require.resolve(
+            'rollup-plugin-node-polyfills/polyfills/crypto-browserify',
+        ),
+    )
     return libs;
 }
 exports.builtinsPolyfills = builtinsPolyfills;
```

不难看出，`patch-package` 就是将你修改后的代码和修改前的代码做了一次 diff. 并依据此 diff 文件来确定你本次的修改。然后就是想办法应用到我们的真实项目中了。

#### 应用补丁文件

在 package.json 中添加 `npm-script` 即可在后续每次安装依赖后都调用 patch-package 实现补丁的替换

```json
// 依赖安装完成后执行 patch-package
{
    "postinstall": "patch-package"
}
```

#### 验证

移除项目中的 `node_modules` 目录，重新 `npm i`, 查看 `node_modules/@esbuild-plugins/node-modules-polyfill/dist/polyfills.js` 文件就能发现文件内容如下，patch 成功 ~

```js
"use strict";
// Taken from https://github.com/ionic-team/rollup-plugin-node-polyfills/blob/master/src/modules.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtinsPolyfills = void 0;
const EMPTY_PATH = require.resolve('rollup-plugin-node-polyfills/polyfills/empty.js');
function builtinsPolyfills() {
    const libs = new Map();
    // ==========  其他代码  =====================================
    // ==========  ......  =====================================
    // ==========  其他代码  =====================================
    libs.set('fs', EMPTY_PATH);
    // libs.set('crypto', EMPTY_PATH);
    // libs.set(
    //     'fs',
    //     require.resolve('rollup-plugin-node-polyfills/polyfills/browserify-fs'),
    // )
    // TODO enable crypto and fs https://github.com/ionic-team/rollup-plugin-node-polyfills/issues/20
    libs.set(
        'crypto',
        require.resolve(
            'rollup-plugin-node-polyfills/polyfills/crypto-browserify',
        ),
    )
    return libs;
}
exports.builtinsPolyfills = builtinsPolyfills;
```

### 方案二：三方包魔改

#### 修改一个文件

复制问题库的一个文件放到本地，还是监听 `postinstall` 每次 `install` 完成后替换 node_modules 里的文件为本地文件

#### 维护整个库

克隆这个项目下来，修改代码后存放在自己的项目库中自己维护整个项目。具体实现有两种方案

##### 项目中维护

就是把自己修改的第三方包作为页面代码的一个目录，跟随项目代码迭代

##### 发布私包

修改三方包的 bug 后改个名发布到 npm 或者 内部的 npm 镜像上

## 总结

综合比较，使用 patch 方案最为靠谱，原因主要有：

1. 锁定了版本号，如果三方包升级后 patch 脚本会报错。用户有感知
2. 每次安装后会修改 node_modules 里的代码。下个人想要打新的补丁直接继续修改自己本地的 node_modules 即会基于之前的补丁修改。理论上不会有冲突
3. 占用空间最小，diff 文件和 git diff 一致。修改了哪里一目了然。

## 参考资料

- [手把手教你使用patch-package给npm包打补丁](https://juejin.cn/post/6962554654643191815)
- <https://github.com/ds300/patch-package>
