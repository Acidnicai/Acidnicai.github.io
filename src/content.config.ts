import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { bookIdSchema, topicIdSchema } from "./site.config";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      topic: z.enum(topicIdSchema),
      book: z.enum(bookIdSchema).optional(),
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

export const collections = { blog };
