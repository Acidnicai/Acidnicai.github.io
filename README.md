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
| `src/site.config.ts` | 全站唯一的手写配置。`site` 是站名、作者、地址、GitHub、评论；`profile` 是关于页的简介、教育、奖项、论文、项目；`topics` 是专栏，目前是 `hardware`（硬件）、`math`（数学）、`reading`（读本）。`books` 是读本里的书。新专栏或新书在这里加一项，文章 frontmatter 用同一个 key |
| `src/content.config.ts` | 规定一篇文章开头必须有哪些字段：`title`、`description`、`pubDate`、`topic`，以及可选的 `book`、`chapter`、`tags`、`updatedDate`、`draft`、`heroImage`。`topic: reading` 时必须填 `book` |
| `src/env.d.ts` | 让编辑器认识 Astro 的类型，没有页面逻辑 |
| `src/content/blog/*.md` | 文章本身。文件名就是网址，例如 `math-sets-and-belonging.md` 对应 `/posts/math-sets-and-belonging/` |

现有文章：

| 文件 | 内容 |
| --- | --- |
| `hardware-voltage-current-resistance.md` | 电压、电流、电阻和欧姆定律 |
| `hardware-zeros-and-ones.md` | 数字电路里的 0 和 1 |
| `math-sets-and-belonging.md` | 集合、属于、包含 |
| `math-how-i-take-notes.md` | 数学笔记格式，也是公式写法的例子 |
| `reading-art-of-electronics-01.md` | 《电子学的艺术》第 1 章的笔记骨架，目前是草稿 |
| `reading-princeton-calculus-01.md` | 《普林斯顿微积分读本》第 1 章的笔记骨架，目前是草稿 |

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

读本按章节写，一章一篇。`book` 用 `books` 里的 key，`chapter` 写章号。下一章复制这一篇，改文件名、标题和 `chapter`。

```markdown
---
title: 电子学的艺术 · 第 2 章
description: 这一章我怎么理解、哪里卡住，以及习题怎么做。
pubDate: 2026-10-09
topic: reading
book: art-of-electronics
chapter: 2
tags:
  - 电子学的艺术
draft: true
---

## 理解

## 难点

## 习题

### 2.1
```

`book` 目前有两个：`art-of-electronics`（《电子学的艺术》）、`princeton-calculus`（《普林斯顿微积分读本》）。再加一本就在 `src/site.config.ts` 的 `books` 里添一项。读本专栏会按书名把章节排在一起，同一本书里可以用上一章、下一章来回翻。

## 更新 acidnicai.github.io

线上网站是 [https://acidnicai.github.io/](https://acidnicai.github.io/)，对应仓库 [Acidnicai/Acidnicai.github.io](https://github.com/Acidnicai/Acidnicai.github.io) 的 `main` 分支。只有 `main` 被推上去，GitHub Actions 才会按 `.github/workflows/deploy.yml` 重新构建并发布。在别的分支上 `git push`，网站不会变。

在 `D:\Data\Blog` 里改完文章或配置后：

```powershell
git checkout main
git add .
git commit -m "写清这次改了什么"
git push origin main
```

如果改动先写在别的分支上，先合并再推 `main`：

```powershell
git checkout main
git merge 那个分支的名字
git push origin main
```

然后打开 [Actions](https://github.com/Acidnicai/Acidnicai.github.io/actions)，等 **Deploy to GitHub Pages** 变成绿色，再刷新网站。页面大约还有几分钟缓存。

第一次在这台电脑上提交前，先告诉 Git 用哪个名字。只需做一次：

```powershell
git config --global user.name "灾区尼采"
git config --global user.email "166932268+Acidnicai@users.noreply.github.com"
```

注意这几件事：

- `draft: true` 的文章本地预览看得到，推上去之后正式网站不会出现。
- `node_modules/`、`dist/`、`.astro/` 已被 `.gitignore` 排除，不要强制加进去。
- 这个仓库的 Pages 使用 **GitHub Actions** 构建，不要改回从分支直接发布。

评论是可选项。到 [giscus](https://giscus.app) 用 GitHub Discussions 生成配置，填进 `site.giscus`。留空则文章下不显示评论。

## 更新本机的 Git

这台电脑上的 Git 是便携版，放在 `D:\EPath\git`，命令来自 `D:\EPath\git\cmd`。它不经过 Windows 安装程序，所以要换版本时，下载新的压缩包并换掉这个文件夹。

先看当前版本：

```powershell
git --version
```

现在安装的是 `2.56.0.windows.2`。到 [Git for Windows 发布页](https://github.com/git-for-windows/git/releases) 找更新的版本，下载文件名类似 `MinGit-2.xx.x-64-bit.zip` 的 64 位压缩包。不要下 `.exe` 安装包，那个不会装进 `D:\EPath`。

关掉正在使用 Git 的窗口，然后在 PowerShell 里把压缩包换上去。把下面的文件名改成你刚下载的那一个：

```powershell
Rename-Item D:\EPath\git D:\EPath\git-old
Expand-Archive -Path "$env:USERPROFILE\Downloads\MinGit-2.xx.x-64-bit.zip" -DestinationPath D:\EPath\git
git --version
Remove-Item D:\EPath\git-old -Recurse -Force
```

`git --version` 显示新版本后，再删掉 `D:\EPath\git-old`。用户环境变量里的 `D:\EPath\git\cmd` 不用改。如果当前窗口仍提示找不到 `git`，关掉窗口再开一个。
