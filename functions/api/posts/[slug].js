/**
 * 单篇文章操作
 * GET /api/posts/:slug - 获取文章详情
 * PUT /api/posts/:slug - 更新文章
 * DELETE /api/posts/:slug - 删除文章
 */
export async function onRequest(context) {
  const { request, env, params } = context;
  const slug = params.slug;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method === "GET") {
    return handleGetPost(slug, env, corsHeaders);
  }

  if (request.method === "PUT") {
    return handleUpdatePost(slug, request, env, corsHeaders);
  }

  if (request.method === "DELETE") {
    return handleDeletePost(slug, request, env, corsHeaders);
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

async function handleGetPost(slug, env, corsHeaders) {
  const post = await env.DB.prepare("SELECT * FROM posts WHERE slug = ?").bind(slug).first();

  if (!post) {
    return new Response(JSON.stringify({ error: "文章不存在" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  return new Response(JSON.stringify({ post }), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

async function handleUpdatePost(slug, request, env, corsHeaders) {
  const authResult = await verifyAuth(request, env);
  if (!authResult.ok) return authResult;

  try {
    const body = await request.json();
    const { title, content, description, tags, category, published, pinned } = body;

    const updates = [];
    const values = [];

    if (title !== undefined) { updates.push("title = ?"); values.push(title); }
    if (content !== undefined) { updates.push("content = ?"); values.push(content); }
    if (description !== undefined) { updates.push("description = ?"); values.push(description); }
    if (tags !== undefined) { updates.push("tags = ?"); values.push(JSON.stringify(tags)); }
    if (category !== undefined) { updates.push("category = ?"); values.push(category); }
    if (published !== undefined) { updates.push("published = ?"); values.push(published ? 1 : 0); }
    if (pinned !== undefined) { updates.push("pinned = ?"); values.push(pinned ? 1 : 0); }

    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: "没有需要更新的字段" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    updates.push("updated_at = datetime('now')");
    values.push(slug);

    const sql = `UPDATE posts SET ${updates.join(", ")} WHERE slug = ?`;
    await env.DB.prepare(sql).bind(...values).run();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

async function handleDeletePost(slug, request, env, corsHeaders) {
  const authResult = await verifyAuth(request, env);
  if (!authResult.ok) return authResult;

  try {
    const result = await env.DB.prepare("DELETE FROM posts WHERE slug = ?").bind(slug).run();

    if (result.meta.changes === 0) {
      return new Response(JSON.stringify({ error: "文章不存在" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
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
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      throw new Error("Token expired");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(env.ADMIN_PASSWORD + "." + parts[0]);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    if (parts[1] !== hashHex) throw new Error("Invalid token");

    return { ok: true };
  } catch (e) {
    return new Response(JSON.stringify({ error: "认证失败: " + e.message }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
