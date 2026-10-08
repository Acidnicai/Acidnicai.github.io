export function url(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${base}/`;
  return `${base}${normalized}`;
}

export function formatDate(date: Date, locale = "zh-CN"): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function readingTime(body: string): number {
  const chinese = (body.match(/[\u4e00-\u9fff]/g) || []).length;
  const english = body
    .replace(/[\u4e00-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(chinese / 400 + english / 200));
}
