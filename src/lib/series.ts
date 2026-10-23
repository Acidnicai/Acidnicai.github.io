import { books, courses, topics } from "../site.config";
import type { Post } from "./posts";
import { url } from "./utils";

export type SeriesInfo = {
  kind: "book" | "course" | "topic";
  name: string;
  href: string;
  label: string;
};

export function seriesInfo(post: Post): SeriesInfo {
  if (post.data.book) {
    const book = books[post.data.book];
    return {
      kind: "book",
      name: book.title,
      href: url(`/reading/#${post.data.book}`),
      label: "读本",
    };
  }
  if (post.data.course) {
    const course = courses[post.data.course];
    return {
      kind: "course",
      name: course.title,
      href: url(`/${course.topic}/#${post.data.course}`),
      label: course.topic === "english" ? "模块" : "课程",
    };
  }
  const topic = topics[post.data.topic];
  return {
    kind: "topic",
    name: topic.name,
    href: url(`/${post.data.topic}/`),
    label: "专栏",
  };
}

function stripSeriesName(title: string, seriesName: string) {
  const prefixes = [`${seriesName} · `, `${seriesName}·`, `${seriesName} `];
  for (const prefix of prefixes) {
    if (title.startsWith(prefix)) return title.slice(prefix.length).trim();
  }
  return title;
}

export function chapterParts(post: Post) {
  const series = seriesInfo(post);
  const heading = stripSeriesName(post.data.title, series.name);
  const matched = heading.match(/^第\s*(\d+)\s*章(?:\s+|$)(.*)$/);
  if (matched) {
    const mark = `第 ${matched[1]} 章`;
    const rest = matched[2].trim();
    return { series, mark, title: rest || mark, titleIsMark: !rest };
  }
  return { series, mark: undefined, title: heading, titleIsMark: false };
}
