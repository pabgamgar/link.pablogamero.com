import type { MiddlewareHandler } from "astro";
import { PRIVACY_HEADERS } from "./config/privacy";

export const onRequest: MiddlewareHandler = async (_context, next) => {
  const response = await next();
  for (const [name, value] of Object.entries(PRIVACY_HEADERS)) {
    response.headers.set(name, value);
  }
  return response;
};
