import { getCollection } from "astro:content";

export type Phrase = {
  line: string;
  scene: string;
};

export type PhraseAisle = {
  id: string;
  title: string;
  hint: string;
  order: number;
  phrases: Phrase[];
};

export async function allPhraseAisles(): Promise<PhraseAisle[]> {
  const entries = await getCollection("phrases");
  return entries
    .map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      hint: entry.data.hint,
      order: entry.data.order,
      phrases: entry.data.phrases,
    }))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "zh"));
}

export async function phraseAisleById(id: string): Promise<PhraseAisle | undefined> {
  return (await allPhraseAisles()).find((aisle) => aisle.id === id);
}
