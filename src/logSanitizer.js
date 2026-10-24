export function sanitizeLog(message = "") {
  if (typeof message !== "string") return message;

  return message
    .replace(/(bearer\s+)[A-Za-z0-9\-._~+/]+=*/gi, "$1[REDACTED]")
    .replace(/([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/g, "[REDACTED_EMAIL]")
    .replace(/(password|secret|token)\s*=\s*['"]?[^\s'"]+/gi, "$1=[REDACTED]");
}
