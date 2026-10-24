export function generatePrLabels(changedFiles = []) {
  const labels = new Set();

  for (const file of changedFiles) {
    if (file.startsWith("src/")) labels.add("backend");
    if (file.endsWith(".md")) labels.add("documentation");
    if (file.includes("test")) labels.add("testing");
    if (file.includes("workflow") || file.startsWith(".github/")) labels.add("ci/cd");
  }

  if (labels.size === 0) {
    labels.add("enhancement");
  }

  return Array.from(labels);
}
