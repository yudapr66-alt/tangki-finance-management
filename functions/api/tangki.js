/**
 * Cloudflare Pages Function: /api/tangki
 * Proxies same-origin JSON requests to the existing Google Apps Script Web App.
 * Configure APPS_SCRIPT_URL in Cloudflare Pages project settings.
 * No authentication layer is added, as requested.
 */
export async function onRequest({ request, env }) {
  const headers = { "Cache-Control": "no-store" };

  if (request.method !== "POST") {
    return Response.json(
      { success: false, error: "Metode tidak diizinkan. Gunakan POST." },
      { status: 405, headers: { ...headers, "Allow": "POST" } }
    );
  }

  let target;
  try {
    target = new URL(env.APPS_SCRIPT_URL || "");
  } catch (_) {
    return Response.json(
      { success: false, error: "APPS_SCRIPT_URL belum diatur atau tidak valid." },
      { status: 503, headers }
    );
  }

  if (
    target.protocol !== "https:" ||
    target.hostname !== "script.google.com" ||
    !target.pathname.startsWith("/macros/s/") ||
    !target.pathname.endsWith("/exec")
  ) {
    return Response.json(
      { success: false, error: "APPS_SCRIPT_URL harus berupa URL Web App Apps Script yang berakhiran /exec." },
      { status: 500, headers }
    );
  }

  let requestData;
  try {
    requestData = await request.json();
  } catch (_) {
    return Response.json(
      { success: false, error: "Body permintaan harus berupa JSON yang valid." },
      { status: 400, headers }
    );
  }

  if (!requestData || typeof requestData !== "object" || Array.isArray(requestData) || typeof requestData.action !== "string") {
    return Response.json(
      { success: false, error: "Format permintaan API tidak valid." },
      { status: 400, headers }
    );
  }

  try {
    const upstream = await fetch(target.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
      redirect: "follow"
    });

    const raw = await upstream.text();
    let result;
    try {
      result = JSON.parse(raw);
    } catch (_) {
      return Response.json(
        { success: false, error: "Apps Script tidak mengembalikan JSON. Pastikan doPost sudah dipasang dan deployment diperbarui." },
        { status: 502, headers }
      );
    }

    return Response.json(result, { status: upstream.ok ? 200 : 502, headers });
  } catch (error) {
    return Response.json(
      { success: false, error: "Tidak dapat menghubungi Google Apps Script: " + (error?.message || "unknown error") },
      { status: 502, headers }
    );
  }
}
