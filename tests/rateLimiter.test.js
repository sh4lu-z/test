import { TokenBucketLimiter } from "../src/rateLimiter.js";

export function runRateLimiterThrottleTest() {
  const limiter = new TokenBucketLimiter(2, 0);
  const first = limiter.tryConsume(1);
  const second = limiter.tryConsume(1);
  const thirdExceeded = limiter.tryConsume(1);

  return {
    test: "token-bucket-throttling",
    passed: first === true && second === true && thirdExceeded === false,
  };
}
