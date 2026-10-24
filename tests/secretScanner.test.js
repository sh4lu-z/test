import { detectSecrets } from "../src/secretDetector.js";

export function runSecretScanTest() {
  const dummyPayload = "const token = 'ghp_fakeGitHubPersonalAccessToken123456';";
  const result = detectSecrets(dummyPayload);

  return {
    test: "secret-scanner-detection",
    passed: result.hasSecrets === true && result.findings.length > 0,
  };
}
