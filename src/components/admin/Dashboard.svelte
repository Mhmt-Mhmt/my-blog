<script>
  /**
   * 文章列表管理
   */
  let { API_BASE, token, onEdit, onCreate } = $props();

  let posts = $state([]);
  let loading = $state(true);
  let error = $state("");
  let deleting = $state(null);

  async function loadPosts() {
    loading = true;
    error = "";
    try {
      const res = await fetch(`${API_BASE}/posts`);
      const data = await res.json();
      if (res.ok) {
        posts = data.posts || [];
      } else {
        error = data.error || "加载失败";
      }
    } catch (e) {
      error = "网络错误";
    } finally {
      loading = false;
    }
  }

  async function handleDelete(slug) {
    if (!confirm("确定要删除这篇文章吗？")) return;
    deleting = slug;
    try {
      const res = await fetch(`${API_BASE}/posts/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        posts = posts.filter(p => p.slug !== slug);
      } else {
        const data = await res.json();
        alert(data.error || "删除失败");
      }
    } catch (e) {
      alert("网络错误");
    } finally {
      deleting = null;
    }
  }

  function togglePublish(post) {
    onEdit(post);
  }

  function formatDate(dateStr) {
    if (!dateStr) return "-";
    return dateStr.slice(0, 10);
  }

  $effect(() => {
    if (token) loadPosts();
  });
</script>

<div class="dashboard">
  <div class="header-bar">
    <h2>文章管理</h2>
    <button class="btn-primary" onclick={onCreate}>+ 新建文章</button>
  </div>

  {#if loading}
    <div class="loading">加载中...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else if posts.length === 0}
    <div class="empty">
      <p>还没有文章</p>
      <button class="btn-primary" onclick={onCreate}>创建第一篇文章</button>
    </div>
  {:else}
    <div class="post-table">
      <div class="table-header">
        <span class="col-title">标题</span>
        <span class="col-date">创建时间</span>
        <span class="col-status">状态</span>
        <span class="col-actions">操作</span>
      </div>

      {#each posts as post}
        <div class="table-row">
          <span class="col-title">
            <span class="post-title">{post.title}</span>
            <span class="post-slug">/{post.slug}</span>
          </span>
          <span class="col-date">{formatDate(post.created_at)}</span>
          <span class="col-status">
            <span class="badge" class:published={post.published} class:draft={!post.published}>
              {post.published ? "已发布" : "草稿"}
            </span>
            {#if post.pinned}
              <span class="badge pinned">置顶</span>
            {/if}
          </span>
          <span class="col-actions">
            <button class="action-btn edit" onclick={() => onEdit(post)}>编辑</button>
            <button
              class="action-btn delete"
              onclick={() => handleDelete(post.slug)}
              disabled={deleting === post.slug}
            >
              {deleting === post.slug ? "删除中..." : "删除"}
            </button>
          </span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dashboard {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .header-bar h2 {
    font-size: 1.3rem;
  }

  .btn-primary {
    background: #e94560;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: opacity 0.2s;
  }
  .btn-primary:hover { opacity: 0.9; }

  .loading, .error, .empty {
    text-align: center;
    padding: 3rem 1rem;
    color: #888;
  }
  .empty p { margin-bottom: 1rem; }
  .error { color: #dc2626; }

  .post-table {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
  }

  .table-header {
    display: grid;
    grid-template-columns: 1fr 120px 100px 140px;
    gap: 0.5rem;
    padding: 0.7rem 1rem;
    background: #f9f9f9;
    font-size: 0.8rem;
    color: #888;
    font-weight: 600;
    text-transform: uppercase;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 120px 100px 140px;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    border-top: 1px solid #f0f0f0;
    align-items: center;
    transition: background 0.15s;
  }
  .table-row:hover {
    background: #fafafa;
  }

  .post-title {
    font-weight: 500;
    display: block;
  }
  .post-slug {
    font-size: 0.8rem;
    color: #aaa;
  }

  .badge {
    display: inline-block;
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-weight: 500;
  }
  .badge.published {
    background: #dcfce7;
    color: #16a34a;
  }
  .badge.draft {
    background: #fef3c7;
    color: #d97706;
  }
  .badge.pinned {
    background: #e0e7ff;
    color: #4f46e5;
    margin-left: 0.3rem;
  }

  .action-btn {
    padding: 0.3rem 0.7rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.8rem;
    cursor: pointer;
    background: white;
    margin-right: 0.3rem;
    transition: all 0.15s;
  }
  .action-btn.edit {
    color: #4f46e5;
    border-color: #c7d2fe;
  }
  .action-btn.edit:hover {
    background: #eef2ff;
  }
  .action-btn.delete {
    color: #dc2626;
    border-color: #fecaca;
  }
  .action-btn.delete:hover {
    background: #fef2f2;
  }
  .action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
