import { books, topics, type TopicId } from "../site.config";
import type { Post } from "./posts";

export type FilterOption = {
  value: string;
  label: string;
};

export type ChoiceDimension = {
  key: "year" | "month" | "topic";
  label: string;
  kind: "choice";
  options: FilterOption[];
};

export type TextDimension = {
  key: "book" | "author";
  label: string;
  kind: "text";
  placeholder: string;
};

export type FilterDimension = ChoiceDimension | TextDimension;

export function noteFilterDimensions(posts: Post[]): FilterDimension[] {
  const years = [
    ...new Set(posts.map((post) => String(post.data.pubDate.getFullYear()))),
  ].sort((a, b) => Number(b) - Number(a));

  const months = [
    ...new Set(posts.map((post) => String(post.data.pubDate.getMonth() + 1))),
  ].sort((a, b) => Number(a) - Number(b));

  const presentTopics = new Set(posts.map((post) => post.data.topic));
  const topicOptions = (Object.keys(topics) as TopicId[])
    .filter((id) => presentTopics.has(id))
    .map((id) => ({ value: id, label: topics[id].name }));

  return [
    { key: "year", label: "年份", kind: "choice", options: years.map((year) => ({ value: year, label: year })) },
    {
      key: "month",
      label: "月份",
      kind: "choice",
      options: months.map((month) => ({ value: month, label: `${month}月` })),
    },
    { key: "topic", label: "类别", kind: "choice", options: topicOptions },
    { key: "book", label: "书名", kind: "text", placeholder: "输入书名" },
    { key: "author", label: "作者", kind: "text", placeholder: "输入作者" },
  ];
}

export function bookTitleOf(post: Post): string {
  return post.data.book ? books[post.data.book].title : "";
}

export function bookAuthorOf(post: Post): string {
  return post.data.book ? books[post.data.book].author : "";
}
