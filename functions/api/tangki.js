/**
 * Cloudflare Pages Function — API proxy for Tangki Finance Management.
 *
 * Intentionally not wired to an upstream URL yet. The Apps Script doPost
 * router must be added and deployed before this proxy is activated.
 * No new login, PIN, API key, or Cloudflare Access layer is introduced.
 */
export async function onRequest(context) {
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Allow": "GET, POST, OPTIONS",
        "Cache-Control": "no-store"
      }
    });
  }

  return Response.json(
    {
      ok: false,
      error: "API belum dikonfigurasi. Endpoint Apps Script belum dihubungkan."
    },
    {
      status: 503,
      headers: { "Cache-Control": "no-store" }
    }
  );
}
