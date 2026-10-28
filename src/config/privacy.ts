// This site is a private link page: shared by hand, never listed anywhere.
// Every response (pages, redirects, .vcf, robots.txt) carries these directives.
// Static files in /public get the same values from public/_headers.
export const ROBOTS_DIRECTIVES =
  "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate, noai, noimageai";

export const PRIVACY_HEADERS: Record<string, string> = {
  "X-Robots-Tag": ROBOTS_DIRECTIVES,
  // Outgoing links don't reveal this URL to the sites they open.
  "Referrer-Policy": "no-referrer",
};

// Crawlers named explicitly as well as "*", for bots that only obey their own entry.
const NAMED_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "YandexBot",
  "Baiduspider",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
];

export const ROBOTS_TXT = [
  "# Private page. Not for search engines, AI crawlers or archives.",
  "",
  ...NAMED_BOTS.flatMap((bot) => [`User-agent: ${bot}`, "Disallow: /", ""]),
  "User-agent: *",
  "Disallow: /",
  "",
].join("\n");
