<script>
  /**
   * 文件管理器 - 上传和管理文件
   */
  let { API_BASE, token, onBack } = $props();

  let files = $state([]);
  let loading = $state(true);
  let error = $state("");
  let uploading = $state(false);

  async function loadFiles() {
    loading = true;
    try {
      const res = await fetch(`${API_BASE}/files`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        files = data.files || [];
      }
    } catch (e) {
      error = "加载失败";
    } finally {
      loading = false;
    }
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    uploading = true;
    error = "";

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.error || "上传失败";
        return;
      }

      // 刷新文件列表
      await loadFiles();
    } catch (e) {
      error = "上传失败";
    } finally {
      uploading = false;
      e.target.value = "";
    }
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(window.location.origin + url);
    alert("链接已复制: " + window.location.origin + url);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
  }

  function formatDate(dateStr) {
    if (!dateStr) return "-";
    return dateStr.slice(0, 19).replace("T", " ");
  }

  $effect(() => {
    loadFiles();
  });
</script>

<div class="file-manager">
  <div class="header-bar">
    <div class="header-left">
      <button class="back-btn" onclick={onBack}>&larr; 返回</button>
      <h2>文件管理</h2>
    </div>
    <div class="upload-area">
      <label class="upload-btn" class:uploading>
        {uploading ? "上传中..." : "选择文件上传"}
        <input type="file" hidden onchange={handleUpload} disabled={uploading} />
      </label>
    </div>
  </div>

  {#if error}
    <div class="error-msg">{error}</div>
  {/if}

  <div class="supported-formats">
    支持的文件类型: 图片 (PNG/JPG/GIF/WebP/SVG), PDF, Markdown 等
  </div>

  {#if loading}
    <div class="loading">加载中...</div>
  {:else if files.length === 0}
    <div class="empty">
      <p>还没有上传的文件</p>
    </div>
  {:else}
    <div class="file-grid">
      {#each files as file}
        <div class="file-card">
          <div class="file-icon">
            {#if file.mime_type?.startsWith("image/")}
              <img src={file.url} alt={file.original_name} loading="lazy" />
            {:else}
              <div class="file-type-badge">{file.mime_type?.split("/")[1]?.toUpperCase() || "FILE"}</div>
            {/if}
          </div>
          <div class="file-info">
            <span class="file-name" title={file.original_name}>{file.original_name}</span>
            <span class="file-meta">{formatSize(file.size)}</span>
          </div>
          <button class="copy-btn" onclick={() => copyUrl(file.url)}>复制链接</button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .file-manager {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .back-btn {
    background: none;
    border: 1px solid #ddd;
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    color: #666;
  }
  .back-btn:hover { background: #f5f5f5; }

  .header-bar h2 { font-size: 1.2rem; }

  .upload-btn {
    display: inline-block;
    padding: 0.5rem 1.2rem;
    background: #e94560;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: opacity 0.2s;
  }
  .upload-btn:hover { opacity: 0.9; }
  .upload-btn.uploading { opacity: 0.6; cursor: wait; }

  .error-msg {
    background: #fef2f2;
    color: #dc2626;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  .supported-formats {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 1rem;
  }

  .loading, .empty {
    text-align: center;
    padding: 3rem;
    color: #888;
  }

  .file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }

  .file-card {
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .file-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .file-icon {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;
    overflow: hidden;
  }
  .file-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .file-type-badge {
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
    padding: 0.4rem 0.8rem;
    background: #eee;
    border-radius: 4px;
  }

  .file-info {
    padding: 0.6rem;
  }
  .file-name {
    display: block;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.2rem;
  }
  .file-meta {
    font-size: 0.75rem;
    color: #999;
  }

  .copy-btn {
    width: 100%;
    padding: 0.4rem;
    border: none;
    border-top: 1px solid #eee;
    background: none;
    cursor: pointer;
    font-size: 0.8rem;
    color: #4f46e5;
    transition: background 0.15s;
  }
  .copy-btn:hover {
    background: #f5f3ff;
  }
</style>
