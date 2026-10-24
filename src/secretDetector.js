export function detectSecrets(content = "") {
  const patterns = [
    { type: "GitHub PAT", regex: /ghp_[A-Za-z0-9_]{36}/ },
    { type: "Syntiox Key", regex: /sk_live_[A-Za-z0-9]{32}/ },
    { type: "Private Key", regex: /-----BEGIN PRIVATE KEY-----/ },
  ];

  const findings = [];
  for (const { type, regex } of patterns) {
    if (regex.test(content)) {
      findings.push({ type, detected: true });
    }
  }

  return {
    hasSecrets: findings.length > 0,
    findings,
  };
}
