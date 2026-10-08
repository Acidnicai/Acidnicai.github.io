import rss from "@astrojs/rss";
import { site } from "../site.config";
import { publishedPosts } from "../lib/posts";
import { url } from "../lib/utils";

export async function GET(context: { site?: URL }) {
  const posts = await publishedPosts();
  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: url(`/posts/${post.id}/`),
    })),
  });
}
