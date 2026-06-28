<script>
  /**
   * 文章编辑器
   * 支持新建和编辑
   */
  let { API_BASE, token, post, onBack, onSaved } = $props();

  let slug = $state("");
  let title = $state("");
  let content = $state("");
  let description = $state("");
  let tags = $state("");
  let category = $state("");
  let published = $state(false);
  let pinned = $state(false);

  let saving = $state(false);
  let error = $state("");
  let previewHTML = $state("");
  let showPreview = $state(false);
  let activeTab = $state("write");

  // 编辑模式：填充已有数据
  $effect(() => {
    if (post) {
      slug = post.slug || "";
      title = post.title || "";
      content = post.content || "";
      description = post.description || "";
      tags = (post.tags ? JSON.parse(post.tags).join(", ") : "");
      category = post.category || "";
      published = !!post.published;
      pinned = !!post.pinned;
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    error = "";
    saving = true;

    const body = {
      slug: slug.trim(),
      title: title.trim(),
      content,
      description: description.trim(),
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      category: category.trim(),
      published,
      pinned,
    };

    if (!body.slug || !body.title) {
      error = "slug 和标题为必填项";
      saving = false;
      return;
    }

    try {
      const method = post ? "PUT" : "POST";
      const url = post ? `${API_BASE}/posts/${post.slug}` : `${API_BASE}/posts`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.error || "保存失败";
        return;
      }

      // 如果是编辑且 slug 变了，删除旧记录
      if (post && body.slug !== post.slug) {
        // 实际这里需要额外处理，简化版先不管
      }

      onSaved();
    } catch (e) {
      error = "网络错误";
    } finally {
      saving = false;
    }
  }

  async function updatePreview() {
    // 简单的 markdown 预览
    let html = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/### (.+)/g, "<h3>$1</h3>")
      .replace(/## (.+)/g, "<h2>$1</h2>")
      .replace(/# (.+)/g, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width:100%">')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/^- (.+)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");

    previewHTML = `<p>${html}</p>`;
  }
</script>

<div class="editor">
  <div class="editor-header">
    <button class="back-btn" onclick={onBack}>&larr; 返回</button>
    <h2>{post ? "编辑文章" : "新建文章"}</h2>
  </div>

  <form {onsubmit}>
    {#if error}
      <div class="error-msg">{error}</div>
    {/if}

    <div class="form-row">
      <div class="form-group flex-1">
        <label for="title">标题 *</label>
        <input id="title" type="text" bind:value={title} placeholder="文章标题" />
      </div>
      <div class="form-group flex-1">
        <label for="slug">Slug * (URL 标识)</label>
        <input id="slug" type="text" bind:value={slug} placeholder="my-article-slug" disabled={!!post} />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group flex-2">
        <label for="description">描述</label>
        <input id="description" type="text" bind:value={description} placeholder="文章摘要" />
      </div>
      <div class="form-group flex-1">
        <label for="category">分类</label>
        <input id="category" type="text" bind:value={category} placeholder="Blog" />
      </div>
    </div>

    <div class="form-group">
      <label for="tags">标签 (用逗号分隔)</label>
      <input id="tags" type="text" bind:value={tags} placeholder="Astro, Markdown, Blog" />
    </div>

    <div class="form-group">
      <label>内容 (Markdown)</label>
      <div class="editor-tabs">
        <button
          type="button"
          class="tab"
          class:active={activeTab === "write"}
          onclick={() => activeTab = "write"}
        >编辑</button>
        <button
          type="button"
          class="tab"
          class:active={activeTab === "preview"}
          onclick={() => { activeTab = "preview"; updatePreview(); }}
        >预览</button>
      </div>
      {#if activeTab === "write"}
        <textarea
          bind:value={content}
          placeholder="使用 Markdown 编写文章内容..."
          rows="18"
        ></textarea>
      {:else}
        <div class="preview-area">
          {@html previewHTML}
          {#if !content}
            <p style="color:#aaa; text-align:center; padding:3rem;">暂无内容</p>
          {/if}
        </div>
      {/if}
    </div>

    <div class="form-row toggles">
      <label class="toggle-label">
        <input type="checkbox" bind:checked={published} />
        <span>已发布</span>
      </label>
      <label class="toggle-label">
        <input type="checkbox" bind:checked={pinned} />
        <span>置顶</span>
      </label>
    </div>

    <div class="form-actions">
      <button type="button" class="btn-cancel" onclick={onBack}>取消</button>
      <button type="submit" class="btn-save" disabled={saving}>
        {saving ? "保存中..." : "保存文章"}
      </button>
    </div>
  </form>
</div>

<style>
  .editor {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .editor-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }

  .back-btn {
    background: none;
    border: 1px solid #ddd;
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    color: #666;
    transition: all 0.15s;
  }
  .back-btn:hover {
    background: #f5f5f5;
  }

  .editor-header h2 {
    font-size: 1.2rem;
  }

  .error-msg {
    background: #fef2f2;
    color: #dc2626;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }

  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }
  .flex-1 { flex: 1; }
  .flex-2 { flex: 2; }

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #555;
    margin-bottom: 0.35rem;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.6rem 0.8rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
  }
  input[type="text"]:focus {
    border-color: #e94560;
  }
  input:disabled {
    background: #f5f5f5;
    color: #999;
  }

  .editor-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 0;
    border-bottom: 2px solid #eee;
  }
  .tab {
    padding: 0.4rem 1rem;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.85rem;
    color: #888;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    transition: all 0.15s;
  }
  .tab.active {
    color: #e94560;
    border-bottom-color: #e94560;
  }

  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 0 0 6px 6px;
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    line-height: 1.6;
    resize: vertical;
    outline: none;
  }
  textarea:focus {
    border-color: #e94560;
  }

  .preview-area {
    border: 1px solid #ddd;
    border-radius: 0 0 6px 6px;
    padding: 1rem;
    min-height: 300px;
    line-height: 1.7;
    font-size: 0.9rem;
  }

  .toggles {
    gap: 1.5rem;
    align-items: center;
  }
  .toggle-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .toggle-label input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  .btn-cancel {
    padding: 0.5rem 1.2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .btn-cancel:hover {
    background: #f5f5f5;
  }

  .btn-save {
    padding: 0.5rem 1.5rem;
    background: #e94560;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: opacity 0.2s;
  }
  .btn-save:hover:not(:disabled) { opacity: 0.9; }
  .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
