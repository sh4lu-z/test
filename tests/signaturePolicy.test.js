import { verifyWebhookHmac } from "../src/webhookVerifier.js";

export function runSignaturePolicyTest() {
  const secret = "syntiox-test-secret-key";
  const validPayload = JSON.stringify({ event: "pull_request", action: "opened" });
  const fakeHeader = "sha256=invalidhexsignature0000000000000000";

  const isAccepted = verifyWebhookHmac(validPayload, fakeHeader, secret);
  return {
    test: "signature-rejection-policy",
    passed: isAccepted === false,
  };
}
