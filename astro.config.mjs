// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://niyumei-lore.vercel.app',
  experimental: {
    // Strict Content Security Policy: Astro hashes every script and style it emits,
    // and the browser refuses anything else. Frame/embedding rules live in vercel.json.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        'font-src https://fonts.gstatic.com',
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
      styleDirective: { resources: ["'self'", 'https://fonts.googleapis.com'] },
      scriptDirective: { resources: ["'self'"] },
    },
  },
});
