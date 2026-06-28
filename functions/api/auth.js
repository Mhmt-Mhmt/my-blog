/**
 * 管理员认证 API
 * POST /api/auth
 * Body: { password: string }
 * Response: { token: string }
 */
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { password } = await request.json();

    if (!password || password !== env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "密码错误" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 生成简单 token: base64(时间戳.密码哈希)
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "." + Date.now());
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const token = btoa(Date.now() + "." + hashHex);

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "请求格式错误" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
