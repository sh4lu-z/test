import { getHealthStatus, validateApiRequest } from "../src/app.js";

export function runGuardHealthTest() {
  const health = getHealthStatus();
  const authCheck = validateApiRequest({ "x-syntiox-key": "valid-test-key-123" }, 60);

  return {
    test: "guard-health-reporting",
    passed: health.status === "ok" && health.service === "syntiox-test-service" && authCheck.allowed === true,
  };
}
