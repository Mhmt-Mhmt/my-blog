/**
 * 文件访问 API
 * GET /files/:filename - 获取上传的文件
 */
export async function onRequest(context) {
  const { env, params } = context;
  const filename = params.filename;

  try {
    const object = await env.FILES.get(filename);

    if (!object) {
      return new Response("File not found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(object.body, { headers });
  } catch (e) {
    return new Response("File not found", { status: 404 });
  }
}
