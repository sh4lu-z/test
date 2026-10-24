import { buildContributorGreeting } from "../src/contributorGreeting.js";

export function runContributorGreetingTest() {
  const firstTime = buildContributorGreeting("newbie-dev", true);
  const returning = buildContributorGreeting("regular-dev", false);

  return {
    test: "contributor-greeting-templates",
    passed: firstTime.includes("first contribution") && returning.includes("continued contributions"),
  };
}
