import type { APIRoute } from "astro";
import { SIDES, parseSide } from "../config/sides";
import { buildVCard } from "../lib/vcard";

export const prerender = false;

// /contact.vcf?side=work|personal. Each side shares only its own phone and emails.
export const GET: APIRoute = ({ url }) => {
  const side = parseSide(url.searchParams.get("side"));

  return new Response(buildVCard(SIDES[side].contact), {
    headers: {
      "content-type": "text/vcard; charset=utf-8",
      "content-disposition": `attachment; filename="pablo-gamero-${side}.vcf"`,
      "cache-control": "no-store",
    },
  });
};
