import { generatePrLabels } from "../src/labelGenerator.js";

export function runLabelingMatrixTest() {
  const files = ["src/app.js", "README.md", "tests/signaturePolicy.test.js"];
  const labels = generatePrLabels(files);

  return {
    test: "pr-auto-labeling-matrix",
    passed: labels.includes("backend") && labels.includes("documentation") && labels.includes("testing"),
  };
}
