import type { TopicId } from "../site.config";

export type SeaId = "bluehole" | "glacial" | "kelp" | "vents" | "atlantis";

const topicSea: Record<TopicId, SeaId> = {
  hardware: "vents",
  math: "glacial",
  reading: "kelp",
  english: "bluehole",
};

export function seaForTopic(topic: TopicId): SeaId {
  return topicSea[topic];
}

export function seaFromPath(pathname: string): SeaId {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path.endsWith("/about")) return "atlantis";
  if (path.endsWith("/hardware")) return "vents";
  if (path.endsWith("/math")) return "glacial";
  if (path.endsWith("/reading")) return "kelp";
  if (path.endsWith("/english")) return "bluehole";
  return "bluehole";
}
