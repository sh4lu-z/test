import { buildMarkdownTable } from "../src/markdownBuilder.js";

export function runMarkdownTableTest() {
  const headers = ["Check", "Status", "Duration"];
  const rows = [["HMAC Signature", "Passed", "12ms"], ["Secret Scan", "Passed", "8ms"]];
  const table = buildMarkdownTable(headers, rows);

  return {
    test: "markdown-table-formatter",
    passed: table.includes("| Check | Status | Duration |") && table.includes("| HMAC Signature | Passed | 12ms |"),
  };
}
