export function buildMarkdownTable(headers, rows) {
  if (!headers || !headers.length) return "";

  const headerRow = `| ${headers.join(" | ")} |`;
  const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`;
  const dataRows = (rows || []).map((row) => `| ${row.join(" | ")} |`);

  return [headerRow, separatorRow, ...dataRows].join("\n");
}
