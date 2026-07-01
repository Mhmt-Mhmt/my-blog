<script>
  /**
   * 登录页面
   */
  let { API_BASE, onLogin } = $props();

  let password = $state("");
  let error = $state("");
  let loading = $state(false);

  async function handleSubmit(e) {
    e.preventDefault();
    error = "";
    loading = true;

    try {
      const res = await fetch(`${API_BASE}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.error || "登录失败";
        return;
      }

      onLogin(data.token);
    } catch (e) {
      error = "网络错误，请检查连接";
    } finally {
      loading = false;
    }
  }
</script>

<div class="login-page">
  <div class="login-card">
    <h2>管理后台</h2>
    <p class="subtitle">请输入管理员密码</p>

    <form onsubmit={handleSubmit}>
      {#if error}
        <div class="error-msg">{error}</div>
      {/if}

      <input
        type="password"
        bind:value={password}
        placeholder="密码"
        disabled={loading}
        autofocus
      />

      <button type="submit" disabled={loading || !password}>
        {loading ? "验证中..." : "登录"}
      </button>
    </form>
  </div>
</div>

<style>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 120px);
  }

  .login-card {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 380px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
    text-align: center;
  }

  .subtitle {
    color: #888;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .error-msg {
    background: #fef2f2;
    color: #dc2626;
    padding: 0.5rem 0.8rem;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 0.8rem;
  }

  input {
    width: 100%;
    padding: 0.7rem 0.9rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 1rem;
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus {
    border-color: #e94560;
  }

  button {
    width: 100%;
    padding: 0.7rem;
    background: #e94560;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  button:hover:not(:disabled) {
    opacity: 0.9;
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
