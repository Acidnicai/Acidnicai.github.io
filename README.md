# 个人博客

本机目录 `D:\Data\Blog`。文章是 Markdown，站点名字和专栏写在 `src/site.config.ts`。推到 GitHub 仓库 [Acidnicai/Acidnicai.github.io](https://github.com/Acidnicai/Acidnicai.github.io) 的 `main` 后，GitHub Actions 会构建并发布到 [https://acidnicai.github.io/](https://acidnicai.github.io/)。

平时只动两处：改站名、关于页、专栏配置，去 `src/site.config.ts`；写内容，去 `src/content/`。

本地需要 Node.js 18 或更高。第一次先 `npm install`。

```powershell
npm run dev
```

浏览器打开提示的地址，默认 `http://localhost:4321`。`draft: true` 的文章这里能看到；`npm run build` 生成的正式结果里不会带草稿。`npm run preview` 用来在本机查看刚构建出来的 `dist/`。

---

## 1. 目录结构

`node_modules/`、`dist/`、`.astro/` 是工具生成的，不要手改，也不要提交。

```
D:\Data\Blog\
  README.md                 这份说明
  package.json              三条命令：dev / build / preview
  package-lock.json         锁定依赖版本
  astro.config.ts           站点地址、Markdown 公式和高亮
  tsconfig.json             TypeScript 规则
  .gitignore                不提交依赖、构建结果、缓存
  .github/workflows/
    deploy.yml              推 main 后构建并发到 GitHub Pages
  public/                   原样拷到网站根目录的静态文件
    favicon.svg
    images/                 文章配图、头像。正文里写成 /images/...
  src/
    site.config.ts          站名、作者、专栏、书、课程、关于页
    content.config.ts       规定文章 / 词本 / 用语开头必须有哪些字段
    content/                你写的内容都在这里
      blog/                 专栏文章（文件名 = 网址）
        hardware/
        math/               散笔记；高数导学在 gaoshu/
        reading/
        english/
      words/                英语词本，一词一篇
      phrases/              生活用语，一场合一篇
    pages/                  每个文件对应一个网址
    layouts/Base.astro      所有页面的外壳：页眉、页脚、字体、深浅色
    components/             页眉、卡片、词本、过滤器等零件
    lib/                    读文章、拼链接、词本和用语数据
    styles/global.css       全站样式（纸色 / 暗色）
```

### 根目录和配置

| 文件 | 干什么 |
| --- | --- |
| `src/site.config.ts` | 全站手写配置。`site` 是站名、网址、GitHub；`profile` 是关于页；`topics` 是四个专栏（`hardware` 硬件、`math` 数学、`reading` 读本、`english` 英语）；`books` 是读本里的书；`courses` 是高数导学、应试英语、单词、生活用语。新专栏、新书、新课程在这里加一项，文章开头用同一个 key。 |
| `src/content.config.ts` | 校验 Markdown 开头的字段。文章要有 `title`、`description`、`pubDate`、`topic`；读本必须再写 `book`。 |
| `astro.config.ts` | 从 `site.config.ts` 读网址；公式用 `$...$` / `$$...$$`。 |
| `.github/workflows/deploy.yml` | 推送 `main` 或在 GitHub 上手动运行时：用 Node.js 22 构建，再把结果发到 Pages。 |

### 页面（`src/pages/`）

Astro 用文件路径生成网址。方括号是从数据填出来的。

| 文件 | 网址 | 干什么 |
| --- | --- | --- |
| `index.astro` | `/` | 首页：在读 / 在学 / 英语入口 |
| `[topic].astro` | `/hardware/`、`/math/`、`/reading/`、`/english/` | 某个专栏 |
| `english/words.astro` | `/english/words/` | 词本：记词、背词 |
| `english/phrases/index.astro` | `/english/phrases/` | 生活用语货架 |
| `english/phrases/[aisle].astro` | `/english/phrases/场合/` | 某一场合的用语 |
| `posts/index.astro` | `/posts/` | 全部笔记（可按年、栏目、书筛选） |
| `posts/[...slug].astro` | `/posts/文章文件名/` | 单篇文章 |
| `tags/` | `/tags/`、`/tags/某个标签/` | 标签 |
| `about.astro` | `/about/` | 关于 |
| `rss.xml.ts` | `/rss.xml` | 订阅源，只收已发布文章 |

### `public/`

不经过编译，原样出现在网站根上。文章插图放到 `public/images/`，正文写成：

```html
<img src="/images/reading/art-of-electronics/1-7-a.png" alt="图 1.7.a" width="400">
```

关于页头像是 `public/images/me.jpg`（`profile.avatar` 指向它）。没有这张图时关于页不显示照片。

---

## 2. 各栏目怎么写、写在哪里

共同点：

- 文件名用英文短横线。**文件名就是网址**，跟它在哪一层文件夹无关。例如 `src/content/blog/math/math-sets-and-belonging.md` 对应 `/posts/math-sets-and-belonging/`。
- `topic` 只能填 `hardware`、`math`、`reading`、`english`。
- `draft: true` 本地看得到，正式网站不会出现。写完改成 `false`。
- 小标题用 `##`，文章页会自动出目录。行内公式 `$V = IR$`，独立一行用 `$$...$$`。

### 硬件

写在 `src/content/blog/hardware/`。一篇一个题目，不必按书或课程挂。

```markdown
---
title: 电路里最先要分清的三个量
description: 电压、电流、电阻分别在说什么，以及欧姆定律把它们怎么连起来。
pubDate: 2026-09-16
topic: hardware
tags:
  - 电路
draft: false
---
```

现有：`hardware-voltage-current-resistance.md`、`hardware-zeros-and-ones.md`。

### 数学

散笔记写在 `src/content/blog/math/`，`topic: math`，不要填 `course`。会出现在数学页的「其他笔记」。

高数导学写在 `src/content/blog/math/gaoshu/`。已有 `math-gaoshu-01.md` 到 `math-gaoshu-10.md`，打开对应文件，在 **知识点**、**难点**、**例题** 里写，写完把 `draft: true` 改成 `false`。

```markdown
---
title: 高数导学 · 第 1 章 函数、极限与连续
description: 这一章怎么理解、哪里容易混。
pubDate: 2026-10-12
topic: math
course: gaoshu-guide
chapter: 2
tags:
  - 高数导学
draft: true
---
```

`course` 必须是 `gaoshu-guide`。`chapter` 按文件顺序：`01` 写 1，`02` 写 2，以此类推到 10。课件可以放在 `math/gaoshu/KJ/`，不会当成文章发布。

新开一门课：先在 `site.config.ts` 的 `courses` 里加一项（`topic: "math"`），文章 `course` 用同一个 key。

### 读本

写在 `src/content/blog/reading/`。**一章一篇**。先在 `site.config.ts` 的 `books` 里有这本书，文章再写同一个 `book`。

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
```

现在两本书：`art-of-electronics`（《电子学的艺术》）、`princeton-calculus`（《普林斯顿微积分读本》）。下一章复制上一章，改文件名、标题和 `chapter`。读本页按书名把章节收在一起，章与章可以前后翻。配图放 `public/images/reading/书名/`。

### 英语

英语分三类，不要都写成博客长文。

**看法、应试** 仍是文章，写在 `src/content/blog/english/`：

| 写什么 | 文件放哪 | frontmatter |
| --- | --- | --- |
| 怎么看英语 | `english/` | `topic: english`（不必填 course） |
| 应试英语 | `english/` | `topic: english`，`course: exam-english` |

现有：`english-as-a-tool.md`、`english-exam-what-matters.md`。方法说明还有 `english-words-senses.md`、`english-living-phrases.md`，词和用语本身不要再往这类文章里堆。

**词本**（记词、背词）写在 `src/content/words/`，一词一篇，照 `play.md` 抄：

```markdown
---
word: play
note: 先钉成「玩」，牌上的句子会读拧。
senses:
  - example: I play Magic on weekends.
    scene: 在打牌、参加这局游戏。
  - example: Play a land.
    scene: 把这张地放进这场里用。不是「玩这个生物」。
---
```

近义的词可以写同一个 `group`。页面是 `/english/words/`。

**生活用语** 写在 `src/content/phrases/`，一场合一篇，照 `notes.md` 抄：

```markdown
---
title: 记笔记
hint: 刚看懂、卡住、先放过
order: 1
phrases:
  - line: Let me write this down before I forget.
    scene: 刚看懂一个规则，先落到纸上。
---
```

`order` 决定货架上的顺序。页面是 `/english/phrases/`，点进一类才看该场合的句子。

---

## 3. 如何把写好的内容更新到 GitHub 仓库

这些 `git` 命令在**本机**输入，不在 GitHub 网页里输入。

1. 自己新开一个 **PowerShell**（开始菜单搜「PowerShell」）或 **Git Bash**。
2. 先进入博客目录：

```powershell
cd D:\Data\Blog
```

3. **不要**用正在跑 `agent worker start` 的那个窗口，那是给云端代理用的，不是给你敲 git 的。
4. 第一次 `git push` 时，电脑可能会弹出 GitHub 登录窗口，用你的 GitHub 账号登进去即可。

线上仓库是 [Acidnicai/Acidnicai.github.io](https://github.com/Acidnicai/Acidnicai.github.io)。文件在本机 `D:\Data\Blog` 里改，改完在刚才那个 PowerShell / Git Bash 里提交，并推到 **`main`**。别的分支推上去，网站不会变。

第一次在这台电脑上提交前，只需配一次名字（以后不用再做）：

```powershell
git config --global user.name "灾区尼采"
git config --global user.email "166932268+Acidnicai@users.noreply.github.com"
```

写完或改完后：

```powershell
cd D:\Data\Blog
git checkout main
git add .
git status
git commit -m "写清这次改了什么"
git push origin main
```

如果改动先写在别的分支上，先回到 `main` 再合并、再推：

```powershell
git checkout main
git merge 那个分支的名字
git push origin main
```

注意：

- 先在本地 `npm run dev` 看过再推。
- `draft: true` 推上去也不会出现在正式网站上。
- 不要把 `node_modules/`、`dist/`、`.astro/` 加进提交。

---

## 4. 如何把仓库里的博客部署到 github.io

不需要自己把 `dist/` 传到网上。推送 `main` 之后，GitHub Actions 会按 `.github/workflows/deploy.yml` 自动：检出代码 → 安装依赖 → `astro build` → 把结果发到 GitHub Pages。

1. 确认刚才推的是 `main`（见上一节）。
2. 打开 [Actions](https://github.com/Acidnicai/Acidnicai.github.io/actions)，等 **Deploy to GitHub Pages** 变成绿色。
3. 打开 [https://acidnicai.github.io/](https://acidnicai.github.io/) 刷新。页面大约还有几分钟缓存。

也可以在 Actions 页点 **Run workflow**，不推新提交也能再部署一次。

这个仓库的 Pages 使用 **GitHub Actions** 构建，不要改回「从某个分支的文件夹直接发布」。`site.base` 保持 `'/'`（这是 `username.github.io` 个人主页仓库，不是 `username.github.io/Blog` 这种项目页）。

评论是可选项。到 [giscus](https://giscus.app) 用 GitHub Discussions 生成配置，填进 `site.giscus`。留空则文章下不显示评论。

---

## 附录：更新本机的 Git

这台电脑上的 Git 是便携版，放在 `D:\EPath\git`，命令来自 `D:\EPath\git\cmd`。换版本时下载新压缩包换掉这个文件夹，不要走 Windows 安装程序。

```powershell
git --version
```

到 [Git for Windows 发布页](https://github.com/git-for-windows/git/releases) 下载类似 `MinGit-2.xx.x-64-bit.zip` 的 64 位压缩包（不要下 `.exe`）。关掉正在用 Git 的窗口后：

```powershell
Rename-Item D:\EPath\git D:\EPath\git-old
Expand-Archive -Path "$env:USERPROFILE\Downloads\MinGit-2.xx.x-64-bit.zip" -DestinationPath D:\EPath\git
git --version
Remove-Item D:\EPath\git-old -Recurse -Force
```

`git --version` 显示新版本后再删 `git-old`。环境变量里的 `D:\EPath\git\cmd` 不用改。
