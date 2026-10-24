export class MetricsCollector {
  constructor() {
    this.counters = new Map();
    this.timings = new Map();
  }

  increment(metric, value = 1) {
    const current = this.counters.get(metric) || 0;
    this.counters.set(metric, current + value);
  }

  recordDuration(metric, durationMs) {
    if (!this.timings.has(metric)) {
      this.timings.set(metric, []);
    }
    this.timings.get(metric).push(durationMs);
  }

  getSnapshot() {
    return {
      counters: Object.fromEntries(this.counters),
      timings: Object.fromEntries(this.timings),
      timestamp: new Date().toISOString(),
    };
  }
}
