export function buildContributorGreeting(username, isFirstTime = false) {
  if (!username) return "";

  if (isFirstTime) {
    return `Welcome @${username}! Thank you for making your first contribution to Syntiox Guard.`;
  }

  return `Welcome back @${username}! Thanks for your continued contributions to Syntiox Guard.`;
}
