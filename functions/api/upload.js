/**
 * 文件上传 API
 * POST /api/upload - 上传文件到 R2
 * 支持: 图片、PDF、Markdown 等
 */
export async function onRequest(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // 验证权限
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "未授权" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "请选择文件" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 生成唯一文件名
    const ext = file.name.split(".").pop();
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${randomStr}.${ext}`;

    // 上传到 R2
    await env.FILES.put(filename, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });

    // 生成访问 URL
    const url = `/files/${filename}`;

    // 记录到 D1
    await env.DB.prepare(
      "INSERT INTO files (filename, original_name, mime_type, size, url) VALUES (?, ?, ?, ?, ?)"
    ).bind(filename, file.name, file.type, file.size, url).run();

    return new Response(JSON.stringify({
      url,
      filename,
      originalName: file.name,
      size: file.size,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}
