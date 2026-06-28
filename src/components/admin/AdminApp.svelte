<script>
  /**
   * 管理后台 - 主应用组件
   * 处理路由、认证状态
   */
  import LoginPage from "./LoginPage.svelte";
  import Dashboard from "./Dashboard.svelte";
  import PostEditor from "./PostEditor.svelte";
  import FileManager from "./FileManager.svelte";

  let currentView = $state("login");  // login | dashboard | editor | files
  let editingPost = $state(null);      // 正在编辑的文章
  let token = $state("");              // 认证 token

  const API_BASE = "/api";

  function handleLogin(t) {
    token = t;
    currentView = "dashboard";
  }

  function handleLogout() {
    token = "";
    currentView = "login";
  }

  function navigateTo(view) {
    currentView = view;
    editingPost = null;
  }

  function editPost(post) {
    editingPost = post;
    currentView = "editor";
  }

  function createNew() {
    editingPost = null;
    currentView = "editor";
  }
</script>

<div class="admin-app">
  <header class="admin-header">
    <div class="header-inner">
      <h1 class="logo">
        <a href="/" class="site-link" target="_blank">Mizuki</a>
        <span class="separator">/</span>
        <span class="title">管理后台</span>
      </h1>

      {#if token}
        <nav class="admin-nav">
          <button
            class="nav-btn"
            class:active={currentView === "dashboard"}
            onclick={() => navigateTo("dashboard")}
          >文章管理</button>
          <button
            class="nav-btn"
            class:active={currentView === "files"}
            onclick={() => navigateTo("files")}
          >文件管理</button>
          <button class="nav-btn logout" onclick={handleLogout}>退出登录</button>
        </nav>
      {/if}
    </div>
  </header>

  <main class="admin-main">
    {#if currentView === "login"}
      <LoginPage {API_BASE} onLogin={handleLogin} />

    {:else if currentView === "dashboard"}
      <Dashboard
        {API_BASE}
        {token}
        onEdit={editPost}
        onCreate={createNew}
      />

    {:else if currentView === "editor"}
      <PostEditor
        {API_BASE}
        {token}
        post={editingPost}
        onBack={() => navigateTo("dashboard")}
        onSaved={() => navigateTo("dashboard")}
      />

    {:else if currentView === "files"}
      <FileManager
        {API_BASE}
        {token}
        onBack={() => navigateTo("dashboard")}
      />
    {/if}
  </main>
</div>

<style>
  .admin-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .admin-header {
    background: #1a1a2e;
    color: white;
    padding: 0 1.5rem;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
  }

  .logo {
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .site-link {
    color: #e94560;
    text-decoration: none;
  }
  .site-link:hover {
    text-decoration: underline;
  }

  .separator {
    color: #666;
    font-weight: 300;
  }

  .title {
    font-weight: 400;
    color: #ccc;
  }

  .admin-nav {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .nav-btn {
    background: transparent;
    border: 1px solid #444;
    color: #ccc;
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background: #333;
    color: white;
  }
  .nav-btn.active {
    background: #e94560;
    border-color: #e94560;
    color: white;
  }
  .nav-btn.logout {
    border-color: #e94560;
    color: #e94560;
  }
  .nav-btn.logout:hover {
    background: #e94560;
    color: white;
  }

  .admin-main {
    flex: 1;
    padding: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
</style>
