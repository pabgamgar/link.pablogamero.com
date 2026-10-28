import type { APIRoute } from "astro";
import { ROBOTS_TXT } from "../config/privacy";

export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(ROBOTS_TXT, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
};
