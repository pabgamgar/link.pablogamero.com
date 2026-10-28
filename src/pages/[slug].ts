import type { APIRoute } from "astro";
import { REDIRECTS_MAP, RESERVED_SLUGS } from "../config/linkpage";

export const prerender = false;

const notFound = () =>
  new Response("Not Found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug?.trim().toLowerCase();

  if (!slug || RESERVED_SLUGS.has(slug)) {
    return notFound();
  }

  const entry = REDIRECTS_MAP[slug];

  if (!entry) {
    return notFound();
  }

  return new Response(null, {
    status: entry.status,
    headers: {
      Location: entry.target,
    },
  });
};
