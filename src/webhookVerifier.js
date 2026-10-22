import crypto from "crypto";

export function verifyWebhookHmac(rawPayload, signatureHeader, secretKey) {
  if (!rawPayload || !signatureHeader || !secretKey) {
    return false;
  }

  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secretKey).update(rawPayload, "utf8").digest("hex");

  const sigBuffer = Buffer.from(signatureHeader);
  const expBuffer = Buffer.from(expected);

  if (sigBuffer.length !== expBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuffer, expBuffer);
}
