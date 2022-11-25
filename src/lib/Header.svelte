<script>
  import svelteLogo from "$assets/svelte.svg";
</script>

<header class="header">
  <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
  <div class="logo nerdle">
    <span class="nerdle-name">nerdle</span>
    <span class="nerdle-dot">.</span>
  </div>
</header>

<style>
  .header {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 0.8rem;
  }
  .logo.nerdle {
    margin-left: auto;
  }

  .nerdle-name {
    color: #820458;
    font-family: "Quicksand", sans-serif;
    font-size: 1.8rem;
  }
  .nerdle-dot {
    color: #989484;
    font-family: "Times New Roman", Times, serif;
    font-size: 1.2rem;
  }
</style>
