import { sanitizeLog } from "../src/logSanitizer.js";

export function runLogSanitizerTest() {
  const rawLog = "User admin with email test@example.com logged in with bearer token12345.";
  const cleanLog = sanitizeLog(rawLog);

  return {
    test: "log-sanitizer-masking",
    passed: !cleanLog.includes("test@example.com") && !cleanLog.includes("bearer token12345"),
  };
}
