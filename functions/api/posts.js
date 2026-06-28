/**
 * 文章列表 / 创建文章
 * GET /api/posts - 获取文章列表
 * POST /api/posts - 创建新文章
 */
export async function onRequest(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method === "GET") {
    return handleGetPosts(env, corsHeaders);
  }

  if (request.method === "POST") {
    return handleCreatePost(request, env, corsHeaders);
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

async function handleGetPosts(env, corsHeaders) {
  const { results } = await env.DB.prepare(
    "SELECT id, slug, title, description, tags, category, published, pinned, created_at, updated_at FROM posts ORDER BY created_at DESC"
  ).all();

  return new Response(JSON.stringify({ posts: results }), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

async function handleCreatePost(request, env, corsHeaders) {
  // 验证权限
  const authResult = await verifyAuth(request, env);
  if (!authResult.ok) {
    return authResult;
  }

  try {
    const body = await request.json();
    const { slug, title, content, description, tags, category, published, pinned } = body;

    if (!slug || !title) {
      return new Response(JSON.stringify({ error: "slug 和 title 为必填项" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 检查 slug 是否已存在
    const existing = await env.DB.prepare("SELECT id FROM posts WHERE slug = ?").bind(slug).first();
    if (existing) {
      return new Response(JSON.stringify({ error: "slug 已存在" }), {
        status: 409,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const tagsJson = JSON.stringify(tags || []);
    const result = await env.DB.prepare(
      `INSERT INTO posts (slug, title, content, description, tags, category, published, pinned)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(slug, title, content || "", description || "", tagsJson, category || "", published ? 1 : 0, pinned ? 1 : 0).run();

    return new Response(JSON.stringify({ id: result.meta.last_row_id, slug }), {
      status: 201,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

async function verifyAuth(request, env) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "未授权" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = atob(token);
    const parts = decoded.split(".");
    if (parts.length !== 2) throw new Error("Invalid token");

    const timestamp = parseInt(parts[0]);
    // Token 24小时有效
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      throw new Error("Token expired");
    }

    // 验证签名
    const encoder = new TextEncoder();
    const data = encoder.encode(env.ADMIN_PASSWORD + "." + parts[0]);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    if (parts[1] !== hashHex) {
      throw new Error("Invalid token");
    }

    return { ok: true };
  } catch (e) {
    return new Response(JSON.stringify({ error: "认证失败: " + e.message }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
