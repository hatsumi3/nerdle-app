<script>
  import svelteLogo from "./../assets/svelte.svg";
</script>

<header class="header">
  <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
  <div class="logo nerdle">
    <span class="nerdle-name" style="font-size: 1.8rem;">nerdle</span>
    <span class="nerdle-dot">.</span>
  </div>
</header>

<style>
  .header {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .logo.nerdle {
    margin-left: auto;
  }
</style>
