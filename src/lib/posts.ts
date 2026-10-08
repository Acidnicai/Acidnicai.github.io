import { getCollection, type CollectionEntry } from "astro:content";
import type { TopicId } from "../site.config";

export type Post = CollectionEntry<"blog">;

export async function publishedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function allTags(posts: Post[]): Map<string, number> {
  const tags = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    }
  }
  return new Map([...tags.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh")));
}

export function postsByTopic(posts: Post[], topic: TopicId): Post[] {
  return posts.filter((post) => post.data.topic === topic);
}

export function postsByYear(posts: Post[]): Map<number, Post[]> {
  const grouped = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    const list = grouped.get(year) ?? [];
    list.push(post);
    grouped.set(year, list);
  }
  return grouped;
}
