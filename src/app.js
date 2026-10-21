export function getHealthStatus() {
  return {
    service: "syntiox-test-service",
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}
