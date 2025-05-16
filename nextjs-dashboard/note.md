- 如何添加 css 样式？
  - global css import 添加 可以集成 tailwind css，可以用 class 来辅助添加 css
  - 也可以 css module 将样式和 js 分离
- 如何添加字体并优化？

  - 为了降低 cls 把字体和其他静态资源放在一起打包加载 这样就不会出现 先显示页面 然后加载字体 然后导致偏移的情况了
    - import next 下的字体 然后添加到跟元素 body 的 class 下 所有 children 都应用到

- 路由和页面是怎么映射的？跳转到 a 路由 如何拿到对应的组件？

  - 文件路由 根据相对路径映射 page。page 到出一个组件，这个组件是做啥的
  - app 下的相对路径比如 app/page.tsx -> /, app/dashboard/page.tsx -> /dashboard
  - 只有 page 文件的内容会公开 lib ui 那些都访问不到

- layout.tsx 是干嘛的？

  - layout 是布局 dashboad 的 page.tsx 会自动嵌入在 layout 里面
  - 【重要】 切换路由的时候 客户端的布局状态得以保留 部分渲染 啥意思

- 如何切换页面呢？next 中的导航工作原理是啥

  - next/link 组件
  - 为什么原来的会全部重新渲染页面？直接配置了 links 的 href 然后可能通过 a 重新跳转了

- ## next start 做了啥 启动的是哪个文件

https://nextjs.org/learn/dashboard-app/navigating-between-pages

- 尽管你的应用程序的部分内容是在服务器上渲染的，但没有完整的页面刷新，使其感觉像是一个原生应用程序。为什么呢？ 啥意思【】
