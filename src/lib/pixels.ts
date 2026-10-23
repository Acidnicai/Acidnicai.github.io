export function rowsOf(art: string) {
  return art
    .replace(/^\r?\n/, "")
    .replace(/\r?\n$/, "")
    .split(/\r?\n/)
    .map((row) => row.replace(/\r$/, ""));
}

export function sizeOf(art: string) {
  const rows = rowsOf(art);
  return {
    w: Math.max(1, ...rows.map((row) => row.length)),
    h: rows.length,
  };
}
