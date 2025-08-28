import crypto from "crypto";

const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET || "";

/**
 * Verify GitHub webhook signature
 * @param {Object} payload - The JSON body
 * @param {String} signatureHeader - GitHub's signature (sha256=...)
 */
export default function verifyWebhook(payload, signatureHeader) {
  if (!signatureHeader) return false;

  const computedSignature =
    "sha256=" +
    crypto
      .createHmac("sha256", GITHUB_SECRET)
      .update(JSON.stringify(payload))
      .digest("hex");

  // Use timingSafeEqual to prevent timing attacks
  const bufferA = Buffer.from(computedSignature);
  const bufferB = Buffer.from(signatureHeader);

  if (bufferA.length !== bufferB.length) return false;

  return crypto.timingSafeEqual(bufferA, bufferB);
}

