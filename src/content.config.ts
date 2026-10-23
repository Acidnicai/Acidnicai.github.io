import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { bookIdSchema, courseIdSchema, topicIdSchema } from "./site.config";

// topic / course 枚举来自 site.config.ts，改专栏后要让这份 schema 重新加载。
// 文章按专栏放进子文件夹，id 仍用文件名，网址不变。

function blogEntryId({ entry }: { entry: string }) {
  const file = entry.replace(/\\/g, "/").split("/").pop() ?? entry;
  return file.replace(/\.(md|mdx)$/i, "");
}

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}",
    generateId: blogEntryId,
  }),
  schema: z
    .object({
      title: z.string(),
      description: z.preprocess((value) => value ?? "", z.string()),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      topic: z.enum(topicIdSchema),
      book: z.enum(bookIdSchema).optional(),
      course: z.enum(courseIdSchema).optional(),
      chapter: z.number().int().positive().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.topic === "reading" && !data.book) {
        ctx.addIssue({
          code: "custom",
          path: ["book"],
          message: "读本笔记要填写 book",
        });
      }
    }),
});

const words = defineCollection({
  loader: glob({ base: "./src/content/words", pattern: "**/*.{md,yml,yaml}" }),
  schema: z.object({
    word: z.string(),
    group: z.string().optional(),
    groupNote: z.string().optional(),
    note: z.string().optional(),
    senses: z
      .array(
        z.object({
          example: z.string(),
          scene: z.string(),
        }),
      )
      .min(1),
  }),
});

const phrases = defineCollection({
  loader: glob({ base: "./src/content/phrases", pattern: "**/*.{md,yml,yaml}" }),
  schema: z.object({
    title: z.string(),
    hint: z.string(),
    order: z.number().int().nonnegative(),
    phrases: z
      .array(
        z.object({
          line: z.string(),
          scene: z.string(),
        }),
      )
      .min(1),
  }),
});

export const collections = { blog, words, phrases };
