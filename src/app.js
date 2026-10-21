export function getHealthStatus() {
  return {
    service: "syntiox-test-service",
    status: "ok",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}

export function validateApiRequest(headers = {}, maxRequestsPerMinute = 60) {
  const apiKey = headers["x-syntiox-key"] || headers["authorization"];
  if (!apiKey || typeof apiKey !== "string") {
    return { allowed: false, status: 401, reason: "Missing API key header" };
  }

  if (maxRequestsPerMinute <= 0) {
    return { allowed: false, status: 429, reason: "Rate limit exceeded" };
  }

  return {
    allowed: true,
    status: 200,
    reason: "Request authorized",
  };
}
