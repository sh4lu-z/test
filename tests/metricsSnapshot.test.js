import { MetricsCollector } from "../src/metricsCollector.js";

export function runMetricsSnapshotTest() {
  const collector = new MetricsCollector();
  collector.increment("guard.checks.executed", 3);
  collector.recordDuration("guard.latency.ms", 45);

  const snapshot = collector.getSnapshot();
  return {
    test: "metrics-snapshot-integrity",
    passed: snapshot.counters["guard.checks.executed"] === 3 && snapshot.timings["guard.latency.ms"].length === 1,
  };
}
