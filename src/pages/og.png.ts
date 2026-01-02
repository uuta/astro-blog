import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/generateOgImages";

export const GET: APIRoute = async () => {
  const png: Buffer = await generateOgImageForSite();
  return new Response(Uint8Array.from(png), {
    headers: { "Content-Type": "image/png" },
  });
};
