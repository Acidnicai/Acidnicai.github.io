/**
 * 站点配置：改这一处就够了。
 *
 * 发布到 GitHub Pages 时务必修改：
 * - url：你的站点地址
 * - base：个人主页仓库（username.github.io）保持 '/'；
 *         项目仓库（例如名叫 Blog）改成 '/Blog/'
 */
export const site = {
  url: "https://acidnicai.github.io",
  base: "/",
  title: "灾区尼采的博客",
  author: "李朋宸",
  description: "硬件、数学，以及读过的书。",
  motto: "今天也在电路和公式里，慢慢往前走。",
  lang: "zh-CN",
  github: "https://github.com/Acidnicai",
  email: "lipengcheng88@gmail.com",
  twitter: "",
  /**
   * 用 GitHub Discussions 做评论：到 https://giscus.app 生成后填入。
   * 留空则不显示评论。
   */
  giscus: {
    repo: "",
    repoId: "",
    category: "Announcements",
    categoryId: "",
  },
} as const;

export type EducationItem = {
  school: string;
  degree: string;
  period?: string;
  major?: string;
  note?: string;
};

export type AwardItem = {
  year: string;
  title: string;
  note?: string;
};

export type PaperItem = {
  year: string;
  title: string;
  venue: string;
  url?: string;
};

export type ProjectItem = {
  name: string;
  period?: string;
  summary: string;
  link?: string;
};

/**
 * 个人介绍：关于页会读这里。
 * 照片放到 public/images/me.jpg，下面这些文字按自己的经历改。
 */
export const profile = {
  displayName: "李朋宸",
  subtitle: "沈阳师范大学 · 本科",
  status: "学习中",
  /** 个人照片：文件放到 `public/images/me.jpg`。 */
  avatar: "images/me.jpg",
  intro: [
    "李朋宸，本科就读于沈阳师范大学。平时主要在硬件和数学两边走，电路、证明，以及把学过的东西慢慢记下来。",
    "这个博客用来放学习笔记。想写清楚自己搞懂了什么，也想给以后回头看的自己留一条痕迹。",
  ],
  facts: [
    { label: "坐标", value: "辽宁沈阳" },
    { label: "学历", value: "本科" },
    { label: "在学", value: "硬件 · 数学 · 读本" },
  ],
  education: [
    {
      school: "沈阳师范大学",
      degree: "本科",
      period: "",
      major: "",
      note: "",
    },
  ] satisfies EducationItem[],
  /**
   * 获奖经历，按时间倒序填写。
   * 例：{ year: "2024", title: "全国大学生电子设计竞赛 省一等奖", note: "担任硬件" }
   */
  awards: [] as AwardItem[],
  /**
   * 论文发表。
   * 例：{ year: "2025", title: "论文题目", venue: "期刊 / 会议", url: "https://..." }
   */
  papers: [] as PaperItem[],
  /**
   * 项目。
   * 例：{ name: "项目名", period: "2024 — 2025", summary: "你做了什么。", link: "https://..." }
   */
  projects: [] as ProjectItem[],
};

/**
 * 当前学习方向。以后要加新专栏，在这里添一项，
 * 并给文章 frontmatter 的 topic 用上对应的 key。
 */
export const topics = {
  hardware: {
    name: "硬件",
    description: "电路、数字逻辑、嵌入式，以及计算机是怎么被搭起来的。",
  },
  math: {
    name: "数学",
    description: "定义、直觉、证明，还有做错过的题。",
  },
  reading: {
    name: "读本",
    description: "读过的书：每一章的理解、难点，以及习题解答。",
  },
} as const;

export type TopicId = keyof typeof topics;
const topicIds = Object.keys(topics) as [TopicId, ...TopicId[]];
export const topicIdSchema = topicIds;

/**
 * 读本专栏里的书。新开一本就在这里加一项，
 * 文章 frontmatter 的 book 用同一个 key，chapter 写第几章。
 */
export const books = {
  "art-of-electronics": {
    title: "电子学的艺术",
    author: "霍罗维茨、希尔",
    description: "按章节记电路是怎么读懂的，以及习题怎么做。",
  },
  "princeton-calculus": {
    title: "普林斯顿微积分读本",
    author: "阿德里安·巴纳",
    description: "按章节记定义和图像怎么对上，以及习题怎么做。",
  },
} as const;

export type BookId = keyof typeof books;
const bookIds = Object.keys(books) as [BookId, ...BookId[]];
export const bookIdSchema = bookIds;
