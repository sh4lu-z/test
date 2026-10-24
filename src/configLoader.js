export function loadGuardConfig(customConfig = {}) {
  const defaultConfig = {
    enableAutoLabel: true,
    enableSecretScan: true,
    maxRequestsPerMinute: 60,
  };

  return { ...defaultConfig, ...customConfig };
}
