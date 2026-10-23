import { getCollection } from "astro:content";

export type WordSense = {
  example: string;
  scene: string;
};

export type WordEntry = {
  id: string;
  word: string;
  group?: string;
  groupNote?: string;
  note?: string;
  senses: WordSense[];
};

export async function allWordEntries(): Promise<WordEntry[]> {
  const entries = await getCollection("words");
  return entries
    .map((entry) => ({
      id: entry.id,
      word: entry.data.word,
      group: entry.data.group,
      groupNote: entry.data.groupNote,
      note: entry.data.note,
      senses: entry.data.senses,
    }))
    .sort((a, b) => a.word.localeCompare(b.word, "en"));
}
