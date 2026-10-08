# 墨痕 · 个人博客

基于 [Astro](https://astro.build) 的静态博客。文章是 Markdown，站点信息集中在一个配置文件里，推送到 `main` 后由 GitHub Actions 发布到 [GitHub Pages](https://pages.github.com/)。

平时改博客，主要动这两处：

- 站点名字、简介、关于页：`src/site.config.ts`
- 新文章：在 `src/content/blog/` 里加一篇 Markdown

## 本地预览

需要 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开提示的地址，默认是 `http://localhost:4321`。

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地预览。`draft: true` 的文章在这里也能看到 |
| `npm run build` | 生成静态网站到 `dist/`。草稿不会进正式结果 |
| `npm run preview` | 在本机打开刚才构建出来的 `dist/` |

## 文件是干什么的

下面只列自己维护的文件。`node_modules/`、`dist/`、`.astro/` 是工具生成的，不要手改。

### 项目根目录

| 文件 | 作用 |
| --- | --- |
| `README.md` | 这份说明 |
| `package.json` | 项目名称、三条命令（`dev` / `build` / `preview`），以及依赖：Astro、站点地图、RSS、数学公式 |
| `package-lock.json` | 锁定依赖的具体版本，保证每次 `npm install` 装到同一套包 |
| `astro.config.ts` | Astro 配置：站点地址和 `base` 从 `site.config.ts` 读入；启用站点地图；Markdown 用 `remark-math` 和 `rehype-katex` 渲染 `$...$` / `$$...$$`；代码高亮用浅色 `github-light`、深色 `github-dark` |
| `tsconfig.json` | TypeScript 检查规则，沿用 Astro 的 strict 配置 |
| `.gitignore` | 告诉 Git 不要提交依赖、构建结果、`.astro` 缓存和 `.env` |

### `src/site.config.ts` 和内容约定

| 文件 | 作用 |
| --- | --- |
| `src/site.config.ts` | 全站唯一的手写配置。`site` 是站名、作者、地址、GitHub、评论；`profile` 是关于页的简介、教育、奖项、论文、项目；`topics` 是专栏，目前是 `hardware`（硬件）和 `math`（数学）。新专栏在这里加一项，文章 frontmatter 的 `topic` 用同一个 key |
| `src/content.config.ts` | 规定一篇文章开头必须有哪些字段：`title`、`description`、`pubDate`、`topic`，以及可选的 `tags`、`updatedDate`、`draft`、`heroImage` |
| `src/env.d.ts` | 让编辑器认识 Astro 的类型，没有页面逻辑 |
| `src/content/blog/*.md` | 文章本身。文件名就是网址，例如 `math-sets-and-belonging.md` 对应 `/posts/math-sets-and-belonging/` |

现有文章：

| 文件 | 内容 |
| --- | --- |
| `hardware-voltage-current-resistance.md` | 电压、电流、电阻和欧姆定律 |
| `hardware-zeros-and-ones.md` | 数字电路里的 0 和 1 |
| `math-sets-and-belonging.md` | 集合、属于、包含 |
| `math-how-i-take-notes.md` | 数学笔记格式，也是公式写法的例子 |

### `src/pages/`：每个文件对应一个网址

Astro 用文件路径生成页面。方括号是从数据里填出来的动态路径。

| 文件 | 网址 | 作用 |
| --- | --- | --- |
| `index.astro` | `/` | 首页，列出最近 6 篇 |
| `[topic].astro` | `/hardware/`、`/math/` | 某个专栏下的全部文章。专栏列表来自 `topics` |
| `posts/index.astro` | `/posts/` | 全部笔记，按年份分组 |
| `posts/[...slug].astro` | `/posts/文章文件名/` | 单篇文章：标题、日期、标签、目录、正文、同专栏的前后篇、评论 |
| `tags/index.astro` | `/tags/` | 全部标签，以及每标签有多少篇 |
| `tags/[tag].astro` | `/tags/某个标签/` | 带这个标签的文章 |
| `about.astro` | `/about/` | 关于页，读取 `site` 和 `profile` |
| `404.astro` | 找不到的地址 | 404 页面 |
| `rss.xml.ts` | `/rss.xml` | RSS 订阅源，收录已发布文章 |
| `robots.txt.ts` | `/robots.txt` | 告诉搜索引擎可以抓取，并指向站点地图 |

`@astrojs/sitemap` 在构建时另生成 `sitemap-index.xml`，没有单独的源文件。

### `src/layouts/` 和 `src/components/`

| 文件 | 作用 |
| --- | --- |
| `layouts/Base.astro` | 所有页面共用的外壳：`<head>`、标题和分享信息、字体、深浅色、背景图、页眉、页脚 |
| `components/Header.astro` | 顶部导航：首页、各专栏、全部笔记、关于，以及深浅色按钮 |
| `components/Footer.astro` | 滚到页面底部后出现的菜单：关于、全部笔记、标签、RSS、GitHub |
| `components/PostCard.astro` | 文章列表里的一张卡片：标题、日期、专栏、摘要 |
| `components/ProfileCard.astro` | 关于页的个人卡片：照片、简介、教育、奖项、论文、项目 |
| `components/TagList.astro` | 一排可点击的标签 |
| `components/Toc.astro` | 文章目录，收集正文里三级以内的标题 |
| `components/ThemeToggle.astro` | 深色 / 浅色切换，选择记在浏览器本地 |
| `components/Giscus.astro` | 文章底部评论。`site.giscus` 没填仓库信息时不显示 |

### `src/lib/` 和样式

| 文件 | 作用 |
| --- | --- |
| `lib/posts.ts` | 读取文章：正式构建时去掉草稿，按日期从新到旧排序；另外提供按标签计数、按专栏筛选、按年份分组 |
| `lib/utils.ts` | 小工具：拼上站点 `base` 的链接、中文日期、`YYYY-MM-DD`、按字数估算阅读时间 |
| `styles/global.css` | 全站样式：颜色、深色主题、排版、列表、文章正文、背景 |

### `public/`：原样复制到网站根目录

这些文件不经过页面编译。代码里写 `favicon.svg`，构建后就是网站根目录上的 `/favicon.svg`。

| 文件 | 作用 |
| --- | --- |
| `favicon.svg` | 浏览器标签上的小图标，由 `Base.astro` 引用 |
| `mascot.svg` | 吉祥物图。目前没有页面引用它，放在这里只会在构建结果里原样出现 |
| `images/blog-bg.jpg` | 首页等普通页面的背景。代码会找这张图，需要自己放到 `public/images/` |
| `images/article-bg.png` | 文章页背景，以及文章顶部配图。同样放到 `public/images/` |
| `images/me.jpg` | 关于页头像。`site.config.ts` 里的 `profile.avatar` 指向它；文件不存在时关于页不显示照片 |

### `.github/workflows/deploy.yml`

推送 `main`，或在 GitHub 上手动运行时，用 Node.js 22 执行构建，再把 `dist/` 部署到 GitHub Pages。

## 写一篇新文章

在 `src/content/blog/` 新建 Markdown，文件名用英文短横线，建议带专栏前缀，例如 `hardware-art-of-electronics.md`。

```markdown
---
title: 文章标题
description: 一两句摘要，会出现在列表和分享预览里
pubDate: 2026-10-08
topic: hardware
tags:
  - 电路
draft: false
---

正文。小标题用 `##`，文章页会自动生成目录。
行内公式 $V = IR$，独立一行用 $$...$$。
```

`topic` 只能填 `site.config.ts` 里已有的 key。`draft: true` 时，本地预览看得到，`npm run build` 不会把它发布出去。

## 发布到 GitHub Pages

1. 想要 `https://你的用户名.github.io`，仓库名必须是 `你的用户名.github.io`。
2. 在 `src/site.config.ts` 里改 `url`。个人主页仓库的 `base` 保持 `/`；项目仓库（例如名叫 Blog）写成 `/Blog/`。
3. 推送 `main`。
4. 仓库 **Settings → Pages** 里，Source 选 **GitHub Actions**。
5. 在 **Actions** 里等 `Deploy to GitHub Pages` 完成。

评论是可选项。到 [giscus](https://giscus.app) 用 GitHub Discussions 生成配置，填进 `site.giscus`。留空则文章下不显示评论。
